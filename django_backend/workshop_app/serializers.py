from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Workshop, WorkshopType, Profile, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

class WorkshopTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopType
        fields = '__all__'

class WorkshopSerializer(serializers.ModelSerializer):
    workshop_type = WorkshopTypeSerializer(read_only=True)
    coordinator = UserSerializer(read_only=True)
    instructor = UserSerializer(read_only=True)
    
    class Meta:
        model = Workshop
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
