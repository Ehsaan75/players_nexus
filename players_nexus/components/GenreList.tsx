import React, { useEffect, useState } from "react";
import globalapi from "../services/globalapi";

function GenreList({ onGenreSelect }) {
  const [genreList, setGenreList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getGenreList();
    onGenreSelect(4, "Action"); // Assuming '4' is the ID for 'Action'
  }, []);

  const getGenreList = () => {
    globalapi.getGenreList().then((resp: any) => {
      setGenreList(resp.data.results);
    });
  };

  return (
    <div className="sticky top-0 h-screen overflow-y-auto">
      {" "}
      {/* Fixed height with vertical scroll */}
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
            className={`w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300 ${
              activeIndex === index ? "scale-105" : null
            }`}
          />
          <h3
            className={`text-[18px] group-hover:font-bold transition-all ease-out duration-300 ${
              activeIndex === index ? "font-bold" : null
            }`}
          >
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default GenreList;
