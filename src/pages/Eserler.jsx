import React, { useEffect, useState } from "react";
import EserCard from "../components/EserCard";
import "../styles/Eserler.css";

const Eserler = () => {
    const [eserler, setEserler] = useState([]);
    const [loading, setLoading] = useState(true);

    // SAYFA AÇILDIĞINDA ÇALIŞACAK
    useEffect(() => {
        setLoading(true);

        // TODO: Backend hazır olunca aşağıdaki kod aktif edilecek
        // getEserler().then((data) => setEserler(data));

        setLoading(false);
    }, []);

    if (loading) {
        return <div className="loading-text">Yükleniyor...</div>;
    }

    return (
        <div className="eserler-page">
            <div className="eserler-container">
                <h1 className="eserler-title">Eserler</h1>

                {/* GRID ALANI */}
                <div className="eserler-grid">
                    {/* TODO: Backend'den gelecek veriler burada map'lenecek */}
                    {/* eserler.map((eser) => <EserCard key={eser.id} eser={eser} />) */}

                    {/* Şimdilik örnek kart iskeleti */}
                    <EserCard />
                    <EserCard />
                    <EserCard />
                    <EserCard />
                </div>
            </div>
        </div>
    );
};

export default Eserler;
