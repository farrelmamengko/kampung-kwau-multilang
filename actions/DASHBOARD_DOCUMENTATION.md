# 📊 DASHBOARD DOCUMENTATION
## Kampung Kwau Admin Dashboard

### 📋 **OVERVIEW**
Dashboard admin Kampung Kwau adalah panel kontrol untuk mengelola booking, monitoring statistik, dan mengatur status booking customer. Dashboard ini memberikan akses real-time ke semua data booking sistem.

---

## 🎯 **DASHBOARD FEATURES**

### **1. 📈 Statistics Overview**
- **Total Bookings:** Jumlah semua booking
- **Pending Bookings:** Booking yang menunggu konfirmasi
- **Confirmed Bookings:** Booking yang sudah dikonfirmasi
- **Completed Bookings:** Booking yang sudah selesai
- **Cancelled Bookings:** Booking yang dibatalkan
- **Unique Customers:** Jumlah customer unik

### **2. 📋 Booking Management**
- **View All Bookings:** Tabel lengkap semua booking
- **Status Updates:** Update status booking (pending → confirmed → completed)
- **Booking Details:** Modal detail lengkap booking
- **Real-time Refresh:** Auto-refresh data dari backend

### **3. 🔍 Search & Filter**
- **Search by Booking Number:** Cari booking berdasarkan nomor
- **Filter by Status:** Filter berdasarkan status booking
- **Sort by Date:** Urutkan berdasarkan tanggal booking

---

## 🏗️ **TECHNOLOGY STACK**

### **Frontend:**
- **React.js 18** - UI framework
- **Bootstrap 5** - UI components
- **React Hook Form** - Form handling
- **React Toastify** - Notifications

### **Backend Integration:**
- **REST API** - Communication dengan backend
- **SQLite Database** - Data storage
- **Real-time Updates** - Live data synchronization

---

## 📁 **PROJECT STRUCTURE**

```
src/pages/
└── Dashboard.js              # Main dashboard component

src/services/
├── apiService.js             # API calls for dashboard
└── emailService.js           # Email notifications

backend/
├── server.js                 # Dashboard API endpoints
└── database/
    └── kwau_booking.db       # SQLite database
```

---

## 🚀 **SETUP & INSTALLATION**

### **1. Access Dashboard**
```
URL: http://localhost:3000/dashboard
Navigation: Page → Dashboard Admin
```

### **2. Prerequisites**
- ✅ Backend server running (port 5000)
- ✅ Database initialized
- ✅ Frontend running (port 3000)
- ✅ Sample booking data

### **3. Required Dependencies**
```json
{
  "react": "^18.2.0",
  "bootstrap": "^5.3.0",
  "react-toastify": "^9.1.3"
}
```

---

## 🎨 **DASHBOARD COMPONENTS**

### **1. Header Section**
```javascript
// Dashboard header with title and description
<div className="container-fluid bg-primary text-white py-4">
  <div className="container">
    <h1 className="mb-0">
      <i className="fas fa-tachometer-alt me-3"></i>
      Dashboard Admin - Kampung Kwau
    </h1>
    <p className="mb-0">Kelola booking dan monitoring sistem</p>
  </div>
</div>
```

### **2. Statistics Cards**
```javascript
// Statistics overview cards
const stats = {
  total: bookingData.length,
  pending: bookingData.filter(b => b.status === 'pending').length,
  confirmed: bookingData.filter(b => b.status === 'confirmed').length,
  completed: bookingData.filter(b => b.status === 'completed').length,
  cancelled: bookingData.filter(b => b.status === 'cancelled').length
};

// Render statistics cards
<div className="row g-4 mb-5">
  <div className="col-lg-2 col-md-4 col-sm-6">
    <div className="card bg-primary text-white">
      <div className="card-body text-center">
        <i className="fas fa-calendar-check fa-2x mb-2"></i>
        <h4 className="mb-1">{stats.total}</h4>
        <small>Total Booking</small>
      </div>
    </div>
  </div>
  {/* More stat cards... */}
</div>
```

### **3. Booking Table**
```javascript
// Booking list table
<table className="table table-hover">
  <thead className="table-light">
    <tr>
      <th>Booking #</th>
      <th>Customer</th>
      <th>Package</th>
      <th>Check-in</th>
      <th>Check-out</th>
      <th>Guests</th>
      <th>Total</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {bookings.map((booking) => (
      <tr key={booking.id}>
        {/* Booking data rows */}
      </tr>
    ))}
  </tbody>
</table>
```

