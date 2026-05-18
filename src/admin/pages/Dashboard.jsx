import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminUsername } from "../services/adminAuthService";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const adminUsername = getAdminUsername();
        if (adminUsername) {
            setUsername(adminUsername);
        }

        // Update time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const quickActions = [
        {
            title: "Ana Sayfa Yönetimi",
            description: "Ana sayfa içeriklerini düzenle",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: "/admin/anasayfa",
            color: "#a78bfa"
        },
        {
            title: "Eser Yönetimi",
            description: "Müze eserlerini yönet",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: "/admin/eserler",
            color: "#8b5cf6"
        },
        {
            title: "Hakkımızda",
            description: "Hakkımızda bilgilerini düzenle",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: "/admin/hakkimizda",
            color: "#7c3aed"
        },
        {
            title: "Ziyaret Saatleri",
            description: "Ziyaret saatlerini güncelle",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: "/admin/ziyaretsaatleri",
            color: "#6d28d9"
        },
        {
            title: "İletişim Mesajları",
            description: "Gelen mesajları görüntüle",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: "/admin/iletisim",
            color: "#5b21b6"
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-background">
                <div className="dashboard-shape shape-1"></div>
                <div className="dashboard-shape shape-2"></div>
            </div>

            <div className="dashboard-container">
                {/* Welcome Section */}
                <div className="dashboard-welcome">
                    <div className="welcome-content">
                        <h1 className="welcome-title">
                            Hoş Geldiniz, <span className="username-highlight">{username || "Admin"}</span>
                        </h1>
                        <p className="welcome-subtitle">
                            Dijital Jeoloji Müzesi Yönetim Paneli
                        </p>
                    </div>
                    <div className="welcome-time">
                        <div className="time-display">{formatTime(currentTime)}</div>
                        <div className="date-display">{formatDate(currentTime)}</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-section">
                    <h2 className="section-title">Hızlı Erişim</h2>
                    <div className="quick-actions-grid">
                        {quickActions.map((action, index) => (
                            <div
                                key={index}
                                className="action-card"
                                onClick={() => navigate(action.path)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="action-icon" style={{ color: action.color }}>
                                    {action.icon}
                                </div>
                                <div className="action-content">
                                    <h3 className="action-title">{action.title}</h3>
                                    <p className="action-description">{action.description}</p>
                                </div>
                                <div className="action-arrow">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
