import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import globalapi from '../../services/globalapi';
import GameDescription from '../../components/GameDescription';
import PublishersList from '../../components/PublishersList';

type PublisherType = {
  id: number;
  name: string;
};

type GameInfoType = {
  id: number;
  name: string;
  description_raw: string;
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

        globalapi.getGameScreenshots(gameData.id).then(response => {
          setScreenshots(response);
        }).catch(error => {
          console.error('Error fetching screenshots:', error);
        });

      }).catch(error => {
        console.error('Error fetching game:', error);
      });
    }
  }, [slug]);

  const sliderSettings = {
    dots: false, // Remove dots from the bottom of the carousel
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  if (!gameInfo) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="relative" style={{ overflow: 'visible' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
           style={{ 
             backgroundImage: `url(${gameInfo.background_image_additional})`,
             height: '100vh',
           }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      </div>
  
      <div className="relative z-10 container mx-auto px-4 py-24 flex">
        <div className="w-1/4">
          <img src={gameInfo.background_image} alt={gameInfo.name} className="rounded shadow-lg"/>
        </div>
        <div className="w-3/4 ml-8">
          <h1 className="text-5xl text-white font-bold mb-2">{gameInfo.name}</h1>
          <h2 className="text-2xl text-white font-light mb-4">By <PublishersList publishers={gameInfo.publishers} /></h2>
          <GameDescription description={gameInfo.description_raw} />
        </div>
      </div>
  
      <div className="screenshot-container left-5 top-100 px-4 py-4 relative z-10" 
           style={{ maxWidth: '600px', maxHeight: '400px' }}> {/* Adjust size here */}
        <h3 className="text-2xl text-white font-bold mb-4">Screenshots</h3>
        <Slider {...sliderSettings}>
          {screenshots.map((screenshot) => (
            <div key={screenshot.id} className="screenshot-wrapper" 
                 style={{ height: '100%', width: '100%' }}>
              <img
                src={screenshot.image}
                alt="Game Screenshot"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GameInfo;
