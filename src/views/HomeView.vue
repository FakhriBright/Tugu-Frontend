<template>
  <div class="home-wrapper">
    <!-- MEGA DRAWER OVERLAY MENU -->
    <transition name="drawer-fade">
      <div v-if="drawerOpen" class="drawer-overlay" @click.self="drawerOpen = false">
        <div class="drawer-panel">
          <div class="drawer-header">
            <img src="/Logo.png" alt="Tugu Insurance" class="drawer-logo" />
            <button class="drawer-close" @click="drawerOpen = false">✕</button>
          </div>
          <div class="drawer-grid">
            <div class="drawer-col">
              <div class="col-title"><span class="dot dot-blue"></span> Corporate</div>
              <ul class="drawer-links">
                <li><a href="#produk">Asuransi Kebakaran &amp; Properti</a></li>
                <li><a href="#produk">Asuransi Marine Cargo &amp; Logistik</a></li>
                <li><a href="#produk">Asuransi Rekayasa &amp; Konstruksi</a></li>
                <li><a href="#produk">Asuransi Energi &amp; Industri</a></li>
              </ul>
            </div>
            <div class="drawer-col">
              <div class="col-title"><span class="dot dot-green"></span> Syariah</div>
              <ul class="drawer-links">
                <li><a href="#produk">t-Drive Syariah (Kendaraan)</a></li>
                <li><a href="#produk">t-Property Syariah (Kebakaran)</a></li>
                <li><a href="#produk">t-Health Syariah (Kesehatan)</a></li>
                <li><a href="#produk">Prinsip Tabarru &amp; Hibah</a></li>
              </ul>
            </div>
            <div class="drawer-col">
              <div class="col-title"><span class="dot dot-red"></span> Retail</div>
              <ul class="drawer-links">
                <li><a href="#produk">Asuransi Kendaraan Ritel</a></li>
                <li><a href="#produk">Asuransi Rumah Tinggal</a></li>
                <li><a href="#produk">t-Travel (Perjalanan)</a></li>
                <li><a href="#produk">Personal Accident</a></li>
              </ul>
            </div>
            <div class="drawer-col highlight-col">
              <div class="col-title">Portal Pelanggan</div>
              <p class="drawer-desc">Beli, kelola, dan pantau polis asuransi Anda kapan saja.</p>
              <router-link v-if="user" to="/customer/dashboard" class="btn-tugu-primary drawer-btn" @click="drawerOpen = false">Buka Dashboard Saya</router-link>
              <router-link v-else to="/customer/login" class="btn-tugu-primary drawer-btn" @click="drawerOpen = false">Masuk / Daftar Akun</router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- HERO SECTION dengan Gedung.jpg background -->
    <header class="hero-section">
      <div class="hero-bg-container">
        <img src="/Gedung.jpg" alt="Gedung Tugu Insurance" class="hero-bg-img" />
        <div class="hero-overlay"></div>
      </div>

      <!-- STICKY TOP BAR: Logo + Language + Hamburger semua ikut sticky -->
      <div :class="['sticky-topbar', { scrolled: isScrolled }]">
        <!-- Hamburger dengan animasi garis memanjang -->
        <div class="hb-wrap">
          <button
            class="hamburger-btn"
            @click="drawerOpen = !drawerOpen"
            @mouseenter="hbHover = true"
            @mouseleave="hbHover = false"
          >
            <span :class="['hb-line', 'hb-line-1', { 'hb-exp': hbHover || drawerOpen }]"></span>
            <span :class="['hb-line', 'hb-line-2', { 'hb-exp': hbHover || drawerOpen }]"></span>
            <span :class="['hb-line', 'hb-line-3', { 'hb-exp': hbHover || drawerOpen }]"></span>
          </button>
          <!-- Label Menu (hanya tampil saat belum scroll) -->
          <span v-if="!isScrolled" class="hb-label">Menu</span>
        </div>

        <!-- FLOATING NAVBAR (inline collapsed saat scroll) -->
        <nav :class="['floating-navbar', { 'navbar-scrolled': isScrolled }]">
          <router-link to="/" class="nav-item nav-home-icon" title="Beranda">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </router-link>
          <a href="#about" class="nav-item">Tentang Kami</a>
          <a href="#produk" class="nav-item">Produk</a>
          <a href="#gcg" class="nav-item">Tata Kelola Perusahaan</a>
          <a href="#investor" class="nav-item">Investor Relations</a>
          <a href="#news" class="nav-item">News Room</a>
          <a href="#csr" class="nav-item">CSR</a>
          <a href="#layanan" class="nav-item">Layanan</a>
          <button class="nav-search-btn" title="Cari">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </nav>

        <!-- Kanan: Language + Logo -->
        <div class="topbar-right">
          <div class="lang-switcher">
            <button :class="['lang-btn', { 'lang-active': activeLang === 'ID' }]" @click="activeLang = 'ID'">
              <span class="flag-id"></span> ID
            </button>
            <span class="lang-divider">|</span>
            <button :class="['lang-btn', { 'lang-active': activeLang === 'EN' }]" @click="activeLang = 'EN'">
              <span class="flag-en"></span> EN
            </button>
          </div>
          <img src="/Logo.png" alt="Tugu Insurance Logo" class="brand-logo-img" />
        </div>
      </div>

      <!-- Hero Headline Content -->
      <div class="hero-content">
        <h1 class="hero-title">Mencapai<br />Ketinggian Baru</h1>
        <p class="hero-subtitle">
          Solusi Asuransi Terbaik dan Terpercaya untuk Perlindungan Aset Korporat, Prinsip Syariah, dan Kebutuhan Ritel Anda.
        </p>
        <div class="hero-actions">
          <a href="#produk" class="btn-tugu-primary">
            Jelajahi Produk Asuransi
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <router-link to="/customer/login" class="btn-tugu-outline">Beli Polis Sekarang</router-link>
        </div>
        <div class="hero-dots">
          <span class="hdot active"></span>
          <span class="hdot"></span>
          <span class="hdot"></span>
          <span class="hdot"></span>
        </div>
      </div>
    </header>

    <!-- SECTION PRODUK — Marketing style, tanpa list, dengan hover card animasi -->
    <section id="produk" class="produk-section">
      <div class="produk-inner">
        <div class="section-badge-text">LAYANAN UNGGULAN</div>
        <h2 class="section-h2">Pilih Perlindungan Asuransi Anda</h2>
        <p class="section-p">
          Kami hadir untuk memberikan perlindungan menyeluruh bagi aset dan jiwa Anda melalui solusi asuransi yang sesuai dengan kebutuhan.
        </p>

        <!-- 3 Category Marketing Cards dengan hover animation -->
        <div class="produk-cards">
          <!-- Corporate -->
          <div class="produk-card" @mouseenter="hoveredCard = 'corporate'" @mouseleave="hoveredCard = null">
            <div class="card-icon-wrap card-corporate">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <rect x="6" y="18" width="36" height="24" rx="3" fill="#0052cc" opacity="0.15"/>
                <rect x="14" y="8" width="20" height="12" rx="2" fill="#0052cc" opacity="0.3"/>
                <rect x="20" y="28" width="8" height="14" rx="1" fill="#0052cc"/>
                <rect x="8" y="22" width="8" height="8" rx="1" fill="#0052cc" opacity="0.7"/>
                <rect x="32" y="22" width="8" height="8" rx="1" fill="#0052cc" opacity="0.7"/>
              </svg>
            </div>
            <div class="card-tag">Korporat</div>
            <h3 class="card-title">Asuransi Corporate</h3>
            <p class="card-desc">
              Proteksi komprehensif untuk aset dan operasional bisnis Anda — dari gedung, mesin industri, kargo, hingga tanggung jawab hukum perusahaan.
            </p>
            <ul class="card-list">
              <li>Kebakaran &amp; Properti</li>
              <li>Marine Cargo &amp; Logistik</li>
              <li>Rekayasa &amp; Konstruksi</li>
              <li>Energi &amp; Industri</li>
            </ul>
            <router-link to="/customer/login" class="card-cta">
              Lihat Selengkapnya
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </router-link>
            <div class="card-glow card-glow-blue"></div>
          </div>

          <!-- Syariah -->
          <div class="produk-card card-featured" @mouseenter="hoveredCard = 'syariah'" @mouseleave="hoveredCard = null">
            <div class="featured-badge">Terpopuler</div>
            <div class="card-icon-wrap card-syariah">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <path d="M24 4 L28 16 L40 16 L31 24 L34 36 L24 29 L14 36 L17 24 L8 16 L20 16 Z" fill="#84cc16" opacity="0.3"/>
                <path d="M24 8 L27 17 L37 17 L29 23 L32 33 L24 27 L16 33 L19 23 L11 17 L21 17 Z" fill="#84cc16"/>
              </svg>
            </div>
            <div class="card-tag card-tag-green">Syariah</div>
            <h3 class="card-title">Asuransi Syariah</h3>
            <p class="card-desc">
              Perlindungan berbasis prinsip tabarru &amp; hibah sesuai kaidah Islam — transparan, adil, dan saling melindungi antar peserta.
            </p>
            <ul class="card-list">
              <li>t-Drive (Kendaraan Syariah)</li>
              <li>t-Property (Kebakaran Syariah)</li>
              <li>t-Health (Kesehatan Syariah)</li>
              <li>Prinsip Tabarru &amp; Hibah</li>
            </ul>
            <router-link to="/customer/login" class="card-cta card-cta-featured">
              Lihat Selengkapnya
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </router-link>
            <div class="card-glow card-glow-green"></div>
          </div>

          <!-- Retail -->
          <div class="produk-card" @mouseenter="hoveredCard = 'retail'" @mouseleave="hoveredCard = null">
            <div class="card-icon-wrap card-retail">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <circle cx="24" cy="24" r="14" fill="#f59e0b" opacity="0.15"/>
                <circle cx="24" cy="20" r="7" fill="#f59e0b" opacity="0.5"/>
                <path d="M10 40 C10 32 38 32 38 40" fill="#f59e0b" opacity="0.7"/>
              </svg>
            </div>
            <div class="card-tag card-tag-yellow">Retail</div>
            <h3 class="card-title">Asuransi Retail</h3>
            <p class="card-desc">
              Kami hadir untuk menjadikan hidup Anda lebih baik dengan melindungi berbagai aset berharga, seperti rumah, kendaraan, dan keselamatan diri.
            </p>
            <ul class="card-list">
              <li>Kendaraan Bermotor</li>
              <li>Rumah Tinggal &amp; Properti</li>
              <li>t-Travel (Perjalanan)</li>
              <li>Personal Accident</li>
            </ul>
            <router-link to="/customer/login" class="card-cta">
              Lihat Selengkapnya
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </router-link>
            <div class="card-glow card-glow-yellow"></div>
          </div>
        </div>

        <!-- CTA Bar -->
        <div class="cta-bar">
          <p>Sudah punya akun? Masuk dan kelola polis Anda sekarang.</p>
          <router-link to="/customer/login" class="btn-tugu-primary">Masuk / Daftar Akun</router-link>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="/Logo.png" alt="Tugu Logo" class="footer-logo" />
          <p class="footer-tagline">
            PT Asuransi Tugu Pratama Indonesia Tbk berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK).
          </p>
          <div class="footer-social">
            <a href="#" class="social-pill">Website Resmi</a>
            <a href="#" class="social-pill">Kontak</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Produk Asuransi</h4>
          <ul>
            <li><a href="#produk">Asuransi Korporat</a></li>
            <li><a href="#produk">Asuransi Syariah</a></li>
            <li><a href="#produk">Asuransi Retail</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Layanan</h4>
          <ul>
            <li><a href="#about">Tentang Kami</a></li>
            <li><a href="#investor">Investor Relations</a></li>
            <li><a href="#news">News Room</a></li>
            <li><router-link to="/customer/login">Portal Pelanggan</router-link></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 PT Asuransi Tugu Pratama Indonesia Tbk. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const user = ref(null);
