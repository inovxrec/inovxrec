from django.contrib import admin
from .models import Submission


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'problem', 'language', 'status', 'runtime', 'created_at')
    list_filter = ('status', 'language', 'problem__difficulty', 'created_at')
    search_fields = ('user__username', 'problem__title')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Submission Info', {
            'fields': ('user', 'problem', 'language', 'status')
        }),
        ('Code', {
            'fields': ('code',)
        }),
        ('Results', {
            'fields': ('runtime', 'memory', 'output', 'error_message', 'failed_test_case')
        }),
        ('Metadata', {
            'fields': ('judge0_token', 'created_at', 'updated_at')
        }),
    )