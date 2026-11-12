/* ============================================
   Kel2Store — Admin Dashboard Logic
   Simple, Clean & User-Friendly
   ============================================ */

import { db, auth } from "./firebase-config.js";
import {
  collection, doc, updateDoc, deleteDoc, addDoc, serverTimestamp,
  query, orderBy, onSnapshot, writeBatch
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ─── 12 DEFAULT PRODUCTS (KATALOG LENGKAP) ────────────
export const DEFAULT_PRODUCTS = [
  {
    name: "Indomie Goreng Original",
    category: "Makanan",
    price: 3500,
    originalPrice: 4000,
    rating: 5,
    badge: "best-seller",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop",
    sold: "2,5rb",
    stock: 120,
    description: "Indomie Mi Goreng rasa original legendaris dengan perpaduan bumbu rempah khas nusantara, gurih dan lezat."
  },
  {
    name: "Teh Botol Sosro 450ml",
    category: "Minuman",
    price: 5500,
    originalPrice: 6500,
    rating: 4,
    badge: null,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop",
    sold: "1,8rb",
    stock: 85,
    description: "Minuman teh melati siap minum yang harum, segar, dan nikmat disajikan dingin."
  },
  {
    name: "Chitato Lite Rasa Keju",
    category: "Snack",
    price: 12500,
    originalPrice: 14000,
    rating: 4,
    badge: "new",
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&h=600&fit=crop",
    sold: "950",
    stock: 60,
    description: "Keripik kentang tipis renyah dengan taburan bumbu keju pilihan yang gurih dan creamy."
  },
  {
    name: "Beras Premium 5kg",
    category: "Kebutuhan Harian",
    price: 72000,
    originalPrice: 78000,
    rating: 5,
    badge: null,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop",
    sold: "3,1rb",
    stock: 40,
    description: "Beras kualitas super putih bersih, pulen, wangi alami tanpa pemutih atau pengawet."
  },
  {
    name: "Kopi Kapal Api Special",
    category: "Minuman",
    price: 15000,
    originalPrice: 17500,
    rating: 5,
    badge: "best-seller",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
    sold: "4,2rb",
    stock: 95,
    description: "Kopi bubuk murni terbuat dari biji kopi pilihan nusantara dengan aroma mantap dan cita rasa kopi hitam pekat."
  },
  {
    name: "Oreo Vanilla Cream",
    category: "Snack",
    price: 9800,
    originalPrice: 12000,
    rating: 4,
    badge: "promo",
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=600&h=600&fit=crop",
    sold: "1,2rb",
    stock: 70,
    description: "Biskuit sandwich cokelat renyah dengan krim vanila lembut yang manis dan nikmat."
  },
  {
    name: "Minyak Goreng Bimoli 2L",
    category: "Kebutuhan Harian",
    price: 35000,
    originalPrice: 38000,
    rating: 4,
    badge: null,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop",
    sold: "2,1rb",
    stock: 50,
    description: "Minyak goreng kelapa sawit bermutu tinggi jernih untuk hasil masakan renyah sempurna."
  },
  {
    name: "Ultra Milk Full Cream 1L",
    category: "Minuman",
    price: 18500,
    originalPrice: 20000,
    rating: 5,
    badge: "new",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=600&fit=crop",
    sold: "1,5rb",
    stock: 65,
    description: "Susu sapi segar alami diproses UHT higienis tanpa bahan pengawet. Kaya nutrisi dan kalsium."
  },
  {
    name: "Sarden ABC Saus Pedas",
    category: "Makanan",
    price: 14500,
    originalPrice: 17000,
    rating: 4,
    badge: "promo",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&h=600&fit=crop",
    sold: "890",
    stock: 45,
    description: "Ikan sarden segar pilihan dalam balutan saus tomat cabai pedas nikmat kaya rasa."
  },
  {
    name: "Sabun Lifebuoy Total 10",
    category: "Kebutuhan Harian",
    price: 4200,
    originalPrice: 5000,
    rating: 4,
    badge: null,
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&h=600&fit=crop",
    sold: "1,7rb",
    stock: 110,
    description: "Sabun mandi batang antibakterial dengan perlindungan menyeluruh terhadap kuman."
  },
  {
    name: "Richeese Nabati Keju",
    category: "Snack",
    price: 8500,
    originalPrice: 10000,
    rating: 5,
    badge: "best-seller",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=600&fit=crop",
    sold: "2,3rb",
    stock: 75,
    description: "Wafer renyah dengan krim keju asli melimpah yang gurih lezat berenergi."
  },
  {
    name: "Aqua Air Mineral 600ml",
    category: "Minuman",
    price: 3500,
    originalPrice: 4000,
    rating: 5,
    badge: null,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&h=600&fit=crop",
    sold: "3,8rb",
    stock: 150,
    description: "Air mineral pegunungan alami murni, higienis, dan menyegarkan untuk hidrasi harian."
  }
];

// ─── STATE MANAGEMENT ────────────────────────────────
let products = [];
let orders = [];
let activeOrderFilter = "all";
let orderSearchQuery = "";
let activeCategoryFilter = "all";
let productSearchQuery = "";
let currentDeleteTarget = null; // { type: 'product'|'order', id: docId, name: string }
let isDemoLoggedIn = false;

// ─── UTILITY FUNCTIONS ───────────────────────────────
function formatPrice(price) {
  return "Rp " + Number(price || 0).toLocaleString("id-ID");
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ─── AUTHENTICATION & DEMO MODE ──────────────────────
function showLoginModal() {
  document.getElementById("login-overlay").classList.add("open");
  document.getElementById("login-modal").classList.add("open");
  document.getElementById("admin-app").style.display = "none";
}

function hideLoginModal() {
  document.getElementById("login-overlay").classList.remove("open");
  document.getElementById("login-modal").classList.remove("open");
  document.getElementById("admin-app").style.display = "";
}

function initAuth() {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const btnQuickLogin = document.getElementById("btn-quick-login");

  // Check demo session
  if (sessionStorage.getItem("kel2store_admin_demo") === "true") {
    isDemoLoggedIn = true;
    hideLoginModal();
    document.getElementById("admin-user-email").textContent = "admin@kel2store.com (Demo)";
    initDashboard();
    return;
  }

  // Firebase auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      hideLoginModal();
      document.getElementById("admin-user-email").textContent = user.email || "admin@kel2store.com";
      initDashboard();
    } else if (!isDemoLoggedIn) {
      showLoginModal();
    }
  });

  // Quick Demo Access button
  btnQuickLogin.addEventListener("click", () => {
    isDemoLoggedIn = true;
    sessionStorage.setItem("kel2store_admin_demo", "true");
    hideLoginModal();
    document.getElementById("admin-user-email").textContent = "admin@kel2store.com (Demo)";
    initDashboard();
    showToast("Selamat datang di Panel Admin Kel2Store!");
  });

  // Login form submit
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = "";
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const btn = loginForm.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Memverifikasi...";

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Berhasil masuk sebagai Admin!");
    } catch (err) {
      console.warn("Firebase Auth error:", err);
      // If Firebase Auth not configured or password mismatch, give option or allow direct login
      loginError.innerHTML = `Akun Firebase belum terdaftar di console. Klik <strong>"Masuk Cepat"</strong> di bawah untuk akses langsung.`;
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Masuk dengan Akun`;
    }
  });

  // Logout button
  document.getElementById("btn-logout").addEventListener("click", async () => {
    sessionStorage.removeItem("kel2store_admin_demo");
    isDemoLoggedIn = false;
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    showToast("Anda telah keluar");
    showLoginModal();
  });
}

// ─── INIT DASHBOARD ──────────────────────────────────
let isInitialized = false;
function initDashboard() {
  if (isInitialized) return;
  isInitialized = true;

  // Date banner
  const today = new Date();
  document.getElementById("current-date-text").textContent =
    today.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // Real-time listeners
  listenProducts();
  listenOrders();

  // Tab switching
  setupTabs();

  // Quick Action Buttons
  document.getElementById("btn-add-product").addEventListener("click", () => openProductModal());
  document.getElementById("btn-seed-all-products").addEventListener("click", seedAllSampleProducts);
  document.getElementById("btn-simulate-order").addEventListener("click", simulateNewOrder);

  // Filters and searches
  setupFilters();

  // Product Form & Presets
  setupProductForm();

  // Delete modal buttons
  document.getElementById("btn-confirm-delete").addEventListener("click", handleConfirmDelete);
  document.getElementById("btn-cancel-delete").addEventListener("click", closeDeleteModal);
  document.getElementById("delete-overlay").addEventListener("click", closeDeleteModal);
}

// ─── TAB NAVIGATION ──────────────────────────────────
function setupTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

// ─── REAL-TIME LISTENERS ─────────────────────────────
function listenProducts() {
  const q = query(collection(db, "products"));
  onSnapshot(q, (snap) => {
    products = snap.docs.map(d => ({ _docId: d.id, ...d.data() }));

    // If Firestore empty, auto seed once or notify
    if (products.length === 0) {
      console.log("Database produk kosong, menyiapkan seeder...");
    }

    renderProductsList();
    updateStats();
  }, (err) => {
    console.error("Gagal mendengar produk Firestore:", err);
  });
}

function listenOrders() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snap) => {
    orders = snap.docs.map(d => ({ _docId: d.id, ...d.data() }));
    renderOrdersTable();
    updateStats();
  }, (err) => {
    console.error("Gagal mendengar pesanan Firestore:", err);
  });
}

// ─── STATS UPDATER ───────────────────────────────────
function updateStats() {
  // 1. Total Omset: sum of orders with status === 'Selesai'
  const completedOrders = orders.filter(o => o.status === "Selesai");
  const totalOmset = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  document.getElementById("stat-omset").textContent = formatPrice(totalOmset);

  // 2. Pesanan Baru (Pending)
  const pendingOrders = orders.filter(o => o.status === "Pending");
  document.getElementById("stat-pending").textContent = pendingOrders.length;
  document.getElementById("tab-orders-badge").textContent = pendingOrders.length;

  // 3. Pesanan Selesai
  document.getElementById("stat-completed").textContent = completedOrders.length;

  // 4. Total Produk
  document.getElementById("stat-total-products").textContent = products.length;
  document.getElementById("tab-products-badge").textContent = products.length;
}

// ─── FILTERS & SEARCH SETUP ──────────────────────────
function setupFilters() {
  // Orders status pills
  const statusPills = document.querySelectorAll("#order-status-filters .pill-btn");
  statusPills.forEach(pill => {
    pill.addEventListener("click", () => {
      statusPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeOrderFilter = pill.dataset.status;
      renderOrdersTable();
    });
  });

  // Orders search input
  const orderSearchInput = document.getElementById("order-search");
  orderSearchInput.addEventListener("input", (e) => {
    orderSearchQuery = e.target.value.toLowerCase().trim();
    renderOrdersTable();
  });

  // Products category filter select
  const catFilter = document.getElementById("product-category-filter");
  catFilter.addEventListener("change", (e) => {
    activeCategoryFilter = e.target.value;
    renderProductsList();
  });

  // Products search input
  const prodSearchInput = document.getElementById("product-search");
  prodSearchInput.addEventListener("input", (e) => {
    productSearchQuery = e.target.value.toLowerCase().trim();
    renderProductsList();
  });
}

// ─── ORDERS TABLE RENDERING ──────────────────────────
function renderOrdersTable() {
  const tbody = document.getElementById("orders-tbody");
  if (!tbody) return;

  let filtered = [...orders];

  // Status filter
  if (activeOrderFilter !== "all") {
    filtered = filtered.filter(o => o.status === activeOrderFilter);
  }

  // Search filter
  if (orderSearchQuery) {
    filtered = filtered.filter(o => {
      const idMatch = (o.orderId || o._docId || "").toLowerCase().includes(orderSearchQuery);
      const nameMatch = (o.customer?.name || "").toLowerCase().includes(orderSearchQuery);
      const phoneMatch = (o.customer?.phone || "").toLowerCase().includes(orderSearchQuery);
      return idMatch || nameMatch || phoneMatch;
    });
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-cell">
          <div style="padding: 24px 0;">
            <p style="font-size: 1rem; color: #475569; margin-bottom: 8px;">Tidak ada pesanan yang sesuai.</p>
            <button class="btn btn-secondary btn-sm" onclick="window._simulateNewOrder()">
              + Buat 1 Contoh Pesanan Uji Coba
            </button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(order => {
    const isPending = order.status === "Pending";
    const statusClass = isPending ? "pending" : "selesai";
    const itemDetails = (order.items || [])
      .map(i => `${i.name} (${i.qty}x)`)
      .join(", ") || "-";

    return `
      <tr>
        <td class="order-id-cell">${order.orderId || order._docId.slice(0, 8)}</td>
        <td>
          <div class="cust-name">${order.customer?.name || "Pelanggan"}</div>
          <div class="cust-phone">${order.customer?.phone || "-"}</div>
        </td>
        <td class="items-cell" title="${itemDetails}">${itemDetails}</td>
        <td class="price-cell">${formatPrice(order.total || 0)}</td>
        <td>
          <span class="status-badge ${statusClass}">${order.status}</span>
        </td>
        <td class="actions-cell">
          ${isPending ? `
            <button class="btn-status-toggle to-complete" onclick="window._toggleOrderStatus('${order._docId}', 'Selesai')" title="Tandai pesanan ini selesai diproses">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
              Selesai
            </button>
          ` : `
            <button class="btn-status-toggle to-pending" onclick="window._toggleOrderStatus('${order._docId}', 'Pending')" title="Kembalikan status ke Pending">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Pending
            </button>
          `}
          <button class="btn-icon btn-delete" onclick="window._deleteOrder('${order._docId}')" title="Hapus Pesanan">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

window._toggleOrderStatus = async function(docId, newStatus) {
  try {
    await updateDoc(doc(db, "orders", docId), { status: newStatus });
    showToast(`Status pesanan diubah ke "${newStatus}"`);
  } catch (err) {
    console.error("Gagal mengubah status:", err);
    showToast("Gagal memperbarui status: " + err.message, "error");
  }
};

window._deleteOrder = function(docId) {
  currentDeleteTarget = { type: "order", id: docId, name: "Pesanan ini" };
  document.getElementById("delete-modal-title").textContent = "Hapus pesanan ini?";
  document.getElementById("delete-modal-desc").textContent = "Pesanan yang dihapus tidak dapat dipulihkan kembali.";
  openDeleteModal();
};

// ─── PRODUCTS LIST RENDERING ─────────────────────────
function renderProductsList() {
  const list = document.getElementById("products-list");
  if (!list) return;

  if (products.length === 0) {
    list.innerHTML = `
      <div class="empty-products">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
        <h3>Belum Ada Produk di Toko</h3>
        <p>Muat 12 produk rekomendasi atau tambah produk secara manual.</p>
        <button class="btn btn-primary" onclick="window._seedAllProducts()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          Muat 12 Produk Lengkap
        </button>
      </div>
    `;
    return;
  }

  let filtered = [...products];

  // Category filter
  if (activeCategoryFilter !== "all") {
    filtered = filtered.filter(p => p.category === activeCategoryFilter);
  }

  // Search filter
  if (productSearchQuery) {
    filtered = filtered.filter(p => (p.name || "").toLowerCase().includes(productSearchQuery));
  }

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-products">
        <h3>Produk Tidak Ditemukan</h3>
        <p>Tidak ada produk dengan kata kunci "${productSearchQuery}".</p>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map(p => {
    const isLowStock = (p.stock || 0) <= 10;
    const badgeLabel = p.badge === "best-seller" ? "Best Seller" : p.badge === "promo" ? "Promo" : p.badge === "new" ? "New" : "";

    return `
      <div class="product-row">
        <img src="${p.image}" alt="${p.name}" class="product-thumb" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23eee%22 width=%22100%22 height=%22100%22/></svg>'">
        
        <div class="product-row-info">
          <div class="product-row-header">
            <span class="product-row-name">${p.name}</span>
            ${badgeLabel ? `<span class="product-badge-small ${p.badge}">${badgeLabel}</span>` : ""}
          </div>
          <div class="product-row-meta">
            <span class="cat-tag">${p.category || "Umum"}</span>
            <span class="stock-tag ${isLowStock ? "low" : "ok"}">Stok: ${p.stock ?? 0}</span>
            <span>Terjual: ${p.sold || "0"}</span>
          </div>
        </div>

        <div class="product-row-price">
          <div>${formatPrice(p.price)}</div>
          ${p.originalPrice ? `<span class="product-row-orig-price">${formatPrice(p.originalPrice)}</span>` : ""}
        </div>

        <div class="product-row-actions">
          <button class="btn-icon btn-edit" onclick="window._openEditProduct('${p._docId}')" title="Edit Produk">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button class="btn-icon btn-delete" onclick="window._deleteProduct('${p._docId}', '${encodeURIComponent(p.name)}')" title="Hapus Produk">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

window._deleteProduct = function(docId, encodedName) {
  const name = decodeURIComponent(encodedName || "produk");
  currentDeleteTarget = { type: "product", id: docId, name: name };
  document.getElementById("delete-modal-title").textContent = `Hapus "${name}"?`;
  document.getElementById("delete-modal-desc").textContent = "Produk ini akan dihapus dari etalase toko pelanggan.";
  openDeleteModal();
};

// ─── PRODUCT MODAL (ADD & EDIT) ──────────────────────
function setupProductForm() {
  const form = document.getElementById("product-form");
  form.addEventListener("submit", handleProductFormSubmit);
  document.getElementById("product-modal-close").addEventListener("click", closeProductModal);
  document.getElementById("btn-cancel-product").addEventListener("click", closeProductModal);
  document.getElementById("product-modal-overlay").addEventListener("click", closeProductModal);

  // Preset Image Buttons
  document.querySelectorAll(".btn-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("prod-image").value = btn.dataset.url;
    });
  });
}

function openProductModal(productData = null) {
  const form = document.getElementById("product-form");
  form.reset();

  const titleEl = document.getElementById("product-modal-title");
  const editIdInput = document.getElementById("prod-edit-id");

  if (productData) {
    // Edit mode
    titleEl.textContent = "Edit Produk";
    editIdInput.value = productData._docId;
    document.getElementById("prod-name").value = productData.name || "";
    document.getElementById("prod-category").value = productData.category || "Makanan";
    document.getElementById("prod-badge").value = productData.badge || "";
    document.getElementById("prod-price").value = productData.price || "";
    document.getElementById("prod-orig-price").value = productData.originalPrice || "";
    document.getElementById("prod-stock").value = productData.stock ?? 100;
    document.getElementById("prod-sold").value = productData.sold || "0";
    document.getElementById("prod-image").value = productData.image || "";
    document.getElementById("prod-desc").value = productData.description || "";
  } else {
    // Add mode
    titleEl.textContent = "Tambah Produk Baru";
    editIdInput.value = "";
    document.getElementById("prod-stock").value = "100";
    document.getElementById("prod-sold").value = "0";
  }

  document.getElementById("product-modal-overlay").classList.add("open");
  document.getElementById("product-modal").classList.add("open");
}

function closeProductModal() {
  document.getElementById("product-modal-overlay").classList.remove("open");
  document.getElementById("product-modal").classList.remove("open");
}

window._openEditProduct = function(docId) {
  const product = products.find(p => p._docId === docId);
  if (product) {
    openProductModal(product);
  }
};

async function handleProductFormSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById("btn-submit-product");
  submitBtn.disabled = true;
  submitBtn.textContent = "Menyimpan...";

  const editId = document.getElementById("prod-edit-id").value;
  const name = document.getElementById("prod-name").value.trim();
  const category = document.getElementById("prod-category").value;
  const badge = document.getElementById("prod-badge").value || null;
  const price = Number(document.getElementById("prod-price").value);
  const origPriceVal = document.getElementById("prod-orig-price").value;
  const originalPrice = origPriceVal ? Number(origPriceVal) : null;
  const stock = Number(document.getElementById("prod-stock").value);
  const sold = document.getElementById("prod-sold").value.trim() || "0";
  const image = document.getElementById("prod-image").value.trim();
  const description = document.getElementById("prod-desc").value.trim();

  const productData = {
    name,
    category,
    badge,
    price,
    originalPrice,
    stock,
    sold,
    image,
    description,
    rating: 5,
    updatedAt: serverTimestamp()
  };

  try {
    if (editId) {
      // Update existing
      await updateDoc(doc(db, "products", editId), productData);
      showToast(`Produk "${name}" berhasil diperbarui!`);
    } else {
      // Add new
      productData.createdAt = serverTimestamp();
      await addDoc(collection(db, "products"), productData);
      showToast(`Produk "${name}" berhasil ditambahkan ke etalase!`);
    }
    closeProductModal();
  } catch (err) {
    console.error("Gagal menyimpan produk:", err);
    showToast("Gagal menyimpan produk: " + err.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Simpan Produk";
  }
}

// ─── SEED 12 SAMPLE PRODUCTS ─────────────────────────
async function seedAllSampleProducts() {
  const btn = document.getElementById("btn-seed-all-products");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Memuat 12 Produk...`;
  }

  try {
    const batch = writeBatch(db);
    DEFAULT_PRODUCTS.forEach(item => {
      const docRef = doc(collection(db, "products"));
      batch.set(docRef, {
        ...item,
        createdAt: serverTimestamp()
      });
    });
    await batch.commit();
    showToast("Berhasil memuat 12 produk lengkap ke etalase toko!");
  } catch (err) {
    console.error("Gagal seed sample data:", err);
    showToast("Gagal memuat sample produk: " + err.message, "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> Muat 12 Produk Lengkap`;
    }
  }
}

window._seedAllProducts = seedAllSampleProducts;

// ─── SIMULATE NEW ORDER (FOR DEMO/TESTING) ────────────
async function simulateNewOrder() {
  const btn = document.getElementById("btn-simulate-order");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Membuat...";
  }

  const sampleNames = ["Budi Santoso", "Siti Nurhaliza", "Rian Hidayat", "Dewi Lestari", "Ahmad Fauzi", "Maya Permata"];
  const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
  const randomPhone = `08${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const orderId = `ORD-${Date.now().toString().slice(-6)}`;

  // Pick 2 random products
  const pool = products.length > 0 ? products : DEFAULT_PRODUCTS;
  const p1 = pool[Math.floor(Math.random() * pool.length)];
  const p2 = pool[Math.floor(Math.random() * pool.length)];

  const items = [
    { name: p1.name, price: p1.price, qty: 2 },
    { name: p2.name, price: p2.price, qty: 1 }
  ];
  const total = items.reduce((sum, i) => sum + (i.price * i.qty), 0);

  try {
    await addDoc(collection(db, "orders"), {
      orderId,
      customer: {
        name: randomName,
        phone: randomPhone,
        address: "Jl. Melati No. " + Math.floor(Math.random() * 80 + 1) + ", Jakarta",
        notes: "Tolong kirim sebelum jam 5 sore"
      },
      items,
      total,
      itemCount: 3,
      status: "Pending",
      createdAt: serverTimestamp()
    });
    showToast(`Pesanan simulasi baru masuk: ${orderId} (${randomName})`);
  } catch (err) {
    console.error("Gagal membuat simulasi pesanan:", err);
    showToast("Gagal membuat simulasi: " + err.message, "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> + Buat Contoh Pesanan`;
    }
  }
}

window._simulateNewOrder = simulateNewOrder;

// ─── DELETE CONFIRMATION MODAL ───────────────────────
function openDeleteModal() {
  document.getElementById("delete-overlay").classList.add("open");
  document.getElementById("delete-modal").classList.add("open");
}

function closeDeleteModal() {
  document.getElementById("delete-overlay").classList.remove("open");
  document.getElementById("delete-modal").classList.remove("open");
  currentDeleteTarget = null;
}

async function handleConfirmDelete() {
  if (!currentDeleteTarget) return;
  const { type, id } = currentDeleteTarget;
  try {
    if (type === "product") {
      await deleteDoc(doc(db, "products", id));
      showToast("Produk berhasil dihapus dari etalase");
    } else if (type === "order") {
      await deleteDoc(doc(db, "orders", id));
      showToast("Pesanan berhasil dihapus");
    }
  } catch (err) {
    console.error("Gagal menghapus:", err);
    showToast("Gagal menghapus: " + err.message, "error");
  }
  closeDeleteModal();
}

// ─── BOOTSTRAP ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
});
