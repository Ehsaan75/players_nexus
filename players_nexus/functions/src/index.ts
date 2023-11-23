const functions = require('firebase-functions');
const axios = require('axios');

const key = "28d6216eb05f43f3b295202c43d3a81e"; // Your API key
const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api'
});

const getGames = () => {
    return axiosInstance.get('games?key='+key);
}

exports.fetchGames = functions.https.onRequest((_request: any, response: { json: (arg0: any) => any; status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): any; new(): any; }; }; }) => {
    getGames()
        .then((res: { data: any; }) => response.json(res.data))
        .catch((error: any) => response.status(500).send(error));
});
