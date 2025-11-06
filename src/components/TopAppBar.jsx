import React, { useState, useEffect } from "react";
import { Sun, Moon, Globe, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../styles/TopAppBar.css";

const MENU_ITEMS = [
    { path: "/anasayfa", label: "Anasayfa" },
    { path: "/eserler", label: "Eserler" },
    { path: "/hakkimizda", label: "Hakkımızda" },
    { path: "/iletisim", label: "İletişim" }
];
const THEME_KEY = "theme";

const TopAppBar = () => {
    const location = useLocation();

    // Sistem tercihi (ilk yüklemede)
    const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Kalıcı tema
    const [theme, setTheme] = useState(
        localStorage.getItem(THEME_KEY) || (prefersDark ? "dark" : "light")
    );

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState("TR");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

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
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const toggleLanguage = () => {
        setLanguage(language === "TR" ? "EN" : "TR");
    };

    return (
        <>
            {isMenuOpen && (
                <div 
                    className="menu-overlay" 
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}
            <header className="top-app-bar">
                <div className="app-logo">    {/* TODO logo gelince buraya eklenecek */}
                    <Link to="/" className="logo-link" onClick={closeMenu}>
                        <span className="logo-text">Dijital Jeoloji Müzesi</span>
                    </Link>
                </div>

                <nav className="nav-links desktop-nav">
                    <ul>
                        {MENU_ITEMS.map((item) => (
                            <li key={item.path}>
                                <Link to={item.path} className="nav-item">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="top-bar-actions">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label="Tema değiştir"
                        title={theme === "dark" ? "Açık moda geç" : "Koyu moda geç"}

                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}

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
                    {MENU_ITEMS.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="sidebar-nav-item"
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default TopAppBar;