import React, { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [wallet, setWallet] = useState({ balance: 1000 });
  const [playerStats, setPlayerStats] = useState({
    username: '',
    level: 1,
    xp: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    bestTime: null,
    totalPairsFound: 0,
  });
  const [gameHistory, setGameHistory] = useState([]);

  const updateWallet = useCallback((amount) => {
    setWallet(prev => ({ ...prev, balance: Math.max(0, prev.balance + amount) }));
  }, []);

  const addGameToHistory = useCallback((game) => {
    setGameHistory(prev => [game, ...prev].slice(0, 50));
    setPlayerStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      gamesWon: game.won ? prev.gamesWon + 1 : prev.gamesWon,
      totalPairsFound: prev.totalPairsFound + game.pairsFound,
      bestTime: game.won 
        ? (prev.bestTime === null ? game.time : Math.min(prev.bestTime, game.time))
        : prev.bestTime,
      xp: prev.xp + game.xpEarned,
    }));
  }, []);

  return (
    <GameContext.Provider value={{
      wallet, updateWallet, setWallet,
      playerStats, setPlayerStats,
      gameHistory, addGameToHistory,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be inside GameProvider');
  return ctx;
}