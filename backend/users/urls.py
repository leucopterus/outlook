from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from users import views

app_name = 'users'

user_list = views.UserViewSet.as_view({
    'get': 'list',
})

user_detail = views.UserViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'put': 'update',
})


urlpatterns = format_suffix_patterns([
    path('', user_list),
    path('<str:username>/', user_detail),
])
