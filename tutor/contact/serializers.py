import random
import string
from rest_framework import serializers
from django.contrib.auth import get_user_model
from contact.models import ChatMessage, ClassRequest
from users.serializers import UserSerializer

User = get_user_model()

class GetClassRequestSerializer(serializers.ModelSerializer):
    student = serializers.SerializerMethodField()
    tutor = serializers.SerializerMethodField()

    class Meta:
        model = ClassRequest
        fields = '__all__'

    def get_student(self, obj):            
        user = User.objects.get(email=obj.student)   
        serializer = UserSerializer(user)
        return serializer.data

    def get_tutor(self, obj):
        user = User.objects.get(email=obj.tutor)   
        serializer = UserSerializer(user)
        return serializer.data


class SetClassRequestSerializer(serializers.ModelSerializer):

    student = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )

    tutor = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )

    class Meta:
        model = ClassRequest
        fields = ['student', 'tutor']

    def create(self, validated_data):
        try:
            query = ClassRequest.objects.get(student=validated_data['student'], tutor=validated_data['tutor'])
        except Exception as e:
            query = None
        if query == None:
            classCode = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
            classRequest = ClassRequest(student=validated_data['student'], tutor=validated_data['tutor'], classCode=classCode)
            classRequest.save()
            return classRequest
        else:
            return query

class GetMessageSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = '__all__'

    def get_user(self, obj):
        
        user = User.objects.get(email=obj.user)
        serializer = UserSerializer(user)
        return serializer.data

class SetMessageSerializer(serializers.ModelSerializer):

    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )

    class Meta:
        model = ChatMessage
        fields = ['classCode', 'user', 'message']