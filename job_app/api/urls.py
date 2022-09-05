from django.urls import path
from . import views

urlpatterns = [
    path('', views.getList, name="get-list"),
    path('details/<int:pk>/', views.getDetails, name="get-details"),
    path('add/', views.newCandidate, name="new-candidate"),
    path('resume/<int:pk>', views.getResume, name="get-resume"),
    path('delete/<int:pk>/', views.deleteCandidate, name="delete-candidate"),
    path('status-update/<int:pk>', views.updateStatus, name="status-update"),
]