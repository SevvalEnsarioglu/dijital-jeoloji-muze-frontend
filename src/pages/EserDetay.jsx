import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/EserDetay.css";

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

    if (loading) return <div className="loading-text">Yükleniyor...</div>;

    return (
        <div className="eser-detay-page">
            <div className="eser-detay-container">
                {/* GÖRSEL */}
                <div className="eser-detay-image">
                    {/* TODO: Görsel */}
                    {/* <img src={eser.image} alt={eser.name} /> */}
                </div>

                {/* BAŞLIK */}
                <h1 className="eser-detay-title">
                    {eser ? eser.name : "Eser Adı (TODO)"}
                </h1>

                {/* KATEGORİ / TAŞ TÜRÜ */}
                <h3 className="eser-detay-category">
                    {eser ? eser.category : "Taş türü (TODO)"}
                </h3>

                {/* AÇIKLAMA METNİ */}
                <p className="eser-detay-description">
                    {eser
                        ? eser.description
                        : `Bu alanda eserin detaylı açıklaması yer alacak. 
                        (TODO: Backend'den detay metni çekilecek.)`}
                </p>
            </div>
        </div>
    );
};

export default EserDetay;
