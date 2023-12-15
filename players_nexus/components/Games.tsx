import React, { Fragment, useEffect, useState } from 'react';
import globalapi from '../services/globalapi';


function Games() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    globalapi.getGames()
      .then((response) => {
        console.log(response.data);
        setGames(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching games:', error);
      });
  }, []);

  return (
    <div >
      <div className="movies-container">
        {games.map((game) => (
          <div key={game.id} id='container'>
            <img src={game.background_image} alt={game.name} />
            <h3 className= "text-white">{game.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
