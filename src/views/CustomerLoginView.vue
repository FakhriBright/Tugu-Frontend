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

      <a :href="googleLoginUrl" class="btn-google">Masuk dengan Google</a>

      <div class="cust-auth-bottom">
        Belum punya akun?
        <router-link to="/customer/register">Daftar sekarang</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const showPass = ref(false);
const errorMsg = ref('');

// URL redirect ke backend untuk mulai alur SSO Google
const googleLoginUrl = computed(() => 'http://127.0.0.1:8000/api/auth/google');

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
    router.push('/customer/dashboard');
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

.btn-google {
  display: flex; align-items: center; justify-content: center;
  background: rgba(5,13,26,0.6);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: white;
  padding: 11px 16px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
}
.btn-google:hover { background: rgba(255,255,255,0.08); border-color: rgba(0,82,204,0.5); }

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
