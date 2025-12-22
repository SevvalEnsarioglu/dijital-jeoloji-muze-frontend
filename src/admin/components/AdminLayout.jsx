import React from "react";
import AdminTopBar from "./AdminTopBar";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-root">
      <AdminTopBar />

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
