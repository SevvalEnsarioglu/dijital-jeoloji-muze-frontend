import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API_URL = `${API_BASE_URL}/api/eser`;
const YORUM_API_URL = `${API_BASE_URL}/api/eser-yorum`;


export const getAllEser = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// GET - ID'ye göre eser getir
export const getEserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createEser = async (formData) => {
    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


export const updateEser = async (id, formData) => {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const deleteEser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

//ESER YORUM comment apisi

// GET - Belirli bir esere ait yorumları getir
export const getYorumByEserId = async (eserID) => {
    const response = await axios.get(`${YORUM_API_URL}/eser/${eserID}`);
    return response.data;
};

// DELETE - Yorumu sil
export const deleteEserYorum = async (id) => {
    const response = await axios.delete(`${YORUM_API_URL}/${id}`);
    return response.data;
};

// PATCH - Yorum okundu durumunu güncelle
export const updateOkunduDurumu = async (id, okundu) => {
    const response = await axios.patch(`${YORUM_API_URL}/${id}/okundu`, { okundu });
    return response.data;
};
