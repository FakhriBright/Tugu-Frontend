<template>
  <div class="auth-wrapper">
    <!-- Static background of building photo -->
<div class="bg-slideshow">
  <div
    class="bg-slide bg-slide-active"
    style="background-image: url('/Gedung.jpg')"
  ></div>
  <div class="bg-gradient-overlay"></div>
</div>

    <!-- Split layout: left branding / right form -->
    <div class="auth-layout">
      <!-- Left Panel: Brand info -->
      <div class="brand-panel">
        <div class="brand-logo-wrap">
          <img src="/Logo.png" alt="Tugu Insurance" class="brand-logo" />
        </div>
        <div class="brand-copy">
          <h1 class="brand-headline">Portal<br /><span class="brand-accent">Admin</span><br />Tugu Insurance</h1>
          <p class="brand-sub">Sistem manajemen data terintegrasi untuk operasional internal perusahaan asuransi Tugu.</p>
          <div class="brand-features">
            <div class="feature-item">
              <span class="fi-dot fi-blue"></span>
              <span>Manajemen Produk &amp; Item</span>
            </div>
            <div class="feature-item">
              <span class="fi-dot fi-green"></span>
              <span>Monitoring Transaksi Real-time</span>
            </div>
            <div class="feature-item">
              <span class="fi-dot fi-red"></span>
              <span>Single Session JWT Security</span>
            </div>
          </div>
        </div>
        <div class="brand-footer-text">
          PT Asuransi Tugu Pratama Indonesia Tbk<br />
          <span class="ojk-text">Berizin &amp; diawasi OJK</span>
        </div>
      </div>

      <!-- Right Panel: Login Form -->
      <div class="form-panel">
        <div class="auth-card">
          <!-- Card top line glow -->
          <div class="card-top-glow"></div>

          <div class="auth-header">
            <div class="auth-icon">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 class="auth-title">Masuk Admin</h2>
            <p class="auth-subtitle">Autentikasi akun untuk akses panel admin</p>
          </div>

          <transition name="alert-slide">
            <div v-if="errorMsg" class="alert alert-danger">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ errorMsg }}
            </div>
          </transition>

          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="form-group">
              <label>Email</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input type="email" v-model="email" placeholder="admin@tugu.com" required />
              </div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input :type="showPass ? 'text' : 'password'" v-model="password" placeholder="••••••••" required minlength="6" />
                <button type="button" class="pass-toggle" @click="showPass = !showPass" tabindex="-1">
                  <svg v-if="!showPass" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" class="btn-submit" :disabled="loading">
              <span v-if="loading" class="btn-spinner"></span>
              <span v-else>Masuk ke Panel Admin</span>
            </button>

            <!-- Separator "Atau masuk dengan" -->
            <div class="sso-separator">
              <span class="sso-separator-text">Atau masuk dengan</span>
            </div>

            <!-- Tombol SSO Google & Facebook -->
            <div class="sso-grid">
              <button 
                @click="loginWithSSO('google')"
                type="button"
                class="btn-sso"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" style="flex-shrink:0;">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.72 5.72 0 0 1 8.28 12.87a5.72 5.72 0 0 1 5.71-5.73 5.48 5.48 0 0 1 3.86 1.54l3.22-3.23A10.16 10.16 0 0 0 13.99 3a9.98 9.98 0 0 0-9.99 10 9.98 9.98 0 0 0 9.99 10c5.36 0 9.92-3.79 9.92-10a9.04 9.04 0 0 0-.17-1.715h-11.5Z"/>
                </svg>
                Google
              </button>

              <button 
                @click="loginWithSSO('facebook')"
                type="button"
                class="btn-sso"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" style="flex-shrink:0;">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </form>

          <div class="auth-bottom">
            <router-link to="/admin/register" class="back-link">
              Belum punya akun? Registrasi Admin
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api, { getAuthUrl } from '../api';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const loading = ref(false);
const showPass = ref(false);
const errorMsg = ref('');

onMounted(() => {
  if (route.query.error) {
    errorMsg.value = route.query.error;
  }
});

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await api.post('/login', { email: email.value, password: password.value });
    const token = res.data?.data?.access_token;
    const user = res.data?.data?.user;

    if (!token) {
      throw new Error('Token tidak ditemukan');
    }

    if (user?.role !== 'admin') {
      errorMsg.value = 'Akun ini bukan akun admin.';
      return;
    }

    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/admin/dashboard');
  } catch (e) {
    errorMsg.value = e.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
  } finally {
    loading.value = false;
  }
};

const loginWithSSO = (provider) => {
  window.location.href = getAuthUrl(provider, 'admin');
};
</script>

<style scoped>
/* ============ WRAPPER ============ */
.auth-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
  box-sizing: border-box;
}

/* ============ SLIDESHOW BACKGROUND ============ */
.bg-slideshow {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.4s ease-in-out;
}

.bg-slide-active { opacity: 1; }

.bg-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(4, 13, 28, 0.92) 0%,
    rgba(9, 26, 56, 0.85) 45%,
    rgba(4, 13, 28, 0.75) 100%
  );
}

/* ============ PARTICLES ============ */
.particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; }

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float linear infinite;
}