const drawerOpen = ref(false);
const hbHover = ref(false);
const isScrolled = ref(false);
const activeLang = ref('ID');
const hoveredCard = ref(null);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60;
};

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try { user.value = JSON.parse(storedUser); } catch (e) {}
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* =================== GLOBAL WRAPPER =================== */
.home-wrapper {
  position: relative;
  background-color: #040d1c;
  min-height: 100vh;
  overflow-x: hidden;
}

/* =================== HERO =================== */
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hero-bg-container {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    170deg,
    rgba(4, 13, 28, 0.65) 0%,
    rgba(4, 13, 28, 0.35) 45%,
    rgba(4, 13, 28, 0.95) 100%
  );
}

/* =================== STICKY TOPBAR =================== */
.sticky-topbar {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  gap: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sticky-topbar.scrolled {
  background: rgba(9, 26, 56, 0.95);
  backdrop-filter: blur(20px);
  padding: 10px 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 82, 204, 0.3);
}

/* =================== HAMBURGER =================== */
.hb-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  z-index: 201;
}

.hamburger-btn {
  background: rgba(15, 26, 56, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 12px;
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scrolled .hamburger-btn {
  background: rgba(0, 82, 204, 0.2);
  border-color: rgba(0, 82, 204, 0.4);
  width: 42px;
  height: 42px;
}

.hamburger-btn:hover {
  background: rgba(0, 82, 204, 0.4);
  border-color: #38bdf8;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
}

.hb-line {
  height: 3px;
  border-radius: 3px;
  background-color: white;
  transition: all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: block;
}

.hb-line-1 { width: 14px; background: #ff3b30; }
.hb-line-2 { width: 22px; background: #ffffff; }
.hb-line-3 { width: 10px; background: #84cc16; }

/* HOVER ANIMATION: 3 lines semua memanjang */
.hb-line-1.hb-exp { width: 22px; }
.hb-line-2.hb-exp { width: 22px; }
.hb-line-3.hb-exp { width: 22px; }

.hb-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  letter-spacing: 0.5px;
  transition: opacity 0.3s;
}

/* =================== FLOATING NAVBAR =================== */
.floating-navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 40px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.8);
  flex-wrap: nowrap;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  padding: 6px 14px;
  gap: 2px;
}

.nav-item {
  color: #1e293b;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 7px 10px;
  border-radius: 20px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover {
  color: #0052cc;
  background: rgba(0, 82, 204, 0.07);
}

.nav-home-icon {
  background: #0052cc;
  color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  padding: 0;
  flex-shrink: 0;
}

.nav-home-icon:hover {
  background: #003e99 !important;
}

.nav-search-btn {
  background: transparent;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.nav-search-btn:hover { color: #0052cc; background: #f1f5f9; }

/* =================== TOPBAR RIGHT: LANG + LOGO =================== */
.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  z-index: 201;
}

/* Language Switcher — ID / EN (bukan emoji flag) */
.lang-switcher {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 4px 10px;
  gap: 6px;
}

.scrolled .lang-switcher {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
}

.lang-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 12px;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
}

.lang-btn.lang-active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
}

.lang-btn:hover {
  color: white;
}

.lang-divider {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.75rem;
}

/* Custom mini flags using CSS */
.flag-id, .flag-en {
  display: inline-block;
  width: 14px;
  height: 10px;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.flag-id {
  background: linear-gradient(to bottom, #cc0001 50%, #ffffff 50%);
  border: 1px solid rgba(0,0,0,0.15);
}

.flag-en {
  background: #012169;
  background-image:
    /* Union Jack simplified */
    linear-gradient(to bottom right, #fff 45%, transparent 45%),
    linear-gradient(to bottom left, #fff 45%, transparent 45%);
  position: relative;
}

/* Simpler approach for EN flag: just a blue box with text cue */
.flag-en {
  background: linear-gradient(to bottom, #003399 33%, #ffffff 33%, #ffffff 66%, #cc0000 66%);
  border: 1px solid rgba(0,0,0,0.15);
}

.brand-logo-img {
  height: 46px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
  transition: height 0.4s ease;
}

.scrolled .brand-logo-img {
  height: 38px;
}

/* =================== HERO CONTENT =================== */
.hero-content {
  position: relative;
  z-index: 10;
  padding: 60px 48px 60px 48px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  text-shadow: 0 4px 24px rgba(0,0,0,0.7);
  letter-spacing: -1.5px;
  margin-bottom: 18px;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 560px;
  line-height: 1.65;
  margin-bottom: 36px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.9);
}

.hero-actions {
  display: flex;
  gap: 14px;
  margin-bottom: 40px;
}

.hero-dots { display: flex; gap: 8px; }
.hdot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.35); }
.hdot.active { width: 26px; border-radius: 10px; background: white; }

/* =================== DRAWER =================== */
.drawer-fade-enter-active,
.drawer-fade-leave-active { transition: opacity 0.3s ease; }
.drawer-fade-enter-from,
.drawer-fade-leave-to { opacity: 0; }

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 13, 28, 0.88);
  backdrop-filter: blur(18px);
  z-index: 1000;
}

.drawer-panel {
  background: linear-gradient(160deg, #091a38 0%, #060f22 100%);
  border-bottom: 2px solid #0052cc;
  padding: 32px 48px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  border-radius: 0 0 28px 28px;
  animation: slideDown 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideDown {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.drawer-logo { height: 44px; }

.drawer-close {
  background: rgba(255,255,255,0.1);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-close:hover { background: rgba(255,255,255,0.2); }

.drawer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.col-title {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-blue { background: #38bdf8; }
.dot-green { background: #84cc16; }
.dot-red { background: #ff3b30; }

.drawer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.drawer-links a {
  color: #94a3b8;
  font-size: 0.88rem;
  transition: color 0.2s, padding-left 0.2s;
  display: block;
}

.drawer-links a:hover {
  color: white;
  padding-left: 4px;
}

.highlight-col {
  background: rgba(0, 82, 204, 0.18);
  border: 1px solid rgba(0, 82, 204, 0.4);
  border-radius: 16px;
  padding: 20px;
}

.drawer-desc { font-size: 0.85rem; color: #cbd5e1; margin-bottom: 16px; line-height: 1.5; }

.drawer-btn { width: 100%; justify-content: center; display: flex; }

/* =================== PRODUK SECTION — Marketing Cards =================== */
.produk-section {
  padding: 80px 0;
  background: #040d1c;
}

.produk-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  text-align: center;
}

.section-badge-text {
  font-size: 0.72rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.section-h2 {
  font-size: 2.6rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.section-p {
  color: #94a3b8;
  max-width: 580px;
  margin: 0 auto 52px auto;
  line-height: 1.7;
  font-size: 1rem;
}

/* Product Cards Grid */
.produk-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 52px;
}

.produk-card {
  position: relative;
  background: linear-gradient(145deg, #0e1e3d 0%, #091630 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 36px 28px 32px;
  text-align: left;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.produk-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 82, 204, 0.5);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
}

.card-featured {
  background: linear-gradient(145deg, #0a2244 0%, #071830 100%);
  border-color: rgba(0, 82, 204, 0.35);
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #0052cc, #38bdf8);
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.card-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.card-corporate { background: rgba(0, 82, 204, 0.15); }
.card-syariah { background: rgba(132, 204, 22, 0.15); }
.card-retail { background: rgba(245, 158, 11, 0.15); }

.card-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.card-tag-green { color: #a3e635; }
.card-tag-yellow { color: #fbbf24; }

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
}

.card-desc {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.65;
  margin-bottom: 20px;
}

.card-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 28px;
}

.card-list li {
  font-size: 0.85rem;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-list li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  flex-shrink: 0;
}

.card-syariah .card-list li::before { background: #a3e635; }
.card-retail .card-list li::before { background: #fbbf24; }

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #38bdf8;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.25s ease;
}

.card-cta:hover { color: white; gap: 12px; }

.card-cta-featured {
  color: #a3e635;
}

.card-cta-featured:hover { color: white; }

/* Glow effect on hover */
.card-glow {
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.produk-card:hover .card-glow { opacity: 0.12; }

.card-glow-blue { background: radial-gradient(circle, #0052cc, transparent); }
.card-glow-green { background: radial-gradient(circle, #84cc16, transparent); }
.card-glow-yellow { background: radial-gradient(circle, #f59e0b, transparent); }

/* CTA BAR */
.cta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(0, 82, 204, 0.2), rgba(56, 189, 248, 0.15));
  border: 1px solid rgba(0, 82, 204, 0.35);
  border-radius: 20px;
  padding: 24px 32px;
  gap: 24px;
}

.cta-bar p {
  color: #cbd5e1;
  font-size: 1rem;
}

/* =================== FOOTER =================== */
.footer-container {
  background: #020810;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 56px 48px 24px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 56px;
  margin-bottom: 48px;
}

.footer-logo { height: 38px; margin-bottom: 16px; }

.footer-tagline {
  color: #475569;
  font-size: 0.85rem;
  line-height: 1.6;
  max-width: 380px;
  margin-bottom: 18px;
}

.footer-social { display: flex; gap: 10px; }
.social-pill {
  background: rgba(255, 255, 255, 0.07);
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.social-pill:hover { background: rgba(0, 82, 204, 0.3); color: white; }

.footer-col h4 { color: white; font-size: 0.95rem; margin-bottom: 18px; }

.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }

.footer-col a { color: #64748b; font-size: 0.87rem; transition: color 0.2s; }
.footer-col a:hover { color: #94a3b8; }

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #334155;
  font-size: 0.8rem;
}

/* =================== BUTTONS =================== */
.btn-tugu-primary {
  background: linear-gradient(135deg, #0052cc 0%, #1e40af 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.92rem;
  box-shadow: 0 4px 16px rgba(0, 82, 204, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.btn-tugu-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 82, 204, 0.55);
}

.btn-tugu-outline {
  background: transparent;
  color: white;
  padding: 11px 22px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.92rem;
  border: 2px solid rgba(255, 255, 255, 0.6);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.btn-tugu-outline:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: white;
  transform: translateY(-2px);
}

/* =================== RESPONSIVE =================== */
@media (max-width: 1000px) {
  .floating-navbar { display: none; }
  .sticky-topbar { padding: 14px 20px; }
  .produk-cards { grid-template-columns: 1fr; }
  .hero-title { font-size: 2.6rem; }
  .footer-content { grid-template-columns: 1fr; gap: 28px; }
  .drawer-grid { grid-template-columns: 1fr 1fr; }
  .cta-bar { flex-direction: column; text-align: center; }
}
</style>
