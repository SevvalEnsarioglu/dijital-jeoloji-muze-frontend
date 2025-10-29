import React from "react";
import "../styles/FloatingQrButton.css";
import qrIcon from "../assets/qrIcon.png";

export default function FloatingQRButton() {
  const handleClick = () => {
    // Demo aşamasında hiçbir şey yapma
    console.log("QR butonuna tıklandı (demo)");
  };

  return (
    <button
      className="qr-floating-btn"
      onClick={handleClick}
      aria-label="QR okut"
      title="QR okut"
    >
      <img 
        src={qrIcon} 
        alt="QR" 
        style={{ width: '28px', height: '28px', marginRight: 6 }} 
      />
    </button>
  );
}
