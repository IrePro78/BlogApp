from .serializers import UserSerialaizer
from rest_framework.response import Response
from rest_framework.views import APIView


class UserView(APIView):

    def get(self, request):
        serialaizer = UserSerialaizer(request.user)
        return Response(serialaizer.data)
