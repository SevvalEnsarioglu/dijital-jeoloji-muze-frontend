export function loginAdmin(username, password) {
    // TODO: backend'e bağlayacaksın.
    // Şimdilik örnek giriş
    if (username === "admin" && password === "1234") {
        localStorage.setItem("adminToken", "example-token");
        return true;
    }
    return false;
}

export function logoutAdmin() {
    localStorage.removeItem("adminToken");
}

export function isAdminAuthenticated() {
    return !!localStorage.getItem("adminToken");
}
// Henüz gerçek token sistemimiz yok, şimdilik boş string döndürelim ki uygulama hata vermesin.
export function getAdminToken() {
    return ""; 
}

