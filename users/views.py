from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class UserView(APIView):

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
