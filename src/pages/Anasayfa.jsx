import React from "react";
import "../styles/Anasayfa.css";
import yebimImg from "../assets/yebim.jpg";
import dogaltasImg from "../assets/dogaltas.jpg";
import acikhavaImg from "../assets/acikhava.jpg";

const Anasayfa = () => {
  return (
    <div className="anasayfa-container">
      <section className="welcome-section">
        <h1>Ankara Üniversitesi YEBİM Dijital Müzesine Hoş Geldiniz</h1>
        <button className="qr-button">QR OKUT</button>
      </section>

      <section className="museum-section">
        <div className="museum-item">
          <img src={yebimImg} alt="Yebim" className="museum-img" />
          <div className="museum-text-content">
            <h2 className="museum-title">Ankara Üniversitesi YEBIM Müzesi</h2>
            <p className="museum-text">
              YEBIM, Türkiye'nin en kapsamlı yer bilimleri müzelerinden biri olarak, Türkiye'nin farklı bölgelerinden ve dünyanın çeşitli yerlerinden toplanan mineral, kayaç ve fosil koleksiyonlarını sergilemektedir.
            </p>
            <p className="museum-text">
              Müze, öğrenciler, araştırmacılar ve ziyaretçiler için eğitici ve bilimsel bir ortam sunarak, yer bilimlerine olan ilgiyi artırmayı ve doğal kaynakların önemini vurgulamayı amaçlamaktadır.
            </p>
          </div>
        </div>

        <div className="museum-item reverse">
          <div className="museum-text-content">
            <h2 className="museum-title">Doğal Taş Koleksiyonu</h2>
            <p className="museum-text">
              Müzemizin doğal taş koleksiyonu, Türkiye'nin farklı bölgelerinden getirilen yüzlerce farklı mineral ve kayaç örneğini içermektedir. Nadir mineraller, volkanik kayalar, metamorfik taşlar ve sedimanter oluşumlar koleksiyonun zenginliğini oluşturmaktadır.
            </p>
            <p className="museum-text">
              Her bir örnek, milyonlarca yıllık jeolojik bir hikaye anlatmakta ve ziyaretçilere Dünya'nın oluşum süreçlerini öğrenme fırsatı sunmaktadır.
            </p>
          </div>
          <img src={dogaltasImg} alt="Doğal Taş Koleksiyonu" className="museum-img" />
        </div>

        <div className="museum-item">
          <img src={acikhavaImg} alt="Açık Hava Müzesi" className="museum-img" />
          <div className="museum-text-content">
            <h2 className="museum-title">Açık Hava Müzesi</h2>
            <p className="museum-text">
              Müzemizin fosil koleksiyonu, milyonlarca yıl önce yaşamış canlıların izlerini barındırmaktadır. Trilobitler ve ammonitlerden bitki fosillerine ve omurgalı hayvanlara kadar geniş bir yelpazede paleontolojik örnekler sergilenmektedir.
            </p>
            <p className="museum-text">
              Bu koleksiyon, evrimsel süreçleri ve Dünya'nın biyolojik geçmişini anlama konusunda eşsiz bir fırsat sunmakta ve ziyaretçiler dijital müze aracılığıyla bu örnekleri yakından inceleyebilmektedir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Anasayfa;
