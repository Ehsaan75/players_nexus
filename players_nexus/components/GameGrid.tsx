// src/components/GameGrid.tsx
import React from "react";
import GameCard from "./GameCard";
import { Game } from "../types";

const GameGrid: React.FC<{ games: Game[] }> = ({ games }) => {
  // Add a check to ensure 'games' is an array
  if (!Array.isArray(games)) {
    console.error("Expected games to be an array, but got:", games);
    return null; // or return an appropriate fallback UI
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

GameGrid.defaultProps = {
  games: [],
};

export default GameGrid;
