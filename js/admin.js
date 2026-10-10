/* ============================================
   Kel2Store — Admin Dashboard Logic
   ============================================ */

// ─── DEFAULT PRODUCTS SEED ───────────────────────────
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Indomie Goreng Original",
    category: "Makanan",
    price: 3500,
    originalPrice: 4000,
    rating: 5,
    badge: "best-seller",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop",
    sold: "2,5rb",
    stock: 120,
    description: "Indomie Mi Goreng rasa original legendaris dengan perpaduan bumbu rempah khas nusantara, bawang goreng renyah, minyak bumbu gurih, kecap manis, dan cabai bubuk. Praktis dan lezat dinikmati kapan saja."
  },
  {
    id: 2,
    name: "Teh Botol Sosro 450ml",
    category: "Minuman",
    price: 5500,
    originalPrice: 6500,
    rating: 4,
    badge: null,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop",
    sold: "1,8rb",
    stock: 85,
    description: "Minuman teh melati siap minum dengan aroma melati asli yang harum dan menyegarkan. Cocok disajikan dingin untuk menemani berbagai santapan harianmu."
  },
  {
    id: 3,
    name: "Chitato Lite Rasa Keju",
    category: "Snack",
    price: 12500,
    originalPrice: 14000,
    rating: 4,
    badge: "new",
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&h=600&fit=crop",
    sold: "950",
    stock: 60,
    description: "Keripik kentang tipis renyah dengan taburan bumbu keju pilihan yang gurih dan creamy. Camilan asyik buat nonton film atau santai bareng teman."
  },
  {
    id: 4,
    name: "Beras Premium 5kg",
    category: "Kebutuhan Harian",
    price: 72000,
    originalPrice: 78000,
    rating: 5,
    badge: null,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop",
    sold: "3,1rb",
    stock: 40,
    description: "Beras kualitas super dengan butiran putih bersih, pulen, dan wangi alami tanpa pemutih atau pengawet. Pilihan tepat untuk nasi keluarga yang lezat."
  },
  {
    id: 5,
    name: "Kopi Kapal Api Special",
    category: "Minuman",
    price: 15000,
    originalPrice: 17500,
    rating: 5,
    badge: "best-seller",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
    sold: "4,2rb",
    stock: 95,
    description: "Kopi bubuk murni terbuat dari biji kopi pilihan nusantara dengan aroma khas mantap dan cita rasa kopi hitam yang pekat nan menggugah semangat."
  },
  {
    id: 6,
    name: "Oreo Vanilla Cream",
    category: "Snack",
    price: 9800,
    originalPrice: 12000,
    rating: 4,
    badge: "promo",
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=600&h=600&fit=crop",
    sold: "1,2rb",
    stock: 70,
    description: "Biskuit sandwich cokelat renyah dengan krim vanila lembut yang manis dan nikmat. Diputar, dijilat, dicelupin ke susu hangat!"
  },
  {
    id: 7,
    name: "Minyak Goreng Bimoli 2L",
    category: "Kebutuhan Harian",
    price: 35000,
    originalPrice: 38000,
    rating: 4,
    badge: null,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop",
    sold: "2,1rb",
    stock: 50,
    description: "Minyak goreng kelapa sawit berkualitas yang diproses secara higienis, jernih, dan tidak mudah menghitam untuk menghasilkan gorengan renyah sempurna."
  },
  {
    id: 8,
    name: "Ultra Milk Full Cream 1L",
    category: "Minuman",
    price: 18500,
    originalPrice: 20000,
    rating: 5,
    badge: "new",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=600&fit=crop",
    sold: "1,5rb",
    stock: 65,
    description: "Susu sapi segar alami diproses dengan teknologi UHT (Ultra High Temperature) higienis tanpa bahan pengawet. Kaya kalsium dan nutrisi harian keluarga."
  },
  {
    id: 9,
    name: "Sarden ABC Saus Pedas",
    category: "Makanan",
    price: 14500,
    originalPrice: 17000,
    rating: 4,
    badge: "promo",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&h=600&fit=crop",
    sold: "890",
    stock: 45,
    description: "Ikan sarden segar pilihan dalam saus tomat cabai pedas nikmat yang kaya rasa dan tinggi Omega 3 & 6. Praktis tinggal dihangatkan."
  },
  {
    id: 10,
    name: "Sabun Lifebuoy Total 10",
    category: "Kebutuhan Harian",
    price: 4200,
    originalPrice: 5000,
    rating: 4,
    badge: null,
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&h=600&fit=crop",
    sold: "1,7rb",
    stock: 110,
    description: "Sabun mandi batang antibakterial dengan perlindungan menyeluruh terhadap 10 jenis kuman penyebab masalah kesehatan, wangi segar tahan lama."
  },
  {
    id: 11,
    name: "Richeese Nabati Keju",
    category: "Snack",
    price: 8500,
    originalPrice: 10000,
    rating: 5,
    badge: "best-seller",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=600&fit=crop",
    sold: "2,3rb",
    stock: 75,
    description: "Wafer renyah dengan krim keju asli yang melimpah dan gurih. Mengandung vitamin A, B1, B2, B6, dan B12."
  },
  {
    id: 12,
    name: "Nasi Goreng Instan",
    category: "Makanan",
    price: 6500,
    originalPrice: 8000,
    rating: 4,
    badge: null,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=600&fit=crop",
    sold: "760",
    stock: 55,
    description: "Bumbu nasi goreng instan siap saji lengkap dengan topping sayur dan daging kering. Cepat, nikmat, dan pas untuk santapan darurat."
  }
];

