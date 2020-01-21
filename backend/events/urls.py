from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from events import views

app_name = 'events'

event_list = views.EventViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

event_detail = views.EventViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'put': 'update',
    'delete': 'destroy',
})

shared_event_detail = views.SharedEventViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
})


urlpatterns = format_suffix_patterns([
    path('', event_list),
    path('<uuid:id>/', event_detail),
    path('shared/<uuid:id>/', shared_event_detail),
])
