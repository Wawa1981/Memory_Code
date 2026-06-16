import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DIFFICULTY_LEVELS } from '@/lib/gameData';


export default function SoloMode() {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState('operateurs');

  const startGame = () => {
    if (!selectedDifficulty) return;
    navigate(`/play?mode=solo&difficulty=${selectedDifficulty}&deck=${selectedDeck}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(187,92%,55%)] to-[hsl(200,80%,40%)] flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mode Solo</h1>
            <p className="text-sm text-muted-foreground">Entraîne-toi gratuitement à ton rythme</p>
          </div>
        </div>
      </motion.div>

      {/* Thème */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Thème</h2>
        <div className="flex items-center gap-3 p-4 rounded-xl border border-[hsl(187,92%,55%,0.4)] bg-[hsl(187,92%,55%,0.08)]">
          <span className="text-2xl">🧩</span>
          <div>
            <p className="font-medium text-foreground">Symboles de Programmation</p>
            <p className="text-xs text-muted-foreground">25 symboles disponibles</p>
          </div>
          <CheckCircle className="w-5 h-5 text-[hsl(187,92%,55%)] ml-auto" />
        </div>
      </motion.div>

      {/* Difficulty Selection */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Choisir la difficulté</h2>
        <div className="grid grid-cols-2 gap-3">
          {DIFFICULTY_LEVELS.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedDifficulty(level.id)}
              className={`p-4 rounded-xl border transition-all text-left ${
                selectedDifficulty === level.id
                  ? 'border-[hsl(187,92%,55%,0.4)] bg-[hsl(187,92%,55%,0.08)]'
                  : 'border-border bg-[hsl(230,25%,10%)] hover:border-[hsl(187,92%,55%,0.2)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{level.icon}</span>
                <span className={`font-semibold ${level.color}`}>{level.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{level.pairs} paires • {level.pairs * 2} cartes</p>
              {selectedDifficulty === level.id && (
                <CheckCircle className="w-4 h-4 text-[hsl(187,92%,55%)] mt-2" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Start */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Button
          onClick={startGame}
          disabled={!selectedDifficulty}
          className="w-full h-14 text-lg bg-gradient-to-r from-[hsl(187,92%,55%)] to-[hsl(200,80%,40%)] text-white hover:opacity-90 rounded-xl font-semibold"
        >
          Lancer la partie <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}