// Sample Demo Orders
const DEMO_ORDERS = [
  {
    id: "ORD-984210",
    customer: {
      name: "Budi Santoso",
      phone: "081234567890",
      address: "Jl. Tebet Barat Dalam No. 14, RT 02/RW 03, Jakarta Selatan",
      notes: "Tolong kirim sebelum jam 3 sore"
    },
    items: [
      { id: 1, name: "Indomie Goreng Original", price: 3500, qty: 5, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop", category: "Makanan" },
      { id: 8, name: "Ultra Milk Full Cream 1L", price: 18500, qty: 2, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=600&fit=crop", category: "Minuman" },
      { id: 3, name: "Chitato Lite Rasa Keju", price: 12500, qty: 1, image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&h=600&fit=crop", category: "Snack" }
    ],
    total: 67000,
    itemCount: 8,
    status: "Pending",
    date: "10 Okt 2026, 09:15",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "ORD-983105",
    customer: {
      name: "Siti Rahma",
      phone: "085712345678",
      address: "Komplek Melati Indah Blok C2/No 8, Kebon Jeruk, Jakarta Barat",
      notes: "Pagar warna hitam"
    },
    items: [
      { id: 4, name: "Beras Premium 5kg", price: 72000, qty: 1, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop", category: "Kebutuhan Harian" },
      { id: 7, name: "Minyak Goreng Bimoli 2L", price: 35000, qty: 2, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop", category: "Kebutuhan Harian" }
    ],
    total: 142000,
    itemCount: 3,
    status: "Diproses",
    date: "10 Okt 2026, 08:30",
    createdAt: new Date(Date.now() - 3600000 * 3.5).toISOString()
  },
  {
    id: "ORD-978422",
    customer: {
      name: "Ahmad Fauzi",
      phone: "081987654321",
      address: "Apartemen Grand Palm Tower B Lt. 12, Cengkareng",
      notes: ""
    },
    items: [
      { id: 5, name: "Kopi Kapal Api Special", price: 15000, qty: 2, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop", category: "Minuman" },
      { id: 6, name: "Oreo Vanilla Cream", price: 9800, qty: 3, image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=600&h=600&fit=crop", category: "Snack" }
    ],
    total: 59400,
    itemCount: 5,
    status: "Selesai",
    date: "09 Okt 2026, 16:45",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

// ─── STATE ───────────────────────────────────────────
let products = [];
let orders = [];
let currentView = "overview";
let activeOrderDetail = null;
let itemToDelete = null; // { type: 'order'|'product', id: ... }

// ─── UTILITIES ───────────────────────────────────────
function formatPrice(num) {
  return "Rp " + (num || 0).toLocaleString("id-ID");
}

function showToast(message, isError = false) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${isError ? '#EF4444' : '#2F9E6B'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 280);
  }, 2200);
}

// ─── STORAGE MANAGEMENT ──────────────────────────────
function loadStoredProducts() {
  const raw = localStorage.getItem("kel2store_products");
  if (!raw) {
    products = [...DEFAULT_PRODUCTS];
    localStorage.setItem("kel2store_products", JSON.stringify(products));
  } else {
    try {
      products = JSON.parse(raw);
      if (!Array.isArray(products) || products.length === 0) {
        products = [...DEFAULT_PRODUCTS];
        localStorage.setItem("kel2store_products", JSON.stringify(products));
      }
    } catch (e) {
      products = [...DEFAULT_PRODUCTS];
      localStorage.setItem("kel2store_products", JSON.stringify(products));
    }
  }
}

function saveProducts() {
  localStorage.setItem("kel2store_products", JSON.stringify(products));
}

function loadStoredOrders() {
  const raw = localStorage.getItem("kel2store_orders");
  if (!raw) {
    orders = [];
  } else {
    try {
      orders = JSON.parse(raw);
      if (!Array.isArray(orders)) orders = [];
    } catch (e) {
      orders = [];
    }
  }
}

function saveOrders() {
  localStorage.setItem("kel2store_orders", JSON.stringify(orders));
}

// ─── VIEW NAVIGATION ─────────────────────────────────
function switchView(viewName) {
  currentView = viewName;

  // Update nav buttons
  document.querySelectorAll(".sidebar-nav .nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  // Update view sections
  document.querySelectorAll(".admin-view").forEach(section => {
    section.classList.toggle("active", section.id === `view-${viewName}`);
  });

  // Update topbar title
  const titleEl = document.getElementById("view-title");
  const subEl = document.getElementById("view-subtitle");

  switch (viewName) {
    case "overview":
      if (titleEl) titleEl.textContent = "Overview Dashboard";
      if (subEl) subEl.textContent = "Ringkasan statistik penjualan, pesanan, dan produk";
      renderOverview();
      break;
    case "orders":
      if (titleEl) titleEl.textContent = "Daftar Pesanan";
      if (subEl) subEl.textContent = "Kelola data transaksi dan status pengiriman pesanan pembeli";
      renderOrdersTable();
      break;
    case "products":
      if (titleEl) titleEl.textContent = "Kelola Produk";
      if (subEl) subEl.textContent = "Daftar katalog produk, stok barang, dan badge promosi";
      renderProductsTable();
      break;
  }

  // Close mobile sidebar if open
  closeMobileSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById("admin-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("admin-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
}

// ─── OVERVIEW SECTION ────────────────────────────────
function renderOverview() {
  // Compute Stats
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const pendingOrders = orders.filter(ord => ord.status === "Pending").length;
  const completedOrders = orders.filter(ord => ord.status === "Selesai").length;
  const totalProducts = products.length;

  const completionRate = orders.length > 0 
    ? Math.round((completedOrders / orders.length) * 100) 
    : 0;

  // Update stat values
  document.getElementById("stat-total-revenue").textContent = formatPrice(totalRevenue);
  document.getElementById("stat-pending-orders").textContent = pendingOrders;
  document.getElementById("stat-total-products").textContent = totalProducts;
  document.getElementById("stat-completed-orders").textContent = completedOrders;
  document.getElementById("stat-completion-rate").textContent = `Tingkat selesai: ${completionRate}% (${completedOrders} pesanan)`;

  // Update Sidebar Badges
  const badgeOrders = document.getElementById("badge-orders-pending");
  if (badgeOrders) {
    badgeOrders.textContent = pendingOrders;
    badgeOrders.style.display = pendingOrders > 0 ? "inline-block" : "none";
  }

  const badgeProd = document.getElementById("badge-products-count");
  if (badgeProd) {
    badgeProd.textContent = totalProducts;
  }

  // Render 5 recent orders table
  const recentOrders = orders.slice(0, 5);
  const overviewTbody = document.getElementById("overview-orders-tbody");

  if (recentOrders.length === 0) {
    overviewTbody.innerHTML = `
      <tr>
        <td colspan="5" class="table-empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <h4>Belum ada pesanan masuk</h4>
          <p>Pesanan dari toko akan otomatis tercatat di sini.</p>
        </td>
      </tr>
    `;
  } else {
    overviewTbody.innerHTML = recentOrders.map(ord => `
      <tr>
        <td><span class="order-id-cell">${ord.id}</span></td>
        <td>
          <div class="customer-cell">
            <span class="customer-name">${ord.customer?.name || "Pelanggan"}</span>
            <span class="customer-phone">${ord.customer?.phone || "-"}</span>
          </div>
        </td>
        <td><strong>${formatPrice(ord.total)}</strong></td>
        <td><span class="status-badge ${ord.status?.toLowerCase() || 'pending'}">${ord.status || 'Pending'}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="openOrderDetail('${ord.id}')">
            Detail
          </button>
        </td>
      </tr>
    `).join("");
  }

  // Render Low Stock / Catalog Summary
  const stockListEl = document.getElementById("overview-stock-list");
  const lowStockProducts = products.filter(p => (p.stock || 0) <= 60);

  if (lowStockProducts.length === 0) {
    stockListEl.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--clr-text-secondary);">
        <p>✅ Semua stok produk dalam kondisi aman dan mencukupi.</p>
      </div>
    `;
  } else {
    stockListEl.innerHTML = lowStockProducts.slice(0, 4).map(p => `
      <div class="stock-alert-item">
        <div class="stock-product-meta">
          <img src="${p.image}" alt="${p.name}" class="stock-product-img" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&fit=crop'">
          <div>
            <div class="stock-product-name">${p.name}</div>
            <div class="stock-product-cat">${p.category} • ${formatPrice(p.price)}</div>
          </div>
        </div>
        <span class="stock-pill ${p.stock <= 45 ? 'low' : 'normal'}">Stok: ${p.stock}</span>
      </div>
    `).join("");
  }
}

// ─── ORDERS SECTION ──────────────────────────────────
function getFilteredOrders() {
  const searchInput = document.getElementById("order-search-input");
  const statusFilter = document.getElementById("order-status-filter");

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const status = statusFilter ? statusFilter.value : "all";

  return orders.filter(ord => {
    // Status match
    const matchStatus = (status === "all") || (ord.status === status);

    // Query match (Order ID, Name, Phone)
    const idMatch = (ord.id || "").toLowerCase().includes(query);
    const nameMatch = (ord.customer?.name || "").toLowerCase().includes(query);
    const phoneMatch = (ord.customer?.phone || "").toLowerCase().includes(query);

    return matchStatus && (idMatch || nameMatch || phoneMatch);
  });
}

function renderOrdersTable() {
  const tbody = document.getElementById("orders-tbody");
  const footerInfo = document.getElementById("orders-count-info");
  const filtered = getFilteredOrders();

  if (footerInfo) {
    footerInfo.textContent = `Menampilkan ${filtered.length} dari total ${orders.length} pesanan`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="table-empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <h4>Tidak ada pesanan yang sesuai</h4>
          <p>Coba gunakan kata kunci pencarian atau status filter yang berbeda.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(ord => {
    const itemsPreview = (ord.items || []).map(it => `${it.name} (x${it.qty})`).join(", ");
    return `
      <tr>
        <td>
          <span class="order-id-cell">${ord.id}</span>
        </td>
        <td>
          <div class="customer-cell">
            <span class="customer-name">${ord.customer?.name || "Anonim"}</span>
            <span class="customer-phone">${ord.customer?.phone || "-"}</span>
          </div>
        </td>
        <td>
          <span style="font-size: 13px; color: var(--clr-text-secondary);">${ord.date || "-"}</span>
        </td>
        <td>
          <span style="font-size: 13px; color: var(--clr-text); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; max-width: 250px;">
            ${itemsPreview || "-"}
          </span>
        </td>
        <td>
          <strong class="table-price">${formatPrice(ord.total)}</strong>
        </td>
        <td>
          <select class="admin-select select-sm" onchange="updateOrderStatusInline('${ord.id}', this.value)" style="font-weight: 600;">
            <option value="Pending" ${ord.status === "Pending" ? "selected" : ""}>🟡 Pending</option>
            <option value="Diproses" ${ord.status === "Diproses" ? "selected" : ""}>🔵 Diproses</option>
            <option value="Selesai" ${ord.status === "Selesai" ? "selected" : ""}>🟢 Selesai</option>
            <option value="Dibatalkan" ${ord.status === "Dibatalkan" ? "selected" : ""}>🔴 Dibatalkan</option>
          </select>
        </td>
        <td class="table-actions-cell">
          <button class="btn-icon-only" title="Lihat Detail Pesanan" onclick="openOrderDetail('${ord.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="btn-icon-only danger" title="Hapus Pesanan" onclick="promptDeleteOrder('${ord.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function updateOrderStatusInline(orderId, newStatus) {
  const ord = orders.find(o => o.id === orderId);
  if (!ord) return;
  ord.status = newStatus;
  saveOrders();
  showToast(`Status pesanan ${orderId} diubah menjadi "${newStatus}"`);
  renderOverview();
  renderOrdersTable();
}

// ─── ORDER DETAIL MODAL ──────────────────────────────
function openOrderDetail(orderId) {
  const ord = orders.find(o => o.id === orderId);
  if (!ord) return;

  activeOrderDetail = ord;

  document.getElementById("modal-order-id").textContent = ord.id;
  document.getElementById("modal-order-date").textContent = `Dibuat pada: ${ord.date || "-"}`;

  const statusBadge = document.getElementById("modal-order-status-badge");
  statusBadge.className = `status-badge ${ord.status?.toLowerCase() || 'pending'}`;
  statusBadge.textContent = ord.status || "Pending";

  const statusSelect = document.getElementById("order-status-select-modal");
  if (statusSelect) statusSelect.value = ord.status || "Pending";

  const body = document.getElementById("order-detail-body");
  body.innerHTML = `
    <div class="order-detail-grid">
      <!-- Customer Box -->
      <div class="order-customer-box">
        <div class="cust-info-item">
          <label>Nama Pelanggan</label>
          <span>${ord.customer?.name || "Anonim"}</span>
        </div>
        <div class="cust-info-item">
          <label>Nomor WhatsApp / HP</label>
          <span>${ord.customer?.phone || "-"}</span>
        </div>
        <div class="cust-info-item col-full">
          <label>Alamat Pengiriman</label>
          <span>${ord.customer?.address || "-"}</span>
        </div>
        ${ord.customer?.notes ? `
          <div class="cust-info-item col-full">
            <label>Catatan Pesanan</label>
            <span style="color: #64748B; font-style: italic;">"${ord.customer.notes}"</span>
          </div>
        ` : ""}
      </div>

      <!-- Items List -->
      <div>
        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--clr-text);">Daftar Item Pesanan (${(ord.items || []).length})</h4>
        <div class="order-items-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Harga Satuan</th>
                <th>Jumlah</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${(ord.items || []).map(it => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${it.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&fit=crop'}" style="width: 36px; height: 36px; border-radius: 6px; object-fit: cover; border: 1px solid var(--clr-border);">
                      <div>
                        <div style="font-weight: 600; font-size: 13px;">${it.name}</div>
                        <div style="font-size: 11px; color: var(--clr-text-muted);">${it.category || "Umum"}</div>
                      </div>
                    </div>
                  </td>
                  <td>${formatPrice(it.price)}</td>
                  <td><strong>${it.qty}</strong></td>
                  <td style="text-align: right; font-weight: 700; color: var(--clr-brand-dark);">
                    ${formatPrice((it.price || 0) * (it.qty || 1))}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Total Summary -->
      <div class="order-total-summary-card">
        <div class="summary-line">
          <span>Subtotal Produk</span>
          <span>${formatPrice(ord.total)}</span>
        </div>
        <div class="summary-line">
          <span>Biaya Pengiriman</span>
          <span style="color: var(--clr-brand); font-weight: 700;">GRATIS</span>
        </div>
        <div class="summary-line grand-total">
          <span>Total Pembayaran</span>
          <span>${formatPrice(ord.total)}</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById("order-detail-overlay").classList.add("open");
  document.getElementById("order-detail-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeOrderDetail() {
  document.getElementById("order-detail-overlay").classList.remove("open");
  document.getElementById("order-detail-modal").classList.remove("open");
  document.body.style.overflow = "";
  activeOrderDetail = null;
}

// ─── PRODUCTS SECTION ────────────────────────────────
function getFilteredProducts() {
  const searchInput = document.getElementById("product-search-input");
  const catFilter = document.getElementById("product-category-filter");
  const stockFilter = document.getElementById("product-stock-filter");

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const cat = catFilter ? catFilter.value : "all";
  const stock = stockFilter ? stockFilter.value : "all";

  return products.filter(p => {
    // Category match
    const matchCat = (cat === "all") || (p.category === cat);

    // Stock match
    let matchStock = true;
    if (stock === "low") matchStock = (p.stock || 0) <= 50;
    if (stock === "available") matchStock = (p.stock || 0) > 50;

    // Search query match
    const nameMatch = (p.name || "").toLowerCase().includes(query);
    const descMatch = (p.description || "").toLowerCase().includes(query);

    return matchCat && matchStock && (nameMatch || descMatch);
  });
}

function renderProductsTable() {
  const tbody = document.getElementById("products-tbody");
  const footerInfo = document.getElementById("products-count-info");
  const filtered = getFilteredProducts();

  if (footerInfo) {
    footerInfo.textContent = `Menampilkan ${filtered.length} dari total ${products.length} produk`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="table-empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <h4>Produk tidak ditemukan</h4>
          <p>Coba gunakan kata kunci pencarian atau kategori lain.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <div class="table-product-cell">
          <img src="${p.image}" alt="${p.name}" class="table-product-thumb" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&fit=crop'">
          <div>
            <div class="table-product-title">${p.name}</div>
            <div class="table-product-desc">${p.description || "-"}</div>
          </div>
        </div>
      </td>
      <td>
        <span style="font-weight: 500; font-size: 13px; color: var(--clr-text-secondary);">${p.category}</span>
      </td>
      <td>
        <div class="table-price-cell">
          <span class="table-price">${formatPrice(p.price)}</span>
          ${p.originalPrice ? `<span class="table-price-orig">${formatPrice(p.originalPrice)}</span>` : ""}
        </div>
      </td>
      <td>
        <span class="stock-pill ${(p.stock || 0) <= 50 ? 'low' : 'normal'}">
          ${p.stock || 0} unit
        </span>
      </td>
      <td>
        <span class="product-tag ${p.badge || 'none'}">${p.badge ? p.badge.replace('-', ' ') : '-'}</span>
      </td>
      <td>
        <span style="display: flex; align-items: center; gap: 4px; font-weight: 600; font-size: 13px;">
          ⭐ ${p.rating || 5}
        </span>
      </td>
      <td class="table-actions-cell">
        <button class="btn-icon-only" title="Edit Produk" onclick="openProductFormModal(${p.id})">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </button>
        <button class="btn-icon-only danger" title="Hapus Produk" onclick="promptDeleteProduct(${p.id})">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </td>
    </tr>
  `).join("");
}

// ─── PRODUCT FORM MODAL (CREATE & EDIT) ──────────────
function openProductFormModal(productId = null) {
  const form = document.getElementById("product-form");
  form.reset();

  const titleEl = document.getElementById("product-form-title");
  const submitTextEl = document.getElementById("product-form-submit-text");
  const idInput = document.getElementById("prod-id");
  const previewImg = document.getElementById("image-preview-el");
  const previewHint = document.getElementById("preview-hint");

  if (productId) {
    const p = products.find(prod => prod.id === productId);
    if (!p) return;

    if (titleEl) titleEl.textContent = "Edit Produk";
    if (submitTextEl) submitTextEl.textContent = "Simpan Perubahan";
    idInput.value = p.id;

    document.getElementById("prod-name").value = p.name || "";
    document.getElementById("prod-category").value = p.category || "Makanan";
    document.getElementById("prod-badge").value = p.badge || "";
    document.getElementById("prod-price").value = p.price || 0;
    document.getElementById("prod-original-price").value = p.originalPrice || "";
    document.getElementById("prod-stock").value = p.stock || 100;
    document.getElementById("prod-sold").value = p.sold || "";
    document.getElementById("prod-image").value = p.image || "";
    document.getElementById("prod-desc").value = p.description || "";

    if (p.image) {
      previewImg.src = p.image;
      previewImg.style.display = "block";
      if (previewHint) previewHint.style.display = "none";
    }
  } else {
    if (titleEl) titleEl.textContent = "Tambah Produk Baru";
    if (submitTextEl) submitTextEl.textContent = "Tambah Produk";
    idInput.value = "";
    previewImg.style.display = "none";
    if (previewHint) previewHint.style.display = "block";
  }

  document.getElementById("product-form-overlay").classList.add("open");
  document.getElementById("product-form-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductFormModal() {
  document.getElementById("product-form-overlay").classList.remove("open");
  document.getElementById("product-form-modal").classList.remove("open");
  document.body.style.overflow = "";
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  const idVal = document.getElementById("prod-id").value;
  const name = document.getElementById("prod-name").value.trim();
  const category = document.getElementById("prod-category").value;
  const badge = document.getElementById("prod-badge").value || null;
  const price = parseInt(document.getElementById("prod-price").value) || 0;
  const origPriceVal = document.getElementById("prod-original-price").value;
  const originalPrice = origPriceVal ? parseInt(origPriceVal) : null;
  const stock = parseInt(document.getElementById("prod-stock").value) || 0;
  const sold = document.getElementById("prod-sold").value.trim() || "0";
  const image = document.getElementById("prod-image").value.trim();
  const description = document.getElementById("prod-desc").value.trim();

  if (!name || price <= 0 || !image) {
    showToast("Harap isi semua kolom wajib dengan benar", true);
    return;
  }

  if (idVal) {
    // Edit existing
    const id = parseInt(idVal);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name,
        category,
        badge,
        price,
        originalPrice,
        stock,
        sold,
        image,
        description
      };
      saveProducts();
      showToast(`Produk "${name}" berhasil diperbarui!`);
    }
  } else {
    // Create new
    const nextId = products.length > 0 
      ? Math.max(...products.map(p => p.id || 0)) + 1 
      : 1;

    const newProd = {
      id: nextId,
      name,
      category,
      badge,
      price,
      originalPrice,
      stock,
      sold,
      rating: 5,
      image,
      description
    };
    products.unshift(newProd);
    saveProducts();
    showToast(`Produk "${name}" berhasil ditambahkan!`);
  }

  closeProductFormModal();
  renderOverview();
  renderProductsTable();
}

// ─── DELETE CONFIRMATION ─────────────────────────────
function promptDeleteOrder(orderId) {
  itemToDelete = { type: "order", id: orderId };
  document.getElementById("delete-modal-title").textContent = `Hapus Pesanan ${orderId}?`;
  document.getElementById("delete-modal-desc").textContent = "Data riwayat pesanan ini akan dihapus permanen dari sistem.";
  
  document.getElementById("delete-confirm-overlay").classList.add("open");
  document.getElementById("delete-confirm-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function promptDeleteProduct(productId) {
  const p = products.find(prod => prod.id === productId);
  itemToDelete = { type: "product", id: productId };
  document.getElementById("delete-modal-title").textContent = `Hapus Produk "${p ? p.name : 'ini'}"?`;
  document.getElementById("delete-modal-desc").textContent = "Produk tidak akan lagi tampil di etalase toko pelanggan.";
  
  document.getElementById("delete-confirm-overlay").classList.add("open");
  document.getElementById("delete-confirm-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDeleteModal() {
  document.getElementById("delete-confirm-overlay").classList.remove("open");
  document.getElementById("delete-confirm-modal").classList.remove("open");
  document.body.style.overflow = "";
  itemToDelete = null;
}

function confirmDeleteAction() {
  if (!itemToDelete) return;

  if (itemToDelete.type === "order") {
    orders = orders.filter(o => o.id !== itemToDelete.id);
    saveOrders();
    showToast(`Pesanan ${itemToDelete.id} telah dihapus`);
    renderOverview();
    renderOrdersTable();
  } else if (itemToDelete.type === "product") {
    products = products.filter(p => p.id !== itemToDelete.id);
    saveProducts();
    showToast(`Produk telah dihapus dari etalase`);
    renderOverview();
    renderProductsTable();
  }

  closeDeleteModal();
}

// ─── INITIALIZATION ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Load data
  loadStoredProducts();
  loadStoredOrders();

  // Set Current Date in Topbar
  const dateEl = document.getElementById("current-date-text");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  // Initial render
  renderOverview();
  renderOrdersTable();
  renderProductsTable();

  // Navigation Click Handlers
  document.getElementById("nav-overview")?.addEventListener("click", () => switchView("overview"));
  document.getElementById("nav-orders")?.addEventListener("click", () => switchView("orders"));
  document.getElementById("nav-products")?.addEventListener("click", () => switchView("products"));

  // Mobile sidebar triggers
  document.getElementById("sidebar-toggle-btn")?.addEventListener("click", toggleMobileSidebar);
  document.getElementById("sidebar-close-btn")?.addEventListener("click", closeMobileSidebar);
  document.getElementById("sidebar-overlay")?.addEventListener("click", closeMobileSidebar);

  // Quick Action Buttons
  document.getElementById("btn-quick-add-product")?.addEventListener("click", () => openProductFormModal());
  document.getElementById("btn-overview-add-product")?.addEventListener("click", () => openProductFormModal());
  document.getElementById("btn-add-product-main")?.addEventListener("click", () => openProductFormModal());

  // Demo Orders Seeder
  document.getElementById("btn-seed-orders")?.addEventListener("click", () => {
    orders = [...DEMO_ORDERS, ...orders];
    saveOrders();
    showToast("3 contoh pesanan berhasil ditambahkan!");
    renderOverview();
    renderOrdersTable();
  });

  // Reset Default Products
  document.getElementById("btn-reset-default-products")?.addEventListener("click", () => {
    if (confirm("Kembalikan 12 produk ke data awal bawaan?")) {
      products = [...DEFAULT_PRODUCTS];
      saveProducts();
      showToast("Katalog produk dikembalikan ke data awal!");
      renderOverview();
      renderProductsTable();
    }
  });

  // Filters Event Listeners (Orders)
  document.getElementById("order-search-input")?.addEventListener("input", renderOrdersTable);
  document.getElementById("order-status-filter")?.addEventListener("change", renderOrdersTable);
  document.getElementById("btn-reset-order-filter")?.addEventListener("click", () => {
    const search = document.getElementById("order-search-input");
    const filter = document.getElementById("order-status-filter");
    if (search) search.value = "";
    if (filter) filter.value = "all";
    renderOrdersTable();
  });

  // Filters Event Listeners (Products)
  document.getElementById("product-search-input")?.addEventListener("input", renderProductsTable);
  document.getElementById("product-category-filter")?.addEventListener("change", renderProductsTable);
  document.getElementById("product-stock-filter")?.addEventListener("change", renderProductsTable);
  document.getElementById("btn-reset-product-filter")?.addEventListener("click", () => {
    const search = document.getElementById("product-search-input");
    const cat = document.getElementById("product-category-filter");
    const stock = document.getElementById("product-stock-filter");
    if (search) search.value = "";
    if (cat) cat.value = "all";
    if (stock) stock.value = "all";
    renderProductsTable();
  });

  // Order Detail Modal Controls
  document.getElementById("order-detail-overlay")?.addEventListener("click", closeOrderDetail);
  document.getElementById("order-detail-close-btn")?.addEventListener("click", closeOrderDetail);
  document.getElementById("btn-close-order-modal")?.addEventListener("click", closeOrderDetail);
  document.getElementById("btn-update-order-status")?.addEventListener("click", () => {
    if (!activeOrderDetail) return;
    const newStatus = document.getElementById("order-status-select-modal").value;
    updateOrderStatusInline(activeOrderDetail.id, newStatus);
    closeOrderDetail();
  });

  // Product Form Modal Controls
  document.getElementById("product-form-overlay")?.addEventListener("click", closeProductFormModal);
  document.getElementById("product-form-close-btn")?.addEventListener("click", closeProductFormModal);
  document.getElementById("product-form-cancel-btn")?.addEventListener("click", closeProductFormModal);
  document.getElementById("product-form")?.addEventListener("submit", handleProductFormSubmit);

  // Image Preview button & input
  const prodImgInput = document.getElementById("prod-image");
  const previewImgEl = document.getElementById("image-preview-el");
  const previewHintEl = document.getElementById("preview-hint");

  function updateImagePreview() {
    const val = prodImgInput?.value.trim();
    if (val && previewImgEl) {
      previewImgEl.src = val;
      previewImgEl.style.display = "block";
      if (previewHintEl) previewHintEl.style.display = "none";
    }
  }

  prodImgInput?.addEventListener("blur", updateImagePreview);
  document.getElementById("btn-preview-image")?.addEventListener("click", updateImagePreview);

  // Delete Modal Controls
  document.getElementById("delete-confirm-overlay")?.addEventListener("click", closeDeleteModal);
  document.getElementById("btn-cancel-delete")?.addEventListener("click", closeDeleteModal);
  document.getElementById("btn-confirm-delete")?.addEventListener("click", confirmDeleteAction);

  // Escape key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeOrderDetail();
      closeProductFormModal();
      closeDeleteModal();
      closeMobileSidebar();
    }
  });

  // Storage listener for cross-tab sync
  window.addEventListener("storage", (e) => {
    if (e.key === "kel2store_orders") {
      loadStoredOrders();
      renderOverview();
      renderOrdersTable();
    } else if (e.key === "kel2store_products") {
      loadStoredProducts();
      renderOverview();
      renderProductsTable();
    }
  });

  // Refresh data on window focus
  window.addEventListener("focus", () => {
    loadStoredProducts();
    loadStoredOrders();
    renderOverview();
    renderOrdersTable();
    renderProductsTable();
  });
});
