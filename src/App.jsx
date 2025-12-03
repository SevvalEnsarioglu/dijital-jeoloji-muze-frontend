import React from "react";
import TopAppBar from "./components/TopAppBar.jsx";
import BottomAppBar from "./components/BottomAppBar.jsx";
import "./App.css";
import FloatingQrButton from "./components/FloatingQrButton";
import Anasayfa from "./pages/Anasayfa.jsx";
import Hakkimizda from "./pages/Hakkimizda.jsx";
import Eserler from "./pages/Eserler.jsx";
import EserDetay from "./pages/EserDetay.jsx";
import Iletisim from "./pages/Iletisim.jsx";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ManageAbout from "./admin/pages/ManageAbout";
import AdminRoute from "./admin/AdminRoute";
import AdminLayout from "./admin/components/AdminLayout";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// QR sadece admin dışında çalışsın
function QrIfNotHome() {
    const location = useLocation();
    const path = location.pathname;

    const hideQr =
        path === "/" ||
        path === "/anasayfa" ||
        path.startsWith("/admin");  // yeni eklendi

    return hideQr ? null : <FloatingQrButton />;
}
// HEADER / FOOTER sadece USER sayfalarında gözükecek
function LayoutWrapper({ children }) {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    if (isAdmin) {
        // Admin sayfalarında TopBar, BottomBar, QR yok
        return <>{children}</>;
    }

    // Kullanıcı layoutu
    return (
        <>
            <TopAppBar />
            <main className="main-content">{children}</main>
            <BottomAppBar />
            <QrIfNotHome />
        </>
    );
}

function App() {
    return (
        <Router>
            <LayoutWrapper>
                <Routes>

                    {/* Kullanıcı rotaları */}
                    <Route path="/" element={<Anasayfa />} />
                    <Route path="/anasayfa" element={<Anasayfa />} />
                    <Route path="/hakkimizda" element={<Hakkimizda />} />
                    <Route path="/iletisim" element={<Iletisim />} />
                    <Route path="/eserler" element={<Eserler />} />
                    <Route path="/eser/:id" element={<EserDetay />} />


                    {/* Admin login (korumasız) */}
                    <Route path="/admin/login" element={<Login />} />

                    {/* Admin dashboard */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <AdminRoute>
                                <AdminLayout>
                                    <Dashboard />
                                </AdminLayout>
                            </AdminRoute>
                        }
                    />

                    {/* Admin hakkımızda yönetim */}
                    <Route
                        path="/admin/hakkimizda"
                        element={
                            
                                
                                <ManageAbout />
                               
                            //adminlayout eklenecek sonra
                        }
                    />

                </Routes>
            </LayoutWrapper>
        </Router>
    );
}

export default App;