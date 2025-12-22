import { NavLink } from "react-router-dom";
import "../styles/AdminTopBar.css";

export default function AdminTopBar() {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        Admin Panel
      </div>

      <nav className="admin-topbar-center">
        <NavLink to="/admin/dashboard">Anasayfa</NavLink>
        <NavLink to="/admin/eserler">Eserler</NavLink>
        <NavLink to="/admin/hakkimizda">Hakkımızda</NavLink>
        <NavLink to="/admin/iletisim">İletişim</NavLink>
      </nav>
    </header>
  );
}
