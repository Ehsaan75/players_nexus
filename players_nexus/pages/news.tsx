// News.tsx
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
      max: 20
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

  return (
    <div>
      <NewsHeading title="Games" onClick={() => handleCategoryChange('gaming')} />
      <NewsHeading title="PlayStation" onClick={() => handleCategoryChange('PlayStation')} />
      <NewsHeading title="Xbox" onClick={() => handleCategoryChange('Xbox')} />
      <NewsHeading title="Nintendo" onClick={() => handleCategoryChange('Nintendo')} />
      <NewsHeading title="PC" onClick={() => handleCategoryChange('PC')} />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default News;
