from rest_framework import serializers
from .models import Problem, Tag, UserProblemProgress, TestCase


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class ProblemListSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True, 
        slug_field='name', 
        queryset=Tag.objects.all()
    )
    solved = serializers.SerializerMethodField()
    
    class Meta:
        model = Problem
        fields = (
            'id', 'title', 'slug', 'difficulty', 'tags', 'solved'
        )
    
    def get_solved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.get_solved_status(request.user)
        return False
    
    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        problem = Problem.objects.create(**validated_data)
        for tag in tags_data:
            problem.tags.add(tag)
        return problem


class ProblemDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True, read_only=True)
    solved = serializers.SerializerMethodField()
    
    class Meta:
        model = Problem
        fields = (
            'id', 'title', 'slug', 'difficulty', 'description', 'tags',
            'examples', 'constraints', 'starter_code', 'solved', 'created_at'
        )
    
    def get_solved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.get_solved_status(request.user)
        return False


class UserProblemProgressSerializer(serializers.ModelSerializer):
    problem_title = serializers.CharField(source='problem.title', read_only=True)
    problem_slug = serializers.CharField(source='problem.slug', read_only=True)
    problem_difficulty = serializers.CharField(source='problem.difficulty', read_only=True)
    
    class Meta:
        model = UserProblemProgress
        fields = (
            'problem_title', 'problem_slug', 'problem_difficulty',
            'solved', 'attempts', 'first_solved_at', 'updated_at'
        )


class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ('input_data', 'expected_output', 'is_hidden', 'order')


class ProblemCreateSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True, 
        slug_field='name', 
        queryset=Tag.objects.all()
    )
    test_cases = TestCaseSerializer(many=True)
    
    class Meta:
        model = Problem
        fields = (
            'title', 'slug', 'difficulty', 'description', 
            'tags', 'examples', 'constraints', 'starter_code', 'test_cases'
        )
        
    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        test_cases_data = validated_data.pop('test_cases', [])
        
        problem = Problem.objects.create(**validated_data)
        
        for tag in tags_data:
            problem.tags.add(tag)
            
        for test_case_data in test_cases_data:
            TestCase.objects.create(problem=problem, **test_case_data)
            
        return problem