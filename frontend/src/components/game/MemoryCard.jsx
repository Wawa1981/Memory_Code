import React from 'react';
import { motion } from 'framer-motion';

export default function MemoryCard({ card, onClick, disabled }) {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <motion.button
      onClick={() => !disabled && !isRevealed && onClick(card)}
      disabled={disabled || isRevealed}
      className="card-flip w-full aspect-[5/4] cursor-pointer"
      whileHover={!isRevealed ? { scale: 1.05 } : {}}
      whileTap={!isRevealed ? { scale: 0.95 } : {}}
      layout
    >
      <div className={`card-flip-inner w-full h-full relative ${isRevealed ? 'flipped' : ''}`}>
        {/* Dos */}
        <div className="card-front absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-[hsl(230,25%,14%)] to-[hsl(230,25%,10%)] border-2 border-[hsl(230,20%,22%)] flex items-center justify-center hover:border-[hsl(187,92%,55%,0.4)] transition-all">
          <span className="text-base sm:text-lg">?</span>
        </div>

        {/* Face - symbole + ce qu'il fait */}
        <div className={`card-back absolute inset-0 rounded-lg sm:rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 p-0.5 sm:p-1 ${
          card.isMatched
            ? 'bg-gradient-to-br from-emerald-500/20 to-green-500/10 border-emerald-500/40'
            : 'bg-gradient-to-br from-[hsl(195,90%,40%,0.12)] to-[hsl(210,70%,30%,0.08)] border-[hsl(195,90%,50%,0.4)]'
        }`}>
          <span className="text-base sm:text-lg">{card.emoji}</span>
          <span className={`font-mono font-bold text-center leading-none ${
            card.isMatched ? 'text-emerald-300' : 'text-[hsl(195,90%,55%)]'
          }`}
            style={{ fontSize: 'clamp(0.6rem, 1.5vw, 1.1rem)' }}
          >
            {card.symbol}
          </span>
          <span className={`text-center leading-tight mt-0.5 ${
            card.isMatched ? 'text-emerald-300/70' : 'text-[hsl(195,90%,65%)]'
          }`}
            style={{ fontSize: 'clamp(0.4rem, 1vw, 0.65rem)' }}
          >
            {card.label}
          </span>
        </div>
      </div>
    </motion.button>
  );
}