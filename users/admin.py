from django.contrib import admin
from .models import UserModel

# Register your models here.

admin.site.register(UserModel)

# class PostsAdmin(admin.ModelAdmin):
#     list_display ={
#         admin.site.register(UserModel)
#
#     }