import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Coins, CreditCard, Sparkles, Check, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/lib/GameContext';

const TOKEN_PACKS = [
  { id: 1, tokens: 500, price: 4.99, bonus: 0, popular: false },
  { id: 2, tokens: 1200, price: 9.99, bonus: 200, popular: true },
  { id: 3, tokens: 3000, price: 19.99, bonus: 500, popular: false },
  { id: 4, tokens: 7500, price: 49.99, bonus: 2500, popular: false },
];

export default function Shop() {
  const { wallet, updateWallet } = useGame();
  const [purchasing, setPurchasing] = useState(null);

  const handlePurchase = async (pack) => {
    setPurchasing(pack.id);
    // Simulate Stripe checkout
    // In production: const session = await api.createCheckoutSession(pack.id);
    // window.location.href = session.checkout_url;
    setTimeout(() => {
      updateWallet(pack.tokens + pack.bonus);
      setPurchasing(null);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Boutique</h1>
            <p className="text-sm text-muted-foreground">Achetez des jetons pour les duels et tournois</p>
          </div>
        </div>
      </motion.div>

      {/* Current Balance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl bg-gradient-to-r from-[hsl(187,92%,55%,0.08)] to-[hsl(270,60%,55%,0.08)] border border-[hsl(187,92%,55%,0.15)] mb-8"
      >
        <div className="flex items-center gap-3">
          <Wallet className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Solde actuel</p>
            <p className="text-3xl font-bold text-yellow-400 font-mono">{wallet.balance.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">jetons</span></p>
          </div>
        </div>
      </motion.div>

      {/* Token Packs */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Packs de jetons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOKEN_PACKS.map((pack, idx) => (
          <motion.div
            key={pack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
            className={`relative rounded-2xl border p-5 ${
              pack.popular
                ? 'border-[hsl(187,92%,55%,0.4)] bg-[hsl(187,92%,55%,0.05)]'
                : 'border-border bg-[hsl(230,25%,10%)]'
            }`}
          >
            {pack.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[hsl(187,92%,55%)] text-[hsl(230,25%,7%)]">
                  Populaire
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-2xl font-bold font-mono text-yellow-400">{pack.tokens.toLocaleString()}</span>
                </div>
                {pack.bonus > 0 && (
                  <span className="inline-flex items-center gap-1 mt-1 text-xs text-green-400">
                    <Sparkles className="w-3 h-3" />
                    +{pack.bonus} bonus
                  </span>
                )}
              </div>
              <span className="text-xl font-bold text-foreground">{pack.price}€</span>
            </div>

            <Button
              onClick={() => handlePurchase(pack)}
              disabled={purchasing === pack.id}
              className={`w-full ${
                pack.popular
                  ? 'bg-[hsl(187,92%,55%)] text-[hsl(230,25%,7%)] hover:bg-[hsl(187,92%,45%)]'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {purchasing === pack.id ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Traitement...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Acheter
                </span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-4 rounded-xl bg-[hsl(230,25%,10%)] border border-border"
      >
        <h3 className="font-medium mb-2 text-sm">Comment ça marche ?</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />Les jetons sont utilisés pour participer aux Duels et Tournois</li>
          <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />Gagnez des jetons en remportant des parties compétitives</li>
          <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />Le mode Solo est toujours 100% gratuit</li>
          <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />Paiement sécurisé via Stripe</li>
        </ul>
      </motion.div>
    </div>
  );
}