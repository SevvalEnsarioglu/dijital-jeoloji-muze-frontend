import React, { useEffect, useState } from "react";
import {
    getAllEser,
    createEser,
    updateEser,
    deleteEser,
    getYorumByEserId,
    deleteEserYorum,
    updateOkunduDurumu
} from "../services/eserService";
import "../styles/ManageArtifacts.css";

export default function ManageArtifacts() {
    const [eserler, setEserler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEser, setSelectedEser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [yorumlar, setYorumlar] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Form states
    const [isim, setIsim] = useState("");
    const [foto, setFoto] = useState(null);
    const [ses, setSes] = useState(null);
    const [donem, setDonem] = useState("");
    const [boyut, setBoyut] = useState("");
    const [getirenKisi, setGetirenKisi] = useState("");
    const [getirildigiTarih, setGetirildigiTarih] = useState("");
    const [aciklama, setAciklama] = useState("");
    const [currentFoto, setCurrentFoto] = useState("");
    const [currentSes, setCurrentSes] = useState("");

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
            alert("Eserler yüklenirken hata oluştu!");
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        resetForm();
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        resetForm();
    };

    const openDetailModal = (eser) => {
        setSelectedEser(eser);
        setIsim(eser.isim || "");
        setDonem(eser.donem || "");
        setBoyut(eser.boyut || "");
        setGetirenKisi(eser.getirenKisi || "");
        setGetirildigiTarih(eser.getirildigiTarih || "");
        setAciklama(eser.aciklama || "");
        setCurrentFoto(eser.foto || "");
        setCurrentSes(eser.ses || "");
        setFoto(null);
        setSes(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEser(null);
        resetForm();
    };

    const resetForm = () => {
        setIsim("");
        setFoto(null);
        setSes(null);
        setDonem("");
        setBoyut("");
        setGetirenKisi("");
        setGetirildigiTarih("");
        setAciklama("");
        setCurrentFoto("");
        setCurrentSes("");
    };

    const handleCreate = async () => {
        if (!isim || !foto) {
            alert("Eser adı ve fotoğraf zorunludur!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("isim", isim);
            formData.append("foto", foto);
            if (ses) formData.append("ses", ses);
            formData.append("donem", donem);
            formData.append("boyut", boyut);
            formData.append("getirenKisi", getirenKisi);
            formData.append("getirildigiTarih", getirildigiTarih);
            formData.append("aciklama", aciklama);

            await createEser(formData);
            alert("Eser başarıyla oluşturuldu!");
            closeCreateModal();
            loadEserler();
        } catch (error) {
            console.error("Eser oluşturulurken hata:", error);
            alert("Eser oluşturulurken hata oluştu!");
        }
    };

    const handleSave = async () => {
        if (!selectedEser) return;

        try {
            const formData = new FormData();
            formData.append("isim", isim);
            formData.append("donem", donem);
            formData.append("boyut", boyut);
            formData.append("getirenKisi", getirenKisi);
            formData.append("getirildigiTarih", getirildigiTarih);
            formData.append("aciklama", aciklama);

            if (foto) {
                formData.append("foto", foto);
            }
            if (ses) {
                formData.append("ses", ses);
            }

            await updateEser(selectedEser.id, formData);
            alert("Eser başarıyla güncellendi!");
            closeModal();
            loadEserler();
        } catch (error) {
            console.error("Eser güncellenirken hata:", error);
            alert("Eser güncellenirken hata oluştu!");
        }
    };

    const handleDelete = async () => {
        if (!selectedEser) return;
        if (!window.confirm(`"${selectedEser.isim}" adlı eseri silmek istediğinize emin misiniz?`)) return;

        try {
            await deleteEser(selectedEser.id);
            alert("Eser başarıyla silindi!");
            closeModal();
            loadEserler();
        } catch (error) {
            console.error("Eser silinirken hata:", error);
            alert("Eser silinirken hata oluştu!");
        }
    };

    const openCommentsModal = async (eser) => {
        setSelectedEser(eser);
        setShowCommentsModal(true);
        setLoadingComments(true);

        try {
            const comments = await getYorumByEserId(eser.id);
            setYorumlar(comments);
        } catch (error) {
            console.error("Yorumlar yüklenirken hata:", error);
            alert("Yorumlar yüklenirken hata oluştu!");
            setYorumlar([]);
        } finally {
            setLoadingComments(false);
        }
    };

    const closeCommentsModal = () => {
        setShowCommentsModal(false);
        setSelectedEser(null);
        setYorumlar([]);
    };

    const handleDeleteComment = async (yorumId) => {
        if (!window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;

        try {
            await deleteEserYorum(yorumId);
            alert("Yorum başarıyla silindi!");
            const comments = await getYorumByEserId(selectedEser.id);
            setYorumlar(comments);
        } catch (error) {
            console.error("Yorum silinirken hata:", error);
            alert("Yorum silinirken hata oluştu!");
        }
    };

    const handleToggleReadStatus = async (yorum) => {
        try {
            const newStatus = !yorum.okundu;
            await updateOkunduDurumu(yorum.id, newStatus);

            // Yorumları güncelle (optimistik update veya yeniden fetch)
            const updatedComments = yorumlar.map(y =>
                y.id === yorum.id ? { ...y, okundu: newStatus } : y
            );
            setYorumlar(updatedComments);
        } catch (error) {
            console.error("Okundu durumu güncellenirken hata:", error);
            alert("Durum güncellenirken hata oluştu!");
        }
    };

    const handleDownloadQR = async (qrUrl, eserIsim) => {
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `QR_${eserIsim.replace(/[^\p{L}\p{N}]/gu, '_')}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Hata:", error);
            alert("QR kod indirilirken hata oluştu!");
        }
    };

    if (loading) return <p className="loading">Yükleniyor...</p>;

    return (
        <div className="manage-artifacts">
            <div className="header">
                <h1>Eserler Yönetimi</h1>
                <button className="add-btn" onClick={openCreateModal}>
                    + Eser Ekle
                </button>
            </div>

            <div className="artifacts-list">
                {eserler.length === 0 ? (
                    <p className="no-data">Henüz eser bulunmamaktadır.</p>
                ) : (
                    eserler.map((eser) => (
                        <div key={eser.id} className="artifact-card">
                            <div className="artifact-image">
                                {eser.foto ? (
                                    <img src={eser.foto} alt={eser.isim} />
                                ) : (
                                    <div className="no-image">Fotoğraf Yok</div>
                                )}
                            </div>
                            <div className="artifact-info">
                                <h3>{eser.isim}</h3>
                                <p className="artifact-period">{eser.donem}</p>
                                <p className="artifact-views">👁 {eser.goruntulenmeSayisi || 0} görüntülenme</p>
                            </div>
                            <div className="artifact-actions">
                                <button
                                    className="three-dots"
                                    onClick={() => openDetailModal(eser)}
                                    title="Detayları Görüntüle"
                                >
                                    ⋮
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={closeCreateModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Yeni Eser Ekle</h2>
                            <button className="close-btn" onClick={closeCreateModal}>×</button>
                        </div>

                        <div className="modal-body">
                            <label>Eser Adı *</label>
                            <input
                                type="text"
                                value={isim}
                                onChange={(e) => setIsim(e.target.value)}
                                placeholder="Eser adı"
                            />

                            <label>Fotoğraf *</label>
                            <div className="file-upload-section">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFoto(e.target.files[0])}
                                    id="create-foto-upload"
                                />
                                <label htmlFor="create-foto-upload" className="upload-btn">
                                    📷 {foto ? foto.name : "Fotoğraf Yükle"}
                                </label>
                            </div>

                            <label>Sesli Rehber</label>
                            <div className="file-upload-section">
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => setSes(e.target.files[0])}
                                    id="create-ses-upload"
                                />
                                <label htmlFor="create-ses-upload" className="upload-btn">
                                    🎵 {ses ? ses.name : "Ses Dosyası Yükle"}
                                </label>
                            </div>

                            <label>Dönem</label>
                            <input
                                type="text"
                                value={donem}
                                onChange={(e) => setDonem(e.target.value)}
                                placeholder="Dönem"
                            />

                            <label>Boyutlar</label>
                            <input
                                type="text"
                                value={boyut}
                                onChange={(e) => setBoyut(e.target.value)}
                                placeholder="Boyutlar (örn: 50x30x20 cm)"
                            />

                            <label>Getiren Kişi</label>
                            <input
                                type="text"
                                value={getirenKisi}
                                onChange={(e) => setGetirenKisi(e.target.value)}
                                placeholder="Getiren kişi"
                            />

                            <label>Getirildiği Tarih</label>
                            <input
                                type="date"
                                value={getirildigiTarih}
                                onChange={(e) => setGetirildigiTarih(e.target.value)}
                            />

                            <label>Açıklama</label>
                            <textarea
                                value={aciklama}
                                onChange={(e) => setAciklama(e.target.value)}
                                placeholder="Eser açıklaması"
                                rows="5"
                            />

                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={closeCreateModal}>
                                    İptal
                                </button>
                                <button className="save-btn" onClick={handleCreate}>
                                    Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Detay Modal */}
            {showModal && selectedEser && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Eser Detayları</h2>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>

                        <div className="modal-body">
                            <label>Eser Adı</label>
                            <input
                                type="text"
                                value={isim}
                                onChange={(e) => setIsim(e.target.value)}
                                placeholder="Eser adı"
                            />

                            <label>Fotoğraf</label>
                            <div className="file-upload-section">
                                {currentFoto && (
                                    <div className="current-file">
                                        <img src={currentFoto} alt="Mevcut fotoğraf" className="preview-image" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFoto(e.target.files[0])}
                                    id="foto-upload"
                                />
                                <label htmlFor="foto-upload" className="upload-btn">
                                    📷 {foto ? foto.name : "Fotoğraf Yükle"}
                                </label>
                            </div>

                            <label>Sesli Rehber</label>
                            <div className="file-upload-section">
                                {currentSes && (
                                    <div className="current-file">
                                        <audio controls>
                                            <source src={currentSes} />
                                        </audio>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => setSes(e.target.files[0])}
                                    id="ses-upload"
                                />
                                <label htmlFor="ses-upload" className="upload-btn">
                                    🎵 {ses ? ses.name : "Ses Dosyası Yükle"}
                                </label>
                            </div>

                            <label>Dönem</label>
                            <input
                                type="text"
                                value={donem}
                                onChange={(e) => setDonem(e.target.value)}
                                placeholder="Dönem"
                            />

                            <label>Boyutlar</label>
                            <input
                                type="text"
                                value={boyut}
                                onChange={(e) => setBoyut(e.target.value)}
                                placeholder="Boyutlar (örn: 50x30x20 cm)"
                            />

                            <label>Getiren Kişi</label>
                            <input
                                type="text"
                                value={getirenKisi}
                                onChange={(e) => setGetirenKisi(e.target.value)}
                                placeholder="Getiren kişi"
                            />

                            <label>Getirildiği Tarih</label>
                            <input
                                type="date"
                                value={getirildigiTarih}
                                onChange={(e) => setGetirildigiTarih(e.target.value)}
                            />

                            <label>Açıklama</label>
                            <textarea
                                value={aciklama}
                                onChange={(e) => setAciklama(e.target.value)}
                                placeholder="Eser açıklaması"
                                rows="5"
                            />

                            {/* QR Code Section */}
                            {selectedEser.qrFoto && (
                                <div className="qr-section">
                                    <label>QR Kod</label>
                                    <div className="qr-container">
                                        <img
                                            src={selectedEser.qrFoto}
                                            alt={`${selectedEser.isim} QR Kod`}
                                            className="qr-image"
                                        />
                                        <button
                                            className="download-qr-btn"
                                            onClick={() => handleDownloadQR(selectedEser.qrFoto, selectedEser.isim)}
                                            type="button"
                                        >
                                            QR Kodu İndir
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="modal-actions">
                                <button className="comments-btn" onClick={() => {
                                    closeModal();
                                    openCommentsModal(selectedEser);
                                }}>
                                    Yorumlar
                                </button>
                                <button className="delete-btn" onClick={handleDelete}>
                                    Sil
                                </button>
                                <button className="save-btn" onClick={handleSave}>
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* yorumlar popup */}
            {showCommentsModal && selectedEser && (
                <div className="modal-overlay" onClick={closeCommentsModal}>
                    <div className="modal-content comments-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>"{selectedEser.isim}" - Yorumlar</h2>
                            <button className="close-btn" onClick={closeCommentsModal}>×</button>
                        </div>

                        <div className="modal-body">
                            {loadingComments ? (
                                <p className="loading">Yorumlar yükleniyor...</p>
                            ) : yorumlar.length === 0 ? (
                                <p className="no-data">Bu esere henüz yorum yapılmamış.</p>
                            ) : (
                                <div className="comments-list">
                                    {yorumlar.map((yorum) => (
                                        <div key={yorum.id} className={`comment-card ${yorum.okundu ? 'read' : 'unread'}`}>
                                            <div className="comment-header">
                                                <div className="comment-user">
                                                    <strong>{yorum.adSoyad}</strong>
                                                    <span className="comment-email">{yorum.email}</span>
                                                    <span className={`comment-status-badge ${yorum.okundu ? 'status-read' : 'status-unread'}`}>
                                                        {yorum.okundu ? "Okundu" : "Okunmadı"}
                                                    </span>
                                                </div>
                                                <div className="comment-rating">
                                                    {"⭐".repeat(yorum.puan)}
                                                </div>
                                            </div>
                                            <p className="comment-text">{yorum.yorum}</p>
                                            <div className="comment-footer">
                                                <span className="comment-date">
                                                    {new Date(yorum.createdAt).toLocaleDateString("tr-TR")}
                                                </span>
                                                <div className="comment-actions">
                                                    <button
                                                        className="toggle-read-btn"
                                                        onClick={() => handleToggleReadStatus(yorum)}
                                                        title={yorum.okundu ? "Okunmadı olarak işaretle" : "Okundu olarak işaretle"}
                                                    >
                                                        {yorum.okundu ? "📩 Okunmadı Yap" : "✅ Okundu Yap"}
                                                    </button>
                                                    <button
                                                        className="delete-comment-btn"
                                                        onClick={() => handleDeleteComment(yorum.id)}
                                                    >
                                                        🗑 Sil
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
