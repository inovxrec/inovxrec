from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'total_solved', 'streak', 'is_staff', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('username', 'email')
    ordering = ('-date_joined',)
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Statistics', {
            'fields': ('total_solved', 'easy_solved', 'medium_solved', 'hard_solved', 'streak', 'last_solved_date')
        }),
    )
    
    readonly_fields = ('date_joined', 'last_login')