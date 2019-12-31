from rest_framework.mixins import (
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin)
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated, BasePermission

from users.models import User
from users.serializers import UserSerializer


class UserViewSet(UpdateModelMixin,
                  RetrieveModelMixin, ListModelMixin,
                  GenericViewSet):

    serializer_class = UserSerializer
    lookup_field = 'username'
    permission_classes = [BasePermission]
    action_permissions = {
        IsAuthenticated: ['retrieve', 'list', 'update', 'partial_update'],
    }

    def get_queryset(self):
        return User.objects.all() if self.request.user.is_authenticated else User.objects.none()
        # return User.objects.all()
