# 🔌 API ENDPOINTS DOCUMENTATION
## Kampung Kwau Booking System

### 📋 **OVERVIEW**
Backend API Kampung Kwau menggunakan **Node.js**, **Express.js**, dan **SQLite** untuk menyediakan RESTful endpoints untuk booking system, dashboard admin, dan email notifications.

---

## 🏗️ **TECHNOLOGY STACK**

### **Backend Technologies:**
- **Node.js 18** - Runtime environment
- **Express.js 4** - Web framework
- **SQLite3** - Database (better-sqlite3)
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing

### **Database:**
- **SQLite** - File-based database
- **better-sqlite3** - High-performance SQLite client
- **Database File:** `kwau_booking.db`

---

## 📁 **PROJECT STRUCTURE**

```
backend/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── database/
│   ├── init.js               # Database initialization
│   └── kwau_booking.db       # SQLite database file
└── routes/
    └── bookings.js           # Booking endpoints
```

---

## 🚀 **SETUP & INSTALLATION**

### **1. Install Dependencies**
```bash
cd backend
npm install
```

### **2. Initialize Database**
```bash
node database/init.js
```

### **3. Start Server**
```bash
npm start
# or
node server.js
```

### **4. Server Configuration**
```javascript
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

---

## 📊 **DATABASE SCHEMA**

### **1. Packages Table**
```sql
CREATE TABLE packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price_per_person INTEGER NOT NULL,
  max_guests INTEGER DEFAULT 10,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **2. Customers Table**