### **4. Status Management**
```javascript
// Status update functions
const updateBookingStatus = async (bookingId, newStatus) => {
  try {
    const response = await apiService.updateBookingStatus(bookingId, newStatus);
    if (response.success) {
      toast.success(`Status booking berhasil diubah ke ${newStatus}`);
      fetchBookings(); // Refresh data
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    toast.error('Gagal mengubah status booking');
  }
};

// Status action buttons
<div className="btn-group btn-group-sm">
  <button
    className="btn btn-outline-primary"
    onClick={() => setSelectedBooking(booking)}
    title="View Details"
  >
    <i className="fas fa-eye"></i>
  </button>
  <button
    className="btn btn-outline-success"
    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
    title="Confirm"
    disabled={booking.status === 'confirmed'}
  >
    <i className="fas fa-check"></i>
  </button>
  <button
    className="btn btn-outline-warning"
    onClick={() => updateBookingStatus(booking.id, 'completed')}
    title="Complete"
    disabled={booking.status === 'completed'}
  >
    <i className="fas fa-flag-checkered"></i>
  </button>
</div>
```

---

## 🔧 **API INTEGRATION**

### **1. Backend Endpoints**

#### **GET /api/bookings**
```javascript
// Fetch all bookings
const fetchBookings = async () => {
  try {
    const response = await apiService.getBookings();
    if (response.success) {
      setBookings(response.data);
      calculateStats(response.data);
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    toast.error('Gagal mengambil data booking');
  }
};
```

#### **PUT /api/bookings/:id/status**
```javascript
// Update booking status
const updateBookingStatus = async (bookingId, status) => {
  const response = await apiRequest(`/bookings/${bookingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
  return response;
};
```

### **2. Data Structure**
```javascript
// Booking object structure
const booking = {
  id: 1,
  booking_number: "KW-20250720-081",
  customer_name: "Farrel Nehemiah Davidjoy Mamengko",
  customer_email: "farrel@gmail.com",
  customer_phone: "08123456789",
  package_name: "Basic Package",
  check_in_date: "2025-07-20",
  check_out_date: "2025-07-21",
  duration: 1,
  adults_count: 2,
  children_count: 0,
  total_amount: 275000,
  status: "pending",
  created_at: "2025-07-20T09:44:44.000Z",
  updated_at: "2025-07-20T09:44:44.000Z"
};
```

---

## 📊 **STATISTICS CALCULATION**

### **1. Real-time Statistics**
```javascript
// Calculate statistics from booking data
const calculateStats = (bookingData) => {
  const stats = {
    total: bookingData.length,
    pending: bookingData.filter(b => b.status === 'pending').length,
    confirmed: bookingData.filter(b => b.status === 'confirmed').length,
    completed: bookingData.filter(b => b.status === 'completed').length,
    cancelled: bookingData.filter(b => b.status === 'cancelled').length
  };
  setStats(stats);
};
```

### **2. Unique Customers Count**
```javascript
// Count unique customers
const uniqueCustomers = bookings.length > 0 
  ? new Set(bookings.map(b => b.customer_id)).size 
  : 0;
```

---

## 🎨 **UI/UX FEATURES**

### **1. Responsive Design**
- **Mobile Friendly:** Optimized for mobile devices
- **Table Responsive:** Horizontal scroll on small screens
- **Card Layout:** Statistics cards adapt to screen size

### **2. Loading States**
```javascript
// Loading spinner
if (loading) {
  return (
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Memuat data dashboard...</p>
    </div>
  );
}
```

### **3. Status Badges**
```javascript
// Color-coded status badges
const getStatusBadge = (status) => {
  const colors = {
    pending: 'warning',
    confirmed: 'info',
    completed: 'success',
    cancelled: 'danger'
  };
  return colors[status] || 'secondary';
};

// Usage
<span className={`badge bg-${getStatusBadge(booking.status)}`}>
  {booking.status}
</span>
```

### **4. Toast Notifications**
```javascript
// Success notification
toast.success(`Status booking berhasil diubah ke ${newStatus}`);

// Error notification
toast.error('Gagal mengubah status booking');

