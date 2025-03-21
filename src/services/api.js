import axios from "axios";

// API base URL
const api = axios.create({
    baseURL: "https://api.exchangerate-api.com/v4/latest/", // Örnek dış API
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
