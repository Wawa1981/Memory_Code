from rest_framework import serializers
from .models import GameScore, Player


class GameScoreSerializer(serializers.ModelSerializer):
    # Ça permet d'afficher le pseudo du joueur au lieu de juste son numéro d'ID
    player_username = serializers.CharField(source='player.username', read_only=True)

    class Meta:
        model = GameScore
        fields = ['id', 'player_username', 'level', 'time_seconds', 'mistakes', 'stars_earned', 'date_played']


class PlayerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Player
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'username': {'required': False, 'allow_blank': True},
        }

    def create(self, validated_data):
        email = validated_data['email'].strip().lower()
        password = validated_data['password']
        username = email

        user = Player.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return user