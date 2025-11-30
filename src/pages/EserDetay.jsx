import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EserDetay = () => {
    const { id } = useParams(); // URL'den eser ID'sini alıyoruz
    const [eser, setEser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // TODO: Backend'den ilgili ID'li eserin bilgisi çekilecek
        // getEserById(id).then((data) => setEser(data));

        setLoading(false);
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
            {/* GÖRSEL */}
            <div
                style={{
                    width: "100%",
                    height: "350px",
                    backgroundColor: "#e2e2e2",
                    borderRadius: "10px",
                    marginBottom: "20px",
                }}
            >
                {/* TODO: Görsel */}
                {/* <img src={eser.image} alt={eser.name} /> */}
            </div>

            {/* BAŞLIK */}
            <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
                {eser ? eser.name : "Eser Adı (TODO)"}
            </h1>

            {/* KATEGORİ / TAŞ TÜRÜ */}
            <h3 style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
                {eser ? eser.category : "Taş türü (TODO)"}
            </h3>

            {/* AÇIKLAMA METNİ */}
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#444" }}>
                {eser
                    ? eser.description
                    : `Bu alanda eserin detaylı açıklaması yer alacak. 
                    (TODO: Backend'den detay metni çekilecek.)`}
            </p>
        </div>
    );
};

export default EserDetay;
