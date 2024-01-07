import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import globalapi from "../services/globalapi";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import LoadingCircle from "../components/LoadingCircle";

interface Game {
  id: number;
  name: string;
  // Define other properties you expect from your API response
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const [allGameList, setAllGameList] = useState<Game[]>([]);
  const [gameListByGenres, setGameListByGenres] = useState<Game[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllGamesList();
  }, []);

  const getAllGamesList = async () => {
    setIsLoading(true);
    try {
      const response = await globalapi.getGames();
      setAllGameList(response.data.results);
      console.log('Initial games loaded', response.data.results);
    } catch (error) {
      console.error("Error fetching initial games:", error);
    }
    setIsLoading(false);
  };

  const loadMoreItems = useCallback(async () => {
    if (isLoading || router.pathname !== '/') {
      console.log("Loading aborted: already loading or not on homepage", { currentPage, isLoading });
      return;
    }

    console.log("Attempting to load more items", { currentPage });
    setIsLoading(true);
    const nextPage = currentPage + 1;

    try {
      let response;
      if (selectedGenreId) {
        console.log(`Fetching games by genre id ${selectedGenreId} for page ${nextPage}`);
        response = await globalapi.getGameListByGenreId(selectedGenreId, nextPage);
      } else {
        console.log(`Fetching general list of games for page ${nextPage}`);
        response = await globalapi.getGames(nextPage);
      }

      if (response.data.results.length > 0) {
        setGameListByGenres(prevGames => {
          const updatedGameList = [...prevGames, ...response.data.results];
          console.log('New games loaded', updatedGameList);
          return updatedGameList;
        });
        setCurrentPage(nextPage);
        console.log("Current page set to", nextPage);
      } else {
        console.log("No additional games to load or end of results reached");
      }
    } catch (error) {
      console.error("Error while fetching more games:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedGenreId, currentPage, isLoading, router.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
        router.pathname === '/' &&
        !isLoading // Ensure we are not already loading
      ) {
        console.log("Triggering loadMoreItems due to scroll position");
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, router.pathname, loadMoreItems]);

  const handleGenreSelect = useCallback((genreId: number, genreName: string) => {
    console.log(`Genre selected: ${genreName} with ID ${genreId}`);
    setSelectedGenreId(genreId);
    setCurrentPage(1);
    setIsLoading(true);
    globalapi.getGameListByGenreId(genreId)
      .then(response => {
        setGameListByGenres(response.data.results);
        console.log(`Games by genre ${genreName} loaded`, response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching games by genre ${genreName}:`, error);
        setIsLoading(false);
      });
  }, []);

  const homePageProps = {
    allGameList,
    gameListByGenres,
    onGenreSelect: handleGenreSelect,
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
