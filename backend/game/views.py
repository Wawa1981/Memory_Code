from django.shortcuts import render

from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import GameScore, Player
from .serializers import GameScoreSerializer, PlayerRegistrationSerializer


class ScoreViewSet(viewsets.ModelViewSet):
    queryset = GameScore.objects.all().order_by('time_seconds', 'mistakes')
    serializer_class = GameScoreSerializer


class PlayerRegistrationView(generics.CreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerRegistrationSerializer
    permission_classes = [AllowAny]


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
        })