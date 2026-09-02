<template>
  <div class="admin-wrapper">
    <!-- SIDEBAR -->
    <aside :class="['sidebar', { collapsed: sidebarCollapsed }]">
      <div class="sidebar-header">
        <img src="/Logo.png" alt="Tugu" class="sidebar-logo" />
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed" :title="sidebarCollapsed ? 'Buka' : 'Tutup'">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="item in navItems"
          :key="item.key"
          :class="['nav-btn', { active: activeSection === item.key }]"
          @click="activeSection = item.key"
          :title="item.label"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.count !== undefined && !sidebarCollapsed" class="nav-count">{{ item.count }}</span>
        </button>
      </nav>

      <div class="sidebar-user">
        <div class="su-avatar">{{ userInitial }}</div>
        <div class="su-info" v-if="!sidebarCollapsed">
          <p class="su-name">{{ user?.name || 'Admin' }}</p>
          <p class="su-role">Administrator</p>
        </div>
        <button @click="handleLogout" class="su-logout" :title="'Logout'">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </aside>

    <!-- MAIN AREA -->
    <div class="admin-main">
      <!-- TOP HEADER -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <div class="topbar-breadcrumb">
            <span class="bc-root">Admin Panel</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span class="bc-current">{{ currentSectionLabel }}</span>
          </div>
        </div>
        <div class="topbar-right">
          <div class="topbar-stat">
            <span class="stat-dot dot-green"></span>
            <span class="stat-text">Backend API Online</span>
          </div>
          <router-link to="/" class="topbar-site-link">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Lihat Website
          </router-link>
        </div>
      </header>

      <!-- CONTENT AREA -->
      <div class="admin-content">

        <!-- ========= SECTION: OVERVIEW ========= -->
        <section v-if="activeSection === 'overview'">
          <div class="page-header">
            <div>
              <h1 class="page-title">Dashboard Overview</h1>
              <p class="page-sub">Statistik data real-time dari backend Laravel API</p>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card sc-blue">
              <div class="sc-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div class="sc-data">
                <p class="sc-val">{{ items.length }}</p>
                <p class="sc-label">Total Produk</p>
              </div>
            </div>
            <div class="stat-card sc-green">
              <div class="sc-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <div class="sc-data">
                <p class="sc-val">{{ transactions.length }}</p>
                <p class="sc-label">Total Transaksi</p>
              </div>
            </div>
            <div class="stat-card sc-yellow">
              <div class="sc-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="sc-data">
                <p class="sc-val">{{ txPending }}</p>
                <p class="sc-label">Transaksi Pending</p>
              </div>
            </div>
            <div class="stat-card sc-purple">
              <div class="sc-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div class="sc-data">
                <p class="sc-val">{{ totalRevenue }}</p>
                <p class="sc-label">Total Omzet</p>
              </div>
            </div>
          </div>

          <!-- Account Info Card -->
          <div class="account-card">
            <div class="acc-left">
              <div class="acc-avatar">{{ userInitial }}</div>
              <div>
                <h3>{{ user?.name }}</h3>
                <p>{{ user?.email }}</p>
                <span class="acc-badge">Admin Aktif</span>
              </div>
            </div>
            <div class="acc-right">
              <img src="/gedung.webp" alt="Tugu Office" class="acc-building" />
            </div>
          </div>
        </section>

        <!-- ========= SECTION: ITEMS / PRODUK ========= -->
        <section v-if="activeSection === 'items'">
          <div class="page-header">
            <div>
              <h1 class="page-title">Manajemen Produk</h1>
              <p class="page-sub">CRUD data produk / item asuransi — endpoint </p>
            </div>
            <button class="btn-add" @click="openItemModal()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Tambah Produk
            </button>
          </div>

          <div class="table-card">
            <div class="table-toolbar">
              <input v-model="itemSearch" class="tbl-search" placeholder="Cari produk..." />
              <button class="btn-refresh-sm" @click="loadItems">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                Refresh
              </button>
            </div>

            <div v-if="loadingItems" class="tbl-state"><div class="spinner"></div><p>Memuat data...</p></div>

            <div v-else class="table-scroll">
              <table class="data-table" v-if="filteredItems.length">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Produk</th>
                    <th>Harga Premi</th>
                    <th>Stok</th>
                    <th>Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filteredItems" :key="item.id" class="tbl-row">
                    <td class="td-id">#{{ index + 1 }}</td>
                    <td class="td-name">{{ item.name }}</td>
                    <td class="td-price">Rp {{ formatPrice(item.price) }}</td>
                    <td>
                      <span :class="['stok-badge', item.stock > 10 ? 'sb-green' : item.stock > 0 ? 'sb-yellow' : 'sb-red']">
                        {{ item.stock }}
                      </span>
                    </td>
                    <td class="td-date">{{ formatDate(item.created_at) }}</td>
                    <td>
                      <div class="tbl-actions">
                        <button class="act-btn act-edit" @click="openItemModal(item)" title="Edit">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Edit
                        </button>
                        <button class="act-btn act-del" @click="deleteItem(item)" title="Hapus">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="tbl-empty">
                <p>Tidak ada produk ditemukan.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ========= SECTION: TRANSACTIONS ========= -->
        <section v-if="activeSection === 'transactions'">
          <div class="page-header">
            <div>
              <h1 class="page-title">Manajemen Transaksi</h1>
              <p class="page-sub">Monitor dan kelola semua transaksi — endpoint </p>
            </div>

          <button class="btn-add" @click="openTransactionModal()">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 5v14M5 12h14" stroke-width="2"/>
            </svg>
            Tambah Transaksi
          </button>
          </div>

          <!-- Status Filter -->
          <div class="status-filter">
            <button
              v-for="s in ['all','pending','success','cancelled']"
              :key="s"
              :class="['sf-btn', { 'sf-active': txFilter === s }]"
              @click="txFilter = s"
            >
              {{ s === 'all' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1) }}
              <span class="sf-count">{{ getTxCount(s) }}</span>
            </button>
          </div>

          <div class="table-card">
            <div class="table-toolbar">
              <input v-model="txSearch" class="tbl-search" placeholder="Cari ID atau user..." />
                            <button class="btn-refresh-sm" @click="loadTransactions" style="margin-right:8px;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Refresh
              </button>
            </div>

            <div v-if="loadingTx" class="tbl-state"><div class="spinner"></div><p>Memuat transaksi...</p></div>

            <div v-else class="table-scroll">
              <table class="data-table" v-if="filteredTx.length">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>No. Produk</th>
                    <th>Qty</th>
                    <th>Premi Snapshot</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tx, index) in filteredTx" :key="tx.id" class="tbl-row">
                    <td class="td-id">#{{ index + 1 }}</td>
                    <td>{{ getItemNumber(tx.item_id) }}</td>
                    <td>{{ tx.quantity }}x</td>
                    <td>Rp {{ formatPrice(tx.price_at_transaction) }}</td>
                    <td class="td-price">Rp {{ formatPrice(tx.total_price) }}</td>
                    <td>
                      <select
                        :class="['status-select', `ss-${tx.status}`]"
                        :value="tx.status"
                        @change="updateTxStatus(tx, $event.target.value)"
                      >
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td class="td-date">{{ formatDate(tx.created_at) }}</td>
                    <td>
                      <button class="act-btn act-del" @click="deleteTransaction(tx)" title="Hapus">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        Hapus
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="tbl-empty">
                <p>Tidak ada transaksi ditemukan.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- MODAL: ADD / EDIT ITEM -->
    <transition name="modal-pop">
      <div v-if="showItemModal" class="modal-backdrop" @click.self="closeItemModal">
        <div class="modal-box">
          <div class="modal-header">
            <div>
              <span class="modal-tag">{{ itemForm.id ? 'EDIT' : 'TAMBAH' }} PRODUK</span>
              <h3>{{ itemForm.id ? 'Edit Data Produk' : 'Tambah Produk Baru' }}</h3>
            </div>
            <button class="modal-close-btn" @click="closeItemModal">✕</button>
          </div>

          <form @submit.prevent="submitItem" class="modal-form">
            <div class="modal-grid">
              <div class="form-group fg-full">
                <label>Nama Produk / Asuransi *</label>
                <input v-model="itemForm.name" type="text" placeholder="Contoh: Asuransi Kebakaran Syariah" required />
              </div>
              <div class="form-group fg-full">
                <label>Deskripsi</label>
                <textarea v-model="itemForm.description" rows="3" placeholder="Deskripsi manfaat pertanggungan..."></textarea>
              </div>
              <div class="form-group">
                <label>Harga Premi (Rp) *</label>
                <input v-model.number="itemForm.price" type="number" min="0" placeholder="5000000" required />
              </div>
              <div class="form-group">
                <label>Stok Polis *</label>
                <input v-model.number="itemForm.stock" type="number" min="0" placeholder="100" required />
              </div>
            </div>

            <div v-if="itemModalError" class="alert alert-danger">{{ itemModalError }}</div>

            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="closeItemModal">Batal</button>
              <button type="submit" class="btn-save" :disabled="savingItem">
                <span v-if="savingItem" class="mini-spin"></span>
                {{ itemForm.id ? 'Simpan Perubahan' : 'Tambah Produk' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- CONFIRM DELETE MODAL -->
    <transition name="modal-pop">
      <div v-if="confirmDelete" class="modal-backdrop" @click.self="confirmDelete = null">
        <div class="modal-box modal-confirm">
          <div class="confirm-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3>Konfirmasi Hapus</h3>
          <p>{{ confirmDelete.msg }}</p>
          <div class="confirm-actions">
            <button class="btn-cancel" @click="confirmDelete = null">Batal</button>
            <button class="btn-del-confirm" @click="confirmDelete.action(); confirmDelete = null" :disabled="deleting">
              <span v-if="deleting" class="mini-spin"></span>
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ADD TRANSACTION MODAL -->
    <transition name="modal-pop">
      <div v-if="showTransactionModal" class="modal-backdrop" @click.self="closeTransactionModal">
        <div class="modal-box">
          <div class="modal-header">
            <div>
              <span class="modal-tag">{{ transactionForm.id ? 'EDIT' : 'TAMBAH' }} TRANSAKSI</span>
              <h3>{{ transactionForm.id ? 'Edit Transaksi' : 'Tambah Transaksi Baru' }}</h3>
            </div>
            <button class="modal-close-btn" @click="closeTransactionModal">✕</button>
          </div>
          <form @submit.prevent="submitTransaction" class="modal-form">
            <div class="modal-grid">
              <div class="form-group fg-full">
                <label>Item</label>
                <select v-model="transactionForm.item_id" required>
                  <option disabled value="">Pilih Item</option>
                  <option v-for="(item, idx) in items" :key="item.id" :value="item.id">#{{ idx + 1 }} - {{ item.name }} (Stok: {{ item.stock }})</option>
                </select>
                <small v-if="selectedItemForTransaction" :style="{ color: selectedItemForTransaction.stock <= 0 ? '#ff4d6a' : '#6ee7b7', marginTop: '6px', display: 'block' }">
                  Stok tersedia: <strong>{{ selectedItemForTransaction.stock }}</strong>
                </small>
              </div>
              <div class="form-group">
                <label>Quantity</label>
                <input v-model.number="transactionForm.quantity" type="number" min="1" :max="selectedItemForTransaction ? selectedItemForTransaction.stock : undefined" required />
                <small v-if="selectedItemForTransaction && transactionForm.quantity > selectedItemForTransaction.stock" style="color: #ff4d6a; margin-top: 6px; display: block;">
                  ⚠️ Melebihi stok! Maksimal: {{ selectedItemForTransaction.stock }}
                </small>
              </div>
            </div>
            <div v-if="selectedItemForTransaction && selectedItemForTransaction.stock <= 0" class="alert alert-danger">Stok item ini sudah habis, tidak bisa membuat transaksi.</div>
            <div v-if="transactionModalError" class="alert alert-danger">{{ transactionModalError }}</div>
            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="closeTransactionModal">Batal</button>
              <button type="submit" class="btn-save" :disabled="savingTransaction">
                <span v-if="savingTransaction" class="mini-spin"></span>
                {{ transactionForm.id ? 'Simpan Perubahan' : 'Tambah Transaksi' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- TOAST NOTIFICATIONS -->
    <div class="toast-wrap">
      <transition-group name="toast-slide">
        <div v-for="t in toasts" :key="t.id" :class="['toast', `toast-${t.type}`]">
          {{ t.msg }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();

// ---- User ----
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
const userInitial = computed(() => user.value?.name?.[0]?.toUpperCase() || 'A');

// ---- Sidebar ----
const sidebarCollapsed = ref(false);
const activeSection = ref('overview');

const navItems = computed(() => [
  {
    key: 'overview',
    label: 'Overview',
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  },
  {
    key: 'items',
    label: 'Produk',
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    count: items.value.length,
  },
  {
    key: 'transactions',
    label: 'Transaksi',
    icon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    count: transactions.value.length,
  },
]);

const currentSectionLabel = computed(() =>
  navItems.value.find(n => n.key === activeSection.value)?.label || ''
);

// ---- Data ----
const items = ref([]);
const transactions = ref([]);
const loadingItems = ref(false);
const loadingTx = ref(false);
const itemSearch = ref('');
const txSearch = ref('');
const txFilter = ref('all');

// ---- Toasts ----
const toasts = ref([]);
let toastId = 0;
const toast = (msg, type = 'success') => {
  const id = ++toastId;
  toasts.value.push({ id, msg, type });
  setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id); }, 3500);
};

// ---- Lifecycle ----
const handleAuthExpired = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  router.push('/admin/login');
};

onMounted(async () => {
  window.addEventListener('auth-expired', handleAuthExpired);
  loadItems();
  loadTransactions();

  if (!user.value && localStorage.getItem('access_token')) {
    try {
      const res = await api.get('/me');
      if (res.data?.success && res.data?.data) {
        user.value = res.data.data;
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }
    } catch (e) {
      console.error('Gagal mengambil data user via SSO:', e);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('auth-expired', handleAuthExpired);
});

// ---- Load Data ----
const loadItems = async () => {
  loadingItems.value = true;
  try {
    const res = await api.get('/items');
    items.value = res.data?.data || [];
  } catch { toast('Gagal memuat produk', 'error'); }
  finally { loadingItems.value = false; }
};

const loadTransactions = async () => {
  loadingTx.value = true;
  try {
    const res = await api.get('/transactions');
    transactions.value = res.data?.data || [];
  } catch { toast('Gagal memuat transaksi', 'error'); }
  finally { loadingTx.value = false; }
};

// ---- Computed / Filters ----
const filteredItems = computed(() => {
  const q = itemSearch.value.toLowerCase();
  if (!q) return items.value;
  return items.value.filter(i => i.name?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
});

const filteredTx = computed(() => {
  let list = transactions.value;
  if (txFilter.value !== 'all') list = list.filter(t => t.status === txFilter.value);
  const q = txSearch.value.toLowerCase();
  if (q) list = list.filter(t => String(t.id).includes(q) || String(t.user_id).includes(q));
  return list;
});

const txPending = computed(() => transactions.value.filter(t => t.status === 'pending').length);

const totalRevenue = computed(() => {
  const sum = transactions.value
    .filter(t => t.status === 'success')
    .reduce((acc, t) => acc + Number(t.total_price || 0), 0);
  return 'Rp ' + Number(sum).toLocaleString('id-ID');
});

const getTxCount = (status) => {
  if (status === 'all') return transactions.value.length;
  return transactions.value.filter(t => t.status === status).length;
};

// ---- Item Modal ----
const showItemModal = ref(false);
const itemForm = ref({ id: null, name: '', description: '', price: 0, stock: 100 });
const savingItem = ref(false);
const itemModalError = ref('');

const openItemModal = (item = null) => {
  if (item) {
    itemForm.value = { id: item.id, name: item.name, description: item.description || '', price: Number(item.price), stock: item.stock };
  } else {
    itemForm.value = { id: null, name: '', description: '', price: 0, stock: 100 };
  }
  itemModalError.value = '';
  showItemModal.value = true;
};

const closeItemModal = () => { showItemModal.value = false; };

const submitItem = async () => {
  savingItem.value = true;
  itemModalError.value = '';
  try {
    const payload = {
      name: itemForm.value.name,
      description: itemForm.value.description,
      price: itemForm.value.price,
      stock: itemForm.value.stock,
    };
    if (itemForm.value.id) {
      await api.put(`/items/${itemForm.value.id}`, payload);
      toast('Produk berhasil diperbarui');
    } else {
      await api.post('/items', payload);
      toast('Produk berhasil ditambahkan');
    }
    closeItemModal();
    await loadItems();
  } catch (err) {
    itemModalError.value = err.response?.data?.message || 'Gagal menyimpan data produk.';
  } finally { savingItem.value = false; }
};

// ---- Transaction Modal ----
const showTransactionModal = ref(false);
const transactionForm = ref({ id: null, item_id: '', quantity: 1 });
const savingTransaction = ref(false);
const transactionModalError = ref('');

const openTransactionModal = (tx = null) => {
  if (tx) {
    transactionForm.value = { id: tx.id, item_id: tx.item_id, quantity: tx.quantity };
  } else {
    transactionForm.value = { id: null, item_id: '', quantity: 1 };
  }
  transactionModalError.value = '';
  showTransactionModal.value = true;
};

const closeTransactionModal = () => { showTransactionModal.value = false; };

const selectedItemForTransaction = computed(() => {
  if (!transactionForm.value.item_id) return null;
  return items.value.find(i => i.id === transactionForm.value.item_id) || null;
});

const submitTransaction = async () => {
  // Validasi stok di sisi klien
  const selectedItem = selectedItemForTransaction.value;
  if (selectedItem && transactionForm.value.quantity > selectedItem.stock) {
    transactionModalError.value = `Stok tidak cukup! Stok tersedia: ${selectedItem.stock}, jumlah dipesan: ${transactionForm.value.quantity}`;
    return;
  }
  if (selectedItem && selectedItem.stock <= 0) {
    transactionModalError.value = 'Stok item ini sudah habis, tidak bisa membuat transaksi.';
    return;
  }
  savingTransaction.value = true;
  transactionModalError.value = '';
  try {
    const payload = { item_id: transactionForm.value.item_id, quantity: transactionForm.value.quantity };
    if (transactionForm.value.id) {
      await api.put(`/transactions/${transactionForm.value.id}`, payload);
      toast('Transaksi berhasil diperbarui');
    } else {
      await api.post('/transactions', payload);
      toast('Transaksi berhasil ditambahkan');
    }
    closeTransactionModal();
    await loadTransactions();
    await loadItems();
  } catch (e) {
    transactionModalError.value = e.response?.data?.message || 'Gagal menyimpan transaksi.';
  } finally { savingTransaction.value = false; }
};

// ---- Delete Item ----
const confirmDelete = ref(null);
const deleting = ref(false);

const deleteItem = (item) => {
  confirmDelete.value = {
    msg: `Hapus produk "${item.name}"? Tindakan ini tidak dapat dibatalkan.`,
    action: async () => {
      deleting.value = true;
      try {
        await api.delete(`/items/${item.id}`);
        toast('Produk berhasil dihapus');
        await loadItems();
      } catch { toast('Gagal menghapus produk', 'error'); }
      finally { deleting.value = false; }
    },
  };
};

// ---- Update Transaction Status ----
const updateTxStatus = async (tx, newStatus) => {
  try {
    await api.put(`/transactions/${tx.id}`, { status: newStatus });
    tx.status = newStatus;
    toast(`Status transaksi #${tx.id} → ${newStatus}`);
    await loadItems();
  } catch { toast('Gagal mengubah status transaksi', 'error'); }
};

// ---- Delete Transaction ----
const deleteTransaction = (tx) => {
  confirmDelete.value = {
    msg: `Hapus transaksi #${tx.id}? Tindakan ini permanen.`,
    action: async () => {
      deleting.value = true;
      try {
        await api.delete(`/transactions/${tx.id}`);
        toast('Transaksi berhasil dihapus');
        await loadTransactions();
      } catch { toast('Gagal menghapus transaksi', 'error'); }
      finally { deleting.value = false; }
    },
  };
};

// ---- Logout ----
const handleLogout = async () => {
  try { await api.post('/logout'); } catch {}
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  router.push('/admin/login');
};

// ---- Helpers ----
const formatPrice = (val) => Number(val || 0).toLocaleString('id-ID');
const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const getItemNumber = (itemId) => {
  const idx = items.value.findIndex(item => item.id === itemId);
  return idx !== -1 ? `#${idx + 1}` : '—';
};
</script>

<style scoped>
/* ============ VARIABLES ============ */
:root {
  --sidebar-w: 240px;
  --sidebar-collapsed: 68px;
}

/* ============ WRAPPER ============ */
.admin-wrapper {
  display: flex;
  min-height: 100vh;
  background: #060f22;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #e2e8f0;
}

/* ============ SIDEBAR ============ */
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: #091a38;
  border-right: 1px solid rgba(0, 82, 204, 0.2);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.sidebar.collapsed { width: 68px; }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  min-height: 72px;
}

.sidebar-logo {
  height: 32px;
  object-fit: contain;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.collapsed .sidebar-logo { opacity: 0; width: 0; }

.collapse-btn {
  background: rgba(255,255,255,0.07);
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.collapse-btn:hover { background: rgba(0,82,204,0.2); color: white; }

.sidebar-nav {
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  color: #64748b;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
  background: transparent;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.nav-btn:hover { background: rgba(0,82,204,0.15); color: #94a3b8; }

.nav-btn.active {
  background: linear-gradient(135deg, rgba(0,82,204,0.3), rgba(56,189,248,0.15));
  color: white;
  border: 1px solid rgba(0,82,204,0.4);
}

.nav-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: inherit;
}

.nav-label { flex: 1; overflow: hidden; }
.collapsed .nav-label { display: none; }

.nav-count {
  background: rgba(0,82,204,0.3);
  color: #38bdf8;
  font-size: 0.7rem;
  padding: 2px 7px;
  border-radius: 9999px;
  font-weight: 800;
  flex-shrink: 0;
}

/* Sidebar User */
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 12px;
  border-top: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
}

.su-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0052cc, #38bdf8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
  color: white;
  flex-shrink: 0;
}

.su-info { flex: 1; overflow: hidden; }
.su-name { font-weight: 700; font-size: 0.85rem; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.su-role { font-size: 0.72rem; color: #475569; }

.su-logout {
  background: rgba(255,59,48,0.12);
  color: #ff6b6b;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.su-logout:hover { background: rgba(255,59,48,0.25); }
.collapsed .su-info, .collapsed .su-logout { display: none; }

/* ============ MAIN ============ */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* TOPBAR */
.admin-topbar {
  background: #091a38;
  border-bottom: 1px solid rgba(0,82,204,0.2);
  padding: 0 32px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.topbar-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.87rem;
}

.bc-root { color: #475569; }
.bc-current { color: white; font-weight: 700; }

.topbar-right { display: flex; align-items: center; gap: 20px; }

.topbar-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #64748b;
}

.stat-dot { width: 7px; height: 7px; border-radius: 50%; }
.dot-green { background: #84cc16; box-shadow: 0 0 6px rgba(132,204,22,0.6); animation: pulse 2s infinite; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.topbar-site-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: #38bdf8;
  font-weight: 600;
  transition: color 0.2s;
}

.topbar-site-link:hover { color: white; }

/* CONTENT */
.admin-content {
  flex: 1;
  padding: 28px 32px;
  overflow-y: auto;
}

/* Page header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}

.page-sub {
  font-size: 0.85rem;
  color: #475569;
}

.page-sub code {
  background: rgba(0,82,204,0.2);
  color: #38bdf8;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* ============ OVERVIEW STATS ============ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 16px;
  padding: 22px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(255,255,255,0.06);
}

.sc-blue { background: linear-gradient(135deg, rgba(0,82,204,0.25), rgba(0,82,204,0.1)); border-color: rgba(0,82,204,0.3); }
.sc-green { background: linear-gradient(135deg, rgba(132,204,22,0.2), rgba(132,204,22,0.08)); border-color: rgba(132,204,22,0.3); }
.sc-yellow { background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.08)); border-color: rgba(245,158,11,0.3); }
.sc-purple { background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.08)); border-color: rgba(139,92,246,0.3); }

.sc-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sc-val { font-size: 1.7rem; font-weight: 800; color: white; line-height: 1; }
.sc-label { font-size: 0.8rem; color: #64748b; margin-top: 4px; }

/* Account Card */
.account-card {
  background: linear-gradient(135deg, #091a38 0%, #0e2046 100%);
  border: 1px solid rgba(0,82,204,0.3);
  border-radius: 20px;
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.acc-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.acc-avatar {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, #0052cc, #38bdf8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
}

.acc-left h3 { font-size: 1.1rem; font-weight: 800; color: white; margin-bottom: 4px; }
.acc-left p { font-size: 0.85rem; color: #64748b; margin-bottom: 10px; }

.acc-badge {
  background: rgba(132,204,22,0.18);
  color: #a3e635;
  border: 1px solid rgba(132,204,22,0.3);
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
}

.acc-building {
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  opacity: 0.6;
}

/* ============ BUTTONS ============ */
.btn-add {
  background: linear-gradient(135deg, #0052cc, #1e40af);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(0,82,204,0.35);
  flex-shrink: 0;
}

.btn-add:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,82,204,0.5); }

.btn-refresh-sm {
  background: rgba(255,255,255,0.07);
  color: #94a3b8;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 8px 16px;
  border-radius: 9px;
  font-size: 0.82rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-refresh-sm:hover { background: rgba(255,255,255,0.12); color: white; }

/* ============ TABLE ============ */
.table-card {
  background: #0d1b34;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  overflow: hidden;
}

.table-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.tbl-search {
  flex: 1;
  background: rgba(5,13,26,0.8);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 9px;
  color: white;
  padding: 9px 14px;
  font-size: 0.88rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.tbl-search:focus { border-color: #0052cc; }
.tbl-search::placeholder { color: #334155; }

.table-scroll { overflow-x: auto; }

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  color: #475569;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  white-space: nowrap;
}

.tbl-row td {
  padding: 13px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  vertical-align: middle;
}

.tbl-row:last-child td { border-bottom: none; }

.tbl-row:hover td { background: rgba(0,82,204,0.06); }

.td-id { color: #38bdf8; font-weight: 700; font-size: 0.8rem; }
.td-name { font-weight: 700; color: white; }
.td-desc { color: #64748b; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.td-price { font-weight: 700; color: #38bdf8; }
.td-date { color: #475569; font-size: 0.8rem; white-space: nowrap; }

/* Stock Badge */
.stok-badge {
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 800;
}

.sb-green { background: rgba(132,204,22,0.18); color: #a3e635; }
.sb-yellow { background: rgba(245,158,11,0.18); color: #fbbf24; }
.sb-red { background: rgba(255,59,48,0.18); color: #ff6b6b; }

/* Table Action Buttons */
.tbl-actions { display: flex; gap: 6px; }

.act-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 0.78rem;
  font-weight: 700;
  transition: all 0.2s;
  white-space: nowrap;
}

.act-edit {
  background: rgba(0,82,204,0.15);
  color: #38bdf8;
  border: 1px solid rgba(0,82,204,0.3);
}

.act-edit:hover { background: rgba(0,82,204,0.3); }

.act-del {
  background: rgba(255,59,48,0.12);
  color: #ff6b6b;
  border: 1px solid rgba(255,59,48,0.25);
}

.act-del:hover { background: rgba(255,59,48,0.25); }

/* Status Filter */
.status-filter {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.sf-btn {
  background: rgba(255,255,255,0.06);
  color: #64748b;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 7px 16px;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.sf-btn.sf-active { background: rgba(0,82,204,0.25); color: white; border-color: rgba(0,82,204,0.5); }
.sf-count { background: rgba(255,255,255,0.08); padding: 1px 7px; border-radius: 9999px; font-size: 0.72rem; }

/* Status select dropdown */
.status-select {
  border-radius: 7px;
  padding: 4px 8px;
  font-size: 0.78rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
}

.ss-pending { background: rgba(245,158,11,0.18); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
.ss-success { background: rgba(132,204,22,0.18); color: #a3e635; border: 1px solid rgba(132,204,22,0.3); }
.ss-cancelled { background: rgba(255,59,48,0.18); color: #ff6b6b; border: 1px solid rgba(255,59,48,0.3); }

.status-select option { background: #0d1b34; color: white; }

/* State boxes */
.tbl-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 50px 20px;
  color: #475569;
}

.tbl-empty {
  padding: 40px;
  text-align: center;
  color: #475569;
  font-size: 0.9rem;
}

.spinner {
  width: 26px;
  height: 26px;
  border: 3px solid rgba(255,255,255,0.08);
  border-top-color: #0052cc;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ============ MODALS ============ */
.modal-pop-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-pop-enter-from { opacity: 0; }
.modal-pop-leave-active { transition: all 0.2s ease; }
.modal-pop-leave-to { opacity: 0; }

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.82);
  backdrop-filter: blur(10px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-box {
  background: #0e1e3d;
  border: 1px solid rgba(0,82,204,0.4);
  border-radius: 22px;
  padding: 32px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes popIn {
  from { transform: scale(0.88); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.modal-tag {
  font-size: 0.68rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 1.5px;
  display: block;
  margin-bottom: 6px;
}

.modal-header h3 { font-size: 1.15rem; font-weight: 800; color: white; }

.modal-close-btn {
  background: rgba(255,255,255,0.08);
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.modal-close-btn:hover { background: rgba(255,255,255,0.15); color: white; }

.modal-form { display: flex; flex-direction: column; gap: 14px; }

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.fg-full { grid-column: 1 / -1; }

.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-group label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #94a3b8;
}

.form-group input, .form-group textarea, .form-group select {
  background: #050d1a;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: white;
  padding: 10px 14px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
}

.form-group input:focus, .form-group textarea:focus { border-color: #0052cc; }
.form-group input::placeholder, .form-group textarea::placeholder { color: #334155; }

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.btn-cancel {
  background: transparent;
  color: #475569;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 9px 18px;
  border-radius: 9px;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-cancel:hover { color: #94a3b8; border-color: rgba(255,255,255,0.2); }

.btn-save {
  background: linear-gradient(135deg, #0052cc, #1e40af);
  color: white;
  padding: 9px 22px;
  border-radius: 9px;
  font-weight: 700;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(0,82,204,0.4);
  transition: all 0.2s;
  font-family: inherit;
}

.btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,82,204,0.55); }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

/* Confirm Modal */
.modal-confirm {
  max-width: 400px;
  text-align: center;
}

.confirm-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: rgba(245,158,11,0.15);
  border: 1px solid rgba(245,158,11,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbbf24;
  margin: 0 auto 16px;
}

.modal-confirm h3 { font-size: 1.1rem; font-weight: 800; color: white; margin-bottom: 10px; }
.modal-confirm p { font-size: 0.88rem; color: #94a3b8; margin-bottom: 24px; line-height: 1.5; }

.confirm-actions { display: flex; justify-content: center; gap: 12px; }

.btn-del-confirm {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  padding: 9px 22px;
  border-radius: 9px;
  font-weight: 700;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  transition: all 0.2s;
}

.btn-del-confirm:hover:not(:disabled) { transform: translateY(-1px); }
.btn-del-confirm:disabled { opacity: 0.6; }

/* Alert inside modal */
.alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 9px;
  font-size: 0.83rem;
}

.alert-danger { background: rgba(255,59,48,0.12); color: #ff6b6b; border: 1px solid rgba(255,59,48,0.25); }

.mini-spin {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

/* ============ TOASTS ============ */
.toast-wrap {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
  pointer-events: none;
}

.toast {
  background: #0e1e3d;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 0.85rem;
  font-weight: 600;
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  pointer-events: auto;
}

.toast-success { border: 1px solid rgba(132,204,22,0.4); color: #a3e635; }
.toast-error { border: 1px solid rgba(255,59,48,0.4); color: #ff6b6b; }

.toast-slide-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-slide-enter-from { transform: translateX(40px); opacity: 0; }
.toast-slide-leave-active { transition: all 0.25s ease; }
.toast-slide-leave-to { transform: translateX(40px); opacity: 0; }

/* ============ RESPONSIVE ============ */
@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .admin-content { padding: 20px; }
}

@media (max-width: 768px) {
  .admin-topbar { padding: 0 16px; }
  .admin-content { padding: 16px; }
  .modal-grid { grid-template-columns: 1fr; }
  .account-card { flex-direction: column; gap: 16px; }
  .acc-building { display: none; }
}
</style>
