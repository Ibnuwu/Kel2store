/* ============================================
   Kel2Store — Application Logic (Firebase Edition)
   ============================================ */

import { db } from "./firebase-config.js";
import {
  collection, getDocs, doc, updateDoc, addDoc, increment, serverTimestamp, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ─── SVG ICONS (Lucide-style) ────────────────────────
const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  cart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  minus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  starEmpty: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  package: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  searchX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  utensils: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`,
  cookie: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>`,
  shoppingBasket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="m4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>`,
  percent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  imagePlaceholder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
  cartEmpty: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
};

// ─── CATEGORIES ──────────────────────────────────────
const CATEGORIES = [
  { name: "Makanan", icon: "utensils" },
  { name: "Minuman", icon: "coffee" },
  { name: "Snack", icon: "cookie" },
  { name: "Kebutuhan Harian", icon: "shoppingBasket" },
  { name: "Promo", icon: "percent" },
  { name: "Lainnya", icon: "grid" }
];

// ─── STATE ───────────────────────────────────────────
let PRODUCTS = [];
let cart = JSON.parse(localStorage.getItem("kel2store_cart") || "[]");
let activeCategory = null;
let searchQuery = "";
let currentModalProductId = null;
let modalQuantity = 1;

// ─── LOAD PRODUCTS FROM FIRESTORE ────────────────────
async function loadProducts() {
  try {
    const snap = await getDocs(collection(db, "products"));
    PRODUCTS = snap.docs.map(d => ({ _docId: d.id, ...d.data() }));
    if (PRODUCTS.length === 0) {
      // Show empty state
      const grid = document.getElementById("products-grid");
      if (grid) grid.innerHTML = `<div class="empty-state">${ICONS.searchX}<h3>Belum ada produk</h3><p>Tunggu admin menambahkan produk ke toko.</p></div>`;
      return;
    }
    renderProducts(PRODUCTS);
    renderTopSellers();
    renderCartDrawer();
  } catch (err) {
    console.error("Gagal memuat produk dari Firestore:", err);
    const grid = document.getElementById("products-grid");
    if (grid) grid.innerHTML = `<div class="empty-state">${ICONS.searchX}<h3>Gagal memuat produk</h3><p>Periksa koneksi internet Anda.</p></div>`;
  }
}

// ─── UTILITIES ───────────────────────────────────────
function formatPrice(price) {
  return "Rp " + price.toLocaleString("id-ID");
}

function saveCart() {
  localStorage.setItem("kel2store_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll(".cart-count");
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle("visible", count > 0);
  });
}

