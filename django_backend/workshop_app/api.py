from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes as perm
from rest_framework.response import Response
from .models import (
    Workshop, WorkshopType, Comment, Profile,
    department_choices, title as title_choices,
    states, source, position_choices,
)
from .serializers import WorkshopSerializer, WorkshopTypeSerializer, CommentSerializer, ProfileSerializer

class WorkshopTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkshopType.objects.all()
    serializer_class = WorkshopTypeSerializer
    permission_classes = [permissions.AllowAny]

class WorkshopViewSet(viewsets.ModelViewSet):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.AllowAny]

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]


@api_view(['GET'])
@perm([permissions.AllowAny])
def form_choices(request):
    """Return all form dropdown options used by Register and Profile pages."""
    return Response({
        'departments': [{'value': v, 'label': l} for v, l in department_choices],
        'titles': [{'value': v, 'label': l} for v, l in title_choices],
        'states': [{'value': v, 'label': l} for v, l in states if v],
        'sources': [{'value': v, 'label': l} for v, l in source],
        'positions': [{'value': v, 'label': l} for v, l in position_choices],
    })

