import React from "react";
import { Link } from "react-router-dom";

const EserCard = ({ eser }) => {
    // Eğer backend'den veri gelmezse boş skeleton göstermek için kontrol
    const isSkeleton = !eser;

    return (
        <Link
            to={isSkeleton ? "#" : `/eser/${eser.id}`} 
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "12px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
                    transition: "0.2s",
                    cursor: isSkeleton ? "default" : "pointer",
                }}
                className="eser-card"
            >
                {/* GÖRSEL ALANI */}
                <div
                    style={{
                        width: "100%",
                        height: "160px",
                        backgroundColor: "#e3e3e3",
                        borderRadius: "8px",
                        marginBottom: "12px",
                        overflow: "hidden",
                    }}
                >
                    {/* TODO: Görsel burada gösterilecek */}
                    {/* <img src={eser.image} alt={eser.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
                </div>

                {/* BAŞLIK */}
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "6px" }}>
                    {isSkeleton ? "Eser Adı (TODO)" : eser.name}
                </h3>

                {/* KISA AÇIKLAMA */}
                <p style={{ color: "#555", fontSize: "14px" }}>
                    {isSkeleton ? "Açıklama alanı (TODO)" : eser.shortDescription}
                </p>

                {/* DETAYA GİT LİNKİ */}
                {!isSkeleton && (
                    <div
                        style={{
                            marginTop: "10px",
                            color: "#1d4ed8",
                            fontWeight: "500",
                            fontSize: "14px",
                        }}
                    >
                        → Detayları Gör
                    </div>
                )}
            </div>
        </Link>
    );
};

export default EserCard;
