# Django Imports
from django.shortcuts import redirect
from django.urls import reverse
from django.conf import settings


def index(request):
    """Redirect root URL to the workshop app index."""
    redirect_url = reverse("workshop_app:index")
    return redirect(redirect_url)
