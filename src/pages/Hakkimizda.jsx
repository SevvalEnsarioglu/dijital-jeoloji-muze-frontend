import React, { useState, useEffect } from "react";
import { getPublicAbout } from "../services/publicAboutService";
import "../styles/Hakkimizda.css";

export default function Hakkimizda() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getPublicAbout();
        setData(res);
      } catch (err) {
        console.error("Hakkımızda verisi çekilemedi:", err);
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

        {/* ziyaret saatleri sonra panele tasınabilir) */}
        <div className="visiting-hours-section">
          <h2>Ziyaret Saatleri</h2>

          <div className="hours-content">
            <div className="hours-item">
              <span className="day">Pazartesi - Cuma</span>
              <span className="time">09:00 - 17:00</span>
            </div>

            <div className="hours-item">
              <span className="day">Cumartesi</span>
              <span className="time">10:00 - 16:00</span>
            </div>

            <div className="hours-item">
              <span className="day">Pazar</span>
              <span className="time">Kapalı</span>
            </div>

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
