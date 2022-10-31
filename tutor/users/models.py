from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.core.mail import send_mail

# Create your models here.


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, types, address, mobile, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        if not types:
            raise ValueError('The given types must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, types=types, address=address,
                          mobile=mobile, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


def setUserImage(instance, filename):
    return "media/{0}/{1}".format(instance.first_name, filename)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    types = models.CharField(_('User Type'), max_length=50)
    avatar = models.ImageField(upload_to=setUserImage, blank=True)
    mobile = models.CharField(
        _('mobile'), max_length=10, unique=True)
    address = models.TextField(_('address'))
    is_staff = models.BooleanField(_('is_staff'), default=True)
    is_linked = models.BooleanField(_('is_linked'), default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    classes = models.CharField(max_length=10, blank=False)

class Tutor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    startTime = models.TimeField()
    endTime = models.TimeField()
    rating = models.CharField(max_length=10, blank=True)
    degree = models.CharField(max_length=255, default='')
    subjects = models.TextField()
    classes = models.TextField()
    startRate = models.CharField(max_length=10)
    endRate = models.CharField(max_length=10)