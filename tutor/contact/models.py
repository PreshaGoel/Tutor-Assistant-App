from django.db import models
from users.models import Student, Tutor
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
# class Feedbacks(models.Model):
#     student = models.ForeignKey(User, related_name= 'Student', on_delete=models.CASCADE)
#     tutor = models.ForeignKey(User, related_name= 'Student', on_delete=models.CASCADE)
#     message = models.TextField()
#     rating = models.CharField(max_length=5)
#     on_date = models.DateTimeField(auto_now_add=True)


class ClassRequest(models.Model):
    student = models.ForeignKey(User, verbose_name='Student', related_name='Student', on_delete=models.CASCADE)
    tutor = models.ForeignKey(User, verbose_name='Tutor', related_name='Tutors', on_delete=models.CASCADE)
    on_date = models.DateTimeField(auto_now_add=True)
    classCode = models.CharField(max_length=255, blank=False)


class ChatMessage(models.Model):
    classCode = models.CharField(max_length=255, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    on_date = models.DateTimeField(auto_now_add=True)
    on_time = models.TimeField(auto_now_add=True)