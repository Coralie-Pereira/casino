// ----------- Représente une carte ---------

import React from "react";
import { CardType } from "../../type/types";
import { motion } from "framer-motion";

interface CardProps {
  value: string;
  suit: string;
  faceUp: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, suit, faceUp, onClick }) => {
  return (
    <motion.div
      className={`card ${faceUp ? "" : "flipped"}`}
      onClick={onClick}
      animate={{ rotateY: faceUp ? 0 : 180 }}
      transition={{ duration: 0.5 }}
    >
      {faceUp ? `${value} of ${suit}` : "?"}
    </motion.div>
  );
};

export default Card;
