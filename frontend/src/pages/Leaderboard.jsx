import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Timer, Target, TrendingUp, Crown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MOCK_LEADERBOARD = [
  { rank: 1, username: 'CodeMaster42', avatar: '🧙', level: 28, bestTime: 45, gamesWon: 342, accuracy: 94 },
  { rank: 2, username: 'PythonQueen', avatar: '👑', level: 25, bestTime: 52, gamesWon: 298, accuracy: 91 },
  { rank: 3, username: 'RegexNinja', avatar: '🥷', level: 23, bestTime: 55, gamesWon: 275, accuracy: 89 },
  { rank: 4, username: 'AlgoWizard', avatar: '🧠', level: 21, bestTime: 58, gamesWon: 250, accuracy: 87 },
  { rank: 5, username: 'ByteRunner', avatar: '🏃', level: 20, bestTime: 61, gamesWon: 230, accuracy: 85 },
  { rank: 6, username: 'StackOverflow', avatar: '📚', level: 19, bestTime: 63, gamesWon: 215, accuracy: 84 },
  { rank: 7, username: 'LoopMaster', avatar: '🔄', level: 18, bestTime: 67, gamesWon: 198, accuracy: 82 },
  { rank: 8, username: 'DebugKing', avatar: '🐛', level: 17, bestTime: 70, gamesWon: 180, accuracy: 80 },
  { rank: 9, username: 'ClassCoder', avatar: '💻', level: 16, bestTime: 72, gamesWon: 165, accuracy: 78 },
  { rank: 10, username: 'DataDragon', avatar: '🐉', level: 15, bestTime: 75, gamesWon: 150, accuracy: 76 },
];

const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];
const rankBgs = ['bg-yellow-400/10 border-yellow-400/20', 'bg-gray-300/10 border-gray-300/20', 'bg-amber-600/10 border-amber-600/20'];

export default function Leaderboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Classement</h1>
            <p className="text-sm text-muted-foreground">Les meilleurs joueurs de MemCode</p>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-end justify-center gap-3 mb-8 pt-8"
      >
        {[1, 0, 2].map((idx) => {
          const player = MOCK_LEADERBOARD[idx];
          const heights = ['h-32', 'h-24', 'h-20'];
          const sizes = ['text-4xl', 'text-3xl', 'text-3xl'];
          return (
            <div key={player.rank} className="text-center flex-1 max-w-[140px]">
              <span className={`${sizes[idx]} block mb-2`}>{player.avatar}</span>
              <p className={`text-sm font-bold ${rankColors[idx]}`}>{player.username}</p>
              <p className="text-xs text-muted-foreground">Niv. {player.level}</p>
              <div className={`${heights[idx]} rounded-t-xl mt-2 border-t border-x ${rankBgs[idx]} flex items-center justify-center`}>
                <div className="text-center">
                  {idx === 0 && <Crown className="w-5 h-5 text-yellow-400 mx-auto mb-1" />}
                  <span className={`text-2xl font-bold ${rankColors[idx]}`}>#{player.rank}</span>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      <Tabs defaultValue="global">
        <TabsList className="bg-muted mb-4">
          <TabsTrigger value="global">Mondial</TabsTrigger>
          <TabsTrigger value="speed">Vitesse</TabsTrigger>
          <TabsTrigger value="accuracy">Précision</TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <LeaderboardList players={MOCK_LEADERBOARD} metric="gamesWon" metricLabel="Victoires" metricIcon={Trophy} />
        </TabsContent>
        <TabsContent value="speed">
          <LeaderboardList players={[...MOCK_LEADERBOARD].sort((a,b) => a.bestTime - b.bestTime)} metric="bestTime" metricLabel="Meilleur temps" metricIcon={Timer} suffix="s" />
        </TabsContent>
        <TabsContent value="accuracy">
          <LeaderboardList players={[...MOCK_LEADERBOARD].sort((a,b) => b.accuracy - a.accuracy)} metric="accuracy" metricLabel="Précision" metricIcon={Target} suffix="%" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LeaderboardList({ players, metric, metricLabel, metricIcon: MetricIcon, suffix = '' }) {
  return (
    <div className="space-y-2">
      {players.map((player, idx) => (
        <motion.div
          key={player.username}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.03 }}
          className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
            idx < 3 ? rankBgs[idx] : 'border-border bg-[hsl(230,25%,10%)]'
          }`}
        >
          <span className={`w-8 text-center font-bold font-mono ${idx < 3 ? rankColors[idx] : 'text-muted-foreground'}`}>
            #{idx + 1}
          </span>
          <span className="text-xl">{player.avatar}</span>
          <div className="flex-1">
            <p className="font-medium text-sm">{player.username}</p>
            <p className="text-[10px] text-muted-foreground">Niveau {player.level}</p>
          </div>
          <div className="text-right flex items-center gap-1.5">
            <MetricIcon className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono font-bold text-sm">{player[metric]}{suffix}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}