# ⚙️ BACKEND DOCUMENTATION - KAMPUNG KWAU

## 📋 **OVERVIEW**
Backend server Node.js dengan Express.js untuk sistem booking wisata Kampung Kwau yang menangani API requests, database operations, dan business logic.

---

## 🏗️ **ARCHITECTURE**

### 📊 **Tech Stack:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (better-sqlite3)
- **Port:** 5000
- **Environment:** Development/Production

### 🔄 **Server Flow:**
```
Client Request → Express Router → Database → Response
```

---

## 📁 **PROJECT STRUCTURE**

```
backend/
├── server.js                 # Main server file
├── create-database.js        # Database initialization
├── package.json             # Dependencies
├── database/
│   └── kwau_booking.db      # SQLite database file
└── actions/                 # Documentation folder
```

---

## 🚀 **SETUP & INSTALLATION**

### 📦 **Dependencies:**
```json
{
  "express": "^4.18.2",
  "better-sqlite3": "^9.2.2",
  "cors": "^2.8.5"
}
```

### 🛠️ **Installation Commands:**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create database
node create-database.js

# Start server
node server.js
```

### 🔧 **Environment Setup:**
```bash
# Server will run on
http://localhost:5000

# Health check endpoint
http://localhost:5000/health

# API base URL
http://localhost:5000/api
```

---

## 🔌 **API ENDPOINTS**

### 🏥 **Health Check**
```http
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "message": "Kampung Kwau Backend Server is running",
  "timestamp": "2024-12-XX"
}
```

---

### 📝 **BOOKINGS API**

#### **1. Create Booking**
```http
POST /api/bookings
Content-Type: application/json
```

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+6281234567890",
    "nationality": "Indonesia",
    "emergencyContact": "Jane Doe - +6281234567891"
  },
  "package": {
    "name": "Basic Package",
    "price": 250000,
    "duration": "2D1N",
    "maxGuests": 4
  },
  "check_in_date": "2024-12-25",
  "check_out_date": "2024-12-26",
  "duration": 1,
  "adults_count": 2,
  "children_count": 1,
  "adult_price": 250000,
  "child_price": 125000,
  "special_requests": {
    "dietaryRestrictions": "Vegetarian",
    "accessibilityNeeds": "",
    "specialOccasion": "",
    "additionalNotes": ""
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking_number": "KW-20241225-001",
    "customer_id": 1,
    "package_id": 1,
    "total_amount": 625000,
    "status": "pending"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Failed to create booking",
  "message": "Package not found: Basic Package"
}
```

---

#### **2. Get All Bookings**
```http
GET /api/bookings
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "booking_number": "KW-20241225-001",
      "customer_name": "John Doe",
      "package_name": "Basic Package",
      "status": "pending",
      "total_amount": 625000,
      "created_at": "2024-12-25T10:30:00Z"
    }
  ]
}
```

---

## 🗄️ **DATABASE OPERATIONS**

### 🔗 **Database Connection:**
```javascript
const Database = require('better-sqlite3');
const db = new Database('./database/kwau_booking.db');
```

### 📊 **Key Operations:**

#### **1. Create Customer:**
```javascript
const insertCustomer = db.prepare(`
  INSERT INTO customers (name, email, phone, nationality, emergency_contact)
  VALUES (?, ?, ?, ?, ?)
`);
const customerResult = insertCustomer.run(
  customerData.name,
  customerData.email,
  customerData.phone,
  customerData.nationality,
  customerData.emergencyContact
);
```

#### **2. Find Package:**
```javascript
const findPackage = db.prepare('SELECT * FROM packages WHERE name = ?');
const package = findPackage.get(packageName);
```

