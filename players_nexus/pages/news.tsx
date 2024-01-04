import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import NewsHeading from '../components/NewsHeading';

interface Article {
  title: string;
  url: string;
  image: string;
}

const fetchGamingNews = async (category: string): Promise<Article[]> => {
  const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
  const response = await axios.get('https://gnews.io/api/v4/search', {
    params: {
      q: category,
      token: apiKey,
      lang: 'en',
      country: 'us',
      max: 10
    }
  });

  return response.data.articles;
};

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('gaming');

  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchGamingNews(currentCategory);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error(`Error fetching ${currentCategory} news:`, error);
      }
    };

    getArticles();
  }, [currentCategory]);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  const categories = ['Gaming', 'PlayStation', 'Xbox', 'Nintendo', 'PC'];

  return (
    <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8 pt-6">
      <div className="flex justify-center mb-4 gap-4">
        {categories.map((category) => (
          <NewsHeading 
            key={category}
            title={category}
            isActive={currentCategory === category}
            onClick={() => handleCategoryChange(category)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default News;
