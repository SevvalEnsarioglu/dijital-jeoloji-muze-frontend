import React, { useState } from "react";
import "../styles/FloatingQrButton.css";
import qrIcon from "../assets/qrIcon.png";
import QrScannerModal from "./QrScannerModal";

export default function FloatingQRButton() {
  const [showScanner, setShowScanner] = useState(false);

  const handleClick = () => {
    setShowScanner(true);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <>
      <button
        className="qr-floating-btn"
        onClick={handleClick}
        aria-label="QR okut"
        title="QR okut"
      >
        <img
          src={qrIcon}
          alt="QR"
          style={{ width: '32px', height: '32px' }}
        />
      </button>

      <QrScannerModal isOpen={showScanner} onClose={handleCloseScanner} />
    </>
  );
}
