import apiClient from './client';

export const authAPI = {
  register: (data) => apiClient.post('/register/', data),

  login: (username, password) =>
    apiClient.post('/token/', {
      username,
      password,
    }),

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  setToken: (token) => {
    localStorage.setItem('access_token', token);
  },

  loginWithProvider: (provider, redirectTo = "/") => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    window.location.href =
      `${apiUrl}/auth/${provider}?redirect=${encodeURIComponent(redirectTo)}`;
  }
};