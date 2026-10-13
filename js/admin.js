/* ============================================
   Kel2Store — Admin Dashboard (Firebase Edition)
   Minimalist & Simple
   ============================================ */

import { db, auth } from "./firebase-config.js";
import {
  collection, doc, updateDoc, deleteDoc, addDoc, serverTimestamp,
  query, orderBy, onSnapshot, writeBatch
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ─── SAMPLE DATA SEEDER ──────────────────────────────
const SAMPLE_PRODUCTS = [
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
    description: "Minuman teh melati asli yang harum dan menyegarkan."
  },
  {
    name: "Chitato Lite Keju",
    category: "Snack",
    price: 12500,
    originalPrice: 14000,
    rating: 4,
    badge: "new",
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&h=600&fit=crop",
    sold: "950",
    stock: 60,
    description: "Keripik kentang tipis renyah dengan taburan bumbu keju pilihan yang gurih."
  },
  {
    name: "Aqua Air Mineral 600ml",
    category: "Minuman",
    price: 3500,
    originalPrice: 4000,
    rating: 5,
    badge: null,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&h=600&fit=crop",
    sold: "3,1rb",
    stock: 150,
    description: "Air mineral pegunungan alami yang murni dan higienis."
  },
  {
    name: "Minyak Goreng Bimoli 1L",
    category: "Kebutuhan Harian",
    price: 21500,
    originalPrice: 24000,
    rating: 5,
    badge: null,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop",
    sold: "620",
    stock: 45,
    description: "Minyak goreng kelapa sawit bermutu tinggi untuk masakan renyah dan sehat."
  },
  {
    name: "Silverqueen Almond 58g",
    category: "Snack",
    price: 16500,
    originalPrice: 18500,
    rating: 5,
    badge: "promo",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=600&fit=crop",
    sold: "1,2rb",
    stock: 50,
    description: "Cokelat susu lezat dengan kacang almond panggang pilihan."
  }
];

// ─── STATE ───────────────────────────────────────────
let products = [];
let orders = [];
let currentDeleteTarget = null; // { type: 'product'|'order', id: docId }

// ─── UTILITY ─────────────────────────────────────────
function formatPrice(price) {
  return "Rp " + Number(price).toLocaleString("id-ID");
}

function formatDate(ts) {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add("hide"); setTimeout(() => toast.remove(), 300); }, 2500);
}

// ─── AUTH GUARD ──────────────────────────────────────
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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      hideLoginModal();
      document.getElementById("admin-user-email").textContent = user.email;
      initDashboard();
    } else {
      showLoginModal();
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = "";
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const btn = loginForm.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Masuk...";
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        loginError.textContent = "Email atau password salah.";
      } else if (err.code === "auth/too-many-requests") {
        loginError.textContent = "Terlalu banyak percobaan. Silakan coba lagi nanti.";
      } else {
        loginError.textContent = "Gagal login: " + err.message;
      }
    } finally {
      btn.disabled = false;
      btn.textContent = "Masuk";
    }
  });

  document.getElementById("btn-logout").addEventListener("click", async () => {
    await signOut(auth);
    showLoginModal();
  });
}

// ─── INIT DASHBOARD ─────────────────────────────────
function initDashboard() {
  // Date badge
  document.getElementById("current-date-text").textContent =
    new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  // Real-time listeners
  listenProducts();
  listenOrders();

  // Product form
  document.getElementById("btn-add-product").addEventListener("click", () => openProductModal());
  document.getElementById("product-form").addEventListener("submit", handleProductSubmit);
  document.getElementById("product-modal-close").addEventListener("click", closeProductModal);
  document.getElementById("product-modal-overlay").addEventListener("click", closeProductModal);

  // Delete confirmation
  document.getElementById("btn-confirm-delete").addEventListener("click", handleConfirmDelete);
  document.getElementById("btn-cancel-delete").addEventListener("click", closeDeleteModal);
  document.getElementById("delete-overlay").addEventListener("click", closeDeleteModal);
}

// ─── REAL-TIME LISTENERS ─────────────────────────────

function listenProducts() {
  const q = query(collection(db, "products"));
  onSnapshot(q, (snap) => {
    products = snap.docs.map(d => ({ _docId: d.id, ...d.data() }));
    renderProductsList();
    updateStats();
  }, (err) => {
    console.error("Gagal mendengar produk:", err);
  });
}

function listenOrders() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snap) => {
    orders = snap.docs.map(d => ({ _docId: d.id, ...d.data() }));
    renderOrdersTable();
    updateStats();
  }, (err) => {
    console.error("Gagal mendengar pesanan:", err);
  });
}

// ─── STATS ───────────────────────────────────────────

function updateStats() {
  // Total Omset (all completed/selesai orders)
  const completedOrders = orders.filter(o => o.status === "Selesai");
  const totalOmset = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  document.getElementById("stat-omset").textContent = formatPrice(totalOmset);

  // Pesanan Baru (Pending)
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  document.getElementById("stat-pending").textContent = pendingCount;
}

// ─── ORDERS TABLE ────────────────────────────────────

