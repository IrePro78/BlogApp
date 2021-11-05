# from django.contrib.auth.models import User
# from rest_framework import viewsets
# from .serializers import ArticleSerializer, UserSerialaizer
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
#
#
#
#
# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     permission_classes = [IsAuthenticated]
#     authentication_classes = (TokenAuthentication,)
#
#
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerialaizer
#
