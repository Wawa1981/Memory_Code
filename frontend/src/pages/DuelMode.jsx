import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swords, Users, Search, Coins, Trophy, ArrowRight, Loader2, Video, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGame } from '@/lib/GameContext';
import wsService from '@/lib/websocket';

const ENTRY_FEES = [
  { amount: 50, reward: 90, label: 'Bronze' },
  { amount: 100, reward: 180, label: 'Argent' },
  { amount: 250, reward: 450, label: 'Or' },
  { amount: 500, reward: 900, label: 'Diamant' },
];

const MOCK_TOURNAMENTS = [
  { id: 1, name: 'Tournoi Python Weekly', players: '12/16', entryFee: 100, prize: 1000, startsIn: '2h 30min', status: 'open' },
  { id: 2, name: 'Regex Masters', players: '8/8', entryFee: 200, prize: 1200, startsIn: 'En cours', status: 'in_progress' },
  { id: 3, name: 'JS Challenge', players: '4/16', entryFee: 50, prize: 500, startsIn: '5h 15min', status: 'open' },
];

export default function DuelMode() {
  const navigate = useNavigate();
  const { wallet, updateWallet } = useGame();
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    if (!isSearching) return;
    const interval = setInterval(() => setSearchTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isSearching]);

  const startMatchmaking = useCallback((fee) => {
    if (wallet.balance < fee.amount) return;
    setSelectedFee(fee);
    setIsSearching(true);
    setSearchTime(0);
    updateWallet(-fee.amount);

    wsService.connectToMatchmaking((data) => {
      if (data.type === 'match_found') {
        setIsSearching(false);
        navigate(`/play?mode=duel&gameId=${data.game_id}&difficulty=medium&deck=operateurs`);
      }
    });

    wsService.sendMatchmakingAction('find_match', { entry_fee: fee.amount });

    // Simulate match found after 5s for demo
    setTimeout(() => {
      if (isSearching) {
        setIsSearching(false);
        navigate('/play?mode=duel&difficulty=medium&deck=operateurs&gameId=demo');
      }
    }, 5000);
  }, [wallet.balance, updateWallet, navigate, isSearching]);

  const cancelSearch = () => {
    setIsSearching(false);
    if (selectedFee) {
      updateWallet(selectedFee.amount);
    }
    wsService.disconnect('matchmaking');
    setSelectedFee(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(270,60%,55%)] to-[hsl(290,50%,40%)] flex items-center justify-center">
            <Swords className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Duels & Tournois</h1>
            <p className="text-sm text-muted-foreground">Affronte d'autres joueurs en temps réel</p>
          </div>
        </div>
      </motion.div>

      {/* Matchmaking Search Overlay */}
      {isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-[hsl(187,92%,55%,0.2)] border-t-[hsl(187,92%,55%)]"
            />
            <h2 className="text-2xl font-bold mb-2">Recherche d'un adversaire...</h2>
            <p className="text-muted-foreground mb-1">Mise: {selectedFee?.amount} jetons</p>
            <p className="text-sm text-muted-foreground font-mono">{searchTime}s</p>
            <Button variant="outline" onClick={cancelSearch} className="mt-6 border-border">
              Annuler
            </Button>
          </div>
        </motion.div>
      )}

      <Tabs defaultValue="duel">
        <TabsList className="bg-muted mb-6">
          <TabsTrigger value="duel">Duel 1v1</TabsTrigger>
          <TabsTrigger value="tournament">Tournois</TabsTrigger>
        </TabsList>

        <TabsContent value="duel">
          <div className="mb-4 p-4 rounded-xl bg-[hsl(230,25%,10%)] border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Votre solde : <strong className="text-yellow-400 font-mono">{wallet.balance}</strong> jetons</span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Choisir la mise</h3>
          <div className="grid grid-cols-2 gap-3">
            {ENTRY_FEES.map((fee) => (
              <motion.button
                key={fee.amount}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startMatchmaking(fee)}
                disabled={wallet.balance < fee.amount}
                className={`p-5 rounded-xl border text-left transition-all ${
                  wallet.balance < fee.amount
                    ? 'border-border bg-[hsl(230,25%,10%)] opacity-50 cursor-not-allowed'
                    : 'border-border bg-[hsl(230,25%,10%)] hover:border-[hsl(270,60%,55%,0.4)] hover:bg-[hsl(270,60%,55%,0.05)]'
                }`}
              >
                <p className="font-bold text-lg mb-1">{fee.label}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-400 mb-2">
                  <Coins className="w-3.5 h-3.5" />
                  <span className="font-mono">{fee.amount}</span>
                  <span className="text-muted-foreground">d'entrée</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <Trophy className="w-3 h-3" />
                  <span>Gain: {fee.reward} jetons</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[hsl(230,25%,10%)] border border-border">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Video className="w-4 h-4 text-[hsl(187,92%,55%)]" />
              Communication en duel
            </h4>
            <p className="text-xs text-muted-foreground">
              Pendant le duel, vous pourrez communiquer avec votre adversaire via chat, audio ou vidéo en direct.
            </p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground flex items-center gap-1">
                <Mic className="w-3 h-3" /> Audio
              </span>
              <span className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground flex items-center gap-1">
                <Video className="w-3 h-3" /> Vidéo
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tournament">
          <div className="space-y-3">
            {MOCK_TOURNAMENTS.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-[hsl(230,25%,10%)] border border-border hover:border-[hsl(187,92%,55%,0.2)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.players}</span>
                      <span className="flex items-center gap-1"><Coins className="w-3 h-3 text-yellow-400" />{t.entryFee}</span>
                      <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-green-400" />{t.prize}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">{t.startsIn}</p>
                    {t.status === 'open' ? (
                      <Button
                        size="sm"
                        disabled={wallet.balance < t.entryFee}
                        className="bg-[hsl(270,60%,55%)] hover:bg-[hsl(270,60%,45%)] text-white text-xs"
                      >
                        Rejoindre <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    ) : (
                      <span className="text-xs text-yellow-400">En cours</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}