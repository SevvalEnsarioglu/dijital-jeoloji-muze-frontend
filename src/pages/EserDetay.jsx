import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEserById, getYorumByEserId, createEserYorum } from "../services/eserService";
import "../styles/EserDetay.css";

const EserDetay = () => {
    const { id } = useParams();
    const [eser, setEser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [yorumlar, setYorumlar] = useState([]);
    const [loadingYorumlar, setLoadingYorumlar] = useState(false);

    // Yorum formu state'leri
    const [adSoyad, setAdSoyad] = useState("");
    const [email, setEmail] = useState("");
    const [yorum, setYorum] = useState("");
    const [puan, setPuan] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadEser();
        loadYorumlar();
    }, [id]);

    const loadEser = async () => {
        try {
            setLoading(true);
            const data = await getEserById(id);
            setEser(data);
        } catch (error) {
            console.error("Eser yüklenirken hata:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadYorumlar = async () => {
        try {
            setLoadingYorumlar(true);
            const data = await getYorumByEserId(id);
            setYorumlar(data);
        } catch (error) {
            console.error("Yorumlar yüklenirken hata:", error);
            setYorumlar([]);
        } finally {
            setLoadingYorumlar(false);
        }
    };

    const handleSubmitYorum = async (e) => {
        e.preventDefault();

        if (!adSoyad || !email || !yorum) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        try {
            setSubmitting(true);
            const yorumData = {
                eserID: parseInt(id),
                adSoyad,
                email,
                yorum,
                puan
            };

            await createEserYorum(yorumData);
            alert("Yorumunuz başarıyla gönderildi!");

            // formu temizle
            setAdSoyad("");
            setEmail("");
            setYorum("");
            setPuan(5);

            // yorumlar reload
            loadYorumlar();
        } catch (error) {
            console.error("Yorum gönderilirken hata:", error);
            alert("Yorum gönderilirken bir hata oluştu!");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="loading-text">Yükleniyor...</div>;
    if (!eser) return <div className="loading-text">Eser bulunamadı.</div>;

    return (
        <div className="eser-detay-page">
            <div className="eser-detay-container">
                {/* GÖRSEL */}
                <div className="eser-detay-image">
                    {eser.foto ? (
                        <img src={eser.foto} alt={eser.isim} />
                    ) : (
                        <div className="no-image">Fotoğraf Yok</div>
                    )}
                </div>

                {/* BAŞLIK */}
                <h1 className="eser-detay-title">{eser.isim}</h1>

                {/* DÖNEM */}
                {eser.donem && (
                    <p className="eser-detay-info">
                        <strong>Dönem:</strong> {eser.donem}
                    </p>
                )}

                {/* BOYUTLAR */}
                {eser.boyut && (
                    <p className="eser-detay-info">
                        <strong>Boyutlar:</strong> {eser.boyut}
                    </p>
                )}

                {/* GETİREN KİŞİ */}
                {eser.getirenKisi && (
                    <p className="eser-detay-info">
                        <strong>Getiren:</strong> {eser.getirenKisi}
                    </p>
                )}

                {/* GETİRİLDİĞİ TARİH */}
                {eser.getirildigiTarih && (
                    <p className="eser-detay-info">
                        <strong>Getirildiği Tarih:</strong>{" "}
                        {new Date(eser.getirildigiTarih).toLocaleDateString("tr-TR")}
                    </p>
                )}

                {/* SESLİ REHBER */}
                {eser.ses && (
                    <div className="eser-detay-audio">
                        <h4>Sesli Rehber</h4>
                        <audio controls>
                            <source src={eser.ses} />
                            Tarayıcınız ses dosyasını desteklemiyor.
                        </audio>
                    </div>
                )}

                {/* AÇIKLAMA METNİ */}
                <p className="eser-detay-description">
                    {eser.aciklama || "Açıklama bilgisi bulunmamaktadır."}
                </p>

                {/* GÖRÜNTÜLENME SAYISI */}
                <p className="eser-detay-views">
                    👁 {eser.goruntulenmeSayisi || 0} kez görüntülendi
                </p>

                {/* YORUM BÖLÜMÜ */}
                <div className="yorumlar-section">
                    <h2 className="yorumlar-title">Yorumlar</h2>

                    {/* YORUMLAR LİSTESİ */}
                    <div className="yorumlar-list">
                        {loadingYorumlar ? (
                            <p className="loading-text">Yorumlar yükleniyor...</p>
                        ) : yorumlar.length === 0 ? (
                            <p className="no-yorumlar">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
                        ) : (
                            yorumlar.map((yorumItem) => (
                                <div key={yorumItem.id} className="yorum-card">
                                    <div className="yorum-header">
                                        <div className="yorum-user-info">
                                            <strong className="yorum-name">{yorumItem.adSoyad}</strong>
                                            <span className="yorum-date">
                                                {new Date(yorumItem.createdAt).toLocaleDateString("tr-TR")}
                                            </span>
                                        </div>
                                        <div className="yorum-rating">
                                            {"⭐".repeat(yorumItem.puan)}
                                        </div>
                                    </div>
                                    <p className="yorum-text">{yorumItem.yorum}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* YORUM FORMU */}
                    <div className="yorum-form-container">
                        <h3>Yorum Yap</h3>
                        <form onSubmit={handleSubmitYorum} className="yorum-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ad Soyad</label>
                                    <input
                                        type="text"
                                        value={adSoyad}
                                        onChange={(e) => setAdSoyad(e.target.value)}
                                        placeholder="Adınız ve soyadınız"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>E-posta</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="E-posta adresiniz"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Puan</label>
                                <div className="rating-selector">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={`star-btn ${puan >= star ? 'active' : ''}`}
                                            onClick={() => setPuan(star)}
                                        >
                                            ⭐
                                        </button>
                                    ))}
                                    <span className="rating-text">{puan} / 5</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Yorumunuz</label>
                                <textarea
                                    value={yorum}
                                    onChange={(e) => setYorum(e.target.value)}
                                    placeholder="Yorumunuzu yazın..."
                                    rows="5"
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-yorum-btn" disabled={submitting}>
                                {submitting ? "Gönderiliyor..." : "Yorum Gönder"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EserDetay;
