from django.contrib import admin
from .models import Problem, Tag, UserProblemProgress, TestCase


class TestCaseInline(admin.TabularInline):
    model = TestCase
    extra = 1


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty', 'created_at')
    list_filter = ('difficulty', 'created_at', 'tags')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    ordering = ('id',)
    inlines = [TestCaseInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'difficulty', 'description', 'tags')
        }),
        ('Problem Details', {
            'fields': ('examples', 'constraints', 'starter_code')
        }),
    )


@admin.register(UserProblemProgress)
class UserProblemProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'problem', 'solved', 'attempts', 'first_solved_at')
    list_filter = ('solved', 'problem__difficulty', 'first_solved_at')
    search_fields = ('user__username', 'problem__title')
    ordering = ('-updated_at',)