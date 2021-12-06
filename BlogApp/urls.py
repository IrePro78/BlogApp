from django.contrib import admin
from django.urls import path, include, re_path
from main.views import Index

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.authtoken')),
    path('api/v1/', include('users.urls')),
    path('api/v1/', include('articles.urls')),

    re_path(r'^.*$', Index.as_view(), name="index"),
]
