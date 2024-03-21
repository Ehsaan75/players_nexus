// pages/_app.tsx
import React, { useEffect, useState, useCallback } from "react";
import { AppProps } from "next/app";
import { Session } from "next-auth";  // Import the Session type from next-auth
import SessionProvider from "./SessionProvider";
import Navbar from "../components/Navbar"; // Update the path if necessary
import LoadingCircle from "../components/LoadingCircle"; // Update the path if necessary
import globalapi from "../services/globalapi"; // Update the path if necessary
import "../styles/tailwind.css"; // Update the path if necessary

interface Game {
  id: number;
  name: string;
  // Add other properties as needed
}

interface MyAppProps extends AppProps {
  pageProps: {
    session?: Session;
    // ... other properties of pageProps
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: MyAppProps) {
  const [allGameList, setAllGameList] = useState<Game[]>([]);
  const [gameListByGenres, setGameListByGenres] = useState<Game[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    getAllGamesList();
    return () => {
      setIsMounted(false);
    };
  }, []);

  const getAllGamesList = async () => {
    setIsLoading(true);
    try {
      const response = await globalapi.getGames();
      if (isMounted) {
        setAllGameList(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching initial games:", error);
    }
    setIsLoading(false);
  };

  const handleGenreSelect = useCallback((genreId: number, genreName: string) => {
    setSelectedGenreId(genreId);
    setIsLoading(true);
    globalapi.getGameListByGenreId(genreId)
      .then(response => {
        if (isMounted) {
          setGameListByGenres(response.data.results);
        }
      })
      .catch(error => {
        console.error(`Error fetching games by genre ${genreName}:`, error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });
  }, [isMounted]);

  const homePageProps = {
    allGameList,
    gameListByGenres,
    onGenreSelect: handleGenreSelect,
  };

  const isSignInPage = router.pathname === '/signin'; // Adjust this to your sign-in page's path

  return (
    <SessionProvider session={session}>
      <div className="bg-gray-900 text-white min-h-screen">
        {!isSignInPage && <Navbar />} {/* Conditionally render Navbar */}
        <Component {...pageProps} {...(isSignInPage ? {} : homePageProps)} />
        {isLoading && <LoadingCircle />}
      </div>
    </SessionProvider>
  );
}

export default MyApp;
