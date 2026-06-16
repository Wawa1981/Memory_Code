from django.db import models
from django.contrib.auth.models import AbstractUser 

# 1. Le modèle Utilisateur (Le Joueur avec son Wallet de CodeCoins)
class Player(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    total_score = models.IntegerField(default=0)
    games_played = models.IntegerField(default=0)
    is_premium = models.BooleanField(default=False)
    wallet_balance = models.IntegerField(default=0, help_text="Solde en CodeCoins")

    def __str__(self):
        return self.username

# 2. Le modèle de Score (L'historique des parties)
class GameScore(models.Model):
    LEVEL_CHOICES = [
        ('EASY', 'Initié (8 paires)'),
        ('MEDIUM', 'Pirate (16 paires)'),
        ('HARD', 'Neural (32 paires)'),
        ('HARDCORE', 'Hardcore Regex (50 paires)'),
    ]

    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='scores')
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES)
    time_seconds = models.IntegerField(help_text="Temps en secondes pour finir")
    mistakes = models.IntegerField(default=0, help_text="Nombre d'erreurs")
    stars_earned = models.IntegerField(default=0, help_text="Étoiles (1 à 3)")
    date_played = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['time_seconds', 'mistakes']

    def __str__(self):
        return f"{self.player.username} - {self.level}"

# 3. La table des Transactions financières (Historique du Wallet)
class WalletTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('DEPOSIT', 'Dépôt via Stripe'),
        ('ENTRY_FEE', 'Inscription Tournoi'),
        ('REWARD', 'Gain de Compétition'),
    ]

    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='wallet_history')
    amount = models.IntegerField(help_text="Positif pour crédit, négatif pour débit")
    transaction_type = models.CharField(max_length=15, choices=TRANSACTION_TYPES)
    description = models.CharField(max_length=255, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player.username} | {self.transaction_type} | {self.amount} Coins"

