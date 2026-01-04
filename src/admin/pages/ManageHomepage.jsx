import React, { useEffect, useState } from "react";
import {
    getAllAnasayfa,
    createAnasayfa,
    updateAnasayfa,
    deleteAnasayfa,
} from "../services/anasayfaService";
import "../styles/ManageHomepage.css";

export default function ManageHomepage() {
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [formData, setFormData] = useState({
        baslik: "",
        aciklama: "",
        fotoFile: null,
        fotoPreview: null,
    });

    // Componentleri upload et
    useEffect(() => {
        loadComponents();
    }, []);

    const loadComponents = async () => {
        try {
            const data = await getAllAnasayfa();
            setComponents(data);
        } catch (error) {
            console.error("Ana sayfa componentleri yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    // Card'a tıklandığında popup aç
    const handleCardClick = (component) => {
        setSelectedComponent(component);
        setFormData({
            baslik: component.baslik || "",
            aciklama: component.aciklama || "",
            fotoFile: null,
            fotoPreview: component.fotoData || null,
        });
        setShowModal(true);
    };

    // Yeni component ekle
    const handleAddNew = () => {
        setSelectedComponent(null);
        setFormData({
            baslik: "",
            aciklama: "",
            fotoFile: null,
            fotoPreview: null,
        });
        setShowModal(true);
    };

    // Foto seçildiğinde
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                fotoFile: file,
                fotoPreview: URL.createObjectURL(file),
            });
        }
    };

    // Fotoğrafı sil
    const handleRemovePhoto = () => {
        setFormData({
            ...formData,
            fotoFile: null,
            fotoPreview: null,
        });
    };

    // Kaydet
    const handleSave = async () => {
        try {
            if (selectedComponent) {
                // Güncelleme
                await updateAnasayfa(
                    selectedComponent.id,
                    formData.baslik,
                    formData.aciklama,
                    formData.fotoFile
                );
                alert("Component güncellendi!");
            } else {
                // Yeni oluşturma
                await createAnasayfa(formData.baslik, formData.aciklama, formData.fotoFile);
                alert("Yeni component oluşturuldu!");
            }
            setShowModal(false);
            loadComponents();
        } catch (error) {
            console.error("Kaydetme hatası:", error);
            alert("Bir hata oluştu!");
        }
    };

    // Sil
    const handleDelete = async () => {
        if (!selectedComponent) return;
        if (!window.confirm("Bu component silinsin mi?")) return;

        try {
            await deleteAnasayfa(selectedComponent.id);
            alert("Component silindi!");
            setShowModal(false);
            loadComponents();
        } catch (error) {
            console.error("Silme hatası:", error);
            alert("Bir hata oluştu!");
        }
    };

    if (loading) return <p className="loading">Yükleniyor...</p>;

    return (
        <div className="manage-homepage">
            <div className="header">
                <h1>Ana Sayfa Yönetimi</h1>
                <button className="add-btn" onClick={handleAddNew}>
                    + Yeni Bileşen Ekle
                </button>
            </div>

            <div className="components-grid">
                {components.map((component) => (
                    <div
                        key={component.id}
                        className="component-card"
                        onClick={() => handleCardClick(component)}
                    >
                        {component.fotoData && (
                            <img
                                src={component.fotoData}
                                alt="Component"
                                className="card-image"
                            />
                        )}
                        <div className="card-content">
                            {component.baslik && <h3 className="card-title">{component.baslik}</h3>}
                            <p className="card-text">
                                {component.aciklama?.substring(0, 100)}
                                {component.aciklama?.length > 100 ? "..." : ""}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal/Popup */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>
                                {selectedComponent ? "Component Düzenle" : "Yeni Component"}
                            </h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* Fotoğraf Bölümü */}
                            <div className="photo-section">
                                <label>Fotoğraf</label>
                                {formData.fotoPreview ? (
                                    <div className="photo-preview">
                                        <img src={formData.fotoPreview} alt="Preview" />
                                        <button
                                            className="remove-photo-btn"
                                            onClick={handleRemovePhoto}
                                        >
                                            Fotoğrafı Kaldır
                                        </button>
                                    </div>
                                ) : (
                                    <div className="photo-upload">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            id="photo-input"
                                        />
                                        <label htmlFor="photo-input" className="upload-label">
                                            📷 Fotoğraf Yükle
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Başlık Bölümü */}
                            <div className="text-section">
                                <label>Başlık</label>
                                <input
                                    type="text"
                                    value={formData.baslik}
                                    onChange={(e) =>
                                        setFormData({ ...formData, baslik: e.target.value })
                                    }
                                    placeholder="Başlık yazın..."
                                />
                            </div>

                            {/* Açıklama Bölümü */}
                            <div className="text-section">
                                <label>Açıklama</label>
                                <textarea
                                    value={formData.aciklama}
                                    onChange={(e) =>
                                        setFormData({ ...formData, aciklama: e.target.value })
                                    }
                                    placeholder="Component açıklamasını yazın..."
                                    rows="8"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            {selectedComponent && (
                                <button className="delete-btn" onClick={handleDelete}>
                                    Sil
                                </button>
                            )}
                            <div className="right-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowModal(false)}
                                >
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
