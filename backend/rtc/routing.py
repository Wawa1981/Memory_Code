from django.urls import re_path
from .consumers import RTCConsumer

websocket_urlpatterns = [
    re_path(r"ws/rtc/(?P<room_name>\w+)/$", RTCConsumer.as_asgi()),
]