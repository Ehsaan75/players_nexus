import React from 'react';

interface PublisherType {
  id: number;
  name: string;
}

interface PublishersListProps {
  publishers: PublisherType[];
}

const PublishersList: React.FC<PublishersListProps> = ({ publishers }) => {
  const renderPublishers = () => {
    if (publishers.length > 0) {
      // Only rendering the first publisher
      const publisher = publishers[0];
      return <span key={publisher.id} className="font-bold">{publisher.name}</span>;
    }
    return 'Unknown Publisher';
  };

  // Changed to a span for inline rendering
  return <span>{renderPublishers()}</span>;
};

export default PublishersList;
