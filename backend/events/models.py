import uuid

from django.db import models

from users.models import User


class Event(models.Model):
    ORIGINAL = "N"
    DAILY = "D"
    WEEKLY = "W"
    MONTHLY = "M"
    ANNUAL = "Y"
    EVENT_REPETITION_CHOICES = [
        (ORIGINAL, 'original'),
        (DAILY, 'daily'),
        (WEEKLY, 'weekly'),
        (MONTHLY, 'monthly'),
        (ANNUAL, 'annual')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    finish = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='hosted')
    participants = models.ManyToManyField(User, related_name='subscriptions')
    regularity = models.CharField(max_length=1, choices=EVENT_REPETITION_CHOICES, default=ORIGINAL)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