#### **3. Create Booking:**
```javascript
const insertBooking = db.prepare(`
  INSERT INTO bookings (
    booking_number, customer_id, package_id, check_in_date, 
    check_out_date, duration, adults_count, children_count,
    adult_price, child_price, subtotal, tax_amount, total_amount,
    special_requests
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
```

---

## 🔒 **ERROR HANDLING**

### 🚨 **Error Types:**

#### **1. Validation Errors (400):**
- Missing required fields
- Invalid email format
- Invalid date range
- Package not found

#### **2. Database Errors (500):**
- SQL constraint violations
- Connection issues
- Transaction failures

#### **3. Server Errors (500):**
- Internal server errors
- Unhandled exceptions

### 🛡️ **Error Response Format:**
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message",
  "timestamp": "2024-12-XX"
}
```

---

## 🔄 **BUSINESS LOGIC**

### 📋 **Booking Creation Process:**

#### **Step 1: Validate Input**
```javascript
// Validate required fields
if (!customer.name || !customer.email || !package.name) {
  throw new Error('Missing required fields');
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(customer.email)) {
  throw new Error('Invalid email format');
}
```

#### **Step 2: Check Package Availability**
```javascript
const package = findPackage.get(bookingData.package.name);
if (!package) {
  throw new Error(`Package not found: ${bookingData.package.name}`);
}
```

#### **Step 3: Generate Booking Number**
```javascript
const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const sequence = getNextSequence(); // Get from database
const bookingNumber = `KW-${date}-${sequence.toString().padStart(3, '0')}`;
```

#### **Step 4: Calculate Pricing**
```javascript
const subtotal = (adults * adultPrice) + (children * childPrice);
const taxAmount = subtotal * 0.1; // 10% tax
const totalAmount = subtotal + taxAmount;
```

#### **Step 5: Database Transaction**
```javascript
const transaction = db.transaction(() => {
  // Insert customer
  const customerResult = insertCustomer.run(...);
  
  // Insert booking
  const bookingResult = insertBooking.run(...);
  
  return {
    customer_id: customerResult.lastInsertRowid,
    booking_id: bookingResult.lastInsertRowid
  };
});
```

---

## 🔧 **CONFIGURATION**

### ⚙️ **Server Configuration:**
```javascript
const PORT = process.env.PORT || 5000;
const CORS_OPTIONS = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
};
```

### 🗄️ **Database Configuration:**
```javascript
const DB_PATH = './database/kwau_booking.db';
const DB_OPTIONS = {
  verbose: console.log, // Enable SQL logging in development
  fileMustExist: false  // Create database if not exists
};
```

---

## 📊 **MONITORING & LOGGING**

### 📝 **Logging Strategy:**
```javascript
// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error logging
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: error.message
  });
});
```

### 📈 **Performance Monitoring:**
- Response time tracking
- Database query performance
- Memory usage monitoring
- Error rate tracking

---

## 🚀 **DEPLOYMENT**

### 📦 **Production Setup:**
```bash
# Install production dependencies
npm install --production

# Set environment variables
export NODE_ENV=production
export PORT=5000

# Start server
node server.js
```

### 🔧 **PM2 Configuration:**
```json
{
  "name": "kwau-backend",
  "script": "server.js",
  "instances": 2,
  "env": {
    "NODE_ENV": "production",
    "PORT": 5000
  }
}
```

### 🛡️ **Security Considerations:**
- CORS configuration
- Input validation
- SQL injection prevention
- Rate limiting
- HTTPS enforcement

---

## 🔄 **MAINTENANCE**

### 🧹 **Regular Tasks:**
- Database backup
- Log rotation
- Performance monitoring
- Security updates
- Dependency updates

### 🛠️ **Troubleshooting:**
```bash
# Check server status
curl http://localhost:5000/health

# Check database
sqlite3 database/kwau_booking.db ".tables"

# View logs
tail -f logs/server.log
```

---

## 📞 **SUPPORT & CONTACT**

### 🛠️ **Development Team:**
- **Lead Developer:** AI Assistant
- **Project:** Kampung Kwau Booking System
- **Repository:** Local development

### 📧 **Contact Information:**
- **Email:** support@kampungkwaupapua.com
- **Documentation:** actions/BACKEND_DOCUMENTATION.md
- **Last Updated:** December 2024

---

*Dokumentasi ini dibuat untuk backend server Kampung Kwau - Papua Barat* 