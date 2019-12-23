# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.mixins import (CreateModelMixin,
                                   UpdateModelMixin,
                                   RetrieveModelMixin,
                                   ListModelMixin)
from rest_framework.viewsets import GenericViewSet

from users.models import User
from users.serializers import UserSerializer


class UserViewSet(UpdateModelMixin,
                  RetrieveModelMixin, ListModelMixin,
                  GenericViewSet):

    serializer_class = UserSerializer
    lookup_field = 'username'

    def get_queryset(self):
        # return User.objects.all() if self.request.user.is_authenticated else User.objects.all()[:0]
        return User.objects.all()
