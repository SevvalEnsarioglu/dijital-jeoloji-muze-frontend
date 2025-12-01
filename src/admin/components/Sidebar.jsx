import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div style={{
            width: "250px",
            background: "#1e293b",
            height: "100vh",
            padding: "20px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

            <Link to="/admin/dashboard" style={{ color: "white" }}>Dashboard</Link>
            <Link to="/admin/hakkimizda" style={{ color: "white" }}>Hakkımızda</Link>
            <Link to="/admin/eserler" style={{ color: "white" }}>Eserler</Link>
            {/* eklenebilir */}
        </div>
    );
}
