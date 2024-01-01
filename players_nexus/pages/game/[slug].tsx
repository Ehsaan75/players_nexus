import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import globalapi from '../../services/globalapi';

type PublisherType = {
  id: number;
  name: string;
};

type GameInfoType = {
  id: number;
  name: string;
  description_raw: string;
  reddit_url?: string;
  background_image: string;
  background_image_additional: string;
  publishers: PublisherType[];
};

type ScreenshotType = {
  id: number;
  image: string;
};

const GameInfo = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [gameInfo, setGameInfo] = useState<GameInfoType | null>(null);
  const [screenshots, setScreenshots] = useState<ScreenshotType[]>([]);

  useEffect(() => {
    if (typeof slug === 'string') {
      globalapi.getGameBySlug(slug).then(response => {
        const gameData = response.data;
        setGameInfo(gameData);

        // Fetch game screenshots
        globalapi.getGameScreenshots(gameData.id).then(response => {
          setScreenshots(response);
        });
      }).catch(error => {
        console.error('Error fetching game:', error);
      });
    }
  }, [slug]);

  if (!gameInfo) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const renderDescription = () => {
    return (
      <div 
        style={{ maxHeight: '200px', overflowY: 'auto', borderRadius: '10px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} 
        className="description-scrollbar"
      >
        {gameInfo.description_raw}
      </div>
    );
  };

  const renderPublishers = () => {
    if (gameInfo?.publishers.length > 0) {
      return gameInfo.publishers.map((publisher, index) => (
        <span key={publisher.id} className="font-bold">
          {publisher.name}{index < gameInfo.publishers.length - 1 ? ', ' : ''}
        </span>
      ));
    }
    return 'Unknown Publisher';
  };

  const renderScreenshots = () => {
    return (
      <>
        <h3 className="text-2xl text-white font-bold mb-4">Screenshots</h3>
        <div className="grid grid-cols-2 gap-4">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.id}
              className={`screenshot-wrapper rounded-lg w-full h-auto object-contain ${index < 2 ? 'debug-border' : ''}`}
              // Add debug styles here to help visualize the container
              style={{ border: index < 2 ? '2px solid red' : '' }}
            >
              <img
                src={screenshot.image}
                alt="Game Screenshot"
                className="rounded-lg w-full h-auto"
              />
            </div>
          ))}
        </div>
      </>
    );
  };
  
  
  return (
    <div className="relative" style={{ overflow: 'visible' }}>
      {/* Background image container with fixed viewport height */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
           style={{ 
             backgroundImage: `url(${gameInfo.background_image_additional})`,
             height: '100vh', // Fixed height to the viewport height
           }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      </div>
  
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex">
        <div className="w-1/4">
          <img src={gameInfo.background_image} alt={gameInfo.name} className="rounded shadow-lg"/>
        </div>
        <div className="w-3/4 ml-8">
          <h1 className="text-5xl text-white font-bold mb-2">{gameInfo.name}</h1>
          <h2 className="text-xl text-white font-light mb-4">By {renderPublishers()}</h2>
          <div className="text-white text-lg mb-4">{renderDescription()}</div>
          {gameInfo.reddit_url && (
            <a href={gameInfo.reddit_url}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-500 underline">
              Reddit Discussion
            </a>
          )}
        </div>
      </div>
  
      {/* Screenshot container */}
      <div className="screenshot-container mx-auto px-4 py-4 relative z-10">
        <h3 className="text-2xl text-white font-bold mb-4">Screenshots</h3>
        <div className="grid grid-cols-2 gap-4">
          {screenshots.map((screenshot) => (
            <div key={screenshot.id} className="screenshot-wrapper rounded-lg overflow-hidden">
              <img
                src={screenshot.image}
                alt="Game Screenshot"
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default GameInfo;
