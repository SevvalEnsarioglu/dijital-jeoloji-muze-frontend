import axios from "axios";
import { API_BASE_URL } from "../../config/api";
const ADMIN_API_URL = `/api/admin/eser`;
const PUBLIC_API_URL = `/api/eser`;
const YORUM_API_URL = `/api/eser-yorum`;

// GET - Tüm eserleri getir (Public API)
export const getAllEser = async () => {
    const response = await publicAxios.get(PUBLIC_API_URL);
    return response.data;
};

// GET - ID'ye göre eser getir (Public API)
export const getEserById = async (id) => {
    const response = await publicAxios.get(`${PUBLIC_API_URL}/${id}`);
    return response.data;
};

// POST - Yeni eser oluştur - ADMIN
export const createEser = async (formData) => {
    const response = await adminAxios.post(ADMIN_API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// PUT - Eser güncelle - ADMIN
export const updateEser = async (id, formData) => {
    const response = await adminAxios.put(`${ADMIN_API_URL}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// DELETE - Eser sil - ADMIN
export const deleteEser = async (id) => {
    const response = await adminAxios.delete(`${ADMIN_API_URL}/${id}`);
    return response.data;
};

//ESER YORUM comment apisi

// GET - Belirli bir esere ait yorumları getir (Public API)
export const getYorumByEserId = async (eserID) => {
    const response = await publicAxios.get(`${YORUM_API_URL}/eser/${eserID}`);
    return response.data;
};

// DELETE - Yorumu sil - ADMIN
export const deleteEserYorum = async (id) => {
    const response = await adminAxios.delete(`${YORUM_API_URL}/${id}`);
    return response.data;
};

// PATCH - Yorum okundu durumunu güncelle - ADMIN
export const updateOkunduDurumu = async (id, okundu) => {
    const response = await adminAxios.patch(`${YORUM_API_URL}/${id}/okundu`, { okundu });
    return response.data;
};
