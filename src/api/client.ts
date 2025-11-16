// src/api/client.ts
import axios from "axios";

const baseURL = "https://app-251116050802.azurewebsites.net";

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Opcional: interceptores para logs / errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error);
        throw error;
    }
);
