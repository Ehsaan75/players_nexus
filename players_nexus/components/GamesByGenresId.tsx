import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Game {
  id: string;
  slug: string;
  name: string;
  background_image: string;
  metacritic: number | null;
  rating: number | null;
}

interface GamesByGenresIdProps {
  gameList?: Game[];
  shouldRender?: boolean;
  selectedGenreName?: string;
}

const GamesByGenresId: React.FC<GamesByGenresIdProps> = ({
  gameList = [],
  shouldRender = false,
  selectedGenreName = 'Action',
}) => {
  const router = useRouter();

  const navigateToGame = (slug: string) => {
    router.push(`/game/${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    console.log("GameList", gameList);
  }, [gameList]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div>
      <h2 className='text-[30px] font-bold mb-6'>{selectedGenreName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {gameList.map((item) => (
          <div 
            key={item.id}
            className="bg-[#76a8f75e] p-3 rounded-lg h-full hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
            onClick={() => navigateToGame(item.slug)}
          >
            <img
              src={item.background_image}
              className="w-full h-80 rounded-xl object-cover mb-4"
              alt={item.name}
            />
            <h3 className="text-lg font-bold text-white">
              {item.name}
              <span className="p-1 rounded-sm ml-2 text-[12px] bg-green-100 text-green-700 font-medium">
                {item.metacritic !== null && item.metacritic !== undefined ? item.metacritic : 'N/A'}
              </span>
            </h3>
            <p className="font-bold">
              ⭐️{item.rating ? item.rating : 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesByGenresId;
