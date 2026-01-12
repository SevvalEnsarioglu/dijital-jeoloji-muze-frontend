import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API_URL = `${API_BASE_URL}/api/anasayfa`;

// GET – Tüm ana sayfa componentlerini getir
export const getAllAnasayfa = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// GET – Belirli ana sayfa componentini getir
export const getAnasayfaById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// POST – Yeni component oluştur (foto + aciklama)
export const createAnasayfa = async (baslik, aciklama, fotoFile) => {
    const formData = new FormData();
    formData.append("baslik", baslik);
    formData.append("aciklama", aciklama);
    if (fotoFile) {
        formData.append("foto", fotoFile);
    }

    const response = await axios.post(API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// PUT – Ana sayfa componentini güncelle
export const updateAnasayfa = async (id, baslik, aciklama, fotoFile) => {
    const formData = new FormData();
    formData.append("baslik", baslik);
    formData.append("aciklama", aciklama);
    if (fotoFile) {
        formData.append("foto", fotoFile);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// DELETE – Ana sayfa componentini sil
export const deleteAnasayfa = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
