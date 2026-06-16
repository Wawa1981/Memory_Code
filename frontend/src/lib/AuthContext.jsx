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

      // Tu peux ajouter un appel API pour vérifier le token si tu veux
      // Ex: const res = await authAPI.getCurrentUser();
      
      setIsAuthenticated(true);
      setUser({}); 
      setAuthError(null);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
      setUser(null);
      setAuthError(err.response?.data || { type: 'unauthorized' });
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    if (data.access) {
      localStorage.setItem('access_token', data.access);
      setIsAuthenticated(true);
      setUser(data.user || {});
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
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      authChecked,
      authError,
      checkUserAuth,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
