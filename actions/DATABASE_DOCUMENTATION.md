# 🗄️ DATABASE DOCUMENTATION - KAMPUNG KWAU

## 📋 **OVERVIEW**
Database SQLite untuk sistem booking wisata Kampung Kwau yang menyimpan data paket wisata, pelanggan, dan booking.

---

## 🏗️ **DATABASE SCHEMA**

### 📊 **1. TABEL PACKAGES (Paket Wisata)**
```sql
CREATE TABLE packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    max_guests INTEGER NOT NULL,
    includes TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Kolom:**
- `id` - Primary key auto increment
- `name` - Nama paket wisata (Basic Package, Standard Package, Premium Package)
- `description` - Deskripsi detail paket
- `base_price` - Harga dasar paket (Rp)
- `duration` - Durasi paket (2D1N, 3D2N, 4D3N)
- `max_guests` - Maksimal jumlah tamu
- `includes` - JSON array fasilitas yang termasuk
- `is_active` - Status aktif paket
- `created_at` - Timestamp pembuatan
- `updated_at` - Timestamp update

---

### 👥 **2. TABEL CUSTOMERS (Data Pelanggan)**
```sql
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    nationality VARCHAR(50) DEFAULT 'Indonesia',
    emergency_contact TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Kolom:**
- `id` - Primary key auto increment
- `name` - Nama lengkap pelanggan
- `email` - Email pelanggan (unique)
- `phone` - Nomor telepon
- `nationality` - Kebangsaan (default: Indonesia)
- `emergency_contact` - Kontak darurat
- `created_at` - Timestamp pembuatan
- `updated_at` - Timestamp update

---

### 📝 **3. TABEL BOOKINGS (Data Booking Utama)**
```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id INTEGER NOT NULL,
    package_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    duration INTEGER NOT NULL,
    adults_count INTEGER NOT NULL,
    children_count INTEGER NOT NULL,
    adult_price DECIMAL(10,2) NOT NULL,
    child_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    special_requests TEXT,
    source VARCHAR(20) DEFAULT 'website',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (package_id) REFERENCES packages(id)
);
```

**Kolom:**
- `id` - Primary key auto increment
- `booking_number` - Nomor booking unik (KW-YYYYMMDD-XXX)
- `customer_id` - Foreign key ke tabel customers
- `package_id` - Foreign key ke tabel packages
- `status` - Status booking (pending, confirmed, cancelled, completed)
- `check_in_date` - Tanggal check-in
- `check_out_date` - Tanggal check-out
- `duration` - Durasi dalam hari
- `adults_count` - Jumlah dewasa
- `children_count` - Jumlah anak-anak
- `adult_price` - Harga per dewasa
- `child_price` - Harga per anak
- `subtotal` - Total sebelum pajak
- `tax_amount` - Jumlah pajak (10%)
- `total_amount` - Total akhir
- `special_requests` - JSON request khusus
- `source` - Sumber booking (website, phone, etc.)
- `created_at` - Timestamp pembuatan
- `updated_at` - Timestamp update

---

## 🔗 **RELATIONSHIPS**

### 📊 **Foreign Key Relationships:**
```
bookings.customer_id → customers.id
bookings.package_id → packages.id
```

### 📈 **Data Flow:**
```
Customer Data → customers table
Package Selection → packages table
Booking Creation → bookings table (with FK references)
```

---

## 📊 **SAMPLE DATA**

### 🎯 **PACKAGES DATA:**
```json
{
  "Basic Package": {
    "name": "Basic Package",
    "description": "Basic tour package covering homestay accommodation, local food, and birdwatching activities with an experienced local guide.",
    "base_price": 250000,
    "duration": "2D1N",
    "max_guests": 4,
    "includes": ["1 night homestay", "3x local meals", "Birdwatching tour (3 hours)", "Local guide", "Local transportation"]
  },
  "Standard Package": {
    "name": "Standard Package", 
    "description": "Complete tour package with Arfak tribe cultural experience, nature exploration, and various other interesting activities.",
    "base_price": 450000,
    "duration": "3D2N",
    "max_guests": 6,
    "includes": ["2 nights premium homestay", "All meals + snacks", "Birdwatching + tracking", "Cultural tour", "Waterfall tour", "Craft workshop"]
  },
  "Premium Package": {
    "name": "Premium Package",
    "description": "Premium tour package with all the best facilities, exclusive experience, and professional private guide service.",
    "base_price": 750000,
    "duration": "4D3N", 
    "max_guests": 8,
    "includes": ["3 nights VIP homestay", "All meals + welcome drink", "Private birdwatching", "Photography workshop", "Cooking class", "Souvenir package"]
  }
}
```

---

## 🔧 **DATABASE OPERATIONS**

### 📁 **File Location:**
```
backend/database/kwau_booking.db
```

### 🛠️ **Setup Commands:**
```bash
# Create database and tables
cd backend
node create-database.js

# Check database
sqlite3 database/kwau_booking.db
.tables
.schema packages
.schema customers  
.schema bookings
```

### 📊 **Useful Queries:**
```sql
-- View all packages
SELECT * FROM packages;

-- View all customers
SELECT * FROM customers;

-- View all bookings with customer and package info
SELECT 
    b.booking_number,
    c.name as customer_name,
    p.name as package_name,
    b.status,
    b.total_amount,
    b.created_at
FROM bookings b
JOIN customers c ON b.customer_id = c.id
JOIN packages p ON b.package_id = p.id;

-- Count bookings by status
SELECT status, COUNT(*) as count 
FROM bookings 
GROUP BY status;
```

---

## 🔒 **SECURITY & VALIDATION**

### ✅ **Data Validation:**
- Email harus unique di tabel customers
- Booking number harus unique
- Foreign key constraints aktif
- Date validation (check-out > check-in)

### 🛡️ **Backup Strategy:**
- Database file: `kwau_booking.db`
- Backup location: `backend/database/backup/`
- Backup frequency: Daily
- Retention: 30 days

---

## 📈 **PERFORMANCE OPTIMIZATION**

### 🚀 **Indexes:**
```sql
CREATE INDEX idx_bookings_number ON bookings(booking_number);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_customers_email ON customers(email);
```

### 📊 **Monitoring:**
- Database size monitoring
- Query performance tracking
- Connection pool management
- Regular maintenance

---

## 🔄 **MIGRATION & VERSIONING**

### 📋 **Version History:**
- **v1.0** - Initial schema with packages, customers, bookings
- **v1.1** - Added indexes for performance
- **v1.2** - Added special_requests JSON field
- **v1.3** - Package name synchronization (English)

### 🔄 **Migration Scripts:**
```bash
# Backup current database
cp database/kwau_booking.db database/backup/kwau_booking_$(date +%Y%m%d).db

# Run migration
node migrate-database.js
```

---

## 📞 **SUPPORT & MAINTENANCE**

### 🛠️ **Tools:**
- **DB Browser for SQLite** - GUI database management
- **DBeaver** - Universal database tool
- **SQLite CLI** - Command line interface

### 📧 **Contact:**
- **Developer:** AI Assistant
- **Project:** Kampung Kwau Booking System
- **Last Updated:** December 2024

---

*Dokumentasi ini dibuat untuk sistem booking Kampung Kwau - Papua Barat* 