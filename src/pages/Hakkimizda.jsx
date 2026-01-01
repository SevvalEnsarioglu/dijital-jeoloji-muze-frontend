import React, { useState, useEffect } from "react";
import { getPublicAbout } from "../services/publicAboutService";
import { getAllZiyaretSaatleri } from "../services/publicZiyaretSaatleriService";
import "../styles/Hakkimizda.css";

export default function Hakkimizda() {
  const [data, setData] = useState(null);
  const [ziyaretSaatleri, setZiyaretSaatleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [aboutRes, hoursRes] = await Promise.all([
          getPublicAbout(),
          getAllZiyaretSaatleri()
        ]);
        setData(aboutRes);
        setZiyaretSaatleri(hoursRes);
      } catch (err) {
        console.error("Veri çekilemedi:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Yükleniyor...</p>;
  }

  if (!data) {
    return <p style={{ textAlign: "center" }}>Hakkımızda verisi bulunamadı.</p>;
  }

  // Saat formatını düzenle (HH:mm:ss -> HH:mm)
  const formatTime = (timeString) => {
    if (!timeString) return null;
    return timeString.substring(0, 5); // "09:00:00" -> "09:00"
  };

  return (
    <div className="hakkimizda-container">

      {/* HERO */}
      <div className="content-section">

        {/* ABOUT SECTION */}
        <div className="about-section">
          <h2>Hakkımızda</h2>
          <div className="about-content">
            <p>{data.hakkinda || "Henüz bir açıklama eklenmemiş."}</p>
          </div>
        </div>

        {/* ZİYARET SAATLERİ */}
        <div className="visiting-hours-section">
          <h2>Ziyaret Saatleri</h2>

          <div className="hours-content">
            {ziyaretSaatleri.length > 0 ? (
              ziyaretSaatleri.map((saat) => (
                <div key={saat.id} className="hours-item">
                  <span className="day">{saat.gun}</span>
                  <span className="time">
                    {saat.acilisSaati && saat.kapanisSaati
                      ? `${formatTime(saat.acilisSaati)} - ${formatTime(saat.kapanisSaati)}`
                      : "Kapalı"}
                  </span>
                </div>
              ))
            ) : (
              <p>Ziyaret saatleri henüz eklenmemiş.</p>
            )}

            <div className="hours-note">
              <p>Ziyaret saatleri dönemsel olarak değişiklik gösterebilir.</p>
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="contact-section">
          <h2>İletişim Bilgileri</h2>

          <div className="contact-content">

            <div className="contact-item">
              <h3>📍 Adres</h3>
              <p>{data.adres || "Adres bilgisi eklenmemiş."}</p>
            </div>

            <div className="contact-item">
              <h3>📞 Telefon</h3>
              <p>{data.telefon || "Telefon bilgisi eklenmemiş."}</p>
            </div>

            <div className="contact-item">
              <h3>✉️ Email</h3>
              <p>{data.email || "Email bilgisi eklenmemiş."}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
