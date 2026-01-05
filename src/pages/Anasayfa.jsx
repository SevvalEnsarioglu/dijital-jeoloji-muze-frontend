import React, { useEffect, useState } from "react";
import "../styles/Anasayfa.css";
import { getAllAnasayfa } from "../services/publicAnasayfaService";
import QrScannerModal from "../components/QrScannerModal";

const Anasayfa = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    loadComponents();
  }, []);

  const loadComponents = async () => {
    try {
      const data = await getAllAnasayfa();
      console.log("Ana sayfa componentleri:", data); // Debug için
      setComponents(data);
    } catch (error) {
      console.error("Ana sayfa componentleri yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="anasayfa-container">
        <p className="loading-text">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <>
      <div className="anasayfa-container">
        <section className="welcome-section">
          <h1>Ankara Üniversitesi YEBİM Dijital Müzesine Hoş Geldiniz</h1>
          <button className="qr-button" onClick={() => setShowScanner(true)}>QR OKUT</button>
        </section>

        <section className="museum-section">
          {components.map((component, index) => (
            <div
              key={component.id}
              className={`museum-item ${index % 2 === 1 ? "reverse" : ""}`}
            >
              {index % 2 === 0 && component.fotoData && (
                <img
                  src={component.fotoData}
                  alt={component.baslik || "Müze"}
                  className="museum-img"
                />
              )}
              <div className="museum-text-content">
                {component.baslik && (
                  <h2 className="museum-title">{component.baslik}</h2>
                )}
                {component.aciklama && (
                  <p className="museum-text">{component.aciklama}</p>
                )}
              </div>
              {index % 2 === 1 && component.fotoData && (
                <img
                  src={component.fotoData}
                  alt={component.baslik || "Müze"}
                  className="museum-img"
                />
              )}
            </div>
          ))}
        </section>
      </div>

      <QrScannerModal isOpen={showScanner} onClose={() => setShowScanner(false)} />
    </>
  );
};

export default Anasayfa;
