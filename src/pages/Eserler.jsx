import React, { useEffect, useState } from "react";
import EserCard from "../components/EserCard";
import { getAllEser } from "../services/eserService";
import "../styles/Eserler.css";

const Eserler = () => {
    const [eserler, setEserler] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEserler();
    }, []);

    const loadEserler = async () => {
        try {
            setLoading(true);
            const data = await getAllEser();
            setEserler(data);
        } catch (error) {
            console.error("Eserler yüklenirken hata:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-text">Yükleniyor...</div>;
    }

    return (
        <div className="eserler-page">
            <div className="eserler-container">
                <h1 className="eserler-title">Eserler</h1>

                <div className="eserler-grid">
                    {eserler.length === 0 ? (
                        <p className="no-data">Henüz eser bulunmamaktadır.</p>
                    ) : (
                        eserler.map((eser) => <EserCard key={eser.id} eser={eser} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Eserler;
