import React from 'react';

type StoreType = {
  id: number;
  url: string;
};

type StoreLinksProps = {
  stores: StoreType[];
};

const StoreLinks: React.FC<StoreLinksProps> = ({ stores }) => {
  const getPlatformName = (url: string) => {
    if (/playstation\.com/.test(url)) return 'PlayStation';
    if (/xbox\.com/.test(url)) return 'Xbox';
    if (/nintendo\.com/.test(url)) return 'Nintendo';
    if (/steampowered\.com/.test(url)) return 'Steam';
    if (/gog\.com/.test(url)) return 'GOG';
    if (/epicgames\.com/.test(url)) return 'Epic Games'; // Changed here
    if (/play.google\.com/.test(url)) return 'Google Play'; // Changed here
    if (/apple\.com/.test(url)) return 'Apple';
    return 'Unknown';
  };

  const getPlatformIcon = (platformName: string) => {
    // Handle special cases for 'Epic Games' and 'Google Play'
    let iconName = platformName.toLowerCase().replace(/\s/g, '');
    return `/images/${iconName}.png`; // Path to icon images
  };

  return (
    <aside className="store-links bg-black bg-opacity-30 p-4 rounded-lg">
      <h3 className="text-xl text-white mb-4">Available Stores:</h3>
      <ul>
        {stores.map((store) => {
          const platformName = getPlatformName(store.url);
          if (platformName === 'Unknown') return null; // Do not display 'Unknown' platforms

          const iconSrc = getPlatformIcon(platformName);
          return (
            <li key={store.id} className="mb-2 flex items-center">
              <img src={iconSrc} alt={platformName} className="h-6 w-6 mr-2" />
              <a href={store.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                {platformName}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default StoreLinks;
