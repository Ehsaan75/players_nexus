import React, { useEffect, useState, useRef } from 'react';
import globalapi from '../services/globalapi';

interface Genre {
  id: number;
  name: string;
  image_background: string;
}

interface GenreListProps {
  onGenreSelect: (id: number, name: string) => void;
}

const GenreList: React.FC<GenreListProps> = ({ onGenreSelect }) => {
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    const getGenreList = async () => {
      try {
        const response = await globalapi.getGenreList();
        if (isMounted.current) {
          setGenreList(response.data.results);
          const actionGenreIndex = response.data.results.findIndex(genre => genre.name === 'Action');
          if (actionGenreIndex !== -1) {
            setActiveIndex(actionGenreIndex);
            onGenreSelect(response.data.results[actionGenreIndex].id, "Action");
          }
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    getGenreList();

    return () => {
      isMounted.current = false;
    };
  }, [onGenreSelect]);

  return (
    <div className="sticky top-0 h-screen overflow-y-auto">
      <h2 className="text-[30px] font-bold dark:text-white">Genre</h2>
      {genreList.map((item, index) => (
        <div
          key={item.id}
          onClick={() => {
            setActiveIndex(index);
            onGenreSelect(item.id, item.name);
          }}
          className={`group flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-400 p-2 rounded-lg ${
            activeIndex === index ? "bg-gray-500" : "transparent"
          }`}
        >
          <img
            src={item.image_background}
            alt={item.name}
            className={`w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300 ${
              activeIndex === index ? "scale-105" : ""
            }`}
          />
          <h3
            className={`text-[18px] group-hover:font-bold transition-all ease-out duration-300 ${
              activeIndex === index ? "font-bold" : ""
            }`}
          >
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
