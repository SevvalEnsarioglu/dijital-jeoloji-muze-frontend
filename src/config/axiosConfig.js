import axios from 'axios';
import { API_BASE_URL } from './api';

// Admin API için özel axios instance
export const adminAxios = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor - Her istekte token ekle
adminAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - 401/403 hatalarını yakala
adminAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token geçersiz veya yok, login sayfasına yönlendir
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUsername');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// Public API için normal axios (token gerektirmeyen)
export const publicAxios = axios.create({
    baseURL: API_BASE_URL,
});