```sql
CREATE TABLE customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  nationality TEXT DEFAULT 'Indonesia',
  emergency_contact TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **3. Bookings Table**
```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_number TEXT NOT NULL UNIQUE,
  customer_id INTEGER NOT NULL,
  package_id INTEGER NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  duration INTEGER NOT NULL,
  adults_count INTEGER NOT NULL DEFAULT 1,
  children_count INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  special_requests TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers (id),
  FOREIGN KEY (package_id) REFERENCES packages (id)
);
```

### **4. Booking Status History Table**
```sql
CREATE TABLE booking_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings (id)
);
```

---

## 🔌 **API ENDPOINTS**

### **1. 📋 BOOKING ENDPOINTS**

#### **POST /api/bookings**
**Create a new booking**

**Request Body:**
```json
{
  "customer": {
    "name": "Farrel Nehemiah Davidjoy Mamengko",
    "email": "farrel@gmail.com",
    "phone": "08123456789",
    "nationality": "Indonesia",
    "emergencyContact": "Emergency Contact"
  },
  "booking": {
    "packageName": "Basic Package",
    "checkIn": "2025-07-20T00:00:00.000Z",
    "checkOut": "2025-07-21T00:00:00.000Z",
    "duration": 1,
    "guests": {
      "adults": 2,
      "children": 0
    }
  },
  "pricing": {
    "total": 275000
  },
  "specialRequests": {
    "dietaryRestrictions": "",
    "accessibilityNeeds": "",
    "specialOccasion": "",
    "additionalNotes": ""
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "booking_number": "KW-20250720-081",
    "customer_id": 1,
    "package_id": 1,
    "check_in_date": "2025-07-20",
    "check_out_date": "2025-07-21",
    "duration": 1,
    "adults_count": 2,
    "children_count": 0,
    "total_amount": 275000,
    "status": "pending",
    "created_at": "2025-07-20T09:44:44.000Z"
  }
}
```

**Implementation:**
```javascript
app.post('/api/bookings', async (req, res) => {
  try {
    const { customer, booking, pricing, specialRequests } = req.body;
    
    // Generate booking number
    const bookingNumber = generateBookingNumber();
    
    // Insert customer
    const customerResult = db.prepare(`
      INSERT INTO customers (name, email, phone, nationality, emergency_contact)
      VALUES (?, ?, ?, ?, ?)
    `).run(customer.name, customer.email, customer.phone, 
           customer.nationality, customer.emergencyContact);
    
    const customerId = customerResult.lastInsertRowid;
    
    // Get package ID
    const packageResult = db.prepare(`
      SELECT id FROM packages WHERE name = ?
    `).get(booking.packageName);
    
    if (!packageResult) {
      return res.status(400).json({
        success: false,
        message: 'Package not found'
      });
    }
    
    // Insert booking
    const bookingResult = db.prepare(`
      INSERT INTO bookings (
        booking_number, customer_id, package_id, check_in_date, 
        check_out_date, duration, adults_count, children_count, 
        total_amount, special_requests
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      bookingNumber, customerId, packageResult.id,
      booking.checkIn.split('T')[0], booking.checkOut.split('T')[0],
      booking.duration, booking.guests.adults, booking.guests.children,
      pricing.total, JSON.stringify(specialRequests)
    );
    
    const bookingId = bookingResult.lastInsertRowid;
    
    // Insert status history
    db.prepare(`
      INSERT INTO booking_status_history (booking_id, status)
      VALUES (?, ?)
    `).run(bookingId, 'pending');
    
    res.json({
      success: true,
      message: 'Booking created successfully',
      data: {
        id: bookingId,
        booking_number: bookingNumber,
        customer_id: customerId,
        package_id: packageResult.id,
        check_in_date: booking.checkIn.split('T')[0],
        check_out_date: booking.checkOut.split('T')[0],
        duration: booking.duration,
        adults_count: booking.guests.adults,
        children_count: booking.guests.children,
        total_amount: pricing.total,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});
```

#### **GET /api/bookings**
**Get all bookings (for dashboard)**

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "booking_number": "KW-20250720-081",
      "customer_name": "Farrel Nehemiah Davidjoy Mamengko",
      "customer_email": "farrel@gmail.com",
      "customer_phone": "08123456789",
      "package_name": "Basic Package",
      "check_in_date": "2025-07-20",
      "check_out_date": "2025-07-21",
      "duration": 1,
      "adults_count": 2,
      "children_count": 0,
      "total_amount": 275000,
      "status": "pending",
      "created_at": "2025-07-20T09:44:44.000Z",
      "updated_at": "2025-07-20T09:44:44.000Z"
    }
  ]
}
```

**Implementation:**
```javascript
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = db.prepare(`
      SELECT 
        b.id,
        b.booking_number,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone,
        p.name as package_name,
        b.check_in_date,
        b.check_out_date,
        b.duration,
        b.adults_count,
        b.children_count,
        b.total_amount,
        b.status,
        b.created_at,
        b.updated_at
      FROM bookings b
      JOIN customers c ON b.customer_id = c.id
      JOIN packages p ON b.package_id = p.id
      ORDER BY b.created_at DESC
    `).all();
    
    res.json({
      success: true,
      data: bookings
    });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});
```

#### **PUT /api/bookings/:id/status**
**Update booking status**

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "id": 1,
    "status": "confirmed",
    "updated_at": "2025-07-20T10:30:00.000Z"
  }
}
```

**Implementation:**
```javascript
app.put('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    // Update booking status
    const result = db.prepare(`
      UPDATE bookings 
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, id);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Insert status history
    db.prepare(`
      INSERT INTO booking_status_history (booking_id, status)
      VALUES (?, ?)
    `).run(id, status);
    
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: {
        id: parseInt(id),
        status: status,
        updated_at: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});
```

#### **GET /api/bookings/:id**
**Get specific booking details**

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "booking_number": "KW-20250720-081",
    "customer": {
      "name": "Farrel Nehemiah Davidjoy Mamengko",
      "email": "farrel@gmail.com",
      "phone": "08123456789",
      "nationality": "Indonesia",
      "emergency_contact": "Emergency Contact"
    },
    "package": {
      "name": "Basic Package",
      "description": "Basic tour package",
      "price_per_person": 125000
    },
    "booking": {
      "check_in_date": "2025-07-20",
      "check_out_date": "2025-07-21",
      "duration": 1,
      "adults_count": 2,
      "children_count": 0,
      "total_amount": 275000,
      "status": "pending"
    },
    "special_requests": {
      "dietaryRestrictions": "",
      "accessibilityNeeds": "",
      "specialOccasion": "",
      "additionalNotes": ""
    },
    "created_at": "2025-07-20T09:44:44.000Z",
    "updated_at": "2025-07-20T09:44:44.000Z"
  }
}
```

