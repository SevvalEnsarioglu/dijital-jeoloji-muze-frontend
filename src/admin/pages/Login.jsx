import React, { useState } from "react";
import { loginAdmin } from "../services/adminAuthService";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await loginAdmin(username, password);

        setLoading(false);

        if (result.success) {
            navigate("/admin/dashboard");
        } else {
            setError(result.message);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="login-shape shape-1"></div>
                <div className="login-shape shape-2"></div>
                <div className="login-shape shape-3"></div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className="login-title">Admin Paneli</h1>
                        <p className="login-subtitle">Dijital Jeoloji Müzesi Yönetim Sistemi</p>
                    </div>

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Kullanıcı Adı
                            </label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    id="username"
                                    type="text"
                                    className="form-input"
                                    placeholder="Kullanıcı adınızı girin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={loading}
                                    autoComplete="username"
                                    required
                                    style={{ paddingLeft: '48px' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Şifre
                            </label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-input"
                                    placeholder="Şifrenizi girin"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={loading}
                                    autoComplete="current-password"
                                    required
                                    style={{ paddingLeft: '48px' }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading || !username || !password}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Giriş Yap
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>© 2026 Ankara Üniversitesi YEBİM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
