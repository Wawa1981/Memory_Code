import React from 'react';
import { Timer, Target, XCircle, Zap, Trophy } from 'lucide-react';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function GameHUD({ timer, pairs, matched, errors, totalPairs, opponent }) {
  const progress = totalPairs > 0 ? (matched / totalPairs) * 100 : 0;

  return (
    <div className="w-full rounded-2xl bg-[hsl(230,25%,9%)] border border-border p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Timer */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[hsl(187,92%,55%,0.1)] flex items-center justify-center">
            <Timer className="w-4 h-4 text-[hsl(187,92%,55%)]" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Temps</p>
            <p className="text-lg font-mono font-bold text-foreground">{formatTime(timer)}</p>
          </div>
        </div>

        {/* Pairs Found */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Paires</p>
            <p className="text-lg font-mono font-bold text-green-400">{matched}/{totalPairs}</p>
          </div>
        </div>

        {/* Errors */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Erreurs</p>
            <p className="text-lg font-mono font-bold text-red-400">{errors}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex-1 min-w-[120px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Progression</span>
            <span className="text-xs font-mono text-[hsl(187,92%,55%)]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Opponent (for duels) */}
        {opponent && (
          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <div className="w-9 h-9 rounded-lg bg-[hsl(270,60%,55%,0.1)] flex items-center justify-center">
              <Trophy className="w-4 h-4 text-[hsl(270,60%,65%)]" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Adversaire</p>
              <p className="text-sm font-medium text-[hsl(270,60%,65%)]">{opponent.username}</p>
              <p className="text-xs text-muted-foreground">{opponent.matched}/{totalPairs} paires</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}