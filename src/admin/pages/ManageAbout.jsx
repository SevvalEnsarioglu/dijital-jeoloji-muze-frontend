import React, { useEffect, useState } from "react";
import {
    getHakkimizda,
    createHakkimizda,
    updateHakkimizda,
    deleteHakkimizda
} from "../services/hakkimizdaService";

export default function ManageAbout() {
    const [hakkinda, setHakkinda] = useState("");
    const [adres, setAdres] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [recordExists, setRecordExists] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const data = await getHakkimizda();

                if (data) {
                    setHakkinda(data.hakkinda || "");
                    setAdres(data.adres || "");
                    setTelefon(data.telefon || "");
                    setEmail(data.email || "");
                    setRecordExists(true);
                }
            } catch (err) {
                console.warn("Henüz Hakkımızda kaydı yok");
                setRecordExists(false);
            }
            setLoading(false);
        }
        load();
    }, []);

    const save = async () => {
        const payload = {
            hakkinda,
            adres,
            telefon,
            email
        };

        if (recordExists) {
            await updateHakkimizda(payload);
            alert("Güncellendi!");
        } else {
            await createHakkimizda(payload);
            alert("Oluşturuldu!");
            setRecordExists(true);
        }
    };

    const remove = async () => {
        if (!confirm("Hakkımızda metni silinecek. Emin misiniz?")) return;

        await deleteHakkimizda();

        setHakkinda("");
        setAdres("");
        setTelefon("");
        setEmail("");
        setRecordExists(false);

        alert("Silindi!");
    };

    if (loading) return <p>Yükleniyor...</p>;

    return (
        <div>
            <h1>Hakkımızda Yönetimi</h1>

            <textarea
                placeholder="Hakkımızda metni"
                value={hakkinda}
                onChange={(e) => setHakkinda(e.target.value)}
                style={{ width: "100%", height: 200, padding: 10 }}
            />

            <input
                placeholder="Adres"
                value={adres}
                onChange={(e) => setAdres(e.target.value)}
                style={{ width: "100%", padding: 10, marginTop: 10 }}
            />

            <input
                placeholder="Telefon"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                style={{ width: "100%", padding: 10, marginTop: 10 }}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: 10, marginTop: 10 }}
            />

            <button onClick={save} style={{ padding: 10, marginTop: 20 }}>
                {recordExists ? "Güncelle" : "Oluştur"}
            </button>

            {recordExists && (
                <button
                    onClick={remove}
                    style={{
                        padding: 10,
                        marginTop: 20,
                        marginLeft: 10,
                        background: "red",
                        color: "white"
                    }}
                >
                    Sil
                </button>
            )}
        </div>
    );
}
