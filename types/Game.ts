// Create a types folder if it doesn't exist and add this Game.ts file
export interface Game {
    id: number; // Use either string or number, but it must be consistent
    name: string;
    background_image: string;
    metacritic: number | null;
    rating: number | null;
    slug: string;
  }
  