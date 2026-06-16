import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Timer, Target, XCircle, Star, ArrowLeft, RotateCcw, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function GameResults({ results, onPlayAgain, onGoHome }) {
  const { time, errors, totalPairs, pairsFound, xpEarned, tokensEarned, won, isDuel, opponent } = results;
  const accuracy = totalPairs > 0 ? Math.round((pairsFound / (pairsFound + errors)) * 100) : 0;

  const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="w-full max-w-lg bg-[hsl(230,25%,9%)] rounded-3xl border border-border overflow-hidden">
        {/* Header */}
        <div className={`p-8 text-center ${won ? 'bg-gradient-to-b from-green-500/10 to-transparent' : 'bg-gradient-to-b from-red-500/10 to-transparent'}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mb-4"
          >
            <Trophy className={`w-16 h-16 mx-auto ${won ? 'text-yellow-400' : 'text-muted-foreground'}`} />
          </motion.div>
          <h2 className="text-2xl font-bold mb-1">{won ? 'Victoire !' : 'Partie terminée'}</h2>
          {isDuel && opponent && (
            <p className="text-muted-foreground text-sm">vs {opponent.username}</p>
          )}

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-3">
            {[1, 2, 3].map(s => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 + s * 0.2 }}
              >
                <Star className={`w-8 h-8 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="px-8 pb-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <StatBox icon={Timer} label="Temps" value={formatTime(time)} color="text-[hsl(187,92%,55%)]" />
            <StatBox icon={Target} label="Paires" value={`${pairsFound}/${totalPairs}`} color="text-green-400" />
            <StatBox icon={XCircle} label="Erreurs" value={errors} color="text-red-400" />
            <StatBox icon={Star} label="Précision" value={`${accuracy}%`} color="text-yellow-400" />
          </div>

          {/* Rewards */}
          <div className="flex items-center justify-center gap-6 py-4 border-y border-border mb-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">XP gagné</p>
              <p className="text-xl font-bold text-[hsl(270,60%,65%)]">+{xpEarned}</p>
            </div>
            {tokensEarned > 0 && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Jetons gagnés</p>
                <div className="flex items-center gap-1">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <p className="text-xl font-bold text-yellow-400">+{tokensEarned}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-border" onClick={onGoHome}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Menu
            </Button>
            <Button
              className="flex-1 bg-[hsl(187,92%,55%)] text-[hsl(230,25%,7%)] hover:bg-[hsl(187,92%,45%)]"
              onClick={onPlayAgain}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Rejouer
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({ icon: Icon, label, value, color }) {
  return (
    <div className="p-3 rounded-xl bg-[hsl(230,25%,12%)] border border-border text-center">
      <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold font-mono ${color}`}>{value}</p>
    </div>
  );
}