from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Redirection vers le frontend React
def home(request):
    return redirect('http://localhost:5173/')   # Change 5173 si ton port React est différent

urlpatterns = [
    path('', home, name='home'),                    # ← Redirige vers React
    
    path('admin/', admin.site.urls),
    path('api/', include('game.urls')),
    
    # JWT (si tu en as encore besoin)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Allauth (Google + login classique)
    path('accounts/', include('allauth.urls')),
]