function renderStars(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += ICONS.star;
    } else {
      html += `<svg class="empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
  }
  return html;
}

window.imgFallback = function(el) {
  const wrapper = el.parentElement;
  el.remove();
  const placeholder = document.createElement("div");
  placeholder.className = "img-placeholder";
  placeholder.innerHTML = ICONS.imagePlaceholder;
  wrapper.appendChild(placeholder);
};

function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `${ICONS.check}<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function getBadgeLabel(badge) {
  switch (badge) {
    case "best-seller": return "Best Seller";
    case "promo": return "Promo";
    case "new": return "New";
    default: return "";
  }
}

// ─── RENDER CATEGORIES & PRODUCTS ────────────────────

function renderCategories() {
  const grid = document.getElementById("categories-grid");
  grid.innerHTML = CATEGORIES.map(cat => `
    <button class="category-card" data-category="${cat.name}" aria-label="Kategori ${cat.name}">
      <div class="category-icon">${ICONS[cat.icon]}</div>
      <span class="category-name">${cat.name}</span>
    </button>
  `).join("");

  grid.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      if (category === "Promo") {
        activeCategory = null;
        document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        renderProducts(PRODUCTS.filter(p => p.badge === "promo"));
        document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (category === "Lainnya") {
        activeCategory = null;
        document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        renderProducts(PRODUCTS);
        document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (activeCategory === category) {
        activeCategory = null;
        card.classList.remove("active");
        renderProducts(getFilteredProducts());
      } else {
        activeCategory = category;
        document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        renderProducts(getFilteredProducts());
        document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function getFilteredProducts() {
  let filtered = PRODUCTS;
  if (activeCategory) {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  return filtered;
}

function renderProducts(products) {
  const grid = document.getElementById("products-grid");
  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        ${ICONS.searchX}
        <h3>Produk tidak ditemukan</h3>
        <p>Coba cari dengan kata kunci lain.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => {
    const pid = product._docId || product.id;
    return `
      <div class="product-card" data-product-id="${pid}" tabindex="0" role="button" aria-label="Lihat detail ${product.name}">
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="imgFallback(this)">
          ${product.badge ? `<span class="product-badge ${product.badge}">${getBadgeLabel(product.badge)}</span>` : ""}
          <button class="quick-view-overlay" aria-label="Lihat Cepat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Detail</span>
          </button>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            ${renderStars(product.rating || 4)}
            <span>${(product.rating || 4).toFixed(1)}</span>
          </div>
          <div class="product-bottom">
            <div class="price-container">
              <span class="product-price">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ""}
            </div>
            <button class="add-to-cart-btn" data-id="${pid}" aria-label="Tambah ${product.name} ke keranjang">
              ${ICONS.plus}
              <span>Tambah</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Product card click -> opens modal
  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart-btn")) return;
      const id = card.dataset.productId;
      openProductModal(id);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (!e.target.closest(".add-to-cart-btn")) {
          e.preventDefault();
          openProductModal(card.dataset.productId);
        }
      }
    });
  });

  // Add to cart buttons
  grid.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = btn.dataset.id;
      addToCart(id, 1);
      btn.classList.add("added");
      btn.innerHTML = `${ICONS.check}<span>Ditambahkan</span>`;
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = `${ICONS.plus}<span>Tambah</span>`;
      }, 1200);
    });
  });
}

function renderTopSellers() {
  const grid = document.getElementById("top-sellers-grid");
  if (!grid) return;
  const topProducts = PRODUCTS.slice(0, 4);
  if (topProducts.length === 0) return;

  grid.innerHTML = topProducts.map((product, index) => `
    <div class="top-seller-card" data-product-id="${product._docId || product.id}" role="button" tabindex="0" aria-label="Lihat detail ${product.name}">
      <div class="top-rank">#${index + 1}</div>
      <div class="top-seller-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="imgFallback(this)">
      </div>
      <div class="top-seller-info">
        <h3 class="top-seller-name">${product.name}</h3>
        <div class="top-seller-meta">
          <span class="top-seller-price">${formatPrice(product.price)}</span>
          <span class="top-seller-sold">${ICONS.flame} Terjual ${product.sold || "0"}</span>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".top-seller-card").forEach(card => {
    card.addEventListener("click", () => openProductModal(card.dataset.productId));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProductModal(card.dataset.productId); }
    });
  });
}

// ─── PRODUCT MODAL ───────────────────────────────────

function openProductModal(productId) {
  const product = PRODUCTS.find(p => (p._docId || p.id) === productId || String(p.id) === String(productId));
  if (!product) return;
  currentModalProductId = productId;
  modalQuantity = 1;
  renderProductModalContent(product);
  document.getElementById("product-modal-overlay").classList.add("open");
  document.getElementById("product-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  document.getElementById("product-modal-overlay")?.classList.remove("open");
  document.getElementById("product-modal")?.classList.remove("open");
  document.body.style.overflow = "";
  currentModalProductId = null;
}

function renderProductModalContent(product) {
  const modalBody = document.getElementById("modal-body");
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const pid = product._docId || product.id;

  modalBody.innerHTML = `
    <div class="modal-product-grid">
      <div class="modal-gallery-col">
        <div class="modal-main-img-wrapper">
          <img id="modal-main-image" src="${gallery[0]}" alt="${product.name}" onerror="imgFallback(this)">
          ${product.badge ? `<span class="product-badge ${product.badge}">${getBadgeLabel(product.badge)}</span>` : ""}
        </div>
        ${gallery.length > 1 ? `
          <div class="modal-thumbnails">
            ${gallery.map((img, idx) => `
              <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-src="${img}">
                <img src="${img}" alt="${product.name} thumb ${idx + 1}">
              </button>
            `).join("")}
          </div>
        ` : ""}
      </div>
      <div class="modal-info-col">
        <div class="modal-header-info">
          <span class="modal-category">${product.category}</span>
          <h1 class="modal-product-title">${product.name}</h1>
          <div class="modal-rating-row">
            <div class="stars-wrap">${renderStars(product.rating || 4)}</div>
            <span class="rating-num">${(product.rating || 4).toFixed(1)}</span>
            <span class="rating-dot">•</span>
            <span class="sold-count">Terjual ${product.sold || "0"}</span>
            <span class="rating-dot">•</span>
            <span class="stock-tag">Stok: <strong>${product.stock || 0}</strong></span>
          </div>
          <div class="modal-price-box">
            <span class="modal-price">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `
              <span class="modal-original-price">${formatPrice(product.originalPrice)}</span>
              <span class="discount-pill">Hemat ${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
            ` : ""}
          </div>
        </div>
        <div class="modal-purchase-section">
          <div class="modal-qty-control">
            <span class="qty-label">Jumlah:</span>
            <div class="modal-qty-box">
              <button class="qty-btn" id="modal-qty-minus">${ICONS.minus}</button>
              <input type="number" id="modal-qty-input" value="1" min="1" max="${product.stock || 99}">
              <button class="qty-btn" id="modal-qty-plus">${ICONS.plus}</button>
            </div>
          </div>
          <div class="modal-action-buttons">
            <button class="btn btn-primary modal-cart-btn" id="modal-add-to-cart">
              ${ICONS.cart}
              <span>Tambah ke Keranjang</span>
            </button>
            <button class="btn btn-secondary modal-buy-btn" id="modal-buy-now">
              <span>Beli Sekarang</span>
            </button>
          </div>
        </div>
        <div class="modal-tabs-wrapper">
          <div class="modal-tabs" role="tablist">
            <button class="tab-btn active" data-tab="tab-desc" role="tab">Deskripsi</button>
            <button class="tab-btn" data-tab="tab-specs" role="tab">Spesifikasi</button>
          </div>
          <div class="tab-content active" id="tab-desc" role="tabpanel">
            <p class="modal-description-text">${product.description || "Produk berkualitas tinggi siap memenuhi kebutuhan belanja harian Anda."}</p>
          </div>
          <div class="tab-content" id="tab-specs" role="tabpanel">
            <div class="specs-table">
              ${product.specs ? Object.entries(product.specs).map(([key, value]) => `
                <div class="spec-row">
                  <span class="spec-label">${key}</span>
                  <span class="spec-val">${value}</span>
                </div>
              `).join("") : `<p class="text-muted">Tidak ada spesifikasi khusus.</p>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Thumbnail switching
  modalBody.querySelectorAll(".thumb-btn").forEach(thumb => {
    thumb.addEventListener("click", () => {
      modalBody.querySelectorAll(".thumb-btn").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const mainImg = document.getElementById("modal-main-image");
      if (mainImg) mainImg.src = thumb.dataset.src;
    });
  });

  // Quantity control
  const qtyInput = document.getElementById("modal-qty-input");
  document.getElementById("modal-qty-minus").addEventListener("click", () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val > 1) { val--; qtyInput.value = val; modalQuantity = val; }
  });
  document.getElementById("modal-qty-plus").addEventListener("click", () => {
    let val = parseInt(qtyInput.value) || 1;
    const max = product.stock || 99;
    if (val < max) { val++; qtyInput.value = val; modalQuantity = val; }
  });
  qtyInput.addEventListener("change", () => {
    let val = parseInt(qtyInput.value) || 1;
    const max = product.stock || 99;
    if (val < 1) val = 1; if (val > max) val = max;
    qtyInput.value = val; modalQuantity = val;
  });

  // Add to Cart in modal
  document.getElementById("modal-add-to-cart").addEventListener("click", () => {
    addToCart(pid, modalQuantity);
    const btn = document.getElementById("modal-add-to-cart");
    btn.classList.add("added");
    btn.innerHTML = `${ICONS.check}<span>Ditambahkan (${modalQuantity})</span>`;
    setTimeout(() => { btn.classList.remove("added"); btn.innerHTML = `${ICONS.cart}<span>Tambah ke Keranjang</span>`; }, 1500);
  });

  // Buy Now
  document.getElementById("modal-buy-now").addEventListener("click", () => {
    addToCart(pid, modalQuantity);
    closeProductModal();
    openCart();
  });

  // Tabs
  modalBody.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      modalBody.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
      modalBody.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      tab.classList.add("active");
      const tc = document.getElementById(tab.dataset.tab);
      if (tc) tc.classList.add("active");
    });
  });
}

