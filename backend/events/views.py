from rest_framework import status
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from django_filters import rest_framework as filters

from events.models import Event
from events.serializers import EventSerializer
from users.models import User


class CurrentDateEventFilter(filters.FilterSet):
    class Meta:
        model = Event
        fields = {
            'start': ['lte'],
            'finish': ['gte'],
        }


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    lookup_field = 'id'
    permission_classes = [BasePermission]
    action_permissions = {
        IsAuthenticated: ['create', 'retrieve', 'list', 'update', 'partial_update', 'destroy'],
    }
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = CurrentDateEventFilter

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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        instance.participants.remove(request.user)

        if instance.created_by == request.user:
            self.perform_destroy(instance)

        return Response(status=status.HTTP_204_NO_CONTENT)


class SharedEventViewSet(UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = EventSerializer
    lookup_field = 'id'
    permission_classes = [BasePermission]
    action_permissions = {
        IsAuthenticated: ['retrieve', 'partial_update'],
    }

    def get_queryset(self):
        return Event.objects.filter(is_shared=True)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        print(request.data.get('participants'))
        request.data.get('participants').append(str(request.user.id))
        return self.update(request, *args, **kwargs)