.p1 { width: 6px; height: 6px; background: #0052cc; top: 15%; left: 20%; animation-duration: 12s; animation-delay: 0s; }
.p2 { width: 4px; height: 4px; background: #38bdf8; top: 70%; left: 10%; animation-duration: 18s; animation-delay: -4s; }
.p3 { width: 8px; height: 8px; background: #84cc16; top: 40%; left: 5%; animation-duration: 14s; animation-delay: -2s; }
.p4 { width: 5px; height: 5px; background: #0052cc; top: 80%; left: 30%; animation-duration: 16s; animation-delay: -8s; }
.p5 { width: 7px; height: 7px; background: #38bdf8; top: 25%; left: 45%; animation-duration: 20s; animation-delay: -5s; }
.p6 { width: 4px; height: 4px; background: #ff3b30; top: 60%; left: 40%; animation-duration: 15s; animation-delay: -3s; }
.p7 { width: 6px; height: 6px; background: #84cc16; top: 10%; left: 35%; animation-duration: 11s; animation-delay: -7s; }
.p8 { width: 5px; height: 5px; background: #0052cc; top: 90%; left: 45%; animation-duration: 17s; animation-delay: -1s; }

@keyframes float {
  0% { transform: translateY(0) translateX(0); opacity: 0.15; }
  33% { transform: translateY(-40px) translateX(15px); opacity: 0.25; }
  66% { transform: translateY(-20px) translateX(-10px); opacity: 0.1; }
  100% { transform: translateY(0) translateX(0); opacity: 0.15; }
}

/* ============ SPLIT LAYOUT ============ */
.auth-layout {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* ============ LEFT BRAND PANEL ============ */
.brand-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 52px;
}

.brand-logo-wrap { display: inline-block; margin-bottom: 0; }
.brand-logo { height: 52px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5)); }

.brand-copy { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; }

.brand-headline {
  font-size: 3.4rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -1.5px;
  text-shadow: 0 4px 24px rgba(0,0,0,0.8);
}

.brand-accent {
  background: linear-gradient(135deg, #38bdf8 0%, #0052cc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 380px;
  margin-bottom: 36px;
}

.brand-features { display: flex; flex-direction: column; gap: 12px; }

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.75);
}

.fi-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.fi-blue { background: #38bdf8; box-shadow: 0 0 8px rgba(56,189,248,0.6); }
.fi-green { background: #84cc16; box-shadow: 0 0 8px rgba(132,204,22,0.6); }
.fi-red { background: #ff3b30; box-shadow: 0 0 8px rgba(255,59,48,0.6); }

.brand-footer-text {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.5;
}

.ojk-text { color: rgba(56,189,248,0.6); }

/* ============ RIGHT FORM PANEL ============ */
.form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 52px;
}

.auth-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: rgba(10, 22, 48, 0.88);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 82, 204, 0.35);
  border-radius: 28px;
  padding: 40px 36px;
  box-shadow: 0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
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

/* Header */
.auth-header { text-align: center; margin-bottom: 28px; }

.auth-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, rgba(0,82,204,0.3), rgba(56,189,248,0.2));
  border: 1px solid rgba(0,82,204,0.4);
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #38bdf8;
  margin-bottom: 14px;
}

.auth-title { font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 6px; }
.auth-subtitle { font-size: 0.84rem; color: #64748b; }

/* Form */
.auth-form { display: flex; flex-direction: column; gap: 16px; }

.form-group { display: flex; flex-direction: column; gap: 7px; text-align: left; }

.form-group label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.3px;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #475569;
  pointer-events: none;
}

.input-wrap input {
  width: 100%;
  background: rgba(5, 13, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  padding: 12px 42px 12px 42px;
  font-size: 0.92rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
}

.input-wrap input:focus {
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.2);
}

.input-wrap input::placeholder { color: #334155; }

.pass-toggle {
  position: absolute;
  right: 14px;
  background: transparent;
  border: none;
  color: #475569;
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  transition: color 0.2s;
}

.pass-toggle:hover { color: #94a3b8; }

/* Submit Button */
.btn-submit {
  background: linear-gradient(135deg, #0052cc 0%, #1e40af 100%);
  color: white;
  padding: 13px 24px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.95rem;
  width: 100%;
  margin-top: 6px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 82, 204, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s ease;
  font-family: inherit;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 82, 204, 0.6);
}

.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Alerts */
.alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  border-radius: 10px;
  font-size: 0.84rem;
  margin-bottom: 4px;
}

.alert-danger { background: rgba(255,59,48,0.12); color: #ff6b6b; border: 1px solid rgba(255,59,48,0.25); }

/* Transitions */
.alert-slide-enter-active { transition: all 0.3s ease; }
.alert-slide-enter-from { opacity: 0; transform: translateY(-8px); }

/* Bottom */
.auth-bottom { text-align: center; margin-top: 22px; }

.back-link {
  font-size: 0.83rem;
  color: #475569;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover { color: #94a3b8; }

/* Responsive */
@media (max-width: 768px) {
  .auth-layout { grid-template-columns: 1fr; }
  .brand-panel { display: none; }
  .form-panel { padding: 30px 20px; }
}

/* SSO Buttons & Separator */
.sso-separator {
  position: relative;
  margin: 20px 0 10px 0;
  text-align: center;
}

.sso-separator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.sso-separator-text {
  position: relative;
  z-index: 2;
  background-color: #0b1630;
  padding: 0 12px;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.sso-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
}

.btn-sso {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(5, 13, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  padding: 11px 16px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-sso:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 82, 204, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
