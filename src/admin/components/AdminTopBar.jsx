import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin, getAdminUsername } from "../services/adminAuthService";
import "../styles/AdminTopBar.css";

export default function AdminTopBar() {
  const navigate = useNavigate();
  const username = getAdminUsername();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        Admin Panel
      </div>

      <nav className="admin-topbar-center">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/anasayfa">Ana Sayfa</NavLink>
        <NavLink to="/admin/eserler">Eserler</NavLink>
        <NavLink to="/admin/hakkimizda">Hakkımızda</NavLink>
        <NavLink to="/admin/ziyaretsaatleri">Ziyaret Saatleri</NavLink>
        <NavLink to="/admin/iletisim">İletişim</NavLink>
      </nav>

      <div className="admin-topbar-right">
        <span className="admin-username">{username || "Admin"}</span>
        <button className="logout-btn" onClick={handleLogout}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Çıkış
        </button>
      </div>
    </header>
  );
}
