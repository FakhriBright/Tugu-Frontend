import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
  
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
