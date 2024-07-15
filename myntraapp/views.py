from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def trending(request):
    return render(request, 'trending.html')

def favourite_view(request):
    return render(request, 'favourite.html')

def moodboard(request):
    return render(request, 'moodboard.html')

def saved_moodboard(request):
    return render(request, 'saved_moodboard.html')