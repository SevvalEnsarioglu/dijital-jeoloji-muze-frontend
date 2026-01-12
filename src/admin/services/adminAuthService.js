import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const AUTH_API_URL = `${API_BASE_URL}/api/admin/adminauth`;

/**
 * Admin login - Backend'e kullanıcı adı ve şifre gönderir, JWT token alır
 * @param {string} username - Kullanıcı adı
 * @param {string} password - Şifre
 * @returns {Promise<{success: boolean, message: string, username?: string}>}
 */
export async function loginAdmin(username, password) {
    try {
        const response = await axios.post(`${AUTH_API_URL}/login`, {
            username,
            password
        });

        const { token, username: returnedUsername, message } = response.data;

        // Token'ı ve kullanıcı adını localStorage'a kaydet
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUsername', returnedUsername);

        return {
            success: true,
            message: message || 'Giriş başarılı',
            username: returnedUsername
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Giriş başarısız. Kullanıcı adı veya şifre hatalı.'
        };
    }
}

/**
 * Admin logout - Token'ı ve kullanıcı bilgilerini temizler
 */
export function logoutAdmin() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
}

/**
 * Admin authentication kontrolü
 * @returns {boolean} - Token varsa true, yoksa false
 */
export function isAdminAuthenticated() {
    return !!localStorage.getItem('adminToken');
}

/**
 * Admin token'ı döndürür
 * @returns {string|null} - JWT token veya null
 */
export function getAdminToken() {
    return localStorage.getItem('adminToken');
}

/**
 * Admin kullanıcı adını döndürür
 * @returns {string|null} - Kullanıcı adı veya null
 */
export function getAdminUsername() {
    return localStorage.getItem('adminUsername');
}
