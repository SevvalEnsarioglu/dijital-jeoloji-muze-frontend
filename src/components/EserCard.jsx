import React from "react";
import { Link } from "react-router-dom";
import "../styles/EserCard.css";

const EserCard = ({ eser }) => {
    // Eğer backend'den veri gelmezse boş skeleton göstermek için kontrol
    const isSkeleton = !eser;

    return (
        <Link
            to={isSkeleton ? "#" : `/eser/${eser.id}`}
            className="eser-card-link"
        >
            <div className={`eser-card ${isSkeleton ? "skeleton" : ""}`}>
                {/* GÖRSEL ALANI */}
                <div className="eser-card-image">
                    {/* TODO: Görsel burada gösterilecek */}
                    {/* <img src={eser.image} alt={eser.name} /> */}
                </div>

                {/* BAŞLIK */}
                <h3 className="eser-card-title">
                    {isSkeleton ? "Eser Adı (TODO)" : eser.name}
                </h3>

                {/* KISA AÇIKLAMA */}
                <p className="eser-card-description">
                    {isSkeleton ? "Açıklama alanı (TODO)" : eser.shortDescription}
                </p>

                {/* DETAYA GİT LİNKİ */}
                {!isSkeleton && (
                    <div className="eser-card-link-text">
                        → Detayları Gör
                    </div>
                )}
            </div>
        </Link>
    );
};

export default EserCard;
