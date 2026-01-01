import axios from "axios";

const API_URL = "http://localhost:8080/api/anasayfa";

// GET – tüm anasayfa componentlerini getir (public)
export const getAllAnasayfa = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
