from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username
    
    @property
    def acceptance_rate(self):
        """Calculate acceptance rate based on submissions"""
        from submissions.models import Submission
        total_submissions = Submission.objects.filter(user=self).count()
        if total_submissions == 0:
            return 0
        accepted_submissions = Submission.objects.filter(
            user=self, 
            status='accepted'
        ).count()
        return round((accepted_submissions / total_submissions) * 100, 1)


class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stats')
    total_solved = models.IntegerField(default=0)
    easy_solved = models.IntegerField(default=0)
    medium_solved = models.IntegerField(default=0)
    hard_solved = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)
    last_solved_date = models.DateField(null=True, blank=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Stats for {self.user.username}"