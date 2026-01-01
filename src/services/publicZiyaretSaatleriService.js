import axios from "axios";

const API_URL = "http://localhost:8080/api/ziyaret-saatleri";

// GET – tüm ziyaret saatlerini getir (public)
export const getAllZiyaretSaatleri = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
