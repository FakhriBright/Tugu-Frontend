<template>
  <div class="cust-auth-wrapper">
    <div class="cust-auth-card">
      <router-link to="/" class="back-home">← Kembali ke Beranda</router-link>

      <div class="cust-auth-header">
        <img src="/Logo.png" alt="Tugu Insurance" class="cust-logo" />
        <h2>Masuk ke Akun Anda</h2>
        <p>Kelola polis dan transaksi asuransi Anda</p>
      </div>

      <transition name="alert-slide">
        <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
      </transition>

      <form @submit.prevent="handleLogin" class="cust-form">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="nama@email.com" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input :type="showPass ? 'text' : 'password'" v-model="password" placeholder="••••••••" required minlength="6" />
          <button type="button" class="pass-toggle" @click="showPass = !showPass">
            {{ showPass ? 'Sembunyikan' : 'Tampilkan' }}
          </button>
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="loading" class="btn-spinner"></span>
          <span v-else>Masuk</span>
        </button>
      </form>

      <div class="sso-separator"><span>atau</span></div>

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

      <div class="cust-auth-bottom">
        Belum punya akun?
        <router-link to="/customer/register">Daftar sekarang</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const showPass = ref(false);
const errorMsg = ref('');

const loginWithSSO = (provider) => {
  window.location.href = `http://localhost:8000/api/auth/${provider}?role=customer`;
};

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

    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    if (user?.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/customer/dashboard');
    }
  } catch (e) {
    errorMsg.value = e.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.cust-auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #040d1c 0%, #0b1630 100%);
  padding: 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.cust-auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(10, 22, 48, 0.9);
  border: 1px solid rgba(0, 82, 204, 0.3);
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}

.back-home {
  display: inline-block;
  color: #64748b;
  font-size: 0.85rem;
  text-decoration: none;
  margin-bottom: 24px;
}
.back-home:hover { color: #94a3b8; }

.cust-auth-header { text-align: center; margin-bottom: 28px; }
.cust-logo { height: 40px; margin-bottom: 16px; }
.cust-auth-header h2 { color: white; font-size: 1.5rem; font-weight: 800; margin-bottom: 6px; }
.cust-auth-header p { color: #64748b; font-size: 0.85rem; }

.cust-form { display: flex; flex-direction: column; gap: 16px; }
.form-group { position: relative; display: flex; flex-direction: column; gap: 6px; }
.form-group label { color: #94a3b8; font-size: 0.82rem; font-weight: 700; }
.form-group input {
  background: rgba(5,13,26,0.8);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: white;
  padding: 12px 14px;
  font-size: 0.92rem;
  outline: none;
}
.form-group input:focus { border-color: #0052cc; box-shadow: 0 0 0 3px rgba(0,82,204,0.2); }

.pass-toggle {
  align-self: flex-end;
  background: none;
  border: none;
  color: #475569;
  font-size: 0.78rem;
  cursor: pointer;
  margin-top: -4px;
}

.btn-submit {
  background: linear-gradient(135deg, #0052cc 0%, #1e40af 100%);
  color: white;
  padding: 13px 24px;
  border-radius: 12px;
  font-weight: 800;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0,82,204,0.45);
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-spinner {
  width: 18px; height: 18px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: white; border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.sso-separator {
  text-align: center; margin: 20px 0 16px;
  color: #475569; font-size: 0.8rem;
  position: relative;
}
.sso-separator::before {
  content: ''; position: absolute; top: 50%; left: 0; right: 0;
  height: 1px; background: rgba(255,255,255,0.1); z-index: 0;
}
.sso-separator span {
  position: relative; z-index: 1; background: #0a1630; padding: 0 12px;
}

.sso-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
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
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-sso:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 82, 204, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.cust-auth-bottom {
  text-align: center; margin-top: 22px;
  color: #64748b; font-size: 0.85rem;
}
.cust-auth-bottom a { color: #38bdf8; text-decoration: none; font-weight: 600; margin-left: 4px; }

.alert { padding: 11px 14px; border-radius: 10px; font-size: 0.84rem; margin-bottom: 16px; }
.alert-danger { background: rgba(255,59,48,0.12); color: #ff6b6b; border: 1px solid rgba(255,59,48,0.25); }
.alert-slide-enter-active { transition: all 0.3s ease; }
.alert-slide-enter-from { opacity: 0; transform: translateY(-8px); }
</style>
