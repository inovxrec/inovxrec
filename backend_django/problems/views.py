from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Problem, Tag, UserProblemProgress
from .serializers import (
    ProblemListSerializer, 
    ProblemDetailSerializer, 
    TagSerializer,
    UserProblemProgressSerializer
)


from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser

class ProblemListView(generics.ListCreateAPIView):
    serializer_class = ProblemListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['difficulty']
    search_fields = ['title', 'description']
    ordering_fields = ['difficulty', 'title', 'created_at']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            from .serializers import ProblemCreateSerializer
            return ProblemCreateSerializer
        return ProblemListSerializer
    
    def get_queryset(self):
        queryset = Problem.objects.all().prefetch_related('tags')
        
        # Filter by tag
        tag = self.request.query_params.get('tag', None)
        if tag and tag != 'all':
            queryset = queryset.filter(tags__name__iexact=tag)
        
        # Filter by solved status (requires authentication)
        status_filter = self.request.query_params.get('status', None)
        if status_filter and status_filter != 'all' and self.request.user.is_authenticated:
            if status_filter == 'solved':
                solved_problem_ids = UserProblemProgress.objects.filter(
                    user=self.request.user, 
                    solved=True
                ).values_list('problem_id', flat=True)
                queryset = queryset.filter(id__in=solved_problem_ids)
            elif status_filter == 'unsolved':
                solved_problem_ids = UserProblemProgress.objects.filter(
                    user=self.request.user, 
                    solved=True
                ).values_list('problem_id', flat=True)
                queryset = queryset.exclude(id__in=solved_problem_ids)
        
        return queryset


class ProblemDetailView(generics.RetrieveAPIView):
    queryset = Problem.objects.all().prefetch_related('tags')
    serializer_class = ProblemDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


@api_view(['GET'])
@permission_classes([AllowAny])
def problem_tags(request):
    tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def problem_stats(request):
    """Get overall problem statistics"""
    total_problems = Problem.objects.count()
    easy_count = Problem.objects.filter(difficulty='easy').count()
    medium_count = Problem.objects.filter(difficulty='medium').count()
    hard_count = Problem.objects.filter(difficulty='hard').count()
    
    stats = {
        'total': total_problems,
        'easy': easy_count,
        'medium': medium_count,
        'hard': hard_count,
    }
    
    # Add user-specific stats if authenticated
    if request.user.is_authenticated:
        solved_problems = UserProblemProgress.objects.filter(
            user=request.user, 
            solved=True
        )
        stats['solved'] = solved_problems.count()
        stats['solved_easy'] = solved_problems.filter(problem__difficulty='easy').count()
        stats['solved_medium'] = solved_problems.filter(problem__difficulty='medium').count()
        stats['solved_hard'] = solved_problems.filter(problem__difficulty='hard').count()
    else:
        stats.update({
            'solved': 0,
            'solved_easy': 0,
            'solved_medium': 0,
            'solved_hard': 0,
        })
    
    return Response(stats)


@api_view(['GET'])
@permission_classes([AllowAny])
def user_progress(request):
    """Get user's progress on all problems"""
    progress = UserProblemProgress.objects.filter(user=request.user).select_related('problem')
    serializer = UserProblemProgressSerializer(progress, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def roadmap_stats(request):
    """Get stats for the roadmap (grouped by tag)"""
    from django.db.models import Count, Q
    
    # Get all tags
    tags = Tag.objects.all()
    stats = {}
    
    for tag in tags:
        # Total problems for this tag
        total = Problem.objects.filter(tags=tag).count()
        
        # Solved by user
        solved = UserProblemProgress.objects.filter(
            user=request.user, 
            problem__tags=tag, 
            solved=True
        ).count()
        
        stats[tag.name] = {
            'total': total,
            'solved': solved,
            'slug': tag.name.lower().replace(' ', '-')  # Simplified slug for frontend mapping
        }
        
    return Response(stats)