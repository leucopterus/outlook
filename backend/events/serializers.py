from rest_framework import serializers

from events.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'start', 'finish', 'created_by',
                  'participants', 'regularity', 'is_shared']
        extra_kwargs = {
            'id': {'read_only': True},
        }


class ShortEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'start', 'finish']
        extra_kwargs = {
            'id': {'read_only': True}
        }
