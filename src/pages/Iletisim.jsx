import React from "react";
import "../styles/Iletisim.css";

const Iletisim = () => {
  return (
    <div className="iletisim-container">
      
      <div className="iletisim-content">
        
        <div className="iletisim-section">
          <h2>İletişim Bilgileri</h2>

          <div className="iletisim-grid modern-grid">

            {/* ADRES */}
            <div className="iletisim-card modern-card">
              <h3>📍 Adres</h3>
              <p>
                Ankara Üniversitesi <br />
                50. Yıl Kampüsü Dekanlık Binası <br />
                Gölbaşı, Ankara
              </p>
            </div>

            {/* TELEFON */}
            <div className="iletisim-card modern-card">
              <h3>📞 Telefon</h3>
              <p>+90 (312) 484 21 29</p>
            </div>

            {/* MAIL */}
            <div className="iletisim-card modern-card">
              <h3>✉️ E-posta</h3>
              <p>yebim@ankara.edu.tr</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Iletisim;