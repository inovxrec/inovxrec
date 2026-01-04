from rest_framework import serializers
from .models import Submission
from problems.serializers import ProblemListSerializer


class SubmissionSerializer(serializers.ModelSerializer):
    problem_title = serializers.CharField(source='problem.title', read_only=True)
    problem_slug = serializers.CharField(source='problem.slug', read_only=True)
    problem_difficulty = serializers.CharField(source='problem.difficulty', read_only=True)
    
    class Meta:
        model = Submission
        fields = (
            'id', 'problem_title', 'problem_slug', 'problem_difficulty',
            'language', 'status', 'runtime', 'memory', 'created_at'
        )
        read_only_fields = ('id', 'status', 'runtime', 'memory', 'created_at')


class SubmissionDetailSerializer(serializers.ModelSerializer):
    problem = ProblemListSerializer(read_only=True)
    
    class Meta:
        model = Submission
        fields = (
            'id', 'problem', 'code', 'language', 'status', 'runtime',
            'memory', 'output', 'error_message', 'failed_test_case', 'created_at'
        )
        read_only_fields = (
            'id', 'status', 'runtime', 'memory', 'output', 
            'error_message', 'failed_test_case', 'created_at'
        )


class CodeExecutionSerializer(serializers.Serializer):
    code = serializers.CharField()
    language = serializers.ChoiceField(choices=Submission.LANGUAGE_CHOICES)
    problem_id = serializers.IntegerField()
    
    def validate_problem_id(self, value):
        from problems.models import Problem
        try:
            Problem.objects.get(id=value)
        except Problem.DoesNotExist:
            raise serializers.ValidationError("Problem not found")
        return value


class ExecutionResultSerializer(serializers.Serializer):
    status = serializers.CharField()
    output = serializers.CharField(required=False, allow_blank=True)
    runtime = serializers.IntegerField(required=False, allow_null=True)
    memory = serializers.FloatField(required=False, allow_null=True)
    error = serializers.CharField(required=False, allow_blank=True)
    failed_test_case = serializers.JSONField(required=False, allow_null=True)