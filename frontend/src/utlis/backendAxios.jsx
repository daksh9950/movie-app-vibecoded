import axios from "axios";

const backendAxios = axios.create({
    baseURL: "https://movie-app-vibecoded-backend.onrender.com/api",
}); 

// Interceptor to add JWT token if available
backendAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default backendAxios;
