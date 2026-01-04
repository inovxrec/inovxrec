from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserProfileSerializer,
    UserStatsSerializer
)

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserProfileSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserProfileSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    if request.method in ['PUT', 'PATCH']:
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


from django.db.models import Count
from django.db.models.functions import TruncDate
from django.utils import timezone
from datetime import timedelta

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stats(request, user_id=None):
    if user_id:
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        user = request.user
    
    stats_serializer = UserStatsSerializer(user)
    profile_serializer = UserProfileSerializer(user)
    
    # Get recent submissions
    recent_submissions = user.submissions.all().order_by('-created_at')[:5]
    from submissions.serializers import SubmissionSerializer
    submissions_data = SubmissionSerializer(recent_submissions, many=True).data

    # Calculate submission heatmap data (last 365 days)
    one_year_ago = timezone.now() - timedelta(days=365)
    
    # Aggregate submissions by date
    daily_submissions = user.submissions.filter(
        created_at__gte=one_year_ago
    ).annotate(
        date=TruncDate('created_at')
    ).values('date').annotate(
        count=Count('id')
    ).order_by('date')
    
    # Convert to dictionary { 'YYYY-MM-DD': count }
    submission_calendar = {
        item['date'].strftime('%Y-%m-%d'): item['count'] 
        for item in daily_submissions
    }
    
    return Response({
        'user': profile_serializer.data,
        'stats': stats_serializer.data,
        'recent_submissions': submissions_data,
        'submission_calendar': submission_calendar
    })