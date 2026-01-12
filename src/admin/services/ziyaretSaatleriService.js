import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API_URL = `${API_BASE_URL}/api/ziyaret-saatleri`;


// GET – Tüm ziyaret saatlerini getir (Public API)
export const getAllZiyaretSaatleri = async () => {
    const response = await publicAxios.get(PUBLIC_API_URL);
    return response.data;
};

// POST – Yeni ziyaret saati oluştur - ADMIN
export const createZiyaretSaatleri = async (data) => {
    const response = await adminAxios.post(ADMIN_API_URL, data);
    return response.data;
};

// PUT – Ziyaret saatini güncelle - ADMIN
export const updateZiyaretSaatleri = async (id, data) => {
    const response = await adminAxios.put(`${ADMIN_API_URL}/${id}`, data);
    return response.data;
};

// DELETE – Ziyaret saatini sil - ADMIN
export const deleteZiyaretSaatleri = async (id) => {
    const response = await adminAxios.delete(`${ADMIN_API_URL}/${id}`);
    return response.data;
};
