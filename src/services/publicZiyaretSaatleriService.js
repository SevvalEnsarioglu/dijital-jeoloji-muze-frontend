import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/ziyaret-saatleri`;

// GET – tüm ziyaret saatlerini getir (public)
export const getAllZiyaretSaatleri = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
