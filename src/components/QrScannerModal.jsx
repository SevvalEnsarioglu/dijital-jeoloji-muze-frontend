import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import "../styles/QrScannerModal.css";

export default function QrScannerModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const scannerRef = useRef(null);
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        let scanner = null;

        const startScanner = async () => {
            try {
                setError(null);
                setIsScanning(true);

                scanner = new Html5Qrcode("qr-reader");
                scannerRef.current = scanner;

                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                };

                await scanner.start(
                    { facingMode: "environment" },
                    config,
                    (decodedText) => {
                        // QR kod başarıyla okundu
                        handleScanSuccess(decodedText);
                    },
                    (errorMessage) => {
                        // Her frame'de hata döner, bu normal - sadece sessizce yoksay
                        // console.log("Scan error:", errorMessage);
                    }
                );
            } catch (err) {
                console.error("Kamera başlatma hatası:", err);
                setError("Kameraya erişim sağlanamadı. Lütfen kamera izinlerini kontrol edin.");
                setIsScanning(false);
            }
        };

        startScanner();

        return () => {
            if (scannerRef.current) {
                scannerRef.current
                    .stop()
                    .then(() => {
                        scannerRef.current = null;
                    })
                    .catch((err) => {
                        console.error("Scanner durdurma hatası:", err);
                    });
            }
        };
    }, [isOpen]);

    const handleScanSuccess = (decodedText) => {
        // QR kod tarandı, scanner'ı durdur
        if (scannerRef.current) {
            scannerRef.current
                .stop()
                .then(() => {
                    scannerRef.current = null;
                    extractAndNavigate(decodedText);
                })
                .catch((err) => {
                    console.error("Scanner durdurma hatası:", err);
                    extractAndNavigate(decodedText);
                });
        } else {
            extractAndNavigate(decodedText);
        }
    };

    const extractAndNavigate = (qrData) => {
        try {
            // QR koddan eser ID'sini çıkar
            // Muhtemel formatlar:
            // 1. http://domain.com/eserler/123
            // 2. /eserler/123
            // 3. 123

            let eserId = null;

            // URL ise parse et
            if (qrData.includes("/eserler/")) {
                const match = qrData.match(/\/eserler\/(\d+)/);
                if (match) {
                    eserId = match[1];
                }
            }
            // Sadece sayı ise direkt kullan
            else if (/^\d+$/.test(qrData)) {
                eserId = qrData;
            }

            if (eserId) {
                onClose();
                navigate(`/eserler/${eserId}`);
            } else {
                setError("Geçersiz QR kod. Lütfen bir eser QR kodu okutun.");
                setIsScanning(false);
            }
        } catch (err) {
            console.error("QR kod işleme hatası:", err);
            setError("QR kod işlenirken hata oluştu.");
            setIsScanning(false);
        }
    };

    const handleClose = () => {
        if (scannerRef.current) {
            scannerRef.current
                .stop()
                .then(() => {
                    scannerRef.current = null;
                    onClose();
                })
                .catch((err) => {
                    console.error("Scanner durdurma hatası:", err);
                    onClose();
                });
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="qr-scanner-overlay" onClick={handleClose}>
            <div className="qr-scanner-modal" onClick={(e) => e.stopPropagation()}>
                <div className="qr-scanner-header">
                    <h2>QR Kod Okut</h2>
                    <button className="qr-close-btn" onClick={handleClose}>
                        ×
                    </button>
                </div>

                <div className="qr-scanner-body">
                    {error ? (
                        <div className="qr-error">
                            <p>{error}</p>
                            <button className="retry-btn" onClick={() => window.location.reload()}>
                                Tekrar Dene
                            </button>
                        </div>
                    ) : (
                        <>
                            <div id="qr-reader" className="qr-reader-container"></div>
                            {isScanning && (
                                <div className="scan-instructions">
                                    <p>📷 QR kodu kamera ile tarayın</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
