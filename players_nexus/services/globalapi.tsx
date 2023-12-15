import axios from 'axios';

const key = process.env.NEXT_PUBLIC_API_KEY; // Your API key
const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api'
});

const getGames = async () => {
    try {
        const response = await axiosInstance.get(`/games?key=${key}`);        
        return response;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error; // Re-throw the error if you want to handle it later as well
    }
}

const getGenreList = async () => {
    try {
        const response = await axiosInstance.get(`/genres?key=${key}`);        
        return response;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error; // Re-throw the error if you want to handle it later as well
    }
}

const getGameListByGenreId = (genreId: number) => {
    return axiosInstance.get(`/games?key=${key}&genres=${genreId}`);
  };



export default { getGames, getGenreList, getGameListByGenreId};
