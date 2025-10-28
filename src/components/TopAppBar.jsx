import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Globe, X } from "lucide-react";
import "../styles/TopAppBar.css";

const TopAppBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("TR");

    // Menü açıkken body scroll'u engelle
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark-mode");
    };

    const toggleLanguage = () => {
        setLanguage(language === "TR" ? "EN" : "TR");
    };

    return (
        <>
            {/* Overlay - menü açıkken arka planı karartır */}
            {isMenuOpen && (
                <div 
                    className="menu-overlay" 
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            <header className="top-app-bar">
                <div className="app-logo">
                    <Link to="/" className="logo-link" onClick={closeMenu}>
                        <span className="logo-text">Dijital Jeoloji Müzesi</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="nav-links desktop-nav">
                    <ul>
                        <li>
                            <Link to="/anasayfa" className="nav-item">
                                Anasayfa
                            </Link>
                        </li>
                        <li>
                            <Link to="/eserler" className="nav-item">
                                Eserler
                            </Link>
                        </li>
                        <li>
                            <Link to="/hakkimizda" className="nav-item">
                                Hakkımızda
                            </Link>
                        </li>
                        <li>
                            <Link to="/iletisim" className="nav-item">
                                İletişim
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="top-bar-actions">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label="Tema değiştir"
                        title={isDarkMode ? "Açık moda geç" : "Koyu moda geç"}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        className="language-toggle-btn"
                        onClick={toggleLanguage}
                        aria-label="Dil değiştir"
                        title="Dili değiştir"
                    >
                        <Globe size={18} />
                        <span className="language-text">{language}</span>
                    </button>

                    {/* Hamburger Menu Button */}
                    <button
                        className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Navigation */}
            <nav className={`mobile-sidebar ${isMenuOpen ? "active" : ""}`}>
                <div className="sidebar-header">
                    <span className="sidebar-title">Menü</span>
                    <button
                        className="close-sidebar-btn"
                        onClick={closeMenu}
                        aria-label="Menüyü kapat"
                    >
                        <X size={24} />
                    </button>
                </div>

                <ul className="sidebar-nav-list">
                    <li>
                        <Link
                            to="/anasayfa"
                            className="sidebar-nav-item"
                            onClick={closeMenu}
                        >
                            Anasayfa
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/eserler"
                            className="sidebar-nav-item"
                            onClick={closeMenu}
                        >
                            Eserler
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/hakkimizda"
                            className="sidebar-nav-item"
                            onClick={closeMenu}
                        >
                            Hakkımızda
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/iletisim"
                            className="sidebar-nav-item"
                            onClick={closeMenu}
                        >
                            İletişim
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default TopAppBar;