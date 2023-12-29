const functions = require("firebase-functions");
const axios = require("axios");

const key = functions.config().rawg.apikey; // Store your API key in Firebase config

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
});

exports.getGames = functions.https.onCall(async (data, context) => {
  try {
    const response = await axiosInstance.get(`/games?key=${key}`);
    return response.data;
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Similar functions for getGenreList and getGameListByGenreId
