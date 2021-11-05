from django.db import models
from django.contrib.auth.models import AbstractUser



# Create your models here.

class UserModel(AbstractUser):
    pass
    # title = models.CharField(max_length=100)
    # description = models.TextField()
    #
    #
    # def __str__(self):
    #     return self.title