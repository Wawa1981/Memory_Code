import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoogleIcon from '@/components/GoogleIcon';

export default function GameLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ====================== GOOGLE LOGIN ======================
  const handleGoogle = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    window.location.href = `${apiUrl}/accounts/google/login/`;
  };

  // ====================== EMAIL LOGIN ======================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // await authAPI.auth.loginViaEmailPassword(loginData.email, loginData.password);
      // Pour l'instant simulation
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 800);
    } catch (err) {
      setError(err.message || "Email ou mot de passe invalide");
      setIsLoading(false);
    }
  };

  // ====================== EMAIL REGISTER ======================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    try {
      // await authAPI.auth.register(registerData);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 800);
    } catch (err) {
      setError(err.message || "Échec de l'inscription");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[hsl(187,92%,55%,0.03)] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[hsl(270,60%,55%,0.03)] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] bg-clip-text text-transparent">MemCode</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Apprends le code en jouant</p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl bg-[hsl(230,25%,9%)] border border-border p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <Tabs defaultValue="login">
            <TabsList className="w-full bg-muted mb-6">
              <TabsTrigger value="login" className="flex-1">
                <LogIn className="w-3.5 h-3.5 mr-1.5" />
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                Inscription
              </TabsTrigger>
            </TabsList>

            {/* ====================== LOGIN TAB ====================== */}
            <TabsContent value="login" className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={handleGoogle}
              >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Continuer avec Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[hsl(230,25%,9%)] px-3 text-muted-foreground">ou</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10 bg-[hsl(230,25%,12%)] border-border"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    value={loginData.password}
                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 pr-10 bg-[hsl(230,25%,12%)] border-border"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-[hsl(187,92%,55%)] to-[hsl(200,80%,40%)] text-white hover:opacity-90 font-semibold"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Se connecter <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* ====================== REGISTER TAB ====================== */}
            <TabsContent value="register" className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={handleGoogle}
              >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Continuer avec Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[hsl(230,25%,9%)] px-3 text-muted-foreground">ou</span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Nom d'utilisateur"
                    value={registerData.username}
                    onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                    className="pl-10 bg-[hsl(230,25%,12%)] border-border"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                    className="pl-10 bg-[hsl(230,25%,12%)] border-border"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    value={registerData.password}
                    onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                    className="pl-10 bg-[hsl(230,25%,12%)] border-border"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirmer le mot de passe"
                    value={registerData.confirmPassword}
                    onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="pl-10 bg-[hsl(230,25%,12%)] border-border"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-[hsl(270,60%,55%)] to-[hsl(290,50%,40%)] text-white hover:opacity-90 font-semibold"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Créer mon compte <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          En continuant, vous acceptez les conditions d'utilisation
        </p>
      </motion.div>
    </div>
  );
}