// components/NewsCard.tsx

import React from 'react';
import Image from 'next/image';

interface Article {
  title: string;
  url: string;
  image: string;
}

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const placeholderImage = '/no-image.jpg'; // Use a default image if no image is found

  const getImageSrc = () => {
    return article.image ? `/api/image?url=${encodeURIComponent(article.image)}` : placeholderImage;
  };

  return (
    <div
      className="m-2 p-2 cursor-pointer w-full h-52 bg-[#76a8f75e] rounded-lg flex overflow-hidden hover:scale-105 transition-transform duration-300"
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="w-1/2 h-full relative rounded-lg">
        <Image
          src={getImageSrc()}
          alt={article.title}
          layout="fill" // This will maintain aspect ratio while filling the parent element
          objectFit="cover" // Keeps the image aspect ratio and fills the div
          className="rounded-lg"
        />
      </div>
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-white">{article.title}</h2>
        {/* Add more text elements here if needed */}
      </div>
    </div>
  );
};

export default NewsCard;
