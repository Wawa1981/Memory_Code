import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Lightbulb, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CARD_DECKS, DECK_CATEGORIES } from '@/lib/gameData';

export default function Codex() {
  const [search, setSearch] = useState('');

  const allEntries = Object.entries(CARD_DECKS).flatMap(([deckId, cards]) =>
    cards.map(card => ({ ...card, deckId }))
  );

  const filtered = search
    ? allEntries.filter(e =>
        e.concept.toLowerCase().includes(search.toLowerCase()) ||
        e.definition.toLowerCase().includes(search.toLowerCase()) ||
        e.codex.title.toLowerCase().includes(search.toLowerCase())
      )
    : allEntries;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Codex</h1>
            <p className="text-sm text-muted-foreground">Tous les concepts de programmation</p>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un concept..."
            className="pl-9 bg-[hsl(230,25%,10%)] border-border"
          />
        </div>
      </motion.div>

      {search ? (
        <div className="space-y-3">
          {filtered.map((entry, idx) => (
            <CodexCard key={entry.id} entry={entry} delay={idx * 0.02} />
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Aucun résultat pour "{search}"
            </div>
          )}
        </div>
      ) : (
        <Tabs defaultValue="python">
          <TabsList className="bg-muted mb-4 flex-wrap h-auto gap-1">
            {DECK_CATEGORIES.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.icon} {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {DECK_CATEGORIES.map(cat => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="space-y-3">
                {(CARD_DECKS[cat.id] || []).map((entry, idx) => (
                  <CodexCard key={entry.id} entry={entry} delay={idx * 0.02} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

function CodexCard({ entry, delay }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left rounded-xl border border-border bg-[hsl(230,25%,10%)] hover:border-[hsl(187,92%,55%,0.2)] transition-colors overflow-hidden"
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[hsl(187,92%,55%,0.1)] flex items-center justify-center flex-shrink-0">
              <Code className="w-4 h-4 text-[hsl(187,92%,55%)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono font-medium text-sm text-[hsl(187,92%,55%)] truncate">{entry.concept}</p>
              <p className="text-xs text-muted-foreground">{entry.definition}</p>
            </div>
          </div>
        </div>

        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="px-4 pb-4 border-t border-border pt-3"
          >
            <h4 className="font-semibold text-sm mb-2">{entry.codex.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{entry.codex.explanation}</p>

            {entry.codex.snippet && (
              <div className="rounded-lg bg-[hsl(230,25%,6%)] border border-border p-3 mb-3">
                <pre className="text-xs font-mono text-[hsl(187,92%,75%)] whitespace-pre-wrap">{entry.codex.snippet}</pre>
              </div>
            )}

            {entry.codex.tip && (
              <div className="flex items-start gap-2 p-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-yellow-300/80">{entry.codex.tip}</p>
              </div>
            )}
          </motion.div>
        )}
      </button>
    </motion.div>
  );
}