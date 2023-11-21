// pages/index.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import GameGrid from '../components/GameGrid';
import { Game } from '../types';

export const getServerSideProps: GetServerSideProps = async () => {
  let gamesWithCovers: Game[] = [];
  try {
    // Fetch games data from IGDB API
    const gameResponse = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': 'kjw0tdi074j96el2in88h0a9pqg9qi',
        'Authorization': 'Bearer pm2zffxh4s9l87hro2116tj2nwpkc6',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: 'name, cover, genres.name;',
        limit: 10,
      }),
    });
    const games = await gameResponse.json();

    // Extract cover IDs from games
    const coverIds = games.map((game: Game) => game.cover?.id).filter((cid): cid is number => cid !== null && cid !== undefined);


    // Fetch covers data from IGDB API
    const coverResponse = await fetch('https://api.igdb.com/v4/covers', {
      method: 'POST',
      headers: {
        'Client-ID': 'Ykjw0tdi074j96el2in88h0a9pqg9qi',
        'Authorization': 'Bearer pm2zffxh4s9l87hro2116tj2nwpkc6',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: 'game, url;',
        limit: 10,
        where: `id = (${coverIds.join(',')})`,
      }),
    });
    const covers = await coverResponse.json();

    // Map covers to games
    gamesWithCovers = games.map(game => ({
      ...game,
      cover: covers.find(cover => cover.game === game.id),
    }));
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return {
    props: {
      games: gamesWithCovers,
    },
  };
};

const HomePage: React.FC<{ games: Game[] }> = ({ games }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Backloggd</h1>
      <GameGrid games={games} />
    </div>
  );
};

export default HomePage;
