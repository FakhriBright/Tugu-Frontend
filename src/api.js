import axios from 'axios';

const apiHost = window.location.hostname || 'localhost';
const apiPort = import.meta.env.VITE_API_PORT || '8000';
const apiBaseURL = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${apiHost}:${apiPort}/api`;

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getAuthUrl = (provider, role) => {
  const base = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${apiHost}:${apiPort}/api`;
  return `${base}/auth/${provider}?role=${role}`;
};
  
// Buat nyertain Authorization Bearer pada setiap permintaan kalo ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Single Login handling: Intercept 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid/expired due to Single Login override or logout
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      const message = error.response.data?.message || 'Sesi Anda telah berakhir.';
      // Dispatch custom event for global notification handling in Vue
      window.dispatchEvent(new CustomEvent('auth-expired', { detail: message }));
    }
    return Promise.reject(error);
  }
);

export default api; 
