import React from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Trophy, Target, Timer, Gamepad2, Swords, XCircle } from 'lucide-react';
import { useGame } from '@/lib/GameContext';

export default function History() {
  const { gameHistory } = useGame();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] flex items-center justify-center">
            <HistoryIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Historique</h1>
            <p className="text-sm text-muted-foreground">Toutes tes parties passées</p>
          </div>
        </div>
      </motion.div>

      {gameHistory.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-12 rounded-2xl bg-[hsl(230,25%,10%)] border border-border text-center"
        >
          <HistoryIcon className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-30" />
          <p className="text-muted-foreground">Aucune partie dans l'historique</p>
          <p className="text-xs text-muted-foreground mt-1">Lance une partie solo pour commencer !</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {gameHistory.map((game, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`p-4 rounded-xl border ${
                game.won
                  ? 'bg-green-500/5 border-green-500/15'
                  : 'bg-[hsl(230,25%,10%)] border-border'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  game.won ? 'bg-green-500/10' : 'bg-muted'
                }`}>
                  {game.mode === 'solo'
                    ? <Gamepad2 className={`w-5 h-5 ${game.won ? 'text-green-400' : 'text-muted-foreground'}`} />
                    : <Swords className={`w-5 h-5 ${game.won ? 'text-green-400' : 'text-muted-foreground'}`} />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{game.mode === 'solo' ? 'Partie Solo' : 'Duel 1v1'}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      game.won ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {game.won ? 'Victoire' : 'Défaite'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Target className="w-3 h-3" />{game.pairsFound}/{game.totalPairs}</span>
                    <span className="flex items-center gap-1"><XCircle className="w-3 h-3" />{game.errors} err.</span>
                    <span className="flex items-center gap-1"><Timer className="w-3 h-3" />{game.time}s</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-[hsl(270,60%,65%)]">+{game.xpEarned} XP</p>
                  {game.tokensEarned > 0 && (
                    <p className="text-[10px] font-mono text-yellow-400">+{game.tokensEarned} 🪙</p>
                  )}
                  <p className="text-[9px] text-muted-foreground mt-1">
                    {new Date(game.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}