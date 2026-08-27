<template>
  <div class="callback-wrapper">
    <div class="bg-gradient-overlay"></div>
    <div class="callback-card">
      <div class="card-top-glow"></div>
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>
      <h2 class="callback-title">Menghubungkan Sesi SSO...</h2>
      <p class="callback-subtitle">Mohon tunggu sebentar, sedang menyinkronkan data autentikasi Anda.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const token = route.query.token;
  const error = route.query.error;

  if (token) {
    // Simpan token JWT ke localStorage (meniru alur login manual yang sudah ada)
    localStorage.setItem('access_token', token);
    
    try {
      const res = await api.get('/me');
      if (res.data?.success && res.data?.data) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }
    } catch (e) {
      console.error('Gagal mengambil data user via SSO:', e);
    }
    
    // Redirect langsung ke Dashboard
    router.push('/dashboard'); 
  } else {
    // Jika gagal, kembalikan ke login dan tampilkan error
    const errMsg = error || 'Gagal login menggunakan SSO.';
    router.push(`/admin/login?error=${encodeURIComponent(errMsg)}`);
  }
});
</script>

<style scoped>
.callback-wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #070f23;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

.bg-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(4, 13, 28, 0.95) 0%,
    rgba(9, 26, 56, 0.9) 45%,
    rgba(4, 13, 28, 0.85) 100%
  );
  z-index: 0;
}

.callback-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  background: rgba(10, 22, 48, 0.88);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 82, 204, 0.35);
  border-radius: 28px;
  padding: 48px 36px;
  box-shadow: 0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
  text-align: center;
  animation: cardEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes cardEntrance {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.card-top-glow {
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0052cc, #38bdf8, #0052cc, transparent);
  border-radius: 2px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.spinner {
  width: 64px;
  height: 64px;
  border: 4px solid rgba(0, 82, 204, 0.15);
  border-top: 4px solid #38bdf8;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.callback-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.callback-subtitle {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.6;
}
</style>
