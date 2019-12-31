from rest_framework import status
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from events.models import Event
from events.serializers import EventSerializer
from users.models import User


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    lookup_field = 'id'
    permission_classes = [BasePermission]
    action_permissions = {
        IsAuthenticated: ['create', 'retrieve', 'list', 'partial_update'],
    }

    def get_queryset(self):
        return User.objects.get(id=self.request.user.id).subscriptions if self.request.user.is_authenticated else Event.objects.none()

    def create(self, request, *args, **kwargs):
        self.set_defaults(request)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def set_defaults(self, request):
        request.data['is_active'] = True
        request.data['created_by'] = request.user.id
        request.data['participants'] = [request.user.id]

    def perform_create(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        # if request.user != Event.objects.get(id=kwargs.get(id)):
        #     Response(status=status.HTTP_401_UNAUTHORIZED)
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
