from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserStats

@receiver(post_save, sender=User)
def create_user_stats(sender, instance, created, **kwargs):
    if created:
        UserStats.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_stats(sender, instance, **kwargs):
    if hasattr(instance, 'stats'):
        instance.stats.save()
