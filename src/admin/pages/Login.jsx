import React, { useState } from "react";
import { loginAdmin } from "../services/adminAuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin() {
        const ok = loginAdmin(username, password);
        if (ok) navigate("/admin/dashboard");
        else setError("Hatalı kullanıcı adı veya şifre");
    }

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto" }}>
            <h1>Admin Girişi</h1>

            <input
                placeholder="Kullanıcı adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Şifre"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Giriş Yap</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
