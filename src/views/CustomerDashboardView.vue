<template>
  <div class="customer-wrapper">
    <!-- Top navbar -->
    <header class="cust-header">
      <router-link to="/" class="cust-logo">
        <img src="/Logo.png" alt="Tugu Insurance" />
      </router-link>
      <div class="cust-header-right">
        <span class="cust-user-name">Halo, {{ user?.name || 'Pelanggan' }}</span>
        <button class="btn-logout" @click="handleLogout">Keluar</button>
      </div>
    </header>

    <main class="cust-main">
      <!-- Tabs -->
      <div class="cust-tabs">
        <button :class="['tab-btn', { active: activeTab === 'catalog' }]" @click="activeTab = 'catalog'">
          Katalog Produk
        </button>
        <button :class="['tab-btn', { active: activeTab === 'transactions' }]" @click="activeTab = 'transactions'">
          Transaksi Saya
        </button>
      </div>

      <transition name="toast-fade">
        <div v-if="toastMsg" :class="['toast', toastType]">{{ toastMsg }}</div>
      </transition>

      <!-- ==== TAB: KATALOG ==== -->
      <section v-if="activeTab === 'catalog'" class="catalog-section">
        <h2 class="section-title">Produk Asuransi Tersedia</h2>

        <div v-if="loadingItems" class="loading-block">Memuat produk...</div>
        <div v-else-if="items.length === 0" class="empty-block">Belum ada produk tersedia saat ini.</div>

        <div v-else class="item-grid">
          <div v-for="item in items" :key="item.id" class="item-card">
            <div class="item-card-top">
              <h3>{{ item.name }}</h3>
              <span :class="['stock-badge', item.stock > 0 ? 'stock-ok' : 'stock-empty']">
                {{ item.stock > 0 ? `Stok: ${item.stock}` : 'Habis' }}
              </span>
            </div>
            <p class="item-desc">{{ item.description || 'Tidak ada deskripsi.' }}</p>
            <div class="item-card-bottom">
              <span class="item-price">Rp{{ formatNumber(item.price) }}</span>
              <button
                class="btn-buy"
                :disabled="item.stock <= 0"
                @click="openBuyModal(item)"
              >
                Beli
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ==== TAB: TRANSAKSI SAYA ==== -->
      <section v-else class="transactions-section">
        <h2 class="section-title">Riwayat Transaksi Saya</h2>

        <div v-if="loadingTransactions" class="loading-block">Memuat transaksi...</div>
        <div v-else-if="transactions.length === 0" class="empty-block">Kamu belum punya transaksi.</div>

        <div v-else class="transaction-list">
          <div v-for="tx in transactions" :key="tx.id" class="transaction-row">
            <div class="tx-info">
              <strong>{{ tx.item?.name || `Item #${tx.item_id}` }}</strong>
              <span class="tx-sub">Qty: {{ tx.quantity }} &middot; Rp{{ formatNumber(tx.total_price) }}</span>
            </div>
            <span :class="['status-badge', `status-${tx.status}`]">{{ statusLabel(tx.status) }}</span>
          </div>
        </div>
      </section>
    </main>

    <!-- Modal Beli -->
    <transition name="modal-fade">
      <div v-if="buyModalItem" class="modal-overlay" @click.self="buyModalItem = null">
        <div class="modal-box">
          <h3>Beli {{ buyModalItem.name }}</h3>
          <p class="modal-price">Rp{{ formatNumber(buyModalItem.price) }} / unit</p>

          <label class="modal-label">Jumlah</label>
          <input type="number" v-model.number="buyQuantity" min="1" :max="buyModalItem.stock" class="modal-input" />

          <p class="modal-total">Total: Rp{{ formatNumber(buyModalItem.price * buyQuantity) }}</p>

          <div class="modal-actions">
            <button class="btn-secondary" @click="buyModalItem = null">Batal</button>
            <button class="btn-primary" :disabled="buyLoading" @click="confirmBuy">
              {{ buyLoading ? 'Memproses...' : 'Konfirmasi Beli' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();

const user = ref(null);
const activeTab = ref('catalog');

const items = ref([]);
const loadingItems = ref(false);

const transactions = ref([]);
const loadingTransactions = ref(false);

const buyModalItem = ref(null);
const buyQuantity = ref(1);
const buyLoading = ref(false);

const toastMsg = ref('');
const toastType = ref('success');

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n || 0);

const statusLabel = (status) => ({
  pending: 'Menunggu Persetujuan',
  success: 'Berhasil',
  cancelled: 'Dibatalkan',
}[status] || status);

const toast = (msg, type = 'success') => {
  toastMsg.value = msg;
  toastType.value = type;
  setTimeout(() => { toastMsg.value = ''; }, 3000);
};

const loadItems = async () => {
  loadingItems.value = true;
  try {
    const res = await api.get('/items');
    items.value = res.data?.data || [];
  } catch {
    toast('Gagal memuat produk', 'error');
  } finally {
    loadingItems.value = false;
  }
};

const loadTransactions = async () => {
  loadingTransactions.value = true;
  try {
    const res = await api.get('/transactions/me');
    transactions.value = res.data?.data || [];
  } catch {
    toast('Gagal memuat transaksi', 'error');
  } finally {
    loadingTransactions.value = false;
  }
};

const openBuyModal = (item) => {
  buyModalItem.value = item;
  buyQuantity.value = 1;
};

const confirmBuy = async () => {
  if (!buyModalItem.value) return;
  buyLoading.value = true;
  try {
    await api.post('/transactions', {
      item_id: buyModalItem.value.id,
      quantity: buyQuantity.value,
    });
    toast('Pembelian berhasil dibuat! Menunggu persetujuan admin.');
    buyModalItem.value = null;
    await loadItems(); // refresh stok tampilan (walau baru berkurang beneran saat admin approve)
    await loadTransactions();
  } catch (e) {
    toast(e.response?.data?.message || 'Gagal melakukan pembelian', 'error');
  } finally {
    buyLoading.value = false;
  }
};

const handleLogout = async () => {
  try { await api.post('/logout'); } catch {}
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  router.push('/');
};

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try { user.value = JSON.parse(storedUser); } catch (e) {}
  }
  loadItems();
  loadTransactions();
});
</script>

