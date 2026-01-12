import { adminAxios, publicAxios } from "../../config/axiosConfig";

const ADMIN_API_URL = `/api/admin/hakkimizda`;
const PUBLIC_API_URL = `/api/hakkimizda`;


// GET – Hakkımızda metnini getir (Public API)
export const getHakkimizda = async () => {
    const response = await publicAxios.get(PUBLIC_API_URL);
    return response.data;
};

// POST – Hakkımızda metni oluştur (ilk defa) - ADMIN
export const createHakkimizda = async (data) => {
    // data: { hakkinda, adres, telefon, email }
    const response = await adminAxios.post(ADMIN_API_URL, data);
    return response.data;
};

// PUT – Hakkımızda metnini tamamen güncelle - ADMIN
export const updateHakkimizda = async (data) => {
    const response = await adminAxios.put(ADMIN_API_URL, data);
    return response.data;
};

// PATCH – Kısmi güncelleme - ADMIN
export const patchHakkimizda = async (fields) => {
    const response = await adminAxios.patch(ADMIN_API_URL, fields);
    return response.data;
};

// DELETE – Hakkımızda metnini sil - ADMIN
export const deleteHakkimizda = async () => {
    const response = await adminAxios.delete(ADMIN_API_URL);
    return response.data;
};
