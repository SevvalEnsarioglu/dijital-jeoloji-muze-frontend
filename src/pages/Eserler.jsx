import React, { useEffect, useState } from "react";
import EserCard from "../components/EserCard";

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
        return <div style={{ textAlign: "center", marginTop: "40px" }}>Yükleniyor...</div>;
    }

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
                Eserler
            </h1>

            {/* GRID ALANI */}
            <div
                style={{
                    display: "grid",
                    gap: "20px",
                    gridTemplateColumns: "repeat(2, 1fr)",
                }}
            >
                {/* TODO: Backend'den gelecek veriler burada map'lenecek */}
                {/* eserler.map((eser) => <EserCard key={eser.id} eser={eser} />) */}

                {/* Şimdilik örnek kart iskeleti */}
                <EserCard />
                <EserCard />
                <EserCard />
                <EserCard />
            </div>
        </div>
    );
};

export default Eserler;
