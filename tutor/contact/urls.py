from django.urls import path
from . import views

urlpatterns = [
    path('getclassrequest', views.GetClassRequest.as_view()),
    path('setclassrequest', views.RegisterClassRequest.as_view()),
    path('getchatmessage', views.GetChatMessages.as_view()),
    path('setchatmessage', views.RegisterChatMessage.as_view()),
]
