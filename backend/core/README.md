# 🧠 M3M0RY // C0D3 - Backend Serveur

M3M0RY // C0D3 est une plateforme multijoueur éducative et compétitive visant à enseigner la programmation (opérateurs, regex, architectures) via un jeu de mémoire en temps réel, avec une interface holographique cyberpunk.

## 🚀 Fonctionnalités Principales
* **Matchmaking Temps Réel** : Affrontements synchronisés via WebSockets (moins de 50ms de latence).
* **Système Anti-Triche** : Validation des scores et des chronomètres 100% côté serveur.
* **Économie In-Game (Wallet)** : Achat de *CodeCoins* via Stripe et paiements d'inscriptions aux tournois sans frictions.
* **Tournois Automatisés** : Gestion asynchrone des compétitions hebdomadaires.

## 🛠️ Stack Technique
* **Langage :** Python 3.10+
* **Framework :** Django 4.x / Django REST Framework
* **Base de données :** PostgreSQL
* **Temps Réel :** Django Channels, Redis, WebSockets
* **Tâches d'arrière-plan :** Celery
* **Paiements :** Stripe API
* **Authentification :** JWT (JSON Web Tokens)

## ⚙️ Installation et Lancement (Pour les Développeurs)

1. **Cloner le projet et configurer l'environnement :**
   ```bash
   git clone [https://github.com/TonPseudo/memory-code-backend.git](https://github.com/TonPseudo/memory-code-backend.git)
   cd memory-code-backend
   python -m venv venv
   source venv/bin/activate # ou venv\Scripts\activate sous Windows
   pip install -r requirements.txt

