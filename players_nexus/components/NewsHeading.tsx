// NewsHeading.tsx
import React from 'react';

interface NewsHeadingProps {
  title: string;
  onClick: () => void;
}

const NewsHeading: React.FC<NewsHeadingProps> = ({ title, onClick }) => {
  return (
    <h2 onClick={onClick} style={{ cursor: 'pointer' }}>
      {title}
    </h2>
  );
};

export default NewsHeading;
