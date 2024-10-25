import React from "react";
import Game from "../components/game/Game";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-purple-500 text-white">
      {/* <h1 className="text-4xl font-bold mb-8">Bienvenue au Poker Simplifié</h1> */}
      <Game />
    </div>
  );
};

export default Home;
