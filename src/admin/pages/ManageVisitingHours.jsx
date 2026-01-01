import React, { useEffect, useState } from "react";
import {
    getAllZiyaretSaatleri,
    createZiyaretSaatleri,
    updateZiyaretSaatleri,
    deleteZiyaretSaatleri,
} from "../services/ziyaretSaatleriService";
import "../styles/ManageVisitingHours.css";

export default function ManageVisitingHours() {
    const [saatler, setSaatler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedSaat, setSelectedSaat] = useState(null);
    const [formData, setFormData] = useState({
        gun: "",
        acilisSaati: "",
        kapanisSaati: "",
        kapali: false,
    });

    useEffect(() => {
        loadSaatler();
    }, []);

    const loadSaatler = async () => {
        try {
            const data = await getAllZiyaretSaatleri();
            setSaatler(data);
        } catch (error) {
            console.error("Ziyaret saatleri yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (saat) => {
        setSelectedSaat(saat);
        setFormData({
            gun: saat.gun,
            acilisSaati: saat.acilisSaati || "",
            kapanisSaati: saat.kapanisSaati || "",
            kapali: !saat.acilisSaati && !saat.kapanisSaati,
        });
        setShowModal(true);
    };

    const handleAddNew = () => {
        setSelectedSaat(null);
        setFormData({
            gun: "",
            acilisSaati: "",
            kapanisSaati: "",
            kapali: false,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const payload = {
                gun: formData.gun,
                acilisSaati: formData.kapali ? null : formData.acilisSaati,
                kapanisSaati: formData.kapali ? null : formData.kapanisSaati,
            };

            if (selectedSaat) {
                await updateZiyaretSaatleri(selectedSaat.id, payload);
                alert("Güncellendi!");
            } else {
                await createZiyaretSaatleri(payload);
                alert("Eklendi!");
            }
            setShowModal(false);
            loadSaatler();
        } catch (error) {
            console.error("Kaydetme hatası:", error);
            alert("Bir hata oluştu!");
        }
    };

    const handleDelete = async () => {
        if (!selectedSaat) return;
        if (!window.confirm("Bu kayıt silinsin mi?")) return;

        try {
            await deleteZiyaretSaatleri(selectedSaat.id);
            alert("Silindi!");
            setShowModal(false);
            loadSaatler();
        } catch (error) {
            console.error("Silme hatası:", error);
            alert("Bir hata oluştu!");
        }
    };

    if (loading) return <p className="loading">Yükleniyor...</p>;

    return (
        <div className="manage-visiting-hours">
            <div className="header">
                <h1>Ziyaret Saatleri Yönetimi</h1>
                <button className="add-btn" onClick={handleAddNew}>
                    + Yeni Saat Ekle
                </button>
            </div>

            <div className="hours-list">
                {saatler.map((saat) => (
                    <div key={saat.id} className="hour-card" onClick={() => handleEdit(saat)}>
                        <div className="hour-day">{saat.gun}</div>
                        <div className="hour-time">
                            {saat.acilisSaati && saat.kapanisSaati
                                ? `${saat.acilisSaati.substring(0, 5)} - ${saat.kapanisSaati.substring(0, 5)}`
                                : "Kapalı"}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedSaat ? "Düzenle" : "Yeni Saat Ekle"}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label>Gün</label>
                                <input
                                    type="text"
                                    value={formData.gun}
                                    onChange={(e) => setFormData({ ...formData, gun: e.target.value })}
                                    placeholder="Örn: Pazartesi - Cuma"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.kapali}
                                        onChange={(e) =>
                                            setFormData({ ...formData, kapali: e.target.checked })
                                        }
                                    />
                                    Kapalı
                                </label>
                            </div>

                            {!formData.kapali && (
                                <>
                                    <div className="form-group">
                                        <label>Açılış Saati</label>
                                        <input
                                            type="time"
                                            value={formData.acilisSaati}
                                            onChange={(e) =>
                                                setFormData({ ...formData, acilisSaati: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Kapanış Saati</label>
                                        <input
                                            type="time"
                                            value={formData.kapanisSaati}
                                            onChange={(e) =>
                                                setFormData({ ...formData, kapanisSaati: e.target.value })
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            {selectedSaat && (
                                <button className="delete-btn" onClick={handleDelete}>
                                    Sil
                                </button>
                            )}
                            <div className="right-actions">
                                <button className="cancel-btn" onClick={() => setShowModal(false)}>
                                    İptal
                                </button>
                                <button className="save-btn" onClick={handleSave}>
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