// Info notification
toast.info('Memuat data terbaru...');
```

---

## 📋 **BOOKING DETAILS MODAL**

### **1. Modal Structure**
```javascript
// Booking detail modal
{showModal && selectedBooking && (
  <div className="modal fade show" style={{ display: 'block' }}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Detail Booking - {selectedBooking.booking_number}
          </h5>
          <button className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>
        <div className="modal-body">
          {/* Customer Information */}
          <div className="row">
            <div className="col-md-6">
              <h6>Customer Information</h6>
              <p><strong>Name:</strong> {selectedBooking.customer_name}</p>
              <p><strong>Email:</strong> {selectedBooking.customer_email}</p>
              <p><strong>Phone:</strong> {selectedBooking.customer_phone}</p>
            </div>
            <div className="col-md-6">
              <h6>Booking Information</h6>
              <p><strong>Package:</strong> {selectedBooking.package_name}</p>
              <p><strong>Check-in:</strong> {formatDate(selectedBooking.check_in_date)}</p>
              <p><strong>Check-out:</strong> {formatDate(selectedBooking.check_out_date)}</p>
            </div>
          </div>
          
          {/* Pricing Information */}
          <div className="row">
            <div className="col-md-6">
              <h6>Pricing</h6>
              <p><strong>Total:</strong> {formatCurrency(selectedBooking.total_amount)}</p>
            </div>
            <div className="col-md-6">
              <h6>Status & Notes</h6>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
              <p><strong>Created:</strong> {formatDate(selectedBooking.created_at)}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleSendEmail}>
            Send Email
          </button>
        </div>
      </div>
    </div>
  </div>
)}
```

### **2. Modal Features**
- **Customer Details:** Complete customer information
- **Booking Details:** Package, dates, duration
- **Pricing Information:** Total amount, breakdown
- **Status History:** Current status and timestamps
- **Action Buttons:** Close modal, send email

---

## 🔄 **REAL-TIME UPDATES**

### **1. Auto-refresh Data**
```javascript
// Refresh booking data
const fetchBookings = async () => {
  setLoading(true);
  try {
    const response = await apiService.getBookings();
    if (response.success) {
      setBookings(response.data);
      calculateStats(response.data);
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    toast.error('Gagal mengambil data booking');
  } finally {
    setLoading(false);
  }
};

// Manual refresh button
<button className="btn btn-primary btn-sm" onClick={fetchBookings}>
  <i className="fas fa-sync-alt me-1"></i>
  Refresh
</button>
```

### **2. Status Update Flow**
```javascript
// Complete status update flow
const handleStatusUpdate = async (bookingId, newStatus) => {
  try {
    // 1. Update status in backend
    const response = await apiService.updateBookingStatus(bookingId, newStatus);
    
    if (response.success) {
      // 2. Show success notification
      toast.success(`Status booking berhasil diubah ke ${newStatus}`);
      
      // 3. Refresh data
      fetchBookings();
      
      // 4. Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      ));
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    toast.error('Gagal mengubah status booking');
  }
};
```

---

## 📊 **DATA FORMATTING**

### **1. Currency Formatting**
```javascript
// Format currency to Indonesian Rupiah
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Usage
formatCurrency(275000); // "Rp 275.000"
```

### **2. Date Formatting**
```javascript
// Format date to Indonesian format
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Usage
formatDate('2025-07-20'); // "20 Juli 2025"
```

---

## 🔒 **SECURITY FEATURES**

### **1. Input Validation**
```javascript
// Validate status updates
const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
if (!validStatuses.includes(status)) {
  throw new Error('Invalid status');
}
```

### **2. Error Handling**
```javascript
// Comprehensive error handling
try {
  const response = await apiService.updateBookingStatus(bookingId, status);
  // Handle success
} catch (error) {
  console.error('Error:', error);
  toast.error('Gagal mengubah status booking');
  // Log error for debugging
}
```

---

## 📱 **MOBILE OPTIMIZATION**

### **1. Responsive Table**
```css
/* Mobile-friendly table */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Hide less important columns on mobile */
@media (max-width: 768px) {
  .table-responsive .d-none-mobile {
    display: none;
  }
}
```

### **2. Touch-friendly Buttons**
```css
/* Large touch targets */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 8px 16px;
}

/* Button group spacing */
.btn-group .btn {
  margin: 0 2px;
}
```

---

## 🧪 **TESTING**

### **1. Unit Tests**
```javascript
// Test statistics calculation
describe('Dashboard Statistics', () => {
  test('calculates correct statistics', () => {
    const mockBookings = [
      { status: 'pending' },
      { status: 'confirmed' },
      { status: 'completed' },
      { status: 'pending' }
    ];
    
    const stats = calculateStats(mockBookings);
    
    expect(stats.total).toBe(4);
    expect(stats.pending).toBe(2);
    expect(stats.confirmed).toBe(1);
    expect(stats.completed).toBe(1);
  });
});
```

### **2. Integration Tests**
```javascript
// Test status update flow
test('updates booking status successfully', async () => {
  render(<Dashboard />);
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('KW-20250720-081')).toBeInTheDocument();
  });
  
  // Click confirm button
  const confirmButton = screen.getByTitle('Confirm');
  fireEvent.click(confirmButton);
  
  // Check status update
  await waitFor(() => {
    expect(screen.getByText('confirmed')).toBeInTheDocument();
  });
});
```

---

## 📈 **PERFORMANCE OPTIMIZATION**

### **1. Data Caching**
```javascript
// Cache booking data
const [bookings, setBookings] = useState([]);
const [lastFetch, setLastFetch] = useState(null);

