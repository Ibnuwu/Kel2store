# Kel2Store — E-Commerce & Admin Dashboard

Kel2Store adalah aplikasi toko online modern dan responsif dengan katalog produk, sistem keranjang belanja, formulir checkout pesanan lokal, serta **Admin Dashboard** terpadu untuk manajemen transaksi dan produk secara real-time.

---

## 📁 Struktur Proyek

```text
kel2store/
├── index.html          # Halaman Utama (Katalog Produk & Keranjang Belanja)
├── admin.html          # Panel Admin Dashboard (Overview, Pesanan & Produk)
├── css/
│   ├── style.css       # Styling Landing Page & Modal Checkout
│   └── admin.css       # Styling Admin Dashboard (Sidebar, Tabel & Modal)
├── js/
│   ├── script.js       # Logika Landing Page, Keranjang, dan Checkout
│   └── admin.js        # Logika CRUD Produk, Manajemen Pesanan & Sinkronisasi
└── README.md           # Dokumentasi Proyek
```

---

## ✨ Fitur Utama

### 🛒 1. Landing Page (`index.html`)
- **Desain Modern & Responsif**: Menggunakan color palette hijau natural (`#2F9E6B`), Google Font *Plus Jakarta Sans*, dan kartu produk berestetika tinggi.
- **Katalog & Filter Kategori**: Jelajahi produk berdasarkan kategori (Makanan, Minuman, Snack, Kebutuhan Harian, Promo, dll.) serta fitur pencarian live.
- **Modal Detail Produk & Ulasan**: Pratinjau foto resolusi tinggi, spesifikasi, dan sistem rating/ulasan pembeli.
- **Keranjang Belanja**: Tambah/kurang kuantitas, hitung subtotal otomatis, dan simpan data di `localStorage` (`kel2store_cart`).
- **Checkout Modal Form**: Menggantikan tautan WhatsApp manual dengan formulir pemesanan lengkap (Nama, No HP, Alamat, Catatan).
- **Penyimpanan Pesanan Otomatis**: Pesanan yang dibuat otomatis tersimpan ke `localStorage` (`kel2store_orders`) dengan status awal **"Pending"** dan ID unik (contoh: `ORD-XXXXXX`).

### ⚙️ 2. Admin Dashboard (`admin.html`)
- **Sidebar Navigasi Responsif**: Tampilan sidebar rapi dengan dukungan menu collapsible di perangkat mobile/tablet.
- **Tab Overview (Ringkasan Statistik)**:
  - Total Penjualan (Rp)
  - Jumlah Pesanan Baru (Pending)
  - Total Produk Toko Aktif
  - Tingkat Penyelesaian Pesanan (%)
  - Tabel 5 pesanan terbaru & peringatan stok rendah
- **Tab Daftar Pesanan**:
  - Tabel interaktif daftar pesanan pembeli dari `localStorage`.
  - Filter berdasarkan status (*Pending*, *Diproses*, *Selesai*, *Dibatalkan*) dan pencarian live.
  - Ubah status pesanan secara langsung atau melalui Modal Detail Pesanan lengkap.
  - Hapus pesanan dengan konfirmasi keamanan.
  - Fitur *"Generate Contoh Pesanan"* untuk mempermudah pengujian.
- **Tab Kelola Produk (CRUD)**:
  - **Create**: Tambah produk baru dengan modal interaktif (Nama, Kategori, Harga, Harga Diskon, Stok, Badge Promo, URL Gambar, Deskripsi).
  - **Read**: Tampilan katalog tabel dengan filter kategori & stok.
  - **Update**: Edit informasi produk kapan saja; perubahan langsung tercermin di etalase toko pelanggan (`index.html`).
  - **Delete**: Hapus produk dari etalase dengan modal konfirmasi.
  - **Reset**: Tombol untuk mengembalikan 12 data produk default jika diperlukan.

---

## 🚀 Cara Menjalankan

Aplikasi ini menggunakan HTML, Vanilla CSS, dan JavaScript murni tanpa ketergantungan server:
1. Buka file `index.html` di browser untuk mengakses toko sebagai pelanggan.
2. Buka file `admin.html` (atau klik tombol **Admin** di navigasi toko) untuk masuk ke panel dashboard pengelola toko.
3. Kedua halaman otomatis tersinkronisasi melalui `localStorage` dan event listener storage browser.