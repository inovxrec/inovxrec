import requests
import time
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from django.utils import timezone
from .models import Submission
from .serializers import (
    SubmissionSerializer, 
    SubmissionDetailSerializer,
    CodeExecutionSerializer,
    ExecutionResultSerializer
)
from problems.models import Problem, UserProblemProgress


# Judge0 Language IDs
LANGUAGE_IDS = {
    'javascript': 63,
    'python': 71,
    'java': 62,
    'cpp': 54,
}


class SubmissionListView(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Submission.objects.filter(user=self.request.user)
        problem_id = self.request.query_params.get('problem_id', None)
        if problem_id:
            queryset = queryset.filter(problem_id=problem_id)
        return queryset.select_related('problem')


class SubmissionDetailView(generics.RetrieveAPIView):
    serializer_class = SubmissionDetailSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user).select_related('problem')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def run_code(request):
    """Run code against sample test case"""
    serializer = CodeExecutionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    code = serializer.validated_data['code']
    language = serializer.validated_data['language']
    problem_id = serializer.validated_data['problem_id']
    
    try:
        problem = Problem.objects.get(id=problem_id)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Use first example as test input
    if not problem.examples:
        return Response({'error': 'No test cases available'}, status=status.HTTP_400_BAD_REQUEST)
    
    test_input = problem.examples[0].get('input', '')
    expected_output = problem.examples[0].get('output', '')
    
    # Execute code using Judge0
    result = execute_code_judge0(code, language, test_input)
    
    # Compare output with expected (basic comparison)
    if result['status'] == 'accepted':
        actual_output = result.get('output', '').strip()
        if actual_output != expected_output.strip():
            result['status'] = 'wrong_answer'
            result['failed_test_case'] = {
                'input': test_input,
                'expected': expected_output,
                'actual': actual_output
            }
    
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_code(request):
    """Submit code for full evaluation"""
    serializer = CodeExecutionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    code = serializer.validated_data['code']
    language = serializer.validated_data['language']
    problem_id = serializer.validated_data['problem_id']
    
    try:
        problem = Problem.objects.get(id=problem_id)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Create submission record
    submission = Submission.objects.create(
        user=request.user,
        problem=problem,
        code=code,
        language=language,
        status='pending'
    )
    
    # Execute code using Judge0 (using first example for now)
    if problem.examples:
        test_input = problem.examples[0].get('input', '')
        expected_output = problem.examples[0].get('output', '')
        
        result = execute_code_judge0(code, language, test_input)
        
        # Update submission with results
        submission.status = result['status']
        submission.runtime = result.get('runtime')
        submission.memory = result.get('memory')
        submission.output = result.get('output', '')
        submission.error_message = result.get('error', '')
        
        # Check if output matches expected
        if result['status'] == 'accepted':
            actual_output = result.get('output', '').strip()
            if actual_output != expected_output.strip():
                submission.status = 'wrong_answer'
                submission.failed_test_case = {
                    'input': test_input,
                    'expected': expected_output,
                    'actual': actual_output
                }
        
        submission.save()
        
        # Update user progress if accepted
        if submission.status == 'accepted':
            update_user_progress(request.user, problem)
    
    return Response(SubmissionDetailSerializer(submission).data, status=status.HTTP_201_CREATED)


def execute_code_judge0(code, language, stdin=''):
    """Execute code using Judge0 API"""
    try:
        # Submit code to Judge0
        submission_data = {
            'source_code': code,
            'language_id': LANGUAGE_IDS[language],
            'stdin': stdin,
        }
        
        headers = {}
        if settings.JUDGE0_API_KEY:
            headers['X-RapidAPI-Key'] = settings.JUDGE0_API_KEY
        
        response = requests.post(
            f"{settings.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true",
            json=submission_data,
            headers=headers,
            timeout=30
        )
        
        if response.status_code != 201:
            return {
                'status': 'runtime_error',
                'error': 'Failed to execute code'
            }
        
        result = response.json()
        
        # Map Judge0 status to our status
        judge0_status = result.get('status', {}).get('id', 0)
        
        if judge0_status == 3:  # Accepted
            return {
                'status': 'accepted',
                'output': result.get('stdout', ''),
                'runtime': result.get('time') and int(float(result['time']) * 1000),  # Convert to ms
                'memory': result.get('memory')
            }
        elif judge0_status == 5:  # Time Limit Exceeded
            return {
                'status': 'time_limit_exceeded',
                'error': 'Time limit exceeded'
            }
        elif judge0_status == 6:  # Compilation Error
            return {
                'status': 'compilation_error',
                'error': result.get('compile_output', 'Compilation error')
            }
        else:  # Runtime Error or other
            return {
                'status': 'runtime_error',
                'error': result.get('stderr', 'Runtime error'),
                'output': result.get('stdout', '')
            }
    
    except requests.RequestException as e:
        return {
            'status': 'runtime_error',
            'error': f'Execution service unavailable: {str(e)}'
        }
    except Exception as e:
        return {
            'status': 'runtime_error',
            'error': f'Unexpected error: {str(e)}'
        }


def update_user_progress(user, problem):
    """Update user progress and statistics"""
    progress, created = UserProblemProgress.objects.get_or_create(
        user=user,
        problem=problem,
        defaults={'attempts': 1}
    )
    
    if not progress.solved:
        progress.solved = True
        progress.first_solved_at = timezone.now()
        progress.save()
        
        # Update user statistics
        user.total_solved += 1
        if problem.difficulty == 'easy':
            user.easy_solved += 1
        elif problem.difficulty == 'medium':
            user.medium_solved += 1
        elif problem.difficulty == 'hard':
            user.hard_solved += 1
        
        # Update streak (simplified - just increment for now)
        user.streak += 1
        user.last_solved_date = timezone.now().date()
        user.save()
    
    if not created:
        progress.attempts += 1
        progress.save()