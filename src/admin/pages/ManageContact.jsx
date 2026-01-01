import React, { useEffect, useState } from "react";
import {
  getAllIletisimMesajlari,
  updateOkunduDurumu,
  deleteIletisimMesaji
} from "../../services/publicIletisimService";
import "../styles/ManageContact.css";

export default function ManageContact() {
  const [mesajlar, setMesajlar] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMesajlar();
  }, []);

  const fetchMesajlar = async () => {
    const data = await getAllIletisimMesajlari();
    setMesajlar(data);
  };

  const toggleOkundu = async (id, current) => {
    await updateOkunduDurumu(id, !current);
    fetchMesajlar();
  };

  const deleteMesaj = async (id) => {
    if (!window.confirm("Mesaj silinsin mi?")) return;
    await deleteIletisimMesaji(id);
    setSelected(null);
    fetchMesajlar();
  };

  return (
    <div className="manage-contact">
      <div className="header">
        <h1>İletişim Mesajları Yönetimi</h1>
      </div>

      {/* TABLO */}
      <table className="contact-table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Konu</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Mesaj</th>
            <th>Okundu</th>
          </tr>
        </thead>

        <tbody>
          {mesajlar.map((m) => (
            <tr key={m.id} onClick={() => setSelected(m)}>
              <td>{new Date(m.createdAt).toLocaleDateString()}</td>
              <td>{m.konu}</td>
              <td>{m.ad}</td>
              <td>{m.soyad}</td>
              <td>{m.email}</td>
              <td>{m.telefon}</td>

              {/* MESAJ ÖNİZLEME */}
              <td>
                {m.mesajiniz?.length > 25
                  ? m.mesajiniz.substring(0, 25) + "..."
                  : m.mesajiniz}
              </td>
              {/* OKUNDU DURUMU */}
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOkundu(m.id, m.okundu);
                }}
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                <span className={m.okundu ? "okundu" : "okunmadi"}>
                  {m.okundu ? "Okundu" : "Okunmadı"}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>


      {/* MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Mesaj Detayı</h3>

            <p><b>Tarih:</b> {new Date(selected.createdAt).toLocaleString()}</p>
            <p><b>Konu:</b> {selected.konu}</p>
            <p><b>Ad:</b> {selected.ad}</p>
            <p><b>Soyad:</b> {selected.soyad}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Telefon:</b> {selected.telefon}</p>

            <div className="message-box">
              {selected.mesajiniz}
            </div>

            <div className="modal-actions">
              <button
                className="toggle"
                onClick={() => toggleOkundu(selected.id, selected.okundu)}
              >
                {selected.okundu ? "Okunmadı Yap" : "Okundu Yap"}
              </button>

              <button
                className="delete"
                onClick={() => deleteMesaj(selected.id)}
              >
                Sil
              </button>

              <button onClick={() => setSelected(null)}>Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