<style scoped>
.customer-wrapper {
  min-height: 100vh;
  background: #f4f6fb;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.cust-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #070f23;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.cust-logo img { height: 32px; }

.cust-header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cust-user-name {
  color: #cbd5e1;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-logout {
  background: rgba(255,255,255,0.08);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-logout:hover { background: rgba(255,255,255,0.16); }

.cust-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

.cust-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  border-bottom: 2px solid #e2e8f0;
}

.tab-btn {
  padding: 12px 20px;
  border: none;
  background: none;
  font-weight: 700;
  font-size: 0.95rem;
  color: #64748b;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}
.tab-btn.active {
  color: #0052cc;
  border-bottom-color: #0052cc;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 20px;
}

.loading-block, .empty-block {
  padding: 48px;
  text-align: center;
  color: #94a3b8;
  background: #fff;
  border-radius: 16px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.item-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.item-card-top h3 {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.stock-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 100px;
  white-space: nowrap;
}
.stock-ok { background: #dcfce7; color: #15803d; }
.stock-empty { background: #fee2e2; color: #b91c1c; }

.item-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
  flex-grow: 1;
}

.item-card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.item-price {
  font-weight: 800;
  color: #0052cc;
  font-size: 1rem;
}

.btn-buy {
  background: #0052cc;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-buy:hover:not(:disabled) { background: #003d99; }
.btn-buy:disabled { background: #cbd5e1; cursor: not-allowed; }

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-row {
  background: #fff;
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.tx-info { display: flex; flex-direction: column; gap: 4px; }
.tx-info strong { color: #0f172a; font-size: 0.95rem; }
.tx-sub { color: #94a3b8; font-size: 0.8rem; }

.status-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 100px;
  white-space: nowrap;
}
.status-pending { background: #fef9c3; color: #a16207; }
.status-success { background: #dcfce7; color: #15803d; }
.status-cancelled { background: #fee2e2; color: #b91c1c; }

/* Toast */
.toast {
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 20px;
}
.toast.success { background: #dcfce7; color: #15803d; }
.toast.error { background: #fee2e2; color: #b91c1c; }
.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal-box {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 380px;
}

.modal-box h3 { margin: 0 0 4px; color: #0f172a; }
.modal-price { color: #64748b; font-size: 0.85rem; margin-bottom: 20px; }

.modal-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 6px;
}

.modal-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.modal-total {
  margin: 16px 0;
  font-weight: 800;
  color: #0052cc;
  font-size: 1.05rem;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.btn-secondary, .btn-primary {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: none;
}
.btn-secondary { background: #f1f5f9; color: #475569; }
.btn-primary { background: #0052cc; color: #fff; }
.btn-primary:disabled { background: #93c5fd; cursor: not-allowed; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
