import React from "react";
import TopAppBar from "./components/TopAppBar.jsx";
import BottomAppBar from "./components/BottomAppBar.jsx";
import "./App.css";

import Anasayfa from "./pages/Anasayfa.jsx";
import Hakkimizda from "./pages/Hakkimizda.jsx";
import Eserler from "./pages/Eserler.jsx";
import EserDetay from "./pages/EserDetay.jsx";
import Iletisim from "./pages/Iletisim.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <TopAppBar />
            <main id="root">
                <Routes>
                    <Route path="/" element={<Anasayfa />} />
                    <Route path="/anasayfa" element={<Anasayfa />} />
                    <Route path="/hakkimizda" element={<Hakkimizda />} />
                    <Route path="/iletisim" element={<Iletisim />} />
                    <Route path="/eserler" element={<Eserler />} />
                    <Route path="/eser/:id" element={<EserDetay />} />
                </Routes>
            </main>
            <BottomAppBar />
        </Router>
    )
}

export default App;