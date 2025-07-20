# 🔌 API ENDPOINTS DOCUMENTATION - KAMPUNG KWAU

## 📋 **OVERVIEW**
Dokumentasi lengkap untuk REST API endpoints Kampung Kwau yang menangani operasi booking, customer management, dan package information.

---

## 🏗️ **API ARCHITECTURE**

### 📊 **Base Configuration:**
- **Base URL:** `http://localhost:5000`
- **API Version:** v1
- **Content Type:** `application/json`
- **Authentication:** None (public API)
- **CORS:** Enabled for frontend

### 🔄 **Request/Response Format:**
```javascript
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-12-25T10:30:00Z"
}

// Error Response
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message",
  "timestamp": "2024-12-25T10:30:00Z"
}
```

---

## 🏥 **HEALTH CHECK ENDPOINTS**

### **GET /health**
Health check endpoint untuk memverifikasi server status.

#### **Request:**
```http
GET /health
```

#### **Response (200):**
```json
{
  "success": true,
  "status": "ok",
  "message": "Kampung Kwau Backend Server is running",
  "timestamp": "2024-12-25T10:30:00Z",
  "version": "1.0.0",
  "uptime": "2h 15m 30s"
}
```

#### **Usage:**
```javascript
// Frontend health check
const checkServerHealth = async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    
    if (data.success) {
      console.log('Server is healthy:', data.message);
      return true;
    }
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};
```

---

## 📝 **BOOKINGS ENDPOINTS**

### **POST /api/bookings**
Membuat booking baru dengan data customer, package, dan booking details.

#### **Request:**
```http
POST /api/bookings
Content-Type: application/json
```

#### **Request Body:**
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

#### **Response (200):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking_number": "KW-20241225-001",
    "customer_id": 1,
    "package_id": 1,
    "total_amount": 625000,
    "status": "pending",
    "created_at": "2024-12-25T10:30:00Z"
  }
}
```

#### **Response (400):**
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Package not found: Basic Package",
  "timestamp": "2024-12-25T10:30:00Z"
}
```

#### **Response (500):**
```json
{
  "success": false,
  "error": "Database Error",
  "message": "Failed to create booking",
  "timestamp": "2024-12-25T10:30:00Z"
}
```

#### **Frontend Implementation:**
```javascript
// apiService.js
const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to create booking');
  }
};
```

---

### **GET /api/bookings**
Mengambil semua data booking dengan informasi customer dan package.

#### **Request:**
```http
GET /api/bookings
```

#### **Query Parameters:**
```javascript
// Optional filters
{
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  customer_email: 'john@example.com',
  date_from: '2024-12-01',
  date_to: '2024-12-31',
  limit: 10,
  offset: 0
}
```

#### **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "booking_number": "KW-20241225-001",
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "package_name": "Basic Package",
      "status": "pending",
      "check_in_date": "2024-12-25",
      "check_out_date": "2024-12-26",
      "total_amount": 625000,
      "created_at": "2024-12-25T10:30:00Z"
    },
    {
      "id": 2,
      "booking_number": "KW-20241225-002",
      "customer_name": "Jane Smith",
      "customer_email": "jane@example.com",
      "package_name": "Standard Package",
      "status": "confirmed",
      "check_in_date": "2024-12-26",
      "check_out_date": "2024-12-28",
      "total_amount": 1350000,
      "created_at": "2024-12-25T11:15:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "limit": 10,
    "offset": 0,
    "has_more": false
  }
}
```

#### **Frontend Implementation:**
```javascript
const getBookings = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/bookings?${queryParams}`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch bookings');
  }
};

// Usage
const bookings = await getBookings({
  status: 'pending',
  limit: 5
});
```

---

### **GET /api/bookings/:bookingNumber**
Mengambil detail booking berdasarkan nomor booking.

#### **Request:**
```http
GET /api/bookings/KW-20241225-001
```

#### **Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "booking_number": "KW-20241225-001",
    "customer": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+6281234567890",
      "nationality": "Indonesia",
      "emergency_contact": "Jane Doe - +6281234567891"
    },
    "package": {
      "id": 1,
      "name": "Basic Package",
      "description": "Basic tour package covering homestay accommodation...",
      "base_price": 250000,
      "duration": "2D1N",
      "max_guests": 4
    },
    "booking_details": {
      "check_in_date": "2024-12-25",
      "check_out_date": "2024-12-26",
      "duration": 1,
      "adults_count": 2,
      "children_count": 1,
      "adult_price": 250000,
      "child_price": 125000,
      "subtotal": 625000,
      "tax_amount": 62500,
      "total_amount": 687500,
      "status": "pending",
      "special_requests": {
        "dietaryRestrictions": "Vegetarian",
        "accessibilityNeeds": "",
        "specialOccasion": "",
        "additionalNotes": ""
      }
    },
    "created_at": "2024-12-25T10:30:00Z",
    "updated_at": "2024-12-25T10:30:00Z"
  }
}
```

#### **Response (404):**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Booking not found: KW-20241225-999",
  "timestamp": "2024-12-25T10:30:00Z"
}
```

