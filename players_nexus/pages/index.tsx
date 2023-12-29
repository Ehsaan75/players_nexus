// HomePage component
import React, { useEffect, useState } from "react";
import GamesByGenresId from "../components/GamesByGenresId";
import GenreList from "../components/GenreList";
import globalapi from "../services/globalapi"; // Ensure you have this import if you're using it

interface HomePageProps {
  allGameList: any[];
  gameListByGenres: any[];
  onGenreSelect: (genreId: number, genreName: string) => void;
  selectedGenreName: string;
}

const HomePage: React.FC<HomePageProps> = ({
  allGameList,
  gameListByGenres,
  onGenreSelect,
  selectedGenreName,
}) => {
  const shouldRenderGamesByGenreId =
    gameListByGenres && gameListByGenres.length > 0;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <GenreList onGenreSelect={onGenreSelect} />
      </div>
      <div className="col-span-3">
        <GamesByGenresId
          gameList={gameListByGenres}
          shouldRender={shouldRenderGamesByGenreId}
          selectedGenreName={selectedGenreName} // Pass the selected genre name to GamesByGenresId
        />
      </div>
    </div>
  );
};

export default HomePage;
