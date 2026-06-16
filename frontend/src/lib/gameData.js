// ═══════════════════════════════════════════
// SYMBOLES DE PROGRAMMATION - Memory classique
// Chaque paire = 2 cartes IDENTIQUES (même symbole)
// ═══════════════════════════════════════════

export const CARD_DECKS = {
  operateurs: [
    // ── Arithmétique ──
    {
      id: 'op_add', symbol: '+', emoji: '➕',
      label: 'Addition',
      explanation: 'Additionne deux nombres. C\'est l\'opération la plus basique en programmation, utilisée pour tout calcul numérique.',
      example: '// Addition en JavaScript/Python/C++\nlet total = 5 + 3;  // total = 8\nlet prix = 10 + 2.5;  // prix = 12.5',
      tip: 'Le + peut aussi concaténer (coller) des textes entre eux ! Ex: "Bon" + "jour" = "Bonjour"',
    },
    {
      id: 'op_sub', symbol: '-', emoji: '➖',
      label: 'Soustraction',
      explanation: 'Soustrait un nombre d\'un autre. Utilisé pour des calculs de différence, de réduction, ou de décompte.',
      example: '// Soustraction\nlet reste = 10 - 3;  // reste = 7\nlet difference = 100 - 45;  // difference = 55',
      tip: 'On peut aussi l\'utiliser pour des nombres négatifs : let negatif = -5;',
    },
    {
      id: 'op_mul', symbol: '*', emoji: '✖️',
      label: 'Multiplication',
      explanation: 'Multiplie deux nombres. En programmation on utilise l\'astérisque (*) car le × n\'est pas disponible sur tous les claviers.',
      example: '// Multiplication\nlet surface = 5 * 4;  // surface = 20\nlet resultat = 3 * 7;  // resultat = 21',
      tip: 'Attention à ne pas confondre * (multiplication) avec x (la lettre) !',
    },
    {
      id: 'op_div', symbol: '/', emoji: '➗',
      label: 'Division',
      explanation: 'Divise un nombre par un autre. Le résultat peut être un nombre à virgule (décimal).',
      example: '// Division\nlet moitie = 10 / 2;  // moitie = 5\nlet tiers = 10 / 3;    // tiers ≈ 3.333...',
      tip: 'Diviser par zéro provoque une erreur ! Toujours vérifier que le diviseur ≠ 0.',
    },
    {
      id: 'op_mod', symbol: '%', emoji: '🔢',
      label: 'Modulo (reste)',
      explanation: 'Donne le reste d\'une division. Très utile pour savoir si un nombre est pair (n % 2 === 0) ou pour boucler sur une liste.',
      example: '// Modulo - le reste de la division\nlet reste = 10 % 3;   // reste = 1\nlet estPair = 8 % 2;   // estPair = 0 (donc pair !)\nlet estImpair = 7 % 2; // estImpair = 1 (donc impair)',
      tip: 'Le modulo est ton ami pour les cycles : changer de joueur, alterner des couleurs, etc.',
    },

    // ── Comparaison ──
    {
      id: 'op_eq', symbol: '==', emoji: '⚖️',
      label: 'Égal à',
      explanation: 'Vérifie si deux valeurs sont égales. Renvoie vrai (true) ou faux (false). C\'est la base de toutes les conditions en programmation.',
      example: '// Comparaison d\'égalité\nif (age == 18) {\n  console.log("Tu es majeur !");\n}\n\nlet estAdmin = (role == "admin"); // true ou false',
      tip: 'Ne pas confondre == (comparaison) avec = (assignation) ! C\'est l\'erreur n°1 des débutants.',
    },
    {
      id: 'op_neq', symbol: '!=', emoji: '🚫',
      label: 'Différent de',
      explanation: 'Vérifie si deux valeurs sont différentes. Très utile pour exclure des cas ou vérifier qu\'une valeur a changé.',
      example: '// Vérifier que c\'est différent\nif (motDePasse != "") {\n  console.log("Mot de passe fourni");\n}\n\nif (score != 0) {\n  console.log("Partie en cours");\n}',
      tip: '!= c\'est le contraire de ==. Si == dit "oui", != dit "non" et inversement.',
    },
    {
      id: 'op_lt', symbol: '<', emoji: '◀️',
      label: 'Plus petit que',
      explanation: 'Vérifie si la valeur de gauche est strictement plus petite que celle de droite. Ne vérifie pas l\'égalité.',
      example: '// Strictement plus petit\nif (temperature < 0) {\n  console.log("Il gèle !");\n}\n\nif (score < 50) {\n  console.log("Peut mieux faire");\n}',
      tip: 'Le crocodile < mange le plus grand nombre ! La pointe montre le plus petit.',
    },
    {
      id: 'op_gt', symbol: '>', emoji: '▶️',
      label: 'Plus grand que',
      explanation: 'Vérifie si la valeur de gauche est strictement plus grande que celle de droite.',
      example: '// Strictement plus grand\nif (points > 100) {\n  console.log("High score !");\n}\n\nif (vitesse > 130) {\n  console.log("Trop vite !");\n}',
      tip: 'Le crocodile > mange toujours le plus grand nombre. Facile à retenir !',
    },
    {
      id: 'op_lte', symbol: '<=', emoji: '⏪',
      label: 'Plus petit ou égal',
      explanation: 'Vérifie si la valeur de gauche est plus petite OU égale à celle de droite. Combine < et == en un seul test.',
      example: '// Plus petit ou égal\nif (age <= 18) {\n  console.log("Mineur ou tout juste majeur");\n}\n\nif (essais <= 3) {\n  console.log("Encore des tentatives");\n}',
      tip: 'Pense à <= comme "au maximum". Ex: note <= 10 signifie "10 maximum".',
    },
    {
      id: 'op_gte', symbol: '>=', emoji: '⏩',
      label: 'Plus grand ou égal',
      explanation: 'Vérifie si la valeur de gauche est plus grande OU égale à celle de droite. Très utilisé pour les seuils minimums.',
      example: '// Plus grand ou égal\nif (note >= 10) {\n  console.log("Examen réussi !");\n}\n\nif (solde >= 100) {\n  console.log("Tu peux acheter");\n}',
      tip: 'Pense à >= comme "au moins". Ex: age >= 18 signifie "au moins 18 ans".',
    },

    // ── Logique ──
    {
      id: 'op_and', symbol: '&&', emoji: '🤝',
      label: 'ET logique',
      explanation: 'Renvoie vrai uniquement si les DEUX conditions sont vraies. Si l\'une est fausse, tout est faux. Indispensable pour combiner des conditions.',
      example: '// Les deux doivent être vrais\nif (age >= 18 && pays == "France") {\n  console.log("Tu peux voter en France");\n}\n\nlet acces = (login && motDePasse); // false si l\'un manque',
      tip: '&& c\'est comme une porte à deux serrures : il faut les deux clés pour ouvrir.',
    },
    {
      id: 'op_or', symbol: '||', emoji: '🔀',
      label: 'OU logique',
      explanation: 'Renvoie vrai si AU MOINS UNE des deux conditions est vraie. Pratique pour offrir plusieurs alternatives.',
      example: '// Au moins un des deux\nif (jour == "samedi" || jour == "dimanche") {\n  console.log("C\'est le weekend !");\n}\n\nif (temperature > 35 || temperature < -10) {\n  console.log("Conditions extrêmes");\n}',
      tip: '|| c\'est le symbole "pipe" (AltGr+6). C\'est comme un "ou" inclusif en français.',
    },
    {
      id: 'op_not', symbol: '!', emoji: '❗',
      label: 'NON logique',
      explanation: 'Inverse une condition : le vrai devient faux, le faux devient vrai. Très utile pour vérifier qu\'une chose N\'est PAS vraie.',
      example: '// Inverse la condition\nlet estConnecte = false;\nif (!estConnecte) {\n  console.log("Veuillez vous connecter");\n}\n\nif (!(age < 18)) {\n  console.log("Tu es majeur");\n}',
      tip: '! se lit "not" ou "n\'est pas". !vrai = faux, !faux = vrai. Simple comme bonjour !',
    },

    // ── Assignation ──
    {
      id: 'op_assign', symbol: '=', emoji: '📥',
      label: 'Assignation',
      explanation: 'Donne une valeur à une variable. Le = ne veut pas dire "égal" mais "reçoit la valeur". C\'est le symbole le plus utilisé en programmation.',
      example: '// Assigner des valeurs\nlet nom = "Alice";\nlet age = 25;\nlet estAdmin = true;\n\nage = 26; // On peut changer la valeur',
      tip: '= donne une valeur, == compare. Ne les confonds pas : if (x = 5) est une erreur classique !',
    },
    {
      id: 'op_add_assign', symbol: '+=', emoji: '📝',
      label: 'Ajouter et assigner',
      explanation: 'Ajoute une valeur à une variable et met à jour cette variable en une seule opération. Un raccourci élégant.',
      example: '// += ajoute puis assigne\nlet score = 10;\nscore += 5;   // score = 15 (équivaut à score = score + 5)\n\nlet total = 0;\ntotal += 100;  // total = 100',
      tip: 'x += 5 est exactement la même chose que x = x + 5, mais en plus court !',
    },
    {
      id: 'op_sub_assign', symbol: '-=', emoji: '📉',
      label: 'Soustraire et assigner',
      explanation: 'Soustrait une valeur d\'une variable et met à jour cette variable. Très pratique pour les compteurs à rebours.',
      example: '// -= soustrait puis assigne\nlet vies = 3;\nvies -= 1;    // vies = 2\n\nlet budget = 100;\nbudget -= 35;  // budget = 65',
      tip: 'x -= 3 est un raccourci pour x = x - 3. Pratique pour les jeux vidéo !',
    },
    {
      id: 'op_mul_assign', symbol: '*=', emoji: '✳️',
      label: 'Multiplier et assigner',
      explanation: 'Multiplie une variable par une valeur et met à jour la variable. Utile pour doubler, tripler, ou appliquer un pourcentage.',
      example: '// *= multiplie puis assigne\nlet points = 10;\npoints *= 2;   // points = 20 (double)\n\nlet prix = 100;\nprix *= 0.8;   // prix = 80 (réduction 20%)',
      tip: 'x *= 2 double la valeur. x *= 0.5 la divise par deux. Super pour les bonus !',
    },
    {
      id: 'op_div_assign', symbol: '/=', emoji: '📊',
      label: 'Diviser et assigner',
      explanation: 'Divise une variable par une valeur et met à jour la variable. Pratique pour réduire progressivement une valeur.',
      example: '// /= divise puis assigne\nlet total = 100;\ntotal /= 2;    // total = 50\n\nlet distance = 60;\ndistance /= 2;  // distance = 30 (moitié)',
      tip: 'x /= 2 c\'est comme x = x / 2. Utile pour calculer une moyenne ou réduire de moitié.',
    },

    // ── Incrémentation ──
    {
      id: 'op_inc', symbol: '++', emoji: '👍',
      label: 'Incrémenter (+1)',
      explanation: 'Ajoute 1 à une variable. Extrêmement utilisé dans les boucles et les compteurs. C\'est le symbole préféré des développeurs.',
      example: '// Incrémenter de 1\nlet compteur = 0;\ncompteur++;    // compteur = 1\ncompteur++;    // compteur = 2\n\n// Dans une boucle\nfor (let i = 0; i < 10; i++) {\n  console.log(i); // 0, 1, 2, ..., 9\n}',
      tip: 'i++ c\'est le secret des boucles. Sans lui, les boucles seraient infinies !',
    },
    {
      id: 'op_dec', symbol: '--', emoji: '👎',
      label: 'Décrémenter (-1)',
      explanation: 'Enlève 1 à une variable. Très utile pour les compteurs à rebours ou parcourir une liste à l\'envers.',
      example: '// Décrémenter de 1\nlet vies = 3;\nvies--;       // vies = 2\nvies--;       // vies = 1\n\n// Compte à rebours\nfor (let i = 5; i > 0; i--) {\n  console.log(i); // 5, 4, 3, 2, 1\n}',
      tip: 'i-- c\'est le jumeau de i++, mais il descend au lieu de monter. Parfait pour les décomptes !',
    },

    // ── Avancé ──
    {
      id: 'op_pow', symbol: '**', emoji: '⭐',
      label: 'Puissance',
      explanation: 'Élève un nombre à une puissance. x ** y signifie "x puissance y" (x multiplié par lui-même y fois).',
      example: '// Puissance (exposant)\nlet carre = 5 ** 2;    // 25 (5×5)\nlet cube = 3 ** 3;     // 27 (3×3×3)\nlet grand = 2 ** 10;   // 1024',
      tip: '** existe en JavaScript et Python. En C++/Java, il faut utiliser pow(x, y) à la place.',
    },
    {
      id: 'op_bit_and', symbol: '&', emoji: '🔗',
      label: 'ET binaire',
      explanation: 'Compare chaque bit de deux nombres et garde uniquement ceux qui sont à 1 dans les deux. Utilisé pour les masques binaires et les optimisations.',
      example: '// ET binaire (bit à bit)\n// 5 = 0101, 3 = 0011\nlet resultat = 5 & 3;  // 0001 = 1\n\n// Utile pour vérifier si un bit est activé\nlet permissions = 0b1010;\nlet peutLire = permissions & 0b1000; // vérifie le bit de lecture',
      tip: 'Le & seul est binaire. Le && est logique. Ne les confonds pas !',
    },
    {
      id: 'op_bit_or', symbol: '|', emoji: '🔓',
      label: 'OU binaire',
      explanation: 'Compare chaque bit de deux nombres et garde ceux qui sont à 1 dans l\'un OU dans l\'autre. Très utilisé pour combiner des options.',
      example: '// OU binaire (bit à bit)\n// 5 = 0101, 3 = 0011\nlet resultat = 5 | 3;  // 0111 = 7\n\n// Combiner des options\nlet peutLire = 0b100;\nlet peutEcrire = 0b010;\nlet peutTout = peutLire | peutEcrire; // 0b110',
      tip: '| seul = binaire, || = logique. Le | combine des bits, le || combine des conditions.',
    },
    {
      id: 'op_bit_xor', symbol: '^', emoji: '💠',
      label: 'XOR binaire',
      explanation: 'Compare chaque bit et garde ceux qui sont à 1 dans UN SEUL des deux nombres (pas les deux). Utile pour la cryptographie simple et les échanges de variables.',
      example: '// XOR binaire (ou exclusif)\n// 5 = 0101, 3 = 0011\nlet resultat = 5 ^ 3;  // 0110 = 6\n\n// Astuce : échanger deux variables sans 3ème variable !\na = a ^ b;\nb = a ^ b;\na = a ^ b; // a et b sont échangés !',
      tip: 'XOR = "l\'un ou l\'autre, mais pas les deux". Comme choisir entre glace vanille OU chocolat.',
    },
  ],
};

