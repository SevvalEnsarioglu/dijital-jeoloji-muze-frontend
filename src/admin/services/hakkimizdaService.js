import axios from "axios";

const API_URL = "http://localhost:8080/api/hakkimizda";

// GET – Hakkımızda metnini getir
export const getHakkimizda = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// POST – Hakkımızda metni oluştur (ilk defa)
export const createHakkimizda = async (title, content) => {
    const response = await axios.post(API_URL, {
        title,
        content
    });
    return response.data;
};

// PUT – Hakkımızda metnini tamamen güncelle
export const updateHakkimizda = async (title, content) => {
    const response = await axios.put(API_URL, {
        title,
        content
    });
    return response.data;
};

// PATCH – Hakkımızda kısmi güncelleme
export const patchHakkimizda = async (fields) => {
    // örnek fields: { title: "Yeni Başlık" }
    const response = await axios.patch(API_URL, fields);
    return response.data;
};

// DELETE – Hakkımızda metnini sil
export const deleteHakkimizda = async () => {
    const response = await axios.delete(API_URL);
    return response.data;
};
