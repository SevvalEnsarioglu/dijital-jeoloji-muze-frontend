import { adminAxios, publicAxios } from "../../config/axiosConfig";

const ADMIN_API_URL = `/api/admin/iletisim`;
const PUBLIC_API_URL = `/api/iletisim`;

// GET – Tüm iletişim mesajlarını getir (Admin)
export const getAllMessages = async () => {
    const response = await adminAxios.get(ADMIN_API_URL);
    return response.data;
};

// GET – Belirli bir mesajı getir (Admin)
export const getMessageById = async (id) => {
    const response = await adminAxios.get(`${ADMIN_API_URL}/${id}`);
    return response.data;
};

// POST – Yeni iletişim mesajı gönder (Public - kullanıcılar için)
export const sendMessage = async (data) => {
    const response = await publicAxios.post(PUBLIC_API_URL, data);
    return response.data;
};

// DELETE – Mesajı sil (Admin)
export const deleteMessage = async (id) => {
    const response = await adminAxios.delete(`${ADMIN_API_URL}/${id}`);
    return response.data;
};

// PATCH – Mesaj okundu durumunu güncelle (Admin)
export const markAsRead = async (id, isRead) => {
    const response = await adminAxios.patch(`${ADMIN_API_URL}/${id}/okundu`, { okundu: isRead });
    return response.data;
};
