import axios from "axios";

// Instance Axios globale
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

// Interceptor pour ajouter automatiquement le Bearer si présent
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const apiClient = <T = any>(options: any) => {
    // Orval attend une fonction qui retourne une promesse
    return axiosInstance(options) as Promise<T>;
};
