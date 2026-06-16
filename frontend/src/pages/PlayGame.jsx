import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MemoryCard from '@/components/game/MemoryCard';
import GameHUD from '@/components/game/GameHUD';
import CodexPanel from '@/components/game/CodexPanel';
import ValidationModal from '@/components/game/ValidationModal';
import GameResults from '@/components/game/GameResults';
import ChatPanel from '@/components/comm/ChatPanel';
import { getDeck, generateCards, DIFFICULTY_LEVELS } from '@/lib/gameData';
import { useGame } from '@/lib/GameContext';

export default function PlayGame() {
  const navigate = useNavigate();
  const { addGameToHistory, updateWallet } = useGame();
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') || 'solo';
  const difficultyId = params.get('difficulty') || 'easy';
  const deckId = params.get('deck') || 'operateurs';
  const gameId = params.get('gameId');

  const difficulty = DIFFICULTY_LEVELS.find(d => d.id === difficultyId) || DIFFICULTY_LEVELS[0];

  const [cards, setCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [errors, setErrors] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [codexEntries, setCodexEntries] = useState([]);
  const [codexOpen, setCodexOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [validationPair, setValidationPair] = useState(null);

  const timerRef = useRef(null);
  const pairsDataRef = useRef([]);
  const selectedRef = useRef(null);
  const processingRef = useRef(false);
  const cardsRef = useRef([]);

  // Keep cardsRef in sync
  useEffect(() => { cardsRef.current = cards; }, [cards]);

  // Init game
  useEffect(() => {
    const pairs = getDeck(deckId, difficulty.pairs);
    pairsDataRef.current = pairs;
    const generated = generateCards(pairs);
    setCards(generated);
    setIsPlaying(true);
  }, [deckId, difficulty.pairs]);

  // Timer
  useEffect(() => {
    if (isPlaying && !showResults) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, showResults]);

  const handleCardClick = useCallback((card) => {
    if (processingRef.current) return;
    if (card.isFlipped || card.isMatched) return;
    if (card.id === selectedRef.current?.id) return;

    // Flip this card
    setCards(prev => prev.map(c =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    ));

    if (!selectedRef.current) {
      // First card of the pair
      selectedRef.current = card;
      return;
    }

    // Second card - check match
    const first = selectedRef.current;
    const second = card;
    selectedRef.current = null;
    processingRef.current = true;

    if (first.pairId === second.pairId && first.id !== second.id) {
      // MATCH !
      const pair = pairsDataRef.current.find(p => p.id === first.pairId);
      
      if (mode !== 'solo' && Math.random() < 0.2 && pair) {
        setValidationPair(pair);
        processingRef.current = false;
      } else {
        confirmMatch(first.pairId, pair);
      }
    } else {
      // Pas de match - on retourne apres 1s
      setErrors(prev => prev + 1);
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === first.id || c.id === second.id
            ? { ...c, isFlipped: false }
            : c
        ));
        processingRef.current = false;
      }, 1000);
    }
  }, [mode]);

  const confirmMatch = useCallback((pairId, pair) => {
    processingRef.current = false;
    
    // Ajouter au Codex avec explication + exemple
    if (pair?.explanation) {
      setCodexEntries(prev => [...prev, {
        id: pair.id,
        title: `${pair.symbol} — ${pair.label}`,
        explanation: pair.explanation,
        snippet: pair.example,
        tip: pair.tip,
      }]);
    }
    
    setCards(prev => prev.map(card =>
      card.pairId === pairId ? { ...card, isMatched: true, isFlipped: true } : card
    ));

    setMatchedPairs(prev => {
      const next = [...prev, pairId];
      if (next.length === difficulty.pairs) {
        setTimeout(() => finishGame(next.length), 500);
      }
      return next;
    });
  }, [difficulty.pairs]);

  const handleValidationSubmit = (isCorrect) => {
    if (isCorrect && validationPair) {
      confirmMatch(validationPair.id, validationPair);
    } else {
      processingRef.current = false;
      setErrors(prev => prev + 1);
      setCards(prev => prev.map(c =>
        c.pairId === validationPair?.id && !c.isMatched
          ? { ...c, isFlipped: false }
          : c
      ));
    }
    setValidationPair(null);
  };

  const handleValidationTimeout = () => {
    processingRef.current = false;
    setErrors(prev => prev + 1);
    if (validationPair) {
      setCards(prev => prev.map(c =>
        c.pairId === validationPair.id && !c.isMatched
          ? { ...c, isFlipped: false }
          : c
      ));
    }
    setValidationPair(null);
  };

  const finishGame = (pairsFound) => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setShowResults(true);

    const xpEarned = pairsFound * 10 - errors * 2;
    const tokensEarned = mode === 'duel' ? 100 : 0;

    addGameToHistory({
      mode,
      difficulty: difficultyId,
      deck: deckId,
      pairsFound,
      totalPairs: difficulty.pairs,
      errors,
      time: timer,
      won: pairsFound === difficulty.pairs,
      xpEarned: Math.max(0, xpEarned),
      tokensEarned,
      date: new Date().toISOString(),
    });

    if (tokensEarned > 0) {
      updateWallet(tokensEarned);
    }
  };

  const gridCols = difficulty.pairs <= 6 ? 4 : difficulty.pairs <= 10 ? 5 : difficulty.pairs <= 15 ? 6 : difficulty.pairs <= 20 ? 7 : 8;

  return (
    <div className="min-h-screen p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Quitter
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCodexOpen(!codexOpen)}
            className="border-border"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Codex ({codexEntries.length})
          </Button>
          {mode !== 'solo' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatOpen(!chatOpen)}
              className="border-border"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
          )}
        </div>
      </div>

      {/* HUD */}
      <GameHUD
        timer={timer}
        matched={matchedPairs.length}
        errors={errors}
        totalPairs={difficulty.pairs}
      />

      {/* Game Board */}
      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <div
            className="grid gap-1.5 sm:gap-2"
            style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
          >
            <AnimatePresence>
              {cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <MemoryCard
                    card={card}
                    onClick={handleCardClick}
                    disabled={!isPlaying}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat sidebar for duels */}
        {chatOpen && mode !== 'solo' && (
          <div className="w-72 flex-shrink-0">
            <ChatPanel
              roomId={gameId || 'lobby'}
              username="Player"
              isOpen={chatOpen}
              onClose={() => setChatOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Codex Panel */}
      <CodexPanel entries={codexEntries} isOpen={codexOpen} onClose={() => setCodexOpen(false)} />

      {/* Validation Modal */}
      <ValidationModal
        isOpen={!!validationPair}
        pair={validationPair}
        onSubmit={handleValidationSubmit}
        onTimeout={handleValidationTimeout}
      />

      {/* Results */}
      {showResults && (
        <GameResults
          results={{
            time: timer,
            errors,
            totalPairs: difficulty.pairs,
            pairsFound: matchedPairs.length,
            xpEarned: Math.max(0, matchedPairs.length * 10 - errors * 2),
            tokensEarned: mode === 'duel' ? 100 : 0,
            won: matchedPairs.length === difficulty.pairs,
            isDuel: mode === 'duel',
          }}
          onPlayAgain={() => window.location.reload()}
          onGoHome={() => navigate('/')}
        />
      )}
    </div>
  );
}