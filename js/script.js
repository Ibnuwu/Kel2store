/* ============================================
   Kel2Store — Application Logic
   ============================================ */

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
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
  truck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  tag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  // Category icons
  utensils: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`,
  cookie: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>`,
  shoppingBasket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="m4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>`,
  percent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  store: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  imagePlaceholder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
  cartEmpty: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
};

// ─── PRODUCT DATA ────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Indomie Goreng Original",
    category: "Makanan",
    price: 3500,
    originalPrice: 4000,
    rating: 5,
    badge: "best-seller",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&h=600&fit=crop"
    ],
    sold: "2,5rb",
    stock: 120,
    description: "Indomie Mi Goreng rasa original legendaris dengan perpaduan bumbu rempah khas nusantara, bawang goreng renyah, minyak bumbu gurih, kecap manis, dan cabai bubuk. Praktis dan lezat dinikmati kapan saja.",
    specs: {
      "Berat Bersih": "85 gram",
      "Kondisi": "Baru & Segar",
      "Masa Simpan": "8 Bulan",
      "Sertifikasi": "BPOM & Halal MUI",
      "Penyimpanan": "Simpan di tempat kering dan sejuk"
    },
    reviews: [
      { name: "Budi Santoso", rating: 5, date: "2 hari lalu", comment: "Mi goreng favorit sepanjang masa, packing aman dan pengiriman kilat!", helpful: 14 },
      { name: "Siti Rahma", rating: 5, date: "5 hari lalu", comment: "Barang ori, tanggal kadaluarsa masih panjang banget. Rekomen!", helpful: 8 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop"
    ],
    sold: "1,8rb",
    stock: 85,
    description: "Minuman teh melati siap minum dengan aroma melati asli yang harum dan menyegarkan. Cocok disajikan dingin untuk menemani berbagai santapan harianmu.",
    specs: {
      "Isi Bersih": "450 ml",
      "Kondisi": "Baru",
      "Kemasan": "Botol PET",
      "Sertifikasi": "BPOM & Halal MUI",
      "Penyimpanan": "Hindari sinar matahari langsung, sajikan dingin lebih nikmat"
    },
    reviews: [
      { name: "Ahmad Fauzi", rating: 4, date: "1 minggu lalu", comment: "Segar banget diminum siang hari saat terik!", helpful: 6 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=600&fit=crop"
    ],
    sold: "950",
    stock: 60,
    description: "Keripik kentang tipis renyah dengan taburan bumbu keju pilihan yang gurih dan creamy. Camilan asyik buat nonton film atau santai bareng teman.",
    specs: {
      "Berat Bersih": "68 gram",
      "Kondisi": "Baru",
      "Rasa": "Keju Panggang Gurih",
      "Sertifikasi": "BPOM & Halal MUI",
      "Masa Simpan": "6 Bulan"
    },
    reviews: [
      { name: "Dina Permata", rating: 5, date: "3 hari lalu", comment: "Kejunya berasa banget, keripiknya renyah dan gak keras.", helpful: 5 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=600&fit=crop"
    ],
    sold: "3,1rb",
    stock: 40,
    description: "Beras kualitas super dengan butiran putih bersih, pulen, dan wangi alami tanpa pemutih atau pengawet. Pilihan tepat untuk nasi keluarga yang lezat.",
    specs: {
      "Berat Bersih": "5 kg",
      "Jenis": "Setra Ramos / Pandan Wangi",
      "Kondisi": "Baru & Higienis",
      "Sertifikasi": "Kementan RI",
      "Kemasan": "Karung tebal laminasi"
    },
    reviews: [
      { name: "Ibu Hartati", rating: 5, date: "Kemarin", comment: "Nasinya pulen banget, bersih tanpa kutu. Selalu langganan beli beras di sini.", helpful: 18 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=600&fit=crop"
    ],
    sold: "4,2rb",
    stock: 95,
    description: "Kopi bubuk murni terbuat dari biji kopi pilihan nusantara dengan aroma khas mantap dan cita rasa kopi hitam yang pekat nan menggugah semangat.",
    specs: {
      "Berat Bersih": "165 gram",
      "Bentuk": "Kopi Bubuk Halus",
      "Sertifikasi": "BPOM & Halal MUI",
      "Masa Simpan": "12 Bulan"
    },
    reviews: [
      { name: "Hendri Kurnia", rating: 5, date: "4 hari lalu", comment: "Aroma kopinya mantap, pas buat nemenin kerja pagi hari.", helpful: 11 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop"
    ],
    sold: "1,2rb",
    stock: 70,
    description: "Biskuit sandwich cokelat renyah dengan krim vanila lembut yang manis dan nikmat. Diputar, dijilat, dicelupin ke susu hangat!",
    specs: {
      "Berat Bersih": "133 gram",
      "Rasa": "Vanilla Cream",
      "Sertifikasi": "BPOM & Halal MUI",
      "Masa Simpan": "10 Bulan"
    },
    reviews: [
      { name: "Maya Safitri", rating: 4, date: "1 minggu lalu", comment: "Anak-anak suka sekali, harganya promo murah meriah.", helpful: 4 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop"
    ],
    sold: "2,1rb",
    stock: 50,
    description: "Minyak goreng kelapa sawit berkualitas yang diproses secara higienis, jernih, dan tidak mudah menghitam untuk menghasilkan gorengan renyah sempurna.",
    specs: {
      "Isi Bersih": "2 Liter",
      "Kemasan": "Pouch Refill",
      "Sertifikasi": "BPOM & SNI",
      "Kaya Akan": "Vitamin E & Omega 9"
    },
    reviews: [
      { name: "Rina Wulandari", rating: 5, date: "6 hari lalu", comment: "Minyak jernih, goreng ayam jadi crispy dan cantik warnanya.", helpful: 9 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop"
    ],
    sold: "1,5rb",
    stock: 65,
    description: "Susu sapi segar alami diproses dengan teknologi UHT (Ultra High Temperature) higienis tanpa bahan pengawet. Kaya kalsium dan nutrisi harian keluarga.",
    specs: {
      "Isi Bersih": "1000 ml (1 Liter)",
      "Varian": "Full Cream / Plain",
      "Kemasan": "Tetra Pak aseptic",
      "Sertifikasi": "BPOM & Halal MUI"
    },
    reviews: [
      { name: "Kevin Pratama", rating: 5, date: "3 hari lalu", comment: "Rasanya creamy gurih pas buat bikin kopi susu latte di rumah!", helpful: 12 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&h=600&fit=crop"
    ],
    sold: "890",
    stock: 45,
    description: "Ikan sarden segar pilihan dalam saus tomat cabai pedas nikmat yang kaya rasa dan tinggi Omega 3 & 6. Praktis tinggal dihangatkan.",
    specs: {
      "Berat Bersih": "425 gram",
      "Rasa": "Extra Pedas Gurih",
      "Kemasan": "Kaleng Easy Open",
      "Sertifikasi": "BPOM & Halal MUI"
    },
    reviews: [
      { name: "Eko Prasetyo", rating: 4, date: "1 minggu lalu", comment: "Ikannya padat bumbunya meresap pedas sedap.", helpful: 3 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&h=600&fit=crop"
    ],
    sold: "1,7rb",
    stock: 110,
    description: "Sabun mandi batang antibakterial dengan perlindungan menyeluruh terhadap 10 jenis kuman penyebab masalah kesehatan, wangi segar tahan lama.",
    specs: {
      "Berat Bersih": "110 gram",
      "Kondisi": "Baru Segel",
      "Fitur": "Active Silver+ Formula",
      "Sertifikasi": "BPOM RI"
    },
    reviews: [
      { name: "Nurul Aini", rating: 4, date: "5 hari lalu", comment: "Busa melimpah, badan terasa bersih dan segar setelah mandi.", helpful: 5 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=600&fit=crop"
    ],
    sold: "2,3rb",
    stock: 75,
    description: "Wafer renyah dengan krim keju asli yang melimpah dan gurih. Mengandung vitamin A, B1, B2, B6, dan B12.",
    specs: {
      "Berat Bersih": "145 gram",
      "Varian": "Cheese Wafer",
      "Sertifikasi": "BPOM & Halal MUI",
      "Masa Simpan": "9 Bulan"
    },
    reviews: [
      { name: "Dewi Lestari", rating: 5, date: "4 hari lalu", comment: "Snack andalan keluarga kalau lagi kumpul, kejunya nagih.", helpful: 7 }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=600&fit=crop"
    ],
    sold: "760",
    stock: 55,
    description: "Bumbu nasi goreng instan siap saji lengkap dengan topping sayur dan daging kering. Cepat, nikmat, dan pas untuk santapan darurat.",
    specs: {
      "Berat Bersih": "75 gram",
      "Rasa": "Nasi Goreng Spesial Pedas",
      "Sertifikasi": "BPOM & Halal MUI"
    },
    reviews: [
      { name: "Rizky Pratama", rating: 4, date: "1 minggu lalu", comment: "Masak nasi goreng jadi gampang banget dan rasanya pas di lidah.", helpful: 2 }
    ]
  }
];

const CATEGORIES = [
  { name: "Makanan", icon: "utensils" },
  { name: "Minuman", icon: "coffee" },
  { name: "Snack", icon: "cookie" },
  { name: "Kebutuhan Harian", icon: "shoppingBasket" },
  { name: "Promo", icon: "percent" },
  { name: "Lainnya", icon: "grid" }
];

// ─── STATE ───────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem("kel2store_cart") || "[]");
let activeCategory = null;
let searchQuery = "";
let currentModalProductId = null;
let modalQuantity = 1;
let selectedRating = 5;

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

function imgFallback(el) {
  const wrapper = el.parentElement;
  el.remove();
  const placeholder = document.createElement("div");
  placeholder.className = "img-placeholder";
  placeholder.innerHTML = ICONS.imagePlaceholder;
  wrapper.appendChild(placeholder);
}

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

// ─── LOCAL STORAGE REVIEWS ───────────────────────────
function getProductReviews(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return [];
  const localReviews = JSON.parse(localStorage.getItem(`kel2store_reviews_${productId}`) || "[]");
  return [...localReviews, ...(product.reviews || [])];
}

function addProductReview(productId, reviewObj) {
  const localReviews = JSON.parse(localStorage.getItem(`kel2store_reviews_${productId}`) || "[]");
  localReviews.unshift(reviewObj);
  localStorage.setItem(`kel2store_reviews_${productId}`, JSON.stringify(localReviews));
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
    const allReviews = getProductReviews(product.id);
    const avgRating = allReviews.length > 0 
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
      : product.rating.toFixed(1);

    return `
      <div class="product-card" data-product-id="${product.id}" tabindex="0" role="button" aria-label="Lihat detail ${product.name}">
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
            ${renderStars(Math.round(parseFloat(avgRating)))}
            <span>${avgRating} (${allReviews.length || 1})</span>
          </div>
          <div class="product-bottom">
            <div class="price-container">
              <span class="product-price">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ""}
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Tambah ${product.name} ke keranjang">
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
      // Don't open modal if clicked directly on add-to-cart-btn
      if (e.target.closest(".add-to-cart-btn")) return;
      const id = parseInt(card.dataset.productId);
      openProductModal(id);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (!e.target.closest(".add-to-cart-btn")) {
          e.preventDefault();
          const id = parseInt(card.dataset.productId);
          openProductModal(id);
        }
      }
    });
  });

  // Add to cart buttons
  grid.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
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
  const topProducts = [PRODUCTS[0], PRODUCTS[4], PRODUCTS[3], PRODUCTS[10]];

  grid.innerHTML = topProducts.map((product, index) => `
    <div class="top-seller-card" data-product-id="${product.id}" role="button" tabindex="0" aria-label="Lihat detail ${product.name}">
      <div class="top-rank">#${index + 1}</div>
      <div class="top-seller-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="imgFallback(this)">
      </div>
      <div class="top-seller-info">
        <h3 class="top-seller-name">${product.name}</h3>
        <div class="top-seller-meta">
          <span class="top-seller-price">${formatPrice(product.price)}</span>
          <span class="top-seller-sold">${ICONS.flame} Terjual ${product.sold}</span>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".top-seller-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.productId);
      openProductModal(id);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const id = parseInt(card.dataset.productId);
        openProductModal(id);
      }
    });
  });
}

// ─── PRODUCT MODAL & REVIEWS ─────────────────────────

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;
  modalQuantity = 1;
  selectedRating = 5;

  renderProductModalContent(product);

  const overlay = document.getElementById("product-modal-overlay");
  const modal = document.getElementById("product-modal");

  overlay.classList.add("open");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const overlay = document.getElementById("product-modal-overlay");
  const modal = document.getElementById("product-modal");

  overlay.classList.remove("open");
  modal.classList.remove("open");
  document.body.style.overflow = "";
  currentModalProductId = null;
}

function renderProductModalContent(product) {
  const modalBody = document.getElementById("modal-body");
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const reviews = getProductReviews(product.id);
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating.toFixed(1);

  // Calculate rating breakdown
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (ratingCounts[r.rating] !== undefined) ratingCounts[r.rating]++;
  });

  const specsHtml = product.specs ? Object.entries(product.specs).map(([key, value]) => `
    <div class="spec-row">
      <span class="spec-label">${key}</span>
      <span class="spec-val">${value}</span>
    </div>
  `).join("") : `<p class="text-muted">Tidak ada spesifikasi khusus.</p>`;

  const reviewsHtml = reviews.length > 0 ? reviews.map(r => `
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer-avatar">${r.name.charAt(0).toUpperCase()}</div>
        <div class="reviewer-meta">
          <span class="reviewer-name">${r.name}</span>
          <div class="reviewer-rating">
            ${renderStars(r.rating)}
            <span class="review-date">${r.date}</span>
          </div>
        </div>
      </div>
      <p class="review-text">${r.comment}</p>
    </div>
  `).join("") : `<div class="empty-reviews"><p>Belum ada ulasan untuk produk ini. Jadilah yang pertama memberikan ulasan!</p></div>`;

  modalBody.innerHTML = `
    <div class="modal-product-grid">
      <!-- Image Gallery Column -->
      <div class="modal-gallery-col">
        <div class="modal-main-img-wrapper">
          <img id="modal-main-image" src="${gallery[0]}" alt="${product.name}" onerror="imgFallback(this)">
          ${product.badge ? `<span class="product-badge ${product.badge}">${getBadgeLabel(product.badge)}</span>` : ""}
        </div>
        ${gallery.length > 1 ? `
          <div class="modal-thumbnails">
            ${gallery.map((img, idx) => `
              <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-src="${img}" aria-label="Foto produk ${idx + 1}">
                <img src="${img}" alt="${product.name} thumb ${idx + 1}">
              </button>
            `).join("")}
          </div>
        ` : ""}
      </div>

      <!-- Info & Actions Column -->
      <div class="modal-info-col">
        <div class="modal-header-info">
          <span class="modal-category">${product.category}</span>
          <h1 class="modal-product-title">${product.name}</h1>
          
          <div class="modal-rating-row">
            <div class="stars-wrap">${renderStars(Math.round(parseFloat(avgRating)))}</div>
            <span class="rating-num">${avgRating}</span>
            <span class="rating-dot">•</span>
            <span class="sold-count">Terjual ${product.sold}</span>
            <span class="rating-dot">•</span>
            <span class="stock-tag">Stok: <strong>${product.stock || 50}</strong></span>
          </div>

          <div class="modal-price-box">
            <span class="modal-price">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `
              <span class="modal-original-price">${formatPrice(product.originalPrice)}</span>
              <span class="discount-pill">Hemat ${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
            ` : ""}
          </div>
        </div>

        <!-- Quantity & CTA Actions -->
        <div class="modal-purchase-section">
          <div class="modal-qty-control">
            <span class="qty-label">Jumlah:</span>
            <div class="modal-qty-box">
              <button class="qty-btn" id="modal-qty-minus" aria-label="Kurangi jumlah">${ICONS.minus}</button>
              <input type="number" id="modal-qty-input" value="1" min="1" max="${product.stock || 99}" aria-label="Jumlah pesanan">
              <button class="qty-btn" id="modal-qty-plus" aria-label="Tambah jumlah">${ICONS.plus}</button>
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

        <!-- Tabs Section -->
        <div class="modal-tabs-wrapper">
          <div class="modal-tabs" role="tablist">
            <button class="tab-btn active" data-tab="tab-desc" role="tab" aria-selected="true">Deskripsi</button>
            <button class="tab-btn" data-tab="tab-specs" role="tab" aria-selected="false">Spesifikasi</button>
            <button class="tab-btn" data-tab="tab-reviews" role="tab" aria-selected="false">Ulasan (${reviews.length})</button>
          </div>

          <div class="tab-content active" id="tab-desc" role="tabpanel">
            <p class="modal-description-text">${product.description || "Produk berkualitas tinggi siap memenuhi kebutuhan belanja harian Anda."}</p>
          </div>

          <div class="tab-content" id="tab-specs" role="tabpanel">
            <div class="specs-table">
              ${specsHtml}
            </div>
          </div>

          <div class="tab-content" id="tab-reviews" role="tabpanel">
            <div class="reviews-summary-card">
              <div class="review-score-big">
                <span class="score-large">${avgRating}</span>
                <div class="stars-wrap">${renderStars(Math.round(parseFloat(avgRating)))}</div>
                <span class="total-reviews">${reviews.length} ulasan dari pembeli</span>
              </div>
            </div>

            <!-- Review submission form -->
            <div class="add-review-card">
              <h4>Tulis Ulasan Kamu</h4>
              <form id="review-form">
                <div class="form-group rating-select-group">
                  <label>Rating:</label>
                  <div class="star-rating-picker" id="star-rating-picker">
                    <button type="button" class="star-pick active" data-val="1" aria-label="1 Bintang">${ICONS.star}</button>
                    <button type="button" class="star-pick active" data-val="2" aria-label="2 Bintang">${ICONS.star}</button>
                    <button type="button" class="star-pick active" data-val="3" aria-label="3 Bintang">${ICONS.star}</button>
                    <button type="button" class="star-pick active" data-val="4" aria-label="4 Bintang">${ICONS.star}</button>
                    <button type="button" class="star-pick active" data-val="5" aria-label="5 Bintang">${ICONS.star}</button>
                  </div>
                </div>
                <div class="form-group">
                  <input type="text" id="review-user-name" placeholder="Nama kamu..." required>
                </div>
                <div class="form-group">
                  <textarea id="review-user-comment" rows="3" placeholder="Ceritakan pengalaman belanja produk ini..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-submit-review">Kirim Ulasan</button>
              </form>
            </div>

            <div class="reviews-list">
              ${reviewsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // --- Attach Modal Event Listeners ---
  
  // Thumbnail switching
  modalBody.querySelectorAll(".thumb-btn").forEach(thumb => {
    thumb.addEventListener("click", () => {
      modalBody.querySelectorAll(".thumb-btn").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const mainImg = document.getElementById("modal-main-image");
      if (mainImg) {
        mainImg.src = thumb.dataset.src;
      }
    });
  });

  // Quantity control
  const qtyInput = document.getElementById("modal-qty-input");
  const minusBtn = document.getElementById("modal-qty-minus");
  const plusBtn = document.getElementById("modal-qty-plus");

  minusBtn.addEventListener("click", () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val > 1) {
      val--;
      qtyInput.value = val;
      modalQuantity = val;
    }
  });

  plusBtn.addEventListener("click", () => {
    let val = parseInt(qtyInput.value) || 1;
    const max = product.stock || 99;
    if (val < max) {
      val++;
      qtyInput.value = val;
      modalQuantity = val;
    }
  });

  qtyInput.addEventListener("change", () => {
    let val = parseInt(qtyInput.value) || 1;
    const max = product.stock || 99;
    if (val < 1) val = 1;
    if (val > max) val = max;
    qtyInput.value = val;
    modalQuantity = val;
  });

  // Add to Cart button in Modal
  document.getElementById("modal-add-to-cart").addEventListener("click", () => {
    addToCart(product.id, modalQuantity);
    const btn = document.getElementById("modal-add-to-cart");
    btn.classList.add("added");
    btn.innerHTML = `${ICONS.check}<span>Ditambahkan (${modalQuantity})</span>`;
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = `${ICONS.cart}<span>Tambah ke Keranjang</span>`;
    }, 1500);
  });

  // Buy Now button in Modal
  document.getElementById("modal-buy-now").addEventListener("click", () => {
    addToCart(product.id, modalQuantity);
    closeProductModal();
    openCart();
  });

  // Tabs switching
  modalBody.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      modalBody.querySelectorAll(".tab-btn").forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      modalBody.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const targetContent = document.getElementById(tab.dataset.tab);
      if (targetContent) targetContent.classList.add("active");
    });
  });

  // Star Rating Selector for Review form
  const starPicks = modalBody.querySelectorAll(".star-pick");
  starPicks.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.val);
      starPicks.forEach(s => {
        const val = parseInt(s.dataset.val);
        s.classList.toggle("active", val <= selectedRating);
      });
    });
  });

  // Review Form Submit
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("review-user-name");
      const commentInput = document.getElementById("review-user-comment");

      const newReview = {
        name: nameInput.value.trim() || "Pembeli Anonim",
        rating: selectedRating,
        date: "Baru saja",
        comment: commentInput.value.trim(),
        helpful: 0
      };

      addProductReview(product.id, newReview);
      showToast("Ulasan berhasil dikirim!");
      
      // Re-render modal content & products grid
      renderProductModalContent(product);
      renderProducts(getFilteredProducts());

      // Switch back to reviews tab
      setTimeout(() => {
        const reviewTabBtn = document.querySelector('.tab-btn[data-tab="tab-reviews"]');
        if (reviewTabBtn) reviewTabBtn.click();
      }, 50);
    });
  }
}

// ─── CART FUNCTIONS ──────────────────────────────────

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ id: product.id, qty: quantity });
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

function updateQty(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCartDrawer();
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        ${ICONS.cartEmpty}
        <h3>Keranjang Kosong</h3>
        <p>Belum ada produk di keranjang kamu.</p>
      </div>
    `;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";

  body.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return "";
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${product.image}" alt="${product.name}" onerror="imgFallback(this)">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${formatPrice(product.price)}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty(${product.id}, -1)" aria-label="Kurangi jumlah">${ICONS.minus}</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${product.id}, 1)" aria-label="Tambah jumlah">${ICONS.plus}</button>
            <button class="cart-item-remove" onclick="removeFromCart(${product.id})" aria-label="Hapus dari keranjang">${ICONS.trash}</button>
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

function checkoutWhatsApp() {
  if (cart.length === 0) return;

  let message = "Halo Kel2Store! Saya ingin memesan:\n\n";
  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) {
      message += `• ${product.name} x${item.qty} = ${formatPrice(product.price * item.qty)}\n`;
    }
  });
  message += `\n*Total: ${formatPrice(getCartTotal())}*\n\nTerima kasih!`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/6285135437356?text=${encoded}`, "_blank");
}

// ─── SEARCH ──────────────────────────────────────────

function handleSearch(value) {
  searchQuery = value.trim();
  renderProducts(getFilteredProducts());
}

// ─── NAVBAR ──────────────────────────────────────────

function toggleSearch() {
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
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-nav");
  const hamburger = document.getElementById("hamburger");
  menu.classList.toggle("open");
  hamburger.classList.toggle("active");
}

// ─── INITIALIZATION ──────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // Render dynamic content
  renderCategories();
  renderProducts(PRODUCTS);
  renderTopSellers();
  updateCartCount();
  renderCartDrawer();

  // Desktop search input
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => handleSearch(e.target.value));

  // Mobile search input
  const mobileSearchInput = document.getElementById("mobile-search-input");
  mobileSearchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
    searchInput.value = e.target.value;
  });

  // Sync desktop → mobile
  searchInput.addEventListener("input", () => {
    mobileSearchInput.value = searchInput.value;
  });

  // Modal close events
  const modalOverlay = document.getElementById("product-modal-overlay");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  if (modalOverlay) modalOverlay.addEventListener("click", closeProductModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProductModal);

  // Cart overlay click
  document.getElementById("cart-overlay").addEventListener("click", closeCart);

  // Cart buttons
  document.querySelectorAll("[data-open-cart]").forEach(btn => {
    btn.addEventListener("click", openCart);
  });

  document.getElementById("cart-close").addEventListener("click", closeCart);

  // WhatsApp checkout
  document.getElementById("checkout-wa").addEventListener("click", checkoutWhatsApp);

  // Keyboard: Escape closes modal & cart drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCart();
      const mobileNav = document.getElementById("mobile-nav");
      if (mobileNav.classList.contains("open")) {
        toggleMobileMenu();
      }
    }
  });

  // Close mobile menu on nav link click
  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mobile-nav");
      const hamburger = document.getElementById("hamburger");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        hamburger.classList.remove("active");
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // CTA buttons
  document.getElementById("cta-belanja").addEventListener("click", () => {
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("cta-lihat").addEventListener("click", () => {
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("cta-promo").addEventListener("click", () => {
    activeCategory = null;
    document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
    const promoCards = document.querySelectorAll('[data-category="Promo"]');
    promoCards.forEach(c => c.classList.add("active"));
    renderProducts(PRODUCTS.filter(p => p.badge === "promo"));
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  });

  // "Lihat Semua" link
  document.getElementById("view-all-products").addEventListener("click", (e) => {
    e.preventDefault();
    activeCategory = null;
    searchQuery = "";
    searchInput.value = "";
    mobileSearchInput.value = "";
    document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
    renderProducts(PRODUCTS);
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");

  const observerOptions = {
    rootMargin: "-30% 0px -70% 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});

