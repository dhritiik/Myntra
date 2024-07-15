from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),  # Assuming you have an index view
    path('trending/', views.trending, name='trending'),  # Assuming you have a trending view
    path('favourite/', views.favourite_view, name='favourite'),  # Assuming you have a favourite view
    path('moodboard/', views.moodboard, name='moodboard'),  # Assuming you have a moodboard view
    path('saved/', views.saved_moodboard, name='saved'),  # New saved mood board view
]
