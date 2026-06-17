from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Player, GameScore

admin.site.register(Player, UserAdmin)
admin.site.register(GameScore)