import React, { useState, useEffect, Fragment } from 'react';
import globalapi from '../services/globalapi'; // Adjust the import path if necessary


function Games() {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    // Define the async function within the useEffect
    const fetchGames = async () => {
      try {
        const response = await globalapi.getGames(); 
        setGamesData(response.data.results); // Assuming the API response has a 'results' field with the games data
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };
    // Call the function
    fetchGames();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Fragment>
        {gamesData.map((game) => {
            return (
                <Fragment>
                    <div id = 'container'>
                        <img src={game.background_image}/>
                        <h3>{game.name}</h3>
                    </div>
                </Fragment>
            )
        })}
    </Fragment>
  );
}

export default Games;
