from django.db import models
from django.contrib.auth import get_user_model
from problems.models import Problem

User = get_user_model()


class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('wrong_answer', 'Wrong Answer'),
        ('time_limit_exceeded', 'Time Limit Exceeded'),
        ('runtime_error', 'Runtime Error'),
        ('compilation_error', 'Compilation Error'),
    ]
    
    LANGUAGE_CHOICES = [
        ('javascript', 'JavaScript'),
        ('python', 'Python'),
        ('java', 'Java'),
        ('cpp', 'C++'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='submissions')
    code = models.TextField()
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    
    # Execution results
    runtime = models.IntegerField(null=True, blank=True, help_text="Runtime in milliseconds")
    memory = models.FloatField(null=True, blank=True, help_text="Memory usage in MB")
    output = models.TextField(blank=True)
    error_message = models.TextField(blank=True)
    
    # Failed test case details (JSON)
    failed_test_case = models.JSONField(null=True, blank=True)
    
    # Judge0 submission details
    judge0_token = models.CharField(max_length=100, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.problem.title} ({self.status})"
    
    @property
    def is_accepted(self):
        return self.status == 'accepted'