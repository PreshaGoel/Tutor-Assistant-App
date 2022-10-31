import email
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model

from contact.models import ChatMessage, ClassRequest
from contact.serializers import GetClassRequestSerializer, GetMessageSerializer, SetClassRequestSerializer, SetMessageSerializer

User = get_user_model()

# Create your views here.
class GetClassRequest(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        try:
            user_id = request.GET['user_id']

            user = User.objects.get(email=user_id)
            
            if user.types == 'Student':                
                classRequests = ClassRequest.objects.filter(student=user)
            else:
                classRequests = ClassRequest.objects.filter(tutor=user)

            serializer = GetClassRequestSerializer(classRequests, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        classCode = request.GET['classCode']
        classRequest = ClassRequest.objects.get(classCode=classCode)
        classRequest.delete()

        return Response(status=status.HTTP_202_ACCEPTED)

class RegisterClassRequest(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = SetClassRequestSerializer

class GetChatMessages(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        classCode = request.GET['classCode']
        messages = ChatMessage.objects.filter(classCode=classCode)
        serializer = GetMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RegisterChatMessage(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = SetMessageSerializer