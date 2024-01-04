import React from 'react';

interface Article {
  title: string;
  url: string;
  image: string;
}

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const placeholderImage = '/path-to-your-placeholder-image.jpg';

  return (
    <div 
      className="m-2 p-2 cursor-pointer w-full h-52 bg-[#76a8f75e] rounded-lg flex overflow-hidden hover:scale-105 transition-transform duration-300"
      onClick={() => window.open(article.url, '_blank')}
    >
      <img 
        src={article.image || placeholderImage} 
        alt={article.title} 
        className="w-1/2 h-full object-cover rounded-lg"
      />
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-white">{article.title}</h2>
        {/* Add more text elements here if needed */}
      </div>
    </div>
  );
};

export default NewsCard;
