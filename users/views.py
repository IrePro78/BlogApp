from rest_framework.decorators import api_view

from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class UserView(APIView):

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    # @api_view(['POST'])
    # def delete_user(request, user_id):
    #     # user = Team.objects.filter(members__in=[request.user]).first()
    #
    #     client = team.clients.filter(pk=user_id)
    #     client.delete()
    #
    #     return Response({'message': 'The client was deleted'})