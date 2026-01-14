import React, { useEffect, useState } from "react";
import EserCard from "../components/EserCard";
import { getAllEser } from "../services/eserService";
import "../styles/Eserler.css";

const Eserler = () => {
    const [eserler, setEserler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("newest");

    useEffect(() => {
        loadEserler();
    }, [sortOption]);

    const loadEserler = async () => {
        try {
            setLoading(true);
            const { sortBy, sortDirection } = getSortParams(sortOption);
            const data = await getAllEser(sortBy, sortDirection);
            setEserler(data);
        } catch (error) {
            console.error("Eserler yüklenirken hata:", error);
        } finally {
            setLoading(false);
        }
    };

    const getSortParams = (option) => {
        switch (option) {
            case "newest":
                return { sortBy: "id", sortDirection: "DESC" };
            case "oldest":
                return { sortBy: "id", sortDirection: "ASC" };
            case "nameAZ":
                return { sortBy: "isim", sortDirection: "ASC" };
            case "nameZA":
                return { sortBy: "isim", sortDirection: "DESC" };
            case "mostViewed":
                return { sortBy: "goruntulenmeSayisi", sortDirection: "DESC" };
            default:
                return { sortBy: "id", sortDirection: "DESC" };
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    if (loading) {
        return <div className="loading-text">Yükleniyor...</div>;
    }

    return (
        <div className="eserler-page">
            <div className="eserler-container">
                <div className="eserler-header">
                    <h1 className="eserler-title">Eserler</h1>
                    <div className="sort-controls">
                        <label htmlFor="sort-select" className="sort-label">
                            Sırala:
                        </label>
                        <select
                            id="sort-select"
                            className="sort-dropdown"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="newest">En Yeni</option>
                            <option value="oldest">En Eski</option>
                            <option value="nameAZ">İsme Göre (A-Z)</option>
                            <option value="nameZA">İsme Göre (Z-A)</option>
                            <option value="mostViewed">En Çok Görüntülenen</option>
                        </select>
                    </div>
                </div>

                <div className="eserler-grid">
                    {eserler.length === 0 ? (
                        <p className="no-data">Henüz eser bulunmamaktadır.</p>
                    ) : (
                        eserler.map((eser) => <EserCard key={eser.id} eser={eser} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Eserler;
