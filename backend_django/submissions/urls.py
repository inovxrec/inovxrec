from django.urls import path
from . import views

urlpatterns = [
    path('', views.SubmissionListView.as_view(), name='submission_list'),
    path('<int:pk>/', views.SubmissionDetailView.as_view(), name='submission_detail'),
    path('run/', views.run_code, name='run_code'),
    path('submit/', views.submit_code, name='submit_code'),
]