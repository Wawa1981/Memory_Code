import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VALIDATION_TIMEOUT = 15; // seconds

export default function ValidationModal({ isOpen, pair, onSubmit, onTimeout }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(VALIDATION_TIMEOUT);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(VALIDATION_TIMEOUT);
    setSelectedAnswer(null);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, onTimeout]);

  if (!isOpen || !pair) return null;

  // Generate question based on the pair
  const question = `Que représente "${pair.symbol}" ?`;
  const correctAnswer = pair.label;
  const wrongAnswers = [
    'Opérateur de concaténation',
    'Déclaration de variable',
    'Boucle infinie',
    'Retour de fonction',
  ].filter(a => a !== correctAnswer).slice(0, 2);
  
  const answers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-md bg-[hsl(230,25%,10%)] rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[hsl(187,92%,55%)]" />
            <h3 className="font-bold text-lg">Validation Anti-Triche</h3>
          </div>

          <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">{timeLeft}s restantes</span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden ml-2">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / VALIDATION_TIMEOUT) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-[hsl(230,25%,14%)] border border-border">
            <p className="text-sm font-mono text-[hsl(187,92%,55%)] mb-1">{pair.symbol}</p>
            <p className="text-sm text-foreground">{question}</p>
          </div>

          <div className="space-y-2 mb-4">
            {answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(answer)}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                  selectedAnswer === answer
                    ? 'border-[hsl(187,92%,55%)] bg-[hsl(187,92%,55%,0.1)] text-foreground'
                    : 'border-border bg-[hsl(230,25%,12%)] text-muted-foreground hover:border-[hsl(187,92%,55%,0.3)]'
                }`}
              >
                {answer}
              </button>
            ))}
          </div>

          <Button
            onClick={() => onSubmit(selectedAnswer === correctAnswer)}
            disabled={!selectedAnswer}
            className="w-full bg-[hsl(187,92%,55%)] text-[hsl(230,25%,7%)] hover:bg-[hsl(187,92%,45%)] font-semibold"
          >
            Valider
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}