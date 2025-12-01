import React, { useEffect, useState } from "react";
import { getPublicAbout } from "../services/publicAboutService";

export default function Hakkimizda() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function load() {
        const data = await getPublicAbout();
        console.log("Backend cevabı:", data);

        if (!data || !data.hakkinda) {
            setAbout(null);
            return;
        }

        setAbout(data.hakkinda); // <-- DÜZELTİLDİ
    }
    load();
}, []);


    if (loading) return <p>Yükleniyor...</p>;

    if (!data) return <p>Veri bulunamadı</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Hakkımızda</h1>

            {/* Backend'ten gelen hakkinda alanı */}
            <p>{data.hakkinda ?? "Henüz içerik eklenmemiş."}</p>

            {/* Diğer alanlar opsiyonel */}
            {data.adres && <p><b>Adres:</b> {data.adres}</p>}
            {data.telefon && <p><b>Telefon:</b> {data.telefon}</p>}
            {data.email && <p><b>Email:</b> {data.email}</p>}
        </div>
    );
}
