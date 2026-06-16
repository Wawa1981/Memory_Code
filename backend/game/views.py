from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .models import GameScore, Player
from .serializers import GameScoreSerializer, PlayerRegistrationSerializer

class ScoreViewSet(viewsets.ModelViewSet):
    # On récupère tous les scores et on les trie du plus rapide au plus lent
    queryset = GameScore.objects.all().order_by('time_seconds', 'mistakes')
    serializer_class = GameScoreSerializer

class PlayerRegistrationView(generics.CreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerRegistrationSerializer
    permission_classes = [AllowAny]

