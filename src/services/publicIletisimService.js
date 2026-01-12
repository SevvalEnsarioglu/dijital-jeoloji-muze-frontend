import { API_BASE_URL } from "../config/api";

const BASE_URL = `${API_BASE_URL}/api/iletisim`;

export async function getAllIletisimMesajlari() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Mesajlar alınamadı");
  return response.json();
}

export async function updateOkunduDurumu(id, okundu) {
  const response = await fetch(`${BASE_URL}/${id}/okundu`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ okundu })
  });

  if (!response.ok) throw new Error("Durum güncellenemedi");
  return response.json();
}

export async function deleteIletisimMesaji(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Mesaj silinemedi");
  }
}

export async function createIletisimMesaji(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Mesaj gönderilemedi");
  }

  return response.json();
}
