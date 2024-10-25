// ----------- Contient la logique du poker pour évaluer les mains ------
// export const evaluateHand = (hand: { value: string; suit: string }[]) => {
//   const valueCount: Record<string, number> = {};

//   hand.forEach((card) => {
//     valueCount[card.value] = (valueCount[card.value] || 0) + 1;
//   });

//   const counts = Object.values(valueCount);

//   if (counts.includes(4)) return "Carré";
//   if (counts.includes(3)) return "Brelan";
//   if (counts.filter((count) => count === 2).length === 2) return "Double Paire";
//   if (counts.includes(2)) return "Paire";

//   return "Carte forte";
// };

import { HandType } from "../type/types";

export const evaluateHand = (hand: HandType): string => {
  return "Paire";
};