function renderOrdersTable() {
  const tbody = document.getElementById("orders-tbody");
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-cell">Belum ada pesanan masuk</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(order => {
    const statusClass = order.status === "Pending" ? "pending" : order.status === "Selesai" ? "selesai" : "other";
    const itemNames = (order.items || []).map(i => `${i.name} ×${i.qty}`).join(", ");
    return `
      <tr>
        <td class="order-id-cell">${order.orderId || order._docId.slice(0, 8)}</td>
        <td>${order.customer?.name || "-"}</td>
        <td class="items-cell" title="${itemNames}">${itemNames || "-"}</td>
        <td class="price-cell">${formatPrice(order.total || 0)}</td>
        <td><span class="status-badge ${statusClass}">${order.status}</span></td>
        <td class="actions-cell">
          <select class="status-select" data-id="${order._docId}" onchange="window._updateOrderStatus(this)">
            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Selesai" ${order.status === "Selesai" ? "selected" : ""}>Selesai</option>
          </select>
          <button class="btn-icon btn-delete" onclick="window._deleteOrder('${order._docId}')" title="Hapus Pesanan">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

window._updateOrderStatus = async function(selectEl) {
  const docId = selectEl.dataset.id;
  const newStatus = selectEl.value;
  try {
    await updateDoc(doc(db, "orders", docId), { status: newStatus });
    showToast(`Status diubah ke "${newStatus}"`);
  } catch (err) {
    console.error(err);
    showToast("Gagal mengubah status", "error");
  }
};

window._deleteOrder = function(docId) {
  currentDeleteTarget = { type: "order", id: docId };
  document.getElementById("delete-modal-title").textContent = "Hapus pesanan ini?";
  openDeleteModal();
};

// ─── PRODUCTS LIST ───────────────────────────────────

function renderProductsList() {
  const list = document.getElementById("products-list");
  if (products.length === 0) {
    list.innerHTML = `
      <div class="empty-products">
        <p style="margin-bottom: 12px;">Belum ada produk di Firestore.</p>
        <button class="btn btn-ghost btn-sm" id="btn-seed-sample">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M18 12h4"/><path d="m19.07 4.93-2.83 2.83"/></svg>
          Muat Produk Contoh (Sample)
        </button>
      </div>
    `;
    const seedBtn = document.getElementById("btn-seed-sample");
    if (seedBtn) {
      seedBtn.addEventListener("click", seedSampleProducts);
    }
    return;
  }

  list.innerHTML = products.map(p => `
    <div class="product-row">
      <img src="${p.image}" alt="${p.name}" class="product-thumb" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23eee%22 width=%22100%22 height=%22100%22/></svg>'">
      <div class="product-row-info">
        <div class="product-row-name">${p.name}</div>
        <div class="product-row-meta">
          <span class="cat-tag">${p.category}</span>
          <span>Stok: ${p.stock ?? 0}</span>
        </div>
      </div>
      <div class="product-row-price">${formatPrice(p.price)}</div>
      <button class="btn-icon btn-delete" onclick="window._deleteProduct('${p._docId}')" title="Hapus Produk">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
    </div>
  `).join("");
}

async function seedSampleProducts() {
  const seedBtn = document.getElementById("btn-seed-sample");
  if (seedBtn) {
    seedBtn.disabled = true;
    seedBtn.textContent = "Memuat...";
  }
  try {
    const batch = writeBatch(db);
    SAMPLE_PRODUCTS.forEach(item => {
      const docRef = doc(collection(db, "products"));
      batch.set(docRef, {
        ...item,
        createdAt: serverTimestamp()
      });
    });
    await batch.commit();
    showToast("Berhasil memuat 6 produk contoh!");
  } catch (err) {
    console.error("Gagal seed sample data:", err);
    showToast("Gagal memuat sample data: " + err.message, "error");
    if (seedBtn) {
      seedBtn.disabled = false;
      seedBtn.textContent = "Muat Produk Contoh (Sample)";
    }
  }
}

window._deleteProduct = function(docId) {
  currentDeleteTarget = { type: "product", id: docId };
  document.getElementById("delete-modal-title").textContent = "Hapus produk ini?";
  openDeleteModal();
};

// ─── PRODUCT MODAL ───────────────────────────────────

function openProductModal() {
  document.getElementById("product-form").reset();
  document.getElementById("product-modal-overlay").classList.add("open");
  document.getElementById("product-modal").classList.add("open");
}

function closeProductModal() {
  document.getElementById("product-modal-overlay").classList.remove("open");
  document.getElementById("product-modal").classList.remove("open");
}

async function handleProductSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Menyimpan...";

  const data = {
    name: document.getElementById("prod-name").value.trim(),
    price: Number(document.getElementById("prod-price").value),
    category: document.getElementById("prod-category").value,
    stock: Number(document.getElementById("prod-stock").value),
    image: document.getElementById("prod-image").value.trim(),
    rating: 5,
    badge: null,
    sold: "0",
    description: "",
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "products"), data);
    showToast("Produk berhasil ditambahkan!");
    closeProductModal();
  } catch (err) {
    console.error(err);
    showToast("Gagal menambahkan produk: " + err.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Simpan Produk";
  }
}

// ─── DELETE CONFIRMATION ─────────────────────────────

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
      showToast("Produk dihapus");
    } else if (type === "order") {
      await deleteDoc(doc(db, "orders", id));
      showToast("Pesanan dihapus");
    }
  } catch (err) {
    console.error(err);
    showToast("Gagal menghapus: " + err.message, "error");
  }
  closeDeleteModal();
}

// ─── BOOTSTRAP ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
});
