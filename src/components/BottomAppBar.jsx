import React from "react";
import "../styles/BottomAppBar.css";

const BottomAppBar = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bottom-app-bar">
            <p className="copyright">
                &copy; {currentYear} Dijital Jeoloji Müzesi. Tüm hakları saklıdır.
            </p>
        </footer>
    );
};

export default BottomAppBar;