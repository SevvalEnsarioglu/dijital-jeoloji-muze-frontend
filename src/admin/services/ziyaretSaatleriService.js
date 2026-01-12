import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API_URL = `${API_BASE_URL}/api/ziyaret-saatleri`;

// GET – Tüm ziyaret saatlerini getir
export const getAllZiyaretSaatleri = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// POST – Yeni ziyaret saati oluştur
export const createZiyaretSaatleri = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

// PUT – Ziyaret saatini güncelle
export const updateZiyaretSaatleri = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

// DELETE – Ziyaret saatini sil
export const deleteZiyaretSaatleri = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
