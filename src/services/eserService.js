import axios from "axios";

const API_URL = "http://localhost:8080/api/eser";
const YORUM_API_URL = "http://localhost:8080/api/eser-yorum";

export const getAllEser = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// GET - ID'ye göre eser getir
export const getEserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// GET - Belirli bir esere ait yorumları getir
export const getYorumByEserId = async (eserID) => {
    const response = await axios.get(`${YORUM_API_URL}/eser/${eserID}`);
    return response.data;
};

// POST - Yeni yorum oluştur
export const createEserYorum = async (yorumData) => {
    const response = await axios.post(YORUM_API_URL, yorumData);
    return response.data;
};
