import React from 'react';

const StoreLinks = ({ storeLinks }) => {
  return (
    <div className="ml-8">
      <h3 className="text-xl text-white font-bold mb-2">Purchase Options:</h3>
      <ul className="list-disc text-white ml-4">
        {storeLinks.map((store: { link: string | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <li key={index}>
            <a href={store.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {store.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreLinks;
