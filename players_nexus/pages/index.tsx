// HomePage component
import React, { useEffect, useState } from 'react';
import GamesByGenresId from '../components/GamesByGenresId';
import GenreList from '../components/GenreList';
import globalapi from '../services/globalapi'; // Ensure you have this import if you're using it

interface HomePageProps {
  allGameList: any[];
  gameListByGenres: any[];
  onGenreSelect: (genreId: number, genreName: string) => void; // Update the function signature
}

const HomePage: React.FC<HomePageProps> = ({ allGameList, gameListByGenres, onGenreSelect }) => {
  const shouldRenderGamesByGenreId = gameListByGenres && gameListByGenres.length > 0;

  console.log('allGameList:', allGameList);
  console.log('shouldRenderGamesByGenreId:', shouldRenderGamesByGenreId);

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-1'>
        {/* Pass onGenreSelect to the GenreList component */}
        <GenreList onGenreSelect={onGenreSelect} />
      </div>
      <div className='col-span-3'>
        <GamesByGenresId gameList={gameListByGenres} shouldRender={shouldRenderGamesByGenreId} />
      </div>
    </div>
  );
};

export default HomePage;
