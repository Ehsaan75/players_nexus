import axios from 'axios';

const key = "28d6216eb05f43f3b295202c43d3a81e"; // Your API key
const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api'
});

const getGames = () => {
    return axiosInstance.get('games?key='+key);
}

export default getGames;

