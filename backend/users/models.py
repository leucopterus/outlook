import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


def get_image_path(instance, filename):
    """
    Get path for /static/profile_images/{instance_id}/{file_name}
    """
    return f'{instance.__class__.__name__}/{instance.id}/{filename}'


class User(AbstractUser):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to=get_image_path, blank=True, null=True)

    def __str__(self):
        return self.username
