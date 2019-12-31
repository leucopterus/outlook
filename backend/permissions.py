from rest_framework.permissions import BasePermission

from events.models import Event


class IsMember(BasePermission):
    """
    Allows access only to users which
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user in Event.objects.get(id=request.id))

# check last part Event.objects.get(id=request.id)
# is this part really necessary
