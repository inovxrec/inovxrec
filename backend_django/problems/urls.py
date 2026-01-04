from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProblemListView.as_view(), name='problem_list'),
    path('tags/', views.problem_tags, name='problem_tags'),
    path('stats/', views.problem_stats, name='problem_stats'),
    path('progress/', views.user_progress, name='user_progress'),
    path('<slug:slug>/', views.ProblemDetailView.as_view(), name='problem_detail'),
]