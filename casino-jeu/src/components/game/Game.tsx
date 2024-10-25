// ----------- Gère le déroulement de la partie ------

"use client";

import { generateDeck } from "../deck/Deck";
import Card from "../card/Card";
import { evaluateHand } from "../../utils/pokerLogic";
import { CardType, HandType } from "../../type/types";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Game = () => {
  const [deck, setDeck] = useState<CardType[]>(generateDeck());
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [computerHand, setComputerHand] = useState<CardType[]>([]);
  const [blockedCards, setBlockedCards] = useState<Set<number>>(new Set());
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [revealIndex, setRevealIndex] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    drawHand();
  }, []);

  const drawHand = () => {
    const shuffledDeck = [...deck].sort(() => 0.5 - Math.random());
    setPlayerHand(shuffledDeck.slice(0, 4));
    setComputerHand(shuffledDeck.slice(4, 8));
  };

  const replaceCards = () => {
    const newDeck = [...deck];
    const newHand = playerHand.map((card, index) =>
      blockedCards.has(index) ? card : newDeck.pop()
    ) as CardType[];
    setPlayerHand(newHand);
  };

  const handleBlock = (index: number) => {
    const newSet = new Set(blockedCards);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setBlockedCards(newSet);
  };

  const nextTurn = () => {
    if (turn < 3) {
      replaceCards();
      setTurn(turn + 1);
    } else {
      const playerResult = evaluateHand(playerHand);
      const computerResult = evaluateHand(computerHand);
      const winnerName = playerResult > computerResult ? "Player" : "Computer";
      setWinner(winnerName);
      setIsGameOver(true);

      if (winnerName === "Player") {
        revealWinningCards(playerHand.length);
      } else {
        revealWinningCards(computerHand.length);
      }
    }
  };

  const revealWinningCards = (numCards: number) => {
    setRevealIndex(0);

    for (let i = 0; i < numCards; i++) {
      setTimeout(() => {
        setRevealIndex((prev) => prev + 1);
      }, i * 1000);
    }
  };

  return (
    <div className="table">
      <div className="hand computer-hand flex justify-center mb-5">
        {computerHand.map((card, index) => (
          <Card
            key={index}
            value={card.value}
            suit={card.suit}
            faceUp={isGameOver && index < computerHand.length}
            onClick={() => {}}
          />
        ))}
      </div>

      <div className="deck">
        <Card
          key="deck"
          value="32 cartes"
          suit=""
          faceUp={false}
          onClick={() => {}}
        />
        <h3 className="text-white text-center mt-2">Paquet</h3>
      </div>

      <div className="hand player-hand flex justify-center mb-5">
        {playerHand.map((card, index) => (
          <Card
            key={index}
            value={card.value}
            suit={card.suit}
            faceUp={true}
            onClick={() => handleBlock(index)}
          />
        ))}
      </div>
      <button onClick={nextTurn} className="bg-blue-500 text-white p-2 rounded">
        Jouer le tour {turn}
      </button>
      {winner && (
        <h3 className="text-white text-center mt-4">{winner} a gagné !</h3>
      )}
    </div>
  );
};

export default Game;
