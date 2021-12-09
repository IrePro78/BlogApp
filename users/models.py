from django.contrib.auth.models import AbstractUser

class UserModel(AbstractUser):

    REQUIRED_FIELDS = ['date_joined', 'email']
