import React from "react";
import "../styles/Hakkimizda.css";

const Hakkimizda = () => {
  return (
    <div className="hakkimizda-container">
      <section className="content-section">
        <div className="about-section">
          <h2>YEBİM Hakkında</h2>
          <div className="about-content">
            <p>
              Ankara Üniversitesi YEBİM (Yer Bilimleri ve Maden Araştırmaları Merkezi); yer bilimi alanında araştırma, eğitim ve proje geliştirme faaliyetlerini sürdüren öncü bir merkezdir. Merkezimiz maden, mermer, kaya ve toprakların oluşumunu ve ekonomik potansiyelini inceleyerek bu alanda uzman bilim insanları yetiştirmeyi hedeflemektedir. Ayrıca kamu kurumları ve özel kuruluşlarla iş birliği yaparak yenilenebilir enerji ve doğal kaynakların sürdürülebilir kullanımına katkı sağlamaktadır.
            </p>
            <p>
              Koleksiyonumuzda, Türkiye'nin farklı bölgelerinden ve dünyanın çeşitli yerlerinden 
              toplanan mineral, kayaç, fosil ve jeolojik örnekler yer almaktadır. YEBİM’in misyonu; yerbilimi bilgisini kullanarak topluma hizmet eden, çok disiplinli projeler üreten ve bilimsel çalışmalarla toplumun bilinçlenmesine destek olan bir araştırma merkezi olmaktır. Vizyonu ise yerbilimleri alanında ileri düzey altyapı sağlayan sürekli gelişen ve uluslararası standartlarda bilgi aktarabilen bir merkez olarak hizmet vermektir.
            </p>

          </div>
        </div>

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
              <p>Müze resmi tatillerde kapalıdır. Grup ziyaretleri için önceden randevu almanız önerilir.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hakkimizda;