// ─── CART FUNCTIONS ──────────────────────────────────

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => (p._docId || p.id) === productId || String(p.id) === String(productId));
  if (!product) return;
  const pid = product._docId || product.id;

  const existing = cart.find(item => item.id === pid);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ id: pid, qty: quantity });
  }
  saveCart();
  showToast(`${product.name} ditambahkan`);
  renderCartDrawer();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCartDrawer();
}
window.removeFromCart = removeFromCart;

function updateQty(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  saveCart();
  renderCartDrawer();
}
window.updateQty = updateQty;

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => (p._docId || p.id) === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty">${ICONS.cartEmpty}<h3>Keranjang Kosong</h3><p>Belum ada produk di keranjang kamu.</p></div>`;
    footer.style.display = "none";
    return;
  }
  footer.style.display = "block";
  body.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => (p._docId || p.id) === item.id);
    if (!product) return "";
    return `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${product.image}" alt="${product.name}" onerror="imgFallback(this)"></div>
        <div class="cart-item-details">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${formatPrice(product.price)}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty('${item.id}', -1)">${ICONS.minus}</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', 1)">${ICONS.plus}</button>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">${ICONS.trash}</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
  document.getElementById("cart-subtotal").textContent = formatPrice(getCartTotal());
}

function openCart() {
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-drawer").classList.add("open");
  document.body.style.overflow = "hidden";
  renderCartDrawer();
}

function closeCart() {
  document.getElementById("cart-overlay").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

// ─── CHECKOUT MODAL & ORDERS ──────────────────────────

function openCheckoutModal() {
  if (cart.length === 0) { showToast("Keranjang belanja Anda masih kosong"); return; }
  closeCart();
  renderCheckoutSummary();
  document.getElementById("checkout-modal-overlay")?.classList.add("open");
  document.getElementById("checkout-modal")?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  document.getElementById("checkout-modal-overlay")?.classList.remove("open");
  document.getElementById("checkout-modal")?.classList.remove("open");
  document.body.style.overflow = "";
}

function renderCheckoutSummary() {
  const itemsContainer = document.getElementById("checkout-items-list");
  const subtotalEl = document.getElementById("checkout-subtotal");
  const grandTotalEl = document.getElementById("checkout-grand-total");
  if (!itemsContainer) return;
  const total = getCartTotal();

  itemsContainer.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => (p._docId || p.id) === item.id);
    if (!product) return "";
    return `
      <div class="checkout-item-row">
        <img src="${product.image}" alt="${product.name}" class="checkout-item-thumb" onerror="imgFallback(this)">
        <div class="checkout-item-info">
          <div class="checkout-item-name">${product.name}</div>
          <div class="checkout-item-meta">${item.qty} × ${formatPrice(product.price)}</div>
        </div>
        <div class="checkout-item-price">${formatPrice(product.price * item.qty)}</div>
      </div>
    `;
  }).join("");

  if (subtotalEl) subtotalEl.textContent = formatPrice(total);
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(total);
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (cart.length === 0) { showToast("Keranjang Anda kosong"); return; }

  const submitBtn = document.getElementById("checkout-submit-btn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Memproses...`;

  const nameInput = document.getElementById("cust-name");
  const phoneInput = document.getElementById("cust-phone");
  const addressInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  const orderTotal = getCartTotal();

  const orderItems = cart.map(item => {
    const product = PRODUCTS.find(p => (p._docId || p.id) === item.id);
    return {
      productId: item.id,
      name: product ? product.name : "Produk",
      price: product ? product.price : 0,
      qty: item.qty,
      image: product ? product.image : "",
      category: product ? product.category : ""
    };
  });

  try {
    // Save order to Firestore
    await addDoc(collection(db, "orders"), {
      orderId: orderId,
      customer: {
        name: nameInput ? nameInput.value.trim() : "",
        phone: phoneInput ? phoneInput.value.trim() : "",
        address: addressInput ? addressInput.value.trim() : "",
        notes: notesInput ? notesInput.value.trim() : ""
      },
      items: orderItems,
      total: orderTotal,
      itemCount: cart.reduce((sum, item) => sum + item.qty, 0),
      status: "Pending",
      createdAt: serverTimestamp()
    });

    // Reduce stock for each product in Firestore
    for (const item of cart) {
      const product = PRODUCTS.find(p => (p._docId || p.id) === item.id);
      if (product && product._docId) {
        try {
          await updateDoc(doc(db, "products", product._docId), {
            stock: increment(-item.qty)
          });
        } catch (stockErr) {
          console.warn("Gagal mengurangi stok:", stockErr);
        }
      }
    }

    // Clear cart
    cart = [];
    saveCart();
    renderCartDrawer();

    // Reset checkout form
    document.getElementById("checkout-form")?.reset();
    closeCheckoutModal();

    // Show success modal
    openOrderSuccessModal({ id: orderId, total: orderTotal });
    showToast("Pesanan berhasil dibuat!");

    // Reload products to get updated stock
    await loadProducts();

  } catch (err) {
    console.error("Gagal menyimpan pesanan:", err);
    showToast("Gagal membuat pesanan. Coba lagi.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `${ICONS.check} Pesan Sekarang`;
  }
}

