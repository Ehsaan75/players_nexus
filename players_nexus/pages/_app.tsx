// App component
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import globalapi from '../services/globalapi';
import { AppProps } from 'next/app';
import HomePage from '../pages/index';

import '../styles/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenres, setGameListByGenres] = useState([]);
  const [selectedGenresName, setSelectedGenresName] = useState('Action');

  useEffect(() => {
    console.log('useEffect in App component');
    getAllGamesList();
  }, []);

  const getAllGamesList = () => {
    globalapi.getGames()
      .then((resp: any) => {
        setAllGameList(resp.data.results);
      })
      .catch((error: any) => {
        console.error("Error fetching games:", error);
      });
  };

  const handleGenreSelect = (genreId: number, genreName: string) => {
    globalapi.getGameListByGenreId(genreId)
      .then((resp: any) => {
        setGameListByGenres(resp.data.results);
        setSelectedGenresName(`${genreName} Games`);
      })
      .catch((error: any) => {
        console.error("Error fetching games by genre:", error);
      });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <HomePage {...pageProps} allGameList={allGameList} gameListByGenres={gameListByGenres} onGenreSelect={handleGenreSelect} selectedGenreName={selectedGenresName} />
    </div>
  );
}

export default App;
