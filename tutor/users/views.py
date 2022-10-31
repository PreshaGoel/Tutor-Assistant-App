from django.dispatch import receiver
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from users.models import Student, Tutor
from .serializers import StudentSerializer, TutorSerializer, UserSerializer, RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from django_rest_passwordreset.signals import reset_password_token_created

User = get_user_model()

# Create your views here.
class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.GET['email'])           
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.GET['email'])
            user.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def put(self, request, *args, **kwargs):
        try:
            print(request.data)
            user = User.objects.get(email=request.data['email'])
            user.avatar = request.FILES['avatar']
            user.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterStudentAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    serializer_class = StudentSerializer

    def get(self, request, *args, **kwargs):
        if 'email' in request.GET:
            user = User.objects.get(email=request.GET['email'])
            tutor = Student.objects.get(user=user)
            serializer = StudentSerializer(tutor)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        if 'filter' in request.GET:
            print()

    def put(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data['user'])
            student = Student.objects.get(user=user)
            student.classes = request.data['classes']
            student.save()
            serializer = StudentSerializer(student)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterTutorAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    serializer_class = TutorSerializer

    def get(self, request, *args, **kwargs):
        try:
            if 'email' in request.GET:
                user = User.objects.get(email=request.GET['email'])
                tutor = Tutor.objects.get(user=user)                
                serializer = TutorSerializer(tutor)
                return Response(status=status.HTTP_200_OK, data=serializer.data)
            if 'filter' in request.GET:
                if request.GET['filter'] == '10':
                    query = Tutor.objects.all().order_by('rating')                    

                    if len(query) > 10:
                        query = query[:10]
                    serializer = TutorSerializer(query, many=True)
                    return Response(status=status.HTTP_200_OK, data=serializer.data)

                if request.GET['filter'] == 'filter':           
                    subject = request.GET['subject']         
                    query = Tutor.objects.filter(subjects__contains=subject)                    
                    serializer = TutorSerializer(query, many=True)
                    return Response(status=status.HTTP_200_OK, data=serializer.data)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data['user'])
            tutor = Tutor.objects.get(user=user)
            tutor.classes = request.data['classes']
            tutor.startTime = request.data['startTime']
            tutor.endTime = request.data['endTime']
            tutor.degree = request.data['degree']
            tutor.subjects = request.data['subjects']
            tutor.startRate = request.data['startRate']
            tutor.endRate = request.data['endRate']
            tutor.save()
            serializer = TutorSerializer(tutor)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


@receiver(reset_password_token_created)
def password_reset_token(sender, instance, reset_password_token, *args, **kwargs):
    message = """
        Here is your reset password token
        Token: {0}
        This is valid for 24 hours only.

        Thank you
        TAP
    """.format(reset_password_token.key)

    send_mail('TAP: Reset Password', message, 'tap@gmail.com', [reset_password_token.user,], fail_silently=False)