// Only fetch if data is stale
const shouldFetchData = () => {
  return !lastFetch || Date.now() - lastFetch > 30000; // 30 seconds
};
```

### **2. Debounced Search**
```javascript
// Debounce search input
const debouncedSearch = useCallback(
  debounce((searchTerm) => {
    // Perform search
    filterBookings(searchTerm);
  }, 300),
  []
);
```

### **3. Virtual Scrolling**
```javascript
// For large datasets
import { FixedSizeList as List } from 'react-window';

const VirtualizedTable = ({ bookings }) => (
  <List
    height={400}
    itemCount={bookings.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>
        <BookingRow booking={bookings[index]} />
      </div>
    )}
  </List>
);
```

---

## 📊 **ANALYTICS & REPORTING**

### **1. Dashboard Metrics**
```javascript
// Calculate additional metrics
const calculateMetrics = (bookings) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.total_amount, 0);
  const averageBookingValue = totalRevenue / bookings.length;
  const conversionRate = (bookings.filter(b => b.status === 'completed').length / bookings.length) * 100;
  
  return {
    totalRevenue,
    averageBookingValue,
    conversionRate
  };
};
```

### **2. Export Functionality**
```javascript
// Export booking data to CSV
const exportToCSV = (bookings) => {
  const csvContent = bookings.map(booking => 
    `${booking.booking_number},${booking.customer_name},${booking.package_name},${booking.total_amount}`
  ).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bookings.csv';
  a.click();
};
```

---

## 🔧 **MAINTENANCE & TROUBLESHOOTING**

### **1. Common Issues**

#### **Data Not Loading**
```javascript
// Check API connection
const checkApiHealth = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('API Health:', data);
  } catch (error) {
    console.error('API not accessible:', error);
  }
};
```

#### **Status Update Fails**
```javascript
// Debug status update
const debugStatusUpdate = async (bookingId, status) => {
  console.log('Updating booking:', { bookingId, status });
  
  try {
    const response = await apiService.updateBookingStatus(bookingId, status);
    console.log('Update response:', response);
  } catch (error) {
    console.error('Update error:', error);
  }
};
```

### **2. Performance Monitoring**
```javascript
// Monitor dashboard performance
const monitorPerformance = () => {
  const startTime = performance.now();
  
  // Dashboard operations
  
  const endTime = performance.now();
  console.log(`Dashboard loaded in ${endTime - startTime}ms`);
};
```

---

## 📝 **CHANGELOG**

### **v1.0 (Current)**
- ✅ **Added:** Complete dashboard interface
- ✅ **Added:** Statistics overview
- ✅ **Added:** Booking management
- ✅ **Added:** Status updates
- ✅ **Added:** Real-time data refresh
- ✅ **Added:** Responsive design
- ✅ **Added:** Error handling
- ✅ **Updated:** Admin email to kknkampungkwau@gmail.com

### **Future Features**
- 🔄 **Planned:** Advanced filtering
- 🔄 **Planned:** Export functionality
- 🔄 **Planned:** Email templates
- 🔄 **Planned:** User management
- 🔄 **Planned:** Analytics dashboard

---

## 🎯 **BEST PRACTICES**

### **1. Data Management**
- ✅ Always validate data before updates
- ✅ Use proper error boundaries
- ✅ Implement loading states
- ✅ Cache data appropriately

### **2. User Experience**
- ✅ Provide clear feedback for actions
- ✅ Use consistent UI patterns
- ✅ Implement keyboard shortcuts
- ✅ Ensure accessibility compliance

### **3. Performance**
- ✅ Optimize API calls
- ✅ Use proper memoization
- ✅ Implement virtual scrolling for large datasets
- ✅ Monitor bundle size

### **4. Security**
- ✅ Validate all inputs
- ✅ Sanitize data before display
- ✅ Implement proper authentication
- ✅ Log security events

---

## 📞 **SUPPORT**

### **Development Resources**
- **React Documentation:** https://reactjs.org/docs/
- **Bootstrap Documentation:** https://getbootstrap.com/docs/
- **API Documentation:** actions/API_ENDPOINTS_DOCUMENTATION.md

### **Contact Information**
- **Email:** kknkampungkwau@gmail.com
- **Dashboard URL:** http://localhost:3000/dashboard
- **Backend API:** http://localhost:5000/api

### **Troubleshooting**
- **Check Console:** Browser developer tools for errors
- **API Health:** http://localhost:5000/api/health
- **Database:** Check SQLite database file
- **Logs:** Monitor backend server logs

---

*Dokumentasi Dashboard Admin Kampung Kwau - Papua Barat* 