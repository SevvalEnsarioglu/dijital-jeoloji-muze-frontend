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
import ManageHomepage from "./admin/pages/ManageHomepage";
import ManageVisitingHours from "./admin/pages/ManageVisitingHours";
import AdminRoute from "./admin/AdminRoute";
import AdminLayout from "./admin/components/AdminLayout";
import ManageContact from "./admin/pages/ManageContact";
import ManageArtifacts from "./admin/pages/ManageArtifacts";
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
        // Admin sayfalarında TopBar, BottomBar, QR yok - tamamen ayrı layout
        return <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>{children}</div>;
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

                    {/* Admin ana sayfa */}
                    <Route
                        path="/admin/anasayfa"
                        element={
                            <AdminLayout>
                                <ManageHomepage />
                            </AdminLayout>
                        }
                    />

                    {/* Admin eserler */}
                    <Route
                        path="/admin/eserler"
                        element={
                            <AdminLayout>
                                <ManageArtifacts />
                            </AdminLayout>
                        }
                    />

                    {/* Admin hakkımızda */}
                    <Route
                        path="/admin/hakkimizda"
                        element={
                            <AdminLayout>
                                <ManageAbout />
                            </AdminLayout>
                        }
                    />

                    {/* Admin iletişim */}
                    <Route
                        path="/admin/iletisim"
                        element={
                            <AdminLayout>
                                <ManageContact />
                            </AdminLayout>
                        }
                    />

                    {/* Admin ziyaret saatleri */}
                    <Route
                        path="/admin/ziyaret-saatleri"
                        element={
                            <AdminLayout>
                                <ManageVisitingHours />
                            </AdminLayout>
                        }
                    />




                </Routes>
            </LayoutWrapper>
        </Router>
    );
}

export default App;