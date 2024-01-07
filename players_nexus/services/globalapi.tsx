// globalapi.js
import axios from "axios";

const key = process.env.NEXT_PUBLIC_API_KEY; // Your API key
const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
});

const getGames = async (page: number = 1) => {
  const response = await axiosInstance.get(`/games?key=${key}&page=${page}&page_size=20`);
  return response;
};

const getGenreList = async () => {
  const response = await axiosInstance.get(`/genres?key=${key}`);
  return response;
};

const getGameListByGenreId = async (genreId: number, page: number = 1) => {
  const response = await axiosInstance.get(`/games?key=${key}&genres=${genreId}&page=${page}&page_size=20`);
  return response;
};

const getGameBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/games/${slug}?key=${key}`);
  return response;
};

const getGameScreenshots = async (gameId: number) => {
  const response = await axiosInstance.get(`/games/${gameId}/screenshots?key=${key}`);
  return response.data.results;
};

const getGameTrailer = async (gameId: number) => {
  const response = await axiosInstance.get(`/games/${gameId}/movies?key=${key}`);
  return response.data.results;
};

const searchGamesByName = async (query: string, page: number = 1) => {
  const response = await axiosInstance.get(`/games?key=${key}&search=${query}&page=${page}&page_size=20`);
  return response;
};

export default { 
  getGames, 
  getGenreList, 
  getGameListByGenreId, 
  getGameBySlug, 
  getGameScreenshots, 
  getGameTrailer,
  searchGamesByName
};
