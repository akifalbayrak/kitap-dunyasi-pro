import axios from "axios";

const API_KEY = "fca_live_B0ZftLGW9xq4r0CmkK0KCZu78T54zNANyEUaqA7u";
// API base URL
const api = axios.create({
    baseURL: `https://api.freecurrencyapi.com/v1/latest`,
    params: {
        apikey: API_KEY,
    },
});

// Error handling interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error: ", error);
        return Promise.reject(error);
    }
);

export default api;
