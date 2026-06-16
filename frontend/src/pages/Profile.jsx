import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Gamepad2, Target, Timer, BarChart3, Award, Star } from 'lucide-react';
import { useGame } from '@/lib/GameContext';

export default function Profile() {
  const { playerStats, gameHistory, wallet } = useGame();
  const winRate = playerStats.gamesPlayed > 0
    ? Math.round((playerStats.gamesWon / playerStats.gamesPlayed) * 100)
    : 0;

  const xpForNext = (playerStats.level + 1) * 100;
  const xpProgress = playerStats.xp > 0 ? Math.min(100, (playerStats.xp / xpForNext) * 100) : 0;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Joueur</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-[hsl(187,92%,55%)] font-medium">Niveau {playerStats.level}</span>
              <div className="flex-1 max-w-[200px] h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] rounded-full transition-all"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{playerStats.xp}/{xpForNext} XP</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatBlock icon={Gamepad2} label="Parties jouées" value={playerStats.gamesPlayed} color="text-[hsl(187,92%,55%)]" delay={0.05} />
        <StatBlock icon={Trophy} label="Victoires" value={playerStats.gamesWon} color="text-green-400" delay={0.1} />
        <StatBlock icon={Target} label="Taux de victoire" value={`${winRate}%`} color="text-yellow-400" delay={0.15} />
        <StatBlock icon={Timer} label="Meilleur temps" value={playerStats.bestTime ? `${playerStats.bestTime}s` : '—'} color="text-[hsl(270,60%,65%)]" delay={0.2} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <StatBlock icon={Star} label="Paires trouvées" value={playerStats.totalPairsFound} color="text-amber-400" delay={0.25} />
        <StatBlock icon={Award} label="XP total" value={playerStats.xp} color="text-[hsl(270,60%,65%)]" delay={0.3} />
      </div>

      {/* Game History */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Historique des parties
        </h2>
        {gameHistory.length === 0 ? (
          <div className="p-8 rounded-xl bg-[hsl(230,25%,10%)] border border-border text-center">
            <Gamepad2 className="w-10 h-10 mx-auto text-muted-foreground mb-2 opacity-30" />
            <p className="text-sm text-muted-foreground">Aucune partie jouée</p>
          </div>
        ) : (
          <div className="space-y-2">
            {gameHistory.map((game, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(230,25%,10%)] border border-border">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  game.won ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  {game.won ? <Trophy className="w-4 h-4 text-green-400" /> : <Target className="w-4 h-4 text-red-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {game.mode === 'solo' ? 'Solo' : 'Duel'} • {game.difficulty}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {game.pairsFound}/{game.totalPairs} paires • {game.errors} erreurs • {game.time}s
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-[hsl(270,60%,65%)]">+{game.xpEarned} XP</p>
                  {game.tokensEarned > 0 && (
                    <p className="text-[10px] font-mono text-yellow-400">+{game.tokensEarned} 🪙</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function StatBlock({ icon: Icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-4 rounded-xl bg-[hsl(230,25%,10%)] border border-border"
    >
      <Icon className={`w-4 h-4 ${color} mb-2`} />
      <p className={`text-2xl font-bold font-mono ${color}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
    </motion.div>
  );
}