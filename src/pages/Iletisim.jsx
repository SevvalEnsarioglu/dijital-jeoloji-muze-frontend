import React, { useState } from "react";
import "../styles/Iletisim.css";
import { createIletisimMesaji } from "../services/publicIletisimService";

export default function Iletisim() {
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    konu: "",
    telefon: "",
    mesajiniz: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await createIletisimMesaji(formData);

    alert("Mesajınız başarıyla iletildi.");

    setFormData({
      ad: "",
      soyad: "",
      email: "",
      konu: "",
      telefon: "",
      mesajiniz: ""
    });
  } catch (error) {
    console.error(error);
    alert("Mesaj gönderilirken hata oluştu.");
  }
};


  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Bizimle İletişime Geçin</h1>
        <p>
          Dijital Jeoloji Müzesi ile ilgili soru, görüş ve önerileriniz için
          aşağıdaki formu doldurabilirsiniz.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="ad"
              placeholder="Ad"
              value={formData.ad}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="soyad"
              placeholder="Soyad"
              value={formData.soyad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="telefon"
              placeholder="Telefon"
              value={formData.telefon}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="konu"
            placeholder="Konu"
            value={formData.konu}
            onChange={handleChange}
            required
          />

          <textarea
            name="mesajiniz"
            placeholder="Mesajınız"
            rows="5"
            value={formData.mesajiniz}
            onChange={handleChange}
            required
          />

          <button type="submit">Mesajı Gönder</button>
        </form>
      </div>
    </div>
  );
}
