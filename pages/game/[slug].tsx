// GameInfo.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import StoreLinks from '../../components/StoreLinks'; // Ensure this path is correct
import GameDescription from '../../components/GameDescription';
import PublishersList from '../../components/PublishersList';
import RatingReviewModal from '../../components/RatingReviewModal'; // Make sure to create this component
import globalapi from '../../services/globalapi';
import useCurrentUser from '../../hooks/useCurrentUser';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type PublisherType = {
  id: number;
  name: string;
};

type StoreType = {
  id: number;
  url: string;
};

type GameInfoType = {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  background_image_additional: string;
  publishers: PublisherType[];
  reddit_url?: string;
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
  const [stores, setStores] = useState<StoreType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useCurrentUser();
  const userId = currentUser?.uid; // get the user ID from the current user object

  useEffect(() => {
    if (typeof slug === 'string' && userId) {
      globalapi.getGameBySlug(slug).then(response => {
        const gameData = response.data;
        setGameInfo(gameData);

        globalapi.getGameScreenshots(gameData.id).then(response => {
          setScreenshots(response);
        }).catch(error => {
          console.error('Error fetching screenshots:', error);
        });

        globalapi.getGameStores(slug).then(storeLinks => {
          setStores(storeLinks);
        }).catch(error => {
          console.error('Error fetching store links:', error);
        });

      }).catch(error => {
        console.error('Error fetching game:', error);
      });
    }
  }, [slug, userId]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  const handleReviewSubmit = async (review: any) => {
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...review, userId, gameId: gameInfo?.id }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setShowModal(false); // Close the modal on success
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to submit rating: ', error);
    }
  };

  if (!gameInfo) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="relative overflow-visible">
      {/* Background image and gradient overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
           style={{ backgroundImage: `url(${gameInfo.background_image_additional})`, height: '100vh' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      </div>
  
      {/* Game details and store links */}
      <div className="relative container mx-auto px-4 py-24 flex flex-wrap lg:flex-nowrap">
        {/* Game image */}
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 relative">
        <div className="relative" style={{ height: '400px' }}> {/* Set the desired height */}
    <Image 
      src={gameInfo.background_image} 
      alt={gameInfo.name} 
      layout="fill"
      objectFit="cover" // Adjust as needed
      className="rounded shadow-lg"
    />
  </div>
          {/* Place the button right under the image */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Rate/Review
          </button>
        </div>
        
        {/* Game information */}
        <div className="w-full lg:w-1/2 lg:ml-8 mb-4 lg:mb-0">
          <h1 className="text-3xl lg:text-5xl text-white font-bold mb-2">{gameInfo.name}</h1>
          <h2 className="text-xl lg:text-2xl text-white font-light mb-4 flex items-center justify-center lg:justify-start">
            By <span className="ml-1"><PublishersList publishers={gameInfo.publishers}/></span>
            {gameInfo.reddit_url && (
              <a href={gameInfo.reddit_url} target="_blank" rel="noopener noreferrer" className="ml-2">
                  <div className="relative w-6 h-6"> {/* Set the width and height */}
      <Image src="/images/reddit_logo.png" alt="Reddit Logo" layout="fill" objectFit="cover" />
    </div>
              </a>
            )}
          </h2>
          <GameDescription description={gameInfo.description_raw} />
        </div>
  
        {/* Store links */}
        <div className="w-full lg:w-1/4 lg:ml-4 mb-4 lg:mb-0">
          <StoreLinks stores={stores} />
        </div>
      </div>
  
      {/* Screenshot carousel */}
      <div className="flex justify-center items-center py-4 relative" style={{ maxWidth: '1000px', margin: '0 auto', marginTop: '-50px' }}>
        <div className="w-full lg:w-3/4 mx-auto">
          <h3 className="text-2xl text-white font-bold mb-4 text-center">Screenshots</h3>
          <Slider {...sliderSettings} className="screenshot-carousel">
            {screenshots.map((screenshot) => (
              <div key={screenshot.id} className="flex justify-center">
                <div className="relative w-full" style={{ height: '500px' }}> {/* Adjust height as needed */}
    <Image
      src={screenshot.image}
      alt="Game Screenshot"
      layout="fill"
      objectFit="cover"
      className="rounded-lg"
    />
  </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Rating Review Modal */}
      <RatingReviewModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        onSubmit={handleReviewSubmit}
        gameId={gameInfo?.id} // Pass the game ID to the modal
        userId={userId} // Pass the user ID to the modal
      />
    </div>
  );
};

export default GameInfo;
