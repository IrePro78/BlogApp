from django.contrib.auth.models import AbstractUser
from django.db import models

class UserModel(AbstractUser):
    telephone = models.CharField('telephone', max_length=20, blank=True, null=True)

    REQUIRED_FIELDS = ['is_staff', 'date_joined', 'password', 'telephone', 'email' ]
