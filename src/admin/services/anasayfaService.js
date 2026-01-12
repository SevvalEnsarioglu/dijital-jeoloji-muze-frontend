import { adminAxios, publicAxios } from "../../config/axiosConfig";

const ADMIN_API_URL = `/api/admin/anasayfa`;
const PUBLIC_API_URL = `/api/anasayfa`;


// GET – Belirli ana sayfa componentini getir (Admin için - ID ile)
export const getAnasayfaById = async (id) => {
    const response = await publicAxios.get(`${PUBLIC_API_URL}/${id}`);
    return response.data;
};

// GET – Tüm ana sayfa componentlerini getir (Public API kullan)
export const getAllAnasayfa = async () => {
    const response = await publicAxios.get(PUBLIC_API_URL);
    return response.data;
};

// POST – Yeni component oluştur (foto + aciklama) - ADMIN
export const createAnasayfa = async (baslik, aciklama, fotoFile) => {
    const formData = new FormData();
    formData.append("baslik", baslik);
    formData.append("aciklama", aciklama);
    if (fotoFile) {
        formData.append("foto", fotoFile);
    }

    const response = await adminAxios.post(ADMIN_API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// PUT – Ana sayfa componentini güncelle - ADMIN
export const updateAnasayfa = async (id, baslik, aciklama, fotoFile) => {
    const formData = new FormData();
    formData.append("baslik", baslik);
    formData.append("aciklama", aciklama);
    if (fotoFile) {
        formData.append("foto", fotoFile);
    }

    const response = await adminAxios.put(`${ADMIN_API_URL}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// DELETE – Ana sayfa componentini sil - ADMIN
export const deleteAnasayfa = async (id) => {
    const response = await adminAxios.delete(`${ADMIN_API_URL}/${id}`);
    return response.data;
};
