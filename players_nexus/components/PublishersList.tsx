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
      return publishers.map((publisher, index) => (
        <span key={publisher.id} className="font-bold">
          {publisher.name}{index < publishers.length - 1 ? ', ' : ''}
        </span>
      ));
    }
    return 'Unknown Publisher';
  };

  // Changed to a span for inline rendering
  return <span>{renderPublishers()}</span>;
};

export default PublishersList;
