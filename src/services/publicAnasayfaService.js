import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/api/anasayfa`;

// GET – tüm anasayfa componentlerini getir (public)
export const getAllAnasayfa = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
