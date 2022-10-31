# from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from . import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('user/', include('users.urls')),
    path('api-token-auth', views.obtain_auth_token),
    path('api-reset-password/', include('django_rest_passwordreset.urls')),
    path('contact/', include('contact.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