---

### **PUT /api/bookings/:bookingNumber/status**
Update status booking (admin only).

#### **Request:**
```http
PUT /api/bookings/KW-20241225-001/status
Content-Type: application/json
```

#### **Request Body:**
```json
{
  "status": "confirmed",
  "notes": "Payment received, booking confirmed"
}
```

#### **Response (200):**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "booking_number": "KW-20241225-001",
    "old_status": "pending",
    "new_status": "confirmed",
    "updated_at": "2024-12-25T11:45:00Z"
  }
}
```

---

## 👥 **CUSTOMERS ENDPOINTS**

### **GET /api/customers**
Mengambil data customer dengan optional filtering.

#### **Request:**
```http
GET /api/customers?email=john@example.com
```

#### **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+6281234567890",
      "nationality": "Indonesia",
      "emergency_contact": "Jane Doe - +6281234567891",
      "created_at": "2024-12-25T10:30:00Z",
      "total_bookings": 2
    }
  ]
}
```

---

### **GET /api/customers/:id**
Mengambil detail customer berdasarkan ID.

#### **Request:**
```http
GET /api/customers/1
```

#### **Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+6281234567890",
    "nationality": "Indonesia",
    "emergency_contact": "Jane Doe - +6281234567891",
    "created_at": "2024-12-25T10:30:00Z",
    "bookings": [
      {
        "booking_number": "KW-20241225-001",
        "package_name": "Basic Package",
        "status": "pending",
        "total_amount": 625000,
        "created_at": "2024-12-25T10:30:00Z"
      }
    ]
  }
}
```

---

## 📦 **PACKAGES ENDPOINTS**

### **GET /api/packages**
Mengambil semua paket wisata yang tersedia.

#### **Request:**
```http
GET /api/packages
```

#### **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Basic Package",
      "description": "Basic tour package covering homestay accommodation...",
      "base_price": 250000,
      "duration": "2D1N",
      "max_guests": 4,
      "includes": [
        "1 night homestay",
        "3x local meals",
        "Birdwatching tour (3 hours)",
        "Local guide",
        "Local transportation"
      ],
      "is_active": true,
      "created_at": "2024-12-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Standard Package",
      "description": "Complete tour package with Arfak tribe cultural experience...",
      "base_price": 450000,
      "duration": "3D2N",
      "max_guests": 6,
      "includes": [
        "2 nights premium homestay",
        "All meals + snacks",
        "Birdwatching + tracking",
        "Cultural tour",
        "Waterfall tour",
        "Craft workshop"
      ],
      "is_active": true,
      "created_at": "2024-12-01T00:00:00Z"
    },
    {
      "id": 3,
      "name": "Premium Package",
      "description": "Premium tour package with all the best facilities...",
      "base_price": 750000,
      "duration": "4D3N",
      "max_guests": 8,
      "includes": [
        "3 nights VIP homestay",
        "All meals + welcome drink",
        "Private birdwatching",
        "Photography workshop",
        "Cooking class",
        "Souvenir package"
      ],
      "is_active": true,
      "created_at": "2024-12-01T00:00:00Z"
    }
  ]
}
```

#### **Frontend Implementation:**
```javascript
const getPackages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/packages`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }
    
    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch packages');
  }
};
```

---

### **GET /api/packages/:id**
Mengambil detail paket wisata berdasarkan ID.

#### **Request:**
```http
GET /api/packages/1
```

#### **Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Basic Package",
    "description": "Basic tour package covering homestay accommodation...",
    "base_price": 250000,
    "duration": "2D1N",
    "max_guests": 4,
    "includes": [
      "1 night homestay",
      "3x local meals",
      "Birdwatching tour (3 hours)",
      "Local guide",
      "Local transportation"
    ],
    "is_active": true,
    "created_at": "2024-12-01T00:00:00Z",
    "updated_at": "2024-12-01T00:00:00Z"
  }
}
```

---

## 📊 **STATISTICS ENDPOINTS**

### **GET /api/statistics**
Mengambil statistik booking dan customer.

#### **Request:**
```http
GET /api/statistics
```

#### **Response (200):**
```json
{
  "success": true,
  "data": {
    "bookings": {
      "total": 25,
      "pending": 5,
      "confirmed": 15,
      "cancelled": 2,
      "completed": 3
    },
    "customers": {
      "total": 20,
      "new_this_month": 8
    },
    "revenue": {
      "total": 15000000,
      "this_month": 3000000,
      "average_per_booking": 600000
    },
    "packages": {
      "basic": 10,
      "standard": 12,
      "premium": 3
    }
  }
}
```

---

## 🔍 **SEARCH ENDPOINTS**

### **GET /api/search/bookings**
Search booking berdasarkan berbagai kriteria.

#### **Request:**
```http
GET /api/search/bookings?q=john&status=pending
```

#### **Query Parameters:**
```javascript
{
  q: 'search term',           // Search in customer name, email, booking number
  status: 'pending',          // Filter by status
  date_from: '2024-12-01',   // Filter by date range
  date_to: '2024-12-31',
  package: 'Basic Package',   // Filter by package
  limit: 10,                  // Pagination
  offset: 0
}
```

#### **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "booking_number": "KW-20241225-001",
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "package_name": "Basic Package",
      "status": "pending",
      "total_amount": 625000,
      "created_at": "2024-12-25T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 10,
    "offset": 0,
    "has_more": false
  }
}
```

---

## 🔒 **ERROR HANDLING**

### 🚨 **Error Response Format:**
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message",
  "timestamp": "2024-12-25T10:30:00Z",
  "details": {
    "field": "error details for specific field"
  }
}
```

### 📋 **Error Types:**

#### **400 Bad Request:**
- Validation errors
- Missing required fields
- Invalid data format
- Package not found

#### **404 Not Found:**
- Booking not found
- Customer not found
- Package not found

#### **500 Internal Server Error:**
- Database errors
- Server errors
- Unexpected errors

### 🛡️ **Error Handling Example:**
```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const errorData = error.response.data;
    
    switch (error.response.status) {
      case 400:
        console.error('Validation Error:', errorData.message);
        return `Data tidak valid: ${errorData.message}`;
        
      case 404:
        console.error('Not Found:', errorData.message);
        return 'Data tidak ditemukan';
        
      case 500:
        console.error('Server Error:', errorData.message);
        return 'Terjadi kesalahan server. Silakan coba lagi.';
        
      default:
        console.error('API Error:', errorData.message);
        return 'Terjadi kesalahan. Silakan coba lagi.';
    }
  } else if (error.request) {
    // Network error
    console.error('Network Error:', error.request);
    return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
  } else {
    // Other error
    console.error('Error:', error.message);
    return 'Terjadi kesalahan yang tidak diketahui.';
  }
};
```

---

## 📊 **RATE LIMITING**

### ⏱️ **Rate Limit Configuration:**
```javascript
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "Rate Limit Exceeded",
    message: "Too many requests from this IP, please try again later.",
    timestamp: new Date().toISOString()
  }
};
```

### 📈 **Rate Limit Headers:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## 🔧 **CORS CONFIGURATION**

### 🌐 **CORS Settings:**
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://kampungkwaupapua.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

---

## 📝 **LOGGING & MONITORING**

### 📊 **Request Logging:**
```javascript
// Log all API requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Log API responses
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${res.statusCode}`);
    originalSend.call(this, data);
  };
  next();
});
```

### 📈 **API Metrics:**
```javascript
const apiMetrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  averageResponseTime: 0,
  endpoints: {}
};

const trackApiMetrics = (req, res, next) => {
  const startTime = Date.now();
  
  apiMetrics.totalRequests++;
  apiMetrics.endpoints[req.path] = (apiMetrics.endpoints[req.path] || 0) + 1;
  
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    apiMetrics.averageResponseTime = 
      (apiMetrics.averageResponseTime + responseTime) / 2;
    
    if (res.statusCode >= 200 && res.statusCode < 300) {
      apiMetrics.successfulRequests++;
    } else {
      apiMetrics.failedRequests++;
    }
  });
  
  next();
};
```

---

## 🚀 **DEPLOYMENT**

### 🔧 **Production Configuration:**
```javascript
const productionConfig = {
  port: process.env.PORT || 5000,
  cors: {
    origin: ['https://kampungkwaupapua.com'],
    credentials: true
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 1000
  },
  logging: {
    level: 'info',
    file: 'logs/api.log'
  }
};
```

### 📊 **Health Check Endpoint:**
```javascript
app.get('/health', (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: checkDatabaseConnection()
  };
  
  res.json({
    success: true,
    ...health
  });
});
```

---

## 📞 **SUPPORT & MAINTENANCE**

### 🛠️ **API Versioning:**
```javascript
// Version 1 API
app.use('/api/v1', v1Routes);

// Health check for all versions
app.get('/health', healthCheck);
```

### 📧 **Contact Information:**
- **Email:** support@kampungkwaupapua.com
- **Documentation:** actions/API_ENDPOINTS_DOCUMENTATION.md
- **Last Updated:** December 2024

---

*Dokumentasi ini dibuat untuk API endpoints Kampung Kwau - Papua Barat* 