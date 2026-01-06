from django.contrib import admin
from .models import Submission, SubmissionResult


class SubmissionResultInline(admin.StackedInline):
    model = SubmissionResult
    can_delete = False


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'problem', 'language', 'status', 'created_at')
    list_filter = ('status', 'language', 'problem__difficulty', 'created_at')
    search_fields = ('user__username', 'problem__title')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    inlines = [SubmissionResultInline]
    
    fieldsets = (
        ('Submission Info', {
            'fields': ('user', 'problem', 'language', 'status')
        }),
        ('Code', {
            'fields': ('code',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at')
        }),
    )