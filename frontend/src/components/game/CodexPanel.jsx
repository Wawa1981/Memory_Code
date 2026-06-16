import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, Code, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CodexPanel({ entries, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-[hsl(230,25%,8%)] border-l border-border shadow-2xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[hsl(187,92%,55%)]" />
              <h2 className="text-lg font-bold">Codex Éducatif</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100%-64px)]">
            <div className="p-4 space-y-4">
              {entries.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-30" />
                  <p className="text-muted-foreground">Trouvez des paires pour débloquer le Codex !</p>
                </div>
              ) : (
                entries.map((entry, idx) => (
                  <motion.div
                    key={entry.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-xl border border-border bg-[hsl(230,25%,11%)] overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-2 mb-3">
                        <Code className="w-4 h-4 text-[hsl(187,92%,55%)] mt-0.5 flex-shrink-0" />
                        <h3 className="font-semibold text-sm text-foreground">{entry.title}</h3>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {entry.explanation}
                      </p>

                      {entry.snippet && (
                        <div className="rounded-lg bg-[hsl(230,25%,6%)] border border-border p-3 mb-3">
                          <pre className="text-xs font-mono text-[hsl(187,92%,75%)] whitespace-pre-wrap">
                            {entry.snippet}
                          </pre>
                        </div>
                      )}

                      {entry.tip && (
                        <div className="flex items-start gap-2 p-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                          <Lightbulb className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <p className="text-[11px] text-yellow-300/80">{entry.tip}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}