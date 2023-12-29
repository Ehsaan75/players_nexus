import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import globalapi from "../services/globalapi";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import LoadingCircle from "../components/LoadingCircle";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenres, setGameListByGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [selectedGenreName, setSelectedGenreName] = useState("Action");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Load games list when the app starts
  useEffect(() => {
    getAllGamesList();
  }, []);

  // Logic for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
        isLoading
      ) return;
      loadMoreItems();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, selectedGenreId, currentPage]);

  const getAllGamesList = async () => {
    setIsLoading(true);
    try {
      const response = await globalapi.getGames();
      setAllGameList(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setIsLoading(false);
    }
  };

  const loadMoreItems = useCallback(() => {
    setIsLoading(true);
    setCurrentPage(prevPage => prevPage + 1);
    globalapi.getGameListByGenreId(selectedGenreId, currentPage + 1)
      .then(response => {
        setGameListByGenres(prevGames => [...prevGames, ...response.data.results]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching more games by genre:", error);
        setIsLoading(false);
      });
  }, [selectedGenreId, currentPage]);

  const handleGenreSelect = useCallback((genreId: number, genreName: string) => {
    setSelectedGenreId(genreId);
    setSelectedGenreName(genreName);
    setCurrentPage(1); // Reset the page count
    setIsLoading(true);

    globalapi.getGameListByGenreId(genreId)
      .then(response => {
        setGameListByGenres(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching games by genre:", error);
        setIsLoading(false);
      });
  }, []);

  // Prepare page props for the HomePage
  const homePageProps = {
    allGameList,
    gameListByGenres,
    onGenreSelect: handleGenreSelect,
    selectedGenreName,
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      {router.pathname === '/' ? (
        <Component {...pageProps} {...homePageProps} />
      ) : (
        <Component {...pageProps} />
      )}
      {isLoading && <LoadingCircle />}
    </div>
  );
}

export default MyApp;
