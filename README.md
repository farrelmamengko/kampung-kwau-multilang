# 🌏 Kampung Kwau - Booking System

Sistem booking wisata lengkap untuk Kampung Kwau dengan integrasi database SQLite, backend API, dan frontend React.js yang menangani reservasi paket wisata, email konfirmasi, dan manajemen data pelanggan.

## ✨ Fitur Utama

### 🎯 **Booking System**
- **Multi-step booking form** - 5 langkah reservasi
- **Package selection** - Basic, Standard, Premium packages
- **Dynamic pricing** - Kalkulasi harga otomatis
- **Date management** - Check-in/check-out dates
- **Guest counter** - Adults & children management
- **Additional activities** - Optional tour activities
- **Personal information** - Customer data collection
- **Booking confirmation** - Review sebelum submit

### 🗄️ **Database Integration**
- **SQLite database** - Local data storage
- **Customer management** - Data pelanggan
- **Package catalog** - Paket wisata
- **Booking records** - Riwayat reservasi
- **Status tracking** - Pending, confirmed, completed
- **Transaction history** - Audit trail lengkap

### 📧 **Email System**
- **EmailJS integration** - Konfirmasi booking
- **Template emails** - Professional templates
- **Customer notifications** - Booking confirmations
- **Admin alerts** - New booking notifications

### 🔌 **API Integration**
- **RESTful API** - Backend communication
- **JSON data exchange** - Standardized format
- **Error handling** - Comprehensive error management
- **Response validation** - Data integrity

### 🌍 **Multi-Language Support**
- **Bahasa Indonesia** (default)
- **Bahasa Inggris**
- **Language switcher** - Real-time switching
- **Persistent settings** - localStorage

## 🏗️ **Tech Stack**

### **Frontend**
- **React.js** - UI framework
- **Bootstrap 5** - CSS framework
- **React Hook Form** - Form handling
- **EmailJS** - Email service
- **Vite** - Build tool

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database (better-sqlite3)
- **CORS** - Cross-origin support

### **Database**
- **SQLite** - Local database
- **better-sqlite3** - Node.js driver
- **Foreign keys** - Data relationships
- **Indexes** - Performance optimization

## 🚀 **Quick Start**

### **Prerequisites**
```bash
# Node.js (v16+)
node --version

# npm
npm --version
```

### **Installation & Setup**
```bash
# 1. Clone repository
git clone <repository-url>
cd kwau

# 2. Backend Setup
cd backend
npm install
node create-database.js
node server.js

# 3. Frontend Setup (new terminal)
cd ..
npm install
npm run dev
```

### **Access Points**
```bash
# Frontend (React)
http://localhost:5173

# Backend API
http://localhost:5000

# Health Check
http://localhost:5000/health

# Database
backend/database/kwau_booking.db
```

## 📁 **Project Structure**

```
kwau/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API & email services
│   ├── translations/      # i18n files
│   └── css/              # Stylesheets
├── backend/               # Backend server
│   ├── server.js         # Express server
│   ├── create-database.js # Database setup
│   └── database/         # SQLite database
├── actions/              # Documentation
│   ├── README.md         # Documentation hub
│   ├── DATABASE_DOCUMENTATION.md
│   ├── BACKEND_DOCUMENTATION.md
│   └── FRONTEND_DOCUMENTATION.md
└── public/               # Static assets
```

## 🎯 **Key Features**

### **Booking Process**
1. **Package Selection** - Pilih paket wisata
2. **Date & Guests** - Tanggal dan jumlah tamu
3. **Activities** - Aktivitas tambahan (opsional)
4. **Personal Info** - Data pelanggan
5. **Confirmation** - Review dan submit
6. **Database Save** - Simpan ke SQLite
7. **Email Send** - Kirim konfirmasi

### **Database Schema**
- **packages** - Paket wisata
- **customers** - Data pelanggan
- **bookings** - Data reservasi

### **API Endpoints**
- `GET /health` - Health check
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings

## 🔧 **Configuration**

### **Environment Variables**
```env
# Backend
PORT=5000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### **Database Setup**
```bash
# Create database
cd backend
node create-database.js

# View database
sqlite3 database/kwau_booking.db
.tables
.schema packages
```

## 📊 **System Flow**

```
User Input (Frontend)
    ↓
React Form Validation
    ↓
API Request (Frontend → Backend)
    ↓
Database Operations (SQLite)
    ↓
Email Notification (EmailJS)
    ↓
Success Response
```

## 🛠️ **Development**

### **Available Scripts**
```bash
# Frontend
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build

# Backend
cd backend
node server.js       # Start server
node create-database.js # Setup database
```

### **Testing**
```bash
# Test booking flow
1. Start backend server
2. Start frontend dev server
3. Navigate to booking page
4. Complete booking form
5. Check database for new record
6. Verify email received
```

## 📚 **Documentation**

### **Complete Documentation**
- 📚 [Documentation Hub](./actions/README.md)
- 🗄️ [Database Guide](./actions/DATABASE_DOCUMENTATION.md)
- ⚙️ [Backend API](./actions/BACKEND_DOCUMENTATION.md)
- 🎨 [Frontend Guide](./actions/FRONTEND_DOCUMENTATION.md)

### **Quick References**
- [API Endpoints](./actions/BACKEND_DOCUMENTATION.md#api-endpoints)
- [Database Schema](./actions/DATABASE_DOCUMENTATION.md#database-schema)
- [Component Structure](./actions/FRONTEND_DOCUMENTATION.md#project-structure)

## 🔒 **Security & Performance**

### **Security Features**
- Input validation
- SQL injection prevention
- CORS configuration
- Error handling
- Data sanitization

### **Performance Optimization**
- Database indexes
- Code splitting
- Image optimization
- Bundle optimization
- Caching strategies

## 🚀 **Deployment**

### **Production Setup**
```bash
# Backend deployment
cd backend
npm install --production
NODE_ENV=production node server.js

# Frontend deployment
npm run build
# Deploy dist/ folder to hosting
```

### **Deployment Options**
- **Netlify** - Frontend hosting
- **Vercel** - Full-stack deployment
- **Heroku** - Backend hosting
- **AWS** - Cloud deployment

## 📞 **Support & Contact**

### **Development Team**
- **Lead Developer:** AI Assistant
- **Project:** Kampung Kwau Booking System
- **Repository:** Local development

### **Contact Information**
- **Email:** support@kampungkwaupapua.com
- **Documentation:** [actions/](./actions/) folder
- **Last Updated:** December 2024

## 📋 **Status**

### **✅ Completed Features**
- [x] Multi-step booking form
- [x] Database integration (SQLite)
- [x] Email notifications (EmailJS)
- [x] API endpoints (Express.js)
- [x] Frontend validation (React Hook Form)
- [x] Multi-language support
- [x] Responsive design
- [x] Complete documentation

### **🏆 Project Status: PRODUCTION READY**

---

**Dibuat dengan ❤️ untuk Kampung Kwau - Papua Barat**
