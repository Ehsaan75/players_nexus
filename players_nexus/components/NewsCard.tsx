// NewsCard.tsx
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
  const placeholderImage = '/path-to-your-placeholder-image.jpg'; // Replace with your placeholder image path

  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid black', cursor: 'pointer', maxWidth: '300px' }}
         onClick={() => window.open(article.url, '_blank')}>
      <img src={article.image || placeholderImage} alt={article.title} style={{ width: '100%', height: 'auto' }} />
      <h2>{article.title}</h2>
      {/* Add more article details here if needed */}
    </div>
  );
};

export default NewsCard;
