# 🌏 Kampung Kwau - Website Multi-Bahasa

Website resmi Kampung Kwau dengan fitur multi-bahasa (Indonesia & Inggris) yang menampilkan potensi lokal, budaya, dan destinasi wisata di Kampung Kwau, Distrik Mokwam, Kabupaten Manokwari, Papua Barat.

## ✨ Fitur Utama

### 🌍 Multi-Bahasa
- **Bahasa Indonesia** (default)
- **Bahasa Inggris**
- Language switcher yang mudah digunakan
- Persistensi pilihan bahasa
- Auto-detection bahasa browser

### 🏞️ Potensi Lokal
- **Pohon Pisang Hutan Raksasa** (Musa Ingens W.Simmonds)
- **Birds Watching** - Burung Endemik Papua
- **Keanekaragaman Kupu-Kupu**
- **Air Terjun** - Destinasi alam
- **Macam-macam Tanaman Anggrek**
- **Tari Tumbu Tanah** - Warisan budaya suku Arfak
- **Rumah Kaki Seribu** - Arsitektur tradisional

### 📱 Responsive Design
- Mobile-friendly
- Bootstrap 5
- Modern UI/UX
- Progressive Web App (PWA)

### 🔧 Teknologi
- **Frontend**: React.js
- **Styling**: Bootstrap 5, CSS3
- **Internationalization**: i18next
- **Icons**: Font Awesome
- **Routing**: React Router
- **Forms**: React Hook Form

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (versi 14 atau lebih baru)
- npm atau yarn

### Installation
```bash
# Clone repository
git clone https://github.com/USERNAME/kampung-kwau-multilang.git

# Masuk ke direktori
cd kampung-kwau-multilang

# Install dependencies
npm install

# Jalankan development server
npm start
```

### Build untuk Production
```bash
# Build project
npm run build

# Preview build
npm run preview
```

## 📁 Struktur Project

```
src/
├── components/
│   ├── common/          # Komponen umum (Header, Footer, dll.)
│   ├── home/           # Komponen halaman utama
│   └── data/           # Data statis
├── translations/       # File terjemahan
│   ├── id/            # Bahasa Indonesia
│   └── en/            # Bahasa Inggris
├── pages/             # Halaman-halaman
├── css/               # File CSS
└── i18n.js           # Konfigurasi i18next
```

## 🌐 Fitur Multi-Bahasa

### Language Switcher
- Tombol 🇮🇩 ID dan 🇺🇸 EN di header
- Switch bahasa secara real-time
- Persistensi pilihan di localStorage

### Konten yang Diterjemahkan
- Navigation menu
- Hero section
- Services/potensi lokal
- Modal detail untuk setiap potensi
- Footer
- Team section

### File Terjemahan
- `common.json` - Konten umum
- `home.json` - Konten halaman utama
- `modal.json` - Konten detail modal

## 🎨 Komponen Utama

### Header
- Navigation menu dengan dropdown
- Language switcher
- Social media icons

### Hero Section
- Welcome message
- Deskripsi kampung
- Call-to-action buttons

### Services Section
- Grid potensi lokal
- Modal detail untuk setiap item
- Informasi lengkap dengan gambar

### Footer
- Informasi kontak
- Social media links
- Menu company dan services

## 📱 Responsive Features

- Mobile-first design
- Tablet-friendly layout
- Desktop optimization
- Touch-friendly interactions

## 🔧 Development

### Scripts Available
```bash
npm start          # Development server
npm run build      # Build production
npm run preview    # Preview build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Environment Variables
Buat file `.env.local` untuk konfigurasi lokal:
```env
REACT_APP_API_URL=your_api_url
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_key
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Website**: [Kampung Kwau](https://kampung-kwau.com)
- **Email**: info@kampung-kwau.com
- **Phone**: +62 823-3333

## 🙏 Acknowledgments

- Masyarakat Kampung Kwau
- Suku Arfak
- Pemerintah Distrik Mokwam
- Tim pengembang website

---

**Dibuat dengan ❤️ untuk Kampung Kwau**
