// API Service - Connects to Django backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setTokens(access, refresh) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        headers.Authorization = `Bearer ${this.getToken()}`;
        const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });
        if (!retryResponse.ok) throw new Error(`API Error: ${retryResponse.status}`);
        return retryResponse.json();
      } else {
        this.clearTokens();
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  async refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return false;
    try {
      const res = await fetch(`${this.baseUrl}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      localStorage.setItem('access_token', data.access);
      return true;
    } catch {
      return false;
    }
  }

  // Auth
  async register(data) {
    return this.request('/auth/register/', { method: 'POST', body: JSON.stringify(data) });
  }

  async login(email, password) {
    const data = await this.request('/auth/token/', { method: 'POST', body: JSON.stringify({ email, password }) });
    this.setTokens(data.access, data.refresh);
    return data;
  }

  async getProfile() {
    return this.request('/players/me/');
  }

  async updateProfile(data) {
    return this.request('/players/me/', { method: 'PATCH', body: JSON.stringify(data) });
  }

  // Wallet
  async getWallet() {
    return this.request('/wallet/');
  }

  async createCheckoutSession(amount) {
    return this.request('/wallet/checkout/', { method: 'POST', body: JSON.stringify({ amount }) });
  }

  // Games
  async createSoloGame(difficulty) {
    return this.request('/games/solo/', { method: 'POST', body: JSON.stringify({ difficulty }) });
  }

  async getGameState(gameId) {
    return this.request(`/games/${gameId}/`);
  }

  async flipCard(gameId, cardIndex) {
    return this.request(`/games/${gameId}/flip/`, { method: 'POST', body: JSON.stringify({ card_index: cardIndex }) });
  }

  async submitValidation(gameId, answer) {
    return this.request(`/games/${gameId}/validate/`, { method: 'POST', body: JSON.stringify({ answer }) });
  }

  // Matchmaking
  async findDuel(entryFee) {
    return this.request('/matchmaking/duel/', { method: 'POST', body: JSON.stringify({ entry_fee: entryFee }) });
  }

  async joinTournament(tournamentId) {
    return this.request(`/tournaments/${tournamentId}/join/`, { method: 'POST' });
  }

  async getTournaments() {
    return this.request('/tournaments/');
  }

  // Leaderboard
  async getLeaderboard(type = 'global', page = 1) {
    return this.request(`/leaderboard/?type=${type}&page=${page}`);
  }

  // History
  async getGameHistory(page = 1) {
    return this.request(`/games/history/?page=${page}`);
  }

  // Shop
  async getShopItems() {
    return this.request('/shop/items/');
  }

  async purchaseItem(itemId) {
    return this.request(`/shop/purchase/${itemId}/`, { method: 'POST' });
  }

  logout() {
    this.clearTokens();
    window.location.href = '/login';
  }
}

export const api = new ApiService();
export default api;