// ═══════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════

export function getDeck(deckName, pairCount) {
  const deck = CARD_DECKS[deckName] || CARD_DECKS.operateurs;
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(pairCount, deck.length));
}

export function generateCards(pairs) {
  const cards = [];
  pairs.forEach((pair) => {
    cards.push({
      id: `${pair.id}_1`,
      pairId: pair.id,
      symbol: pair.symbol,
      emoji: pair.emoji,
      label: pair.label,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: `${pair.id}_2`,
      pairId: pair.id,
      symbol: pair.symbol,
      emoji: pair.emoji,
      label: pair.label,
      isFlipped: false,
      isMatched: false,
    });
  });
  return cards.sort(() => Math.random() - 0.5);
}

export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Débutant', pairs: 6, icon: '🌱', color: 'text-green-400' },
  { id: 'medium', label: 'Facile', pairs: 10, icon: '🔥', color: 'text-yellow-400' },
  { id: 'hard', label: 'Moyen', pairs: 15, icon: '⚡', color: 'text-orange-400' },
  { id: 'expert', label: 'Difficile', pairs: 20, icon: '💀', color: 'text-red-400' },
  { id: 'master', label: 'Expert', pairs: 25, icon: '👑', color: 'text-purple-400' },
];

export const DECK_CATEGORIES = [
  { id: 'operateurs', label: 'Symboles de Programmation', icon: '🧩', count: 25 },
];