### **2. 📦 PACKAGE ENDPOINTS**

#### **GET /api/packages**
**Get all available packages**

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Basic Package",
      "description": "Basic tour package with accommodation",
      "price_per_person": 125000,
      "max_guests": 10,
      "created_at": "2025-07-20T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Premium Package",
      "description": "Premium tour package with additional activities",
      "price_per_person": 250000,
      "max_guests": 8,
      "created_at": "2025-07-20T00:00:00.000Z"
    }
  ]
}
```

### **3. 📊 DASHBOARD ENDPOINTS**

#### **GET /api/dashboard/stats**
**Get dashboard statistics**

**Response:**
```json
{
  "success": true,
  "data": {
    "total_bookings": 10,
    "pending_bookings": 3,
    "confirmed_bookings": 4,
    "completed_bookings": 2,
    "cancelled_bookings": 1,
    "unique_customers": 8,
    "total_revenue": 2750000,
    "average_booking_value": 275000
  }
}
```

#### **GET /api/dashboard/recent-bookings**
**Get recent bookings for dashboard**

**Query Parameters:**
- `limit` (optional): Number of recent bookings (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "booking_number": "KW-20250720-081",
      "customer_name": "Farrel Nehemiah Davidjoy Mamengko",
      "package_name": "Basic Package",
      "check_in_date": "2025-07-20",
      "total_amount": 275000,
      "status": "pending",
      "created_at": "2025-07-20T09:44:44.000Z"
    }
  ]
}
```

---

## 🔧 **UTILITY FUNCTIONS**

### **1. Booking Number Generation**
```javascript
const generateBookingNumber = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  // Get count of bookings today
  const todayBookings = db.prepare(`
    SELECT COUNT(*) as count 
    FROM bookings 
    WHERE DATE(created_at) = DATE('now')
  `).get();
  
  const sequence = String(todayBookings.count + 1).padStart(3, '0');
  
  return `KW-${year}${month}${day}-${sequence}`;
};
```

### **2. Database Initialization**
```javascript
const initializeDatabase = () => {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price_per_person INTEGER NOT NULL,
      max_guests INTEGER DEFAULT 10,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      nationality TEXT DEFAULT 'Indonesia',
      emergency_contact TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_number TEXT NOT NULL UNIQUE,
      customer_id INTEGER NOT NULL,
      package_id INTEGER NOT NULL,
      check_in_date DATE NOT NULL,
      check_out_date DATE NOT NULL,
      duration INTEGER NOT NULL,
      adults_count INTEGER NOT NULL DEFAULT 1,
      children_count INTEGER NOT NULL DEFAULT 0,
      total_amount INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      special_requests TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers (id),
      FOREIGN KEY (package_id) REFERENCES packages (id)
    );
    
    CREATE TABLE IF NOT EXISTS booking_status_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings (id)
    );
  `);
  
  // Insert sample packages
  const packageCount = db.prepare('SELECT COUNT(*) as count FROM packages').get();
  if (packageCount.count === 0) {
    db.prepare(`
      INSERT INTO packages (name, description, price_per_person, max_guests)
      VALUES (?, ?, ?, ?)
    `).run('Basic Package', 'Basic tour package with accommodation', 125000, 10);
    
    db.prepare(`
      INSERT INTO packages (name, description, price_per_person, max_guests)
      VALUES (?, ?, ?, ?)
    `).run('Premium Package', 'Premium tour package with additional activities', 250000, 8);
  }
};
```

---

## 🔒 **SECURITY FEATURES**

### **1. Input Validation**
```javascript
const validateBookingData = (data) => {
  const errors = [];
  
  if (!data.customer?.name) errors.push('Customer name is required');
  if (!data.customer?.email) errors.push('Customer email is required');
  if (!data.booking?.packageName) errors.push('Package name is required');
  if (!data.booking?.checkIn) errors.push('Check-in date is required');
  if (!data.booking?.checkOut) errors.push('Check-out date is required');
  
  return errors;
};
```

### **2. CORS Configuration**
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

### **3. Error Handling**
```javascript
// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});
```

---

## 📊 **MONITORING & LOGGING**

### **1. Request Logging**
```javascript
// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### **2. Performance Monitoring**
```javascript
// Monitor response times
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});
```

---

## 🧪 **TESTING**

### **1. API Testing**
```javascript
// Test booking creation
describe('POST /api/bookings', () => {
  test('creates booking successfully', async () => {
    const bookingData = {
      customer: {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '08123456789'
      },
      booking: {
        packageName: 'Basic Package',
        checkIn: '2025-07-20T00:00:00.000Z',
        checkOut: '2025-07-21T00:00:00.000Z',
        duration: 1,
        guests: { adults: 2, children: 0 }
      },
      pricing: { total: 275000 }
    };
    
    const response = await request(app)
      .post('/api/bookings')
      .send(bookingData)
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.booking_number).toMatch(/KW-\d{8}-\d{3}/);
  });
});
```

### **2. Database Testing**
```javascript
// Test database operations
describe('Database Operations', () => {
  test('generates unique booking numbers', () => {
    const booking1 = generateBookingNumber();
    const booking2 = generateBookingNumber();
    
    expect(booking1).not.toBe(booking2);
    expect(booking1).toMatch(/KW-\d{8}-\d{3}/);
  });
});
```

---

## 📝 **CHANGELOG**

### **v2.0 (Current)**
- ✅ **Added:** Dashboard endpoints
- ✅ **Added:** Status update functionality
- ✅ **Fixed:** Email integration
- ✅ **Added:** Comprehensive error handling
- ✅ **Added:** Input validation
- ✅ **Added:** Database initialization

### **v1.0 (Previous)**
- ✅ **Added:** Basic booking endpoints
- ✅ **Added:** SQLite database integration
- ✅ **Added:** Package management
- ✅ **Added:** Customer management

---

## 🎯 **BEST PRACTICES**

### **1. API Design**
- ✅ Use consistent response format
- ✅ Implement proper HTTP status codes
- ✅ Validate all inputs
- ✅ Handle errors gracefully

### **2. Database Operations**
- ✅ Use prepared statements
- ✅ Implement transactions for complex operations
- ✅ Add proper indexes
- ✅ Regular database backups

### **3. Security**
- ✅ Validate and sanitize inputs
- ✅ Implement rate limiting
- ✅ Use HTTPS in production
- ✅ Log security events

### **4. Performance**
- ✅ Optimize database queries
- ✅ Implement caching where appropriate
- ✅ Monitor response times
- ✅ Use connection pooling

---

## 📞 **SUPPORT**

### **Development Resources**
- **Express.js Docs:** https://expressjs.com/
- **SQLite Docs:** https://www.sqlite.org/docs.html
- **better-sqlite3 Docs:** https://github.com/JoshuaWise/better-sqlite3

### **Contact Information**
- **Email:** farrelmamengko@gmail.com
- **API Base URL:** http://localhost:5000/api
- **Dashboard:** http://localhost:3000/dashboard

### **Troubleshooting**
- **Check Server Logs:** Monitor console output
- **Database Health:** Check SQLite file integrity
- **API Testing:** Use Postman or curl for testing
- **Port Conflicts:** Ensure port 5000 is available

---

*Dokumentasi API Endpoints Kampung Kwau - Papua Barat* 