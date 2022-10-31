from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
import django.contrib.auth.password_validation as validators
from django.core import exceptions

from users.models import Student, Tutor

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'is_linked',
                  'email', 'types', 'is_active', 'avatar', 'mobile', 'address']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    types = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('password',
                  'email', 'first_name', 'last_name', 'types', 'mobile', 'address')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'types': {'required': True},
            'mobile': {'required': True},
            'address': {'required': True},
        }

    def validate(self, attrs):
        
        password = attrs['password']
        user = User(**attrs)
        errors = dict() 
        try:
            # validate the password and catch the exception
            validators.validate_password(password=password, user=user)
        
        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        
        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        
        user = User.objects.create(
            email=validated_data['email'],
            types=validated_data['types'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            mobile=validated_data['mobile'],
            address=validated_data['address'],
        )
            
        user.set_password(validated_data['password'])
        user.save()

        return user


class StudentSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )
    
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data['user']
        if not user.is_linked:
            user.is_linked = True            
            student = Student(user=validated_data['user'], classes=validated_data['classes'])
            student.save()
            user.save()
            return student


class TutorSerializer(serializers.ModelSerializer):

    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset=User.objects.all()
    )

    class Meta:
        model = Tutor
        fields = ['user', 'startTime', 'endTime', 'classes', 'degree', 'subjects', 'startRate', 'endRate']
        

    def to_representation(self, instance):
        representation = dict()
        representation['id'] = instance.id
        representation['startTime'] = instance.startTime
        representation['endTime'] = instance.endTime
        representation['endRate'] = instance.endRate
        representation['startRate'] = instance.startRate
        representation['classes'] = instance.classes
        representation['degree'] = instance.degree        
        representation['subjects'] = instance.subjects
        representation['first_name'] = instance.user.first_name
        representation['avatar'] = str(instance.user.avatar)
        representation['email'] = instance.user.email
        representation['mobile'] = instance.user.mobile
        representation['address'] = instance.user.address
        representation['rating'] = instance.rating
        
        return representation

    def create(self, validated_data):
        user = validated_data['user']
        if not user.is_linked:
            user.is_linked = True            
            tutor = Tutor(user=validated_data['user'], classes=validated_data['classes'], startTime=validated_data['startTime'], endTime=validated_data['endTime'], degree=validated_data['degree'], subjects=validated_data['subjects'], startRate=validated_data['startRate'], endRate=validated_data['endRate'])
            tutor.save()
            user.save()
            return tutor


