from rest_framework import serializers
from .models import UserModel


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField()

    class Meta:
        model = UserModel
        fields = ['name']