function openOrderSuccessModal(order) {
  const overlay = document.getElementById("order-success-overlay");
  const modal = document.getElementById("order-success-modal");
  const orderIdEl = document.getElementById("success-order-id");
  const orderTotalEl = document.getElementById("success-order-total");
  if (orderIdEl) orderIdEl.textContent = order.id;
  if (orderTotalEl) orderTotalEl.textContent = formatPrice(order.total);
  if (overlay && modal) {
    overlay.classList.add("open");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeOrderSuccessModal() {
  document.getElementById("order-success-overlay")?.classList.remove("open");
  document.getElementById("order-success-modal")?.classList.remove("open");
  document.body.style.overflow = "";
}

// ─── SEARCH ──────────────────────────────────────────

function handleSearch(value) {
  searchQuery = value.trim();
  renderProducts(getFilteredProducts());
}

// ─── NAVBAR ──────────────────────────────────────────

window.toggleSearch = function() {
  const wrapper = document.getElementById("search-wrapper");
  const input = document.getElementById("search-input");
  wrapper.classList.toggle("expanded");
  if (wrapper.classList.contains("expanded")) {
    input.focus();
  } else {
    input.value = "";
    searchQuery = "";
    renderProducts(getFilteredProducts());
  }
};

window.toggleMobileMenu = function() {
  const menu = document.getElementById("mobile-nav");
  const hamburger = document.getElementById("hamburger");
  menu.classList.toggle("open");
  hamburger.classList.toggle("active");
};

// ─── INITIALIZATION ──────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
  renderCategories();
  updateCartCount();
  renderCartDrawer();

  // Load products from Firestore
  await loadProducts();

  // Desktop search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.addEventListener("input", (e) => handleSearch(e.target.value));

  // Mobile search input
  const mobileSearchInput = document.getElementById("mobile-search-input");
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", (e) => {
      handleSearch(e.target.value);
      if (searchInput) searchInput.value = e.target.value;
    });
    if (searchInput) {
      searchInput.addEventListener("input", () => { mobileSearchInput.value = searchInput.value; });
    }
  }

  // Modal close events
  document.getElementById("product-modal-overlay")?.addEventListener("click", closeProductModal);
  document.getElementById("modal-close-btn")?.addEventListener("click", closeProductModal);

  // Cart
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);
  document.querySelectorAll("[data-open-cart]").forEach(btn => btn.addEventListener("click", openCart));
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-checkout-btn")?.addEventListener("click", openCheckoutModal);

  // Checkout modal
  document.getElementById("checkout-modal-overlay")?.addEventListener("click", closeCheckoutModal);
  document.getElementById("checkout-close-btn")?.addEventListener("click", closeCheckoutModal);
  document.getElementById("checkout-cancel-btn")?.addEventListener("click", closeCheckoutModal);
  document.getElementById("checkout-form")?.addEventListener("submit", handleCheckoutSubmit);

  // Success modal
  document.getElementById("order-success-overlay")?.addEventListener("click", closeOrderSuccessModal);
  document.getElementById("btn-success-close")?.addEventListener("click", closeOrderSuccessModal);

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCart();
      closeCheckoutModal();
      closeOrderSuccessModal();
      const mobileNav = document.getElementById("mobile-nav");
      if (mobileNav?.classList.contains("open")) window.toggleMobileMenu();
    }
  });

  // Close mobile menu on nav link click
  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mobile-nav");
      const hamburger = document.getElementById("hamburger");
      if (menu?.classList.contains("open")) { menu.classList.remove("open"); hamburger?.classList.remove("active"); }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // CTA buttons
  document.getElementById("cta-belanja")?.addEventListener("click", () => {
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("cta-lihat")?.addEventListener("click", () => {
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("cta-promo")?.addEventListener("click", () => {
    activeCategory = null;
    document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
    document.querySelectorAll('[data-category="Promo"]').forEach(c => c.classList.add("active"));
    renderProducts(PRODUCTS.filter(p => p.badge === "promo"));
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
  });

  // "Lihat Semua"
  document.getElementById("view-all-products")?.addEventListener("click", (e) => {
    e.preventDefault();
    activeCategory = null;
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    if (mobileSearchInput) mobileSearchInput.value = "";
    document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
    renderProducts(PRODUCTS);
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
  });

  // Intersection observer for active nav
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
          else if (link.getAttribute("href")?.startsWith("#")) link.classList.remove("active");
        });
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px" });
  sections.forEach(section => observer.observe(section));
});
