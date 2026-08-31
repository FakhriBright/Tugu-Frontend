import { createRouter, createWebHistory } from 'vue-router';

// Customer (publik, ada tombol)
import HomeView from '../views/HomeView.vue';
import CustomerLoginView from '../views/CustomerLoginView.vue';
import CustomerRegisterView from '../views/CustomerRegisterView.vue';
import CustomerDashboardView from '../views/CustomerDashboardView.vue';

// Admin (TERSEMBUNYI, tidak ada tombol/link di UI manapun,
// cuma bisa diakses kalau tahu ketik URL-nya langsung)
import AdminLoginView from '../views/AdminLoginView.vue';
import AdminRegisterView from '../views/AdminRegisterView.vue';
import DashboardView from '../views/DashboardView.vue';

import AuthCallbackView from '../views/AuthCallbackView.vue';

const routes = [
  // ==== Customer: default landing saat aplikasi dijalankan ====
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/customer/login',
    name: 'CustomerLogin',
    component: CustomerLoginView,
    meta: { guestOnly: true },
  },
  {
    path: '/customer/register',
    name: 'CustomerRegister',
    component: CustomerRegisterView,
    meta: { guestOnly: true },
  },
  {
    path: '/customer/dashboard',
    name: 'CustomerDashboard',
    component: CustomerDashboardView,
    meta: { requiresAuth: true, role: 'customer' },
  },

  // ==== Admin: SENGAJA tidak ada tombol/link ke sini di UI manapun.
  // Cuma bisa diakses kalau admin tahu & ketik URL-nya langsung. ====
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLoginView,
    meta: { guestOnly: true },
  },
  {
    path: '/admin/register',
    name: 'AdminRegister',
    component: AdminRegisterView,
    meta: { guestOnly: true },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: DashboardView,
    meta: { requiresAuth: true, role: 'admin' },
  },

  // ==== Redirects & Shortcuts ====
  {
    path: '/dashboard',
    name: 'DashboardRedirect',
    redirect: () => {
      const token = localStorage.getItem('access_token');
      if (!token) return '/customer/login';
      const role = getStoredRole();
      return role === 'admin' ? '/admin/dashboard' : '/customer/dashboard';
    },
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
  },
  {
    path: '/customer',
    redirect: '/customer/dashboard',
  },
  {
    path: '/login',
    redirect: '/customer/login',
  },
  {
    path: '/register',
    redirect: '/customer/register',
  },

  // SSO callback (dipakai customer login via Google)
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: AuthCallbackView,
  },

  // fallback: apapun URL yang tidak dikenal, balik ke landing customer
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function getStoredRole() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role ?? null;
  } catch (e) {
    return null;
  }
}

function dashboardPathForRole(role) {
  return role === 'admin' ? '/admin/dashboard' : '/customer/dashboard';
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  const role = getStoredRole();

  // Halaman yang wajib login
  if (to.meta.requiresAuth) {
    if (!token) {
      // Belum login -> arahkan ke login yang sesuai konteks halaman yang dituju
      next(to.meta.role === 'admin' ? '/admin/login' : '/customer/login');
      return;
    }

    // Sudah login, tapi role-nya tidak cocok dengan halaman yang dituju
    // (misal customer coba akses /admin/dashboard langsung lewat URL)
    if (to.meta.role && role !== to.meta.role) {
      next(dashboardPathForRole(role));
      return;
    }
  }

  // Halaman login/register: kalau sudah login, jangan balik ke situ lagi
  if (to.meta.guestOnly && token) {
    next(dashboardPathForRole(role));
    return;
  }

  next();
});

export default router;
