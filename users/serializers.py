from rest_framework import serializers
from .models import UserModel


class UserSerialaizer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username']
