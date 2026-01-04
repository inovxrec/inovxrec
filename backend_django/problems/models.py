from django.db import models
from django.contrib.auth import get_user_model
import json

User = get_user_model()


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']


class Problem(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='problems')
    
    # JSON fields for complex data
    examples = models.JSONField(default=list, help_text="List of example inputs/outputs")
    constraints = models.JSONField(default=list, help_text="List of constraint strings")
    starter_code = models.JSONField(default=dict, help_text="Starter code for each language")
    test_cases = models.JSONField(default=list, help_text="Hidden test cases for validation")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} ({self.difficulty})"
    
    class Meta:
        ordering = ['id']
    
    def get_solved_status(self, user):
        """Check if user has solved this problem"""
        if not user.is_authenticated:
            return False
        return UserProblemProgress.objects.filter(
            user=user, 
            problem=self, 
            solved=True
        ).exists()


class UserProblemProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    solved = models.BooleanField(default=False)
    attempts = models.IntegerField(default=0)
    first_solved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'problem']
    
    def __str__(self):
        return f"{self.user.username} - {self.problem.title} ({'Solved' if self.solved else 'Attempted'})"