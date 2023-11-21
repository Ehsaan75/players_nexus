// components/GameCard.tsx
import React from 'react';
import { Game } from '../types';

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const imageUrl = game.cover?.url || '/images/default-cover.jpg'; // Use the actual default image path

  return (
    <div className="game-card bg-gray-800 rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt={game.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{game.name}</div>
        {/* You can add more game details here */}
      </div>
    </div>
  );
};

export default GameCard;
