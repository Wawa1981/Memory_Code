from rest_framework import serializers
from .models import GameScore, Player


class GameScoreSerializer(serializers.ModelSerializer):
    # Ça permet d'afficher le pseudo du joueur au lieu de juste son numéro d'ID
    player_username = serializers.CharField(source='player.username', read_only=True)

    class Meta:
        model = GameScore
        fields = ['id', 'player_username', 'level', 'time_seconds', 'mistakes', 'stars_earned', 'date_played']


class PlayerRegistrationSerializer(serializers.ModelSerializer):
    # write_only=True garantit que le mot de passe ne sera jamais renvoyé pour être lu
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Player
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # On utilise create_user (et non create) pour que Django hache automatiquement le mot de passe
        user = Player.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user