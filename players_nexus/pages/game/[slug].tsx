import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import globalapi from "../../services/globalapi";

const GameInfo = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [gameInfo, setGameInfo] = useState<any>(null);

  useEffect(() => {
    console.log("Slug:", slug);
    if (typeof slug === "string") {
      globalapi
        .getGameBySlug(slug)
        .then((response) => {
          setGameInfo(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching game:", error);
        });
    }
  }, [slug]);

  if (!gameInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-info-container">
      <h1>{gameInfo.name}</h1>
      <p>{gameInfo.description_raw}</p> {/* Assuming the description is in 'description_raw' */}
      <a href={gameInfo.reddit_url} target="_blank" rel="noopener noreferrer">
        Reddit Discussion
      </a>
      <img
              src={gameInfo.background_image}
              className="w-full rounded-xl object-cover"
              alt={gameInfo.name}
            />
    </div>
  );
};

export default GameInfo;
