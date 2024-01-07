// HomePage.tsx
import React, { useState, useCallback } from 'react';
import GamesByGenresId from '../components/GamesByGenresId';
import GenreList from '../components/GenreList';
import Pagination from '../components/Pagination';
import globalapi from '../services/globalapi';

interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number | null;
  rating: number | null;
  slug: string;
}

const HomePage: React.FC = () => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [heading, setHeading] = useState<string>('Action Games');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const fetchGamesByPage = useCallback(async (page: number) => {
    try {
      let response;
      if (selectedGenreId !== null) {
        response = await globalapi.getGameListByGenreId(selectedGenreId, page);
      } else {
        response = await globalapi.searchGamesByName(searchQuery, page);
      }
      setGameList(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 20));
    } catch (error) {
      console.error('Error fetching games:', error);
      setGameList([]);
      setTotalPages(0);
    }
    setCurrentPage(page);
  }, [selectedGenreId, searchQuery]);

  const handleGenreSelect = useCallback((genreId: number, genreName: string) => {
    setSelectedGenreId(genreId);
    setHeading(`${genreName} Games`);
    fetchGamesByPage(1);
  }, [fetchGamesByPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSelectedGenreId(null); // Reset selected genre when search is performed
    setHeading(`Search results for '${searchQuery}'`);
    fetchGamesByPage(1);
  };

  const handlePageChange = (newPage: number) => {
    fetchGamesByPage(newPage);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <GenreList onGenreSelect={handleGenreSelect} />
      </div>
      <div className="col-span-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{heading}</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search games"
              value={searchQuery}
              onChange={handleSearchChange}
              className="text-black h-10 rounded-full px-4"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch} 
              className="h-10 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
        <GamesByGenresId gameList={gameList} shouldRender={true} />
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
