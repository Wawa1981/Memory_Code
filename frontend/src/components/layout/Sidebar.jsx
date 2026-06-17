import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Gamepad2,
  Swords,
  Trophy,
  ShoppingBag,
  User,
  LogOut,
  Wallet,
  History,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/lib/GameContext';
import { useAuth } from '@/lib/AuthContext';

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Accueil' },
  { path: '/solo', icon: Gamepad2, label: 'Mode Solo' },
  { path: '/duel', icon: Swords, label: 'Duels & Tournois' },
  { path: '/leaderboard', icon: Trophy, label: 'Classement' },
  { path: '/shop', icon: ShoppingBag, label: 'Boutique' },
  { path: '/history', icon: History, label: 'Historique' },
  { path: '/codex', icon: BookOpen, label: 'Codex' },
  { path: '/comm', icon: MessageCircle, label: 'Communication' },
  { path: '/profile', icon: User, label: 'Profil' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { wallet } = useGame();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[hsl(230,25%,7%)] border-r border-border z-40 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-white">M</span>
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-foreground leading-none">MemCode</h1>
              <p className="text-[9px] text-muted-foreground">Learn • Play • Win</p>
            </div>
          )}
        </div>
      </div>

      {!collapsed && isAuthenticated && user && (
        <div className="mx-3 mt-3 p-3 rounded-xl border border-[hsl(187,92%,55%,0.15)] bg-[hsl(230,25%,10%)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] flex items-center justify-center text-white font-bold">
              {(user.username || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Connecté en tant que</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {user.username || 'Utilisateur'}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {user.email || 'email non disponible'}
              </p>
            </div>
          </div>
        </div>
      )}

      {!collapsed && (
        <Link
          to="/shop"
          className="mx-3 mt-3 p-3 rounded-xl bg-gradient-to-r from-[hsl(187,92%,55%,0.08)] to-[hsl(270,60%,55%,0.08)] border border-[hsl(187,92%,55%,0.15)] hover:border-[hsl(187,92%,55%,0.3)] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-yellow-400" />
            <div>
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Portefeuille</p>
              <p className="text-sm font-bold text-yellow-400 font-mono">
                {wallet.balance.toLocaleString()} <span className="text-[10px] font-normal">jetons</span>
              </p>
            </div>
          </div>
        </Link>
      )}

      <nav className="flex-1 p-2 mt-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-[hsl(187,92%,55%,0.1)] text-[hsl(187,92%,55%)] border border-[hsl(187,92%,55%,0.15)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(230,25%,12%)]'
              }`}
            >
              <item.icon
                className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[hsl(187,92%,55%)]' : ''}`}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {isAuthenticated && (
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </Button>
        </div>
      )}

      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-full h-8"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </aside>
  );
}