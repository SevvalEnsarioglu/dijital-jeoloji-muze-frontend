import React, { useEffect, useState } from "react";
import {
  getHakkimizda,
  createHakkimizda,
  updateHakkimizda,
  deleteHakkimizda
} from "../services/hakkimizdaService";
import "../styles/ManageAbout.css";

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
      } catch {
        setRecordExists(false);
      }
      setLoading(false);
    }
    load();
  }, []);

  const save = async () => {
    const payload = { hakkinda, adres, telefon, email };

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
    if (!window.confirm("Hakkımızda içeriği silinsin mi?")) return;
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
    <div className="manage-about">
      <div className="about-card">
        <label>Hakkımızda Metni</label>
        <textarea
          value={hakkinda}
          onChange={(e) => setHakkinda(e.target.value)}
          placeholder="Hakkımızda metni"
        />

        <label>Adres</label>
        <input
          value={adres}
          onChange={(e) => setAdres(e.target.value)}
          placeholder="Adres"
        />

        <label>Telefon</label>
        <input
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          placeholder="Telefon"
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="actions">
        <button className="delete" onClick={remove}>
            Sil
        </button>

        <button className="save" onClick={save}>
            Güncelle
        </button>
        </div>

      </div>
    </div>
  );
}
