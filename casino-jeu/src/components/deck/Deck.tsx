import { useState } from "react";

//--------- Contient le jeu de cartes ---------
// Composants principaux avec 32 cartes

// import { CardType } from "../../type/types";

// export const generateDeck = (): CardType[] => {
//   const cardValues = ["7", "8", "9", "10", "J", "Q", "K", "A"];
//   const suits = ["♠", "♣", "♥", "♦"];

//   const deck: CardType[] = [];
//   for (let value of cardValues) {
//     for (let suit of suits) {
//       deck.push({ value, suit });
//     }
//   }
//   return deck;
// };

import { CardType } from "../../type/types";

export const generateDeck = (): CardType[] => {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = ["7", "8", "9", "10", "J", "Q", "K", "A"];
  const deck: CardType[] = [];

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ value, suit });
    });
  });

  return deck;
};
