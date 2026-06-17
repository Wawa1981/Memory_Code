import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const token = localStorage.getItem('access_token');

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setAuthError(null);
        return;
      }

      const response = await authAPI.getMe();
      setUser(response.data);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
      setUser(null);
      setAuthError(err.response?.data || { type: 'unauthorized' });
      authAPI.logout();
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  const login = async (username, password) => {
    const response = await authAPI.login(username, password);
    const data = response.data;

    if (data.access) {
      localStorage.setItem('access_token', data.access);
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }

      const meResponse = await authAPI.getMe();
      setUser(meResponse.data);
      setIsAuthenticated(true);
      setAuthError(null);
    }

    return data;
  };

  const register = async (userData) => {
    return await authAPI.register(userData);
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(false);
    setAuthError(null);
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        authChecked,
        authError,
        checkUserAuth,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};