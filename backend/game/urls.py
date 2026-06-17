from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScoreViewSet, PlayerRegistrationView, MeView


router = DefaultRouter()
router.register(r'scores', ScoreViewSet)


urlpatterns = [
    path('register/', PlayerRegistrationView.as_view(), name='player-register'),
    path('me/', MeView.as_view(), name='me'),
    path('', include(router.urls)),
]