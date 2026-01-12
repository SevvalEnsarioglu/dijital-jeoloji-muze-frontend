import React from "react";
import { Link } from "react-router-dom";
import "../styles/EserDetay.css";

const EserCard = ({ eser }) => {
    if (!eser) return null;

    return (
        <Link to={`/eserler/${eser.id}`} className="eser-card-link">
            <div className="eser-card">
                {/* GÖRSEL ALANI */}
                <div className="eser-card-image">
                    {eser.foto ? (
                        <img
                            src={eser.foto}
                            alt={eser.isim}

                        />
                    ) : (
                        <div className="no-image">Fotoğraf Yok</div>
                    )}
                </div>

                {/* BAŞLIK */}
                <h3 className="eser-card-title">{eser.isim}</h3>

                {/* AÇIKLAMA ÖNİZLEMESİ */}
                <p className="eser-card-description">
                    {eser.aciklama
                        ? (eser.aciklama.length > 80
                            ? eser.aciklama.substring(0, 80) + "..."
                            : eser.aciklama)
                        : "Açıklama bilgisi yok"}
                </p>

                {/* DETAYA GİT LİNKİ */}
                <div className="eser-card-link-text">→ Detayları Gör</div>
            </div>
        </Link>
    );
};

export default EserCard;
