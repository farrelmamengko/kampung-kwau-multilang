# 🎨 FRONTEND DOCUMENTATION
## Kampung Kwau Booking System

### 📋 **OVERVIEW**
Frontend Kampung Kwau dibangun dengan **React.js** dan menggunakan **React Hook Form** untuk form handling, **EmailJS** untuk email service, dan **Bootstrap** untuk UI components.

---

## 🏗️ **TECHNOLOGY STACK**

### **Core Technologies:**
- **React.js 18** - Frontend framework
- **React Router** - Navigation & routing
- **React Hook Form** - Form management
- **React i18next** - Internationalization
- **Bootstrap 5** - UI framework
- **EmailJS** - Email service integration

### **Additional Libraries:**
- **React DatePicker** - Date selection
- **React Toastify** - Notifications
- **React Icons** - Icon library

---

## 📁 **PROJECT STRUCTURE**

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Heading.jsx         # Page headings
│   │   ├── Modal.jsx           # Modal components
│   │   └── SocialIcons.jsx     # Social media icons
│   ├── home/
│   │   ├── Home.js             # Homepage components
│   │   ├── About.js            # About section
│   │   ├── Carousel.js         # Image carousel
│   │   ├── Rooms.js            # Package display
│   │   └── Team.js             # Team section
│   └── data/
│       └── Data.jsx            # Static data & translations
├── pages/
│   ├── BookingPage.js          # Booking form (multi-step)
│   ├── Dashboard.js            # Admin dashboard
│   ├── AboutUs.js              # About page
│   ├── ContactPage.js          # Contact page
│   └── PageNotFound.js         # 404 page
├── services/
│   ├── apiService.js           # Backend API integration
│   ├── emailService.js         # Email service
│   └── bookingService.js       # Booking logic
├── css/
│   ├── style.css               # Custom styles
│   ├── bootstrap.min.css       # Bootstrap framework
│   └── animate.css             # Animations
└── translations/
    ├── id/                     # Indonesian translations
    └── en/                     # English translations
```

---

## 🎯 **KEY COMPONENTS**

### **1. BookingPage.js - Multi-Step Booking Form**

#### **Features:**
- **5-Step Process:** Package → Date → Activities → Personal Info → Confirmation
- **Real-time Pricing:** Automatic calculation based on selections
- **Form Validation:** Required fields and data validation
- **Email Integration:** Customer confirmation + admin notification
- **API Integration:** Backend database storage

#### **Step Flow:**
```javascript
Step 1: Package Selection
├── Display available packages
├── Package details & pricing
└── Select package

Step 2: Date & Guests
├── Check-in/out date picker
├── Adults/children count
└── Price preview

Step 3: Additional Activities
├── Optional activities
├── Activity pricing
└── Total calculation

Step 4: Personal Information
├── Customer details form
├── Special requests
└── Emergency contact

Step 5: Confirmation
├── Booking summary
├── Email sending
└── Success message
```

#### **Form Validation:**
```javascript
const { register, handleSubmit, watch, formState: { errors } } = useForm();

// Required fields validation
{...register('customerName', { 
  required: 'Nama wajib diisi',
  minLength: { value: 2, message: 'Nama minimal 2 karakter' }
})}

// Email validation
{...register('email', { 
  required: 'Email wajib diisi',
  pattern: { 
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email tidak valid'
  }
})}
```

### **2. Dashboard.js - Admin Dashboard**

#### **Features:**
- **Statistics Cards:** Total, pending, confirmed, completed, cancelled bookings
- **Booking Management:** View, update status, view details
- **Real-time Data:** Auto-refresh from backend API
- **Responsive Design:** Mobile and desktop friendly

#### **Dashboard Sections:**
```javascript
// Statistics Overview
const stats = {
  total: bookingData.length,
  pending: bookingData.filter(b => b.status === 'pending').length,
  confirmed: bookingData.filter(b => b.status === 'confirmed').length,
  completed: bookingData.filter(b => b.status === 'completed').length,
  cancelled: bookingData.filter(b => b.status === 'cancelled').length
};

// Booking List Table
const bookingColumns = [
  'Booking #', 'Customer', 'Package', 'Check-in', 
  'Check-out', 'Guests', 'Total', 'Status', 'Actions'
];

// Status Management
const updateBookingStatus = async (bookingId, newStatus) => {
  await apiService.updateBookingStatus(bookingId, newStatus);
  fetchBookings(); // Refresh data
};
```

#### **Status Actions:**
- **👁️ View Details:** Modal with complete booking information
- **✅ Confirm:** Change status to 'confirmed'
- **🏁 Complete:** Change status to 'completed'
- **❌ Cancel:** Change status to 'cancelled'

### **3. Header.jsx - Navigation**

#### **Features:**
- **Multi-language Support:** Indonesian/English toggle
- **Responsive Menu:** Mobile hamburger menu
- **Dropdown Navigation:** Organized page categories
- **Social Media Links:** Direct social media access

#### **Navigation Structure:**
```javascript
const navList = [
  { path: "/", text: "home" },
  { path: "/about", text: "about" },
  { path: "/potensilokal", text: "potensilokal" },
  { path: "/paketwisata", text: "paketwisata" },
  { 
    path: "/page", 
    text: "page",
    subItems: [
      { path: "/booking", text: "booking" },
      { path: "/booking-status", text: "bookingStatus" },
      { path: "/dashboard", text: "dashboard" }, // Admin dashboard
      { path: "/strukturkampung", text: "strukturkampung" },
      { path: "/birdmapping", text: "birdmapping" }
    ]
  },
  { path: "/contact", text: "contact" }
];
```

---

## 🔧 **SERVICES INTEGRATION**

### **1. API Service (apiService.js)**

#### **Backend Communication:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Create booking
export const createBooking = (bookingData) => 
  apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });

// Get all bookings (dashboard)
export const getBookings = () => 
  apiRequest('/bookings');

// Update booking status
export const updateBookingStatus = (bookingId, status) =>
  apiRequest(`/bookings/${bookingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
```

### **2. Email Service (emailService.js)**

#### **Email Integration:**
```javascript
// Customer confirmation email
export const sendBookingConfirmation = async (bookingData) => {
  const templateParams = {
    email: bookingData.customer.email,
    customer_name: bookingData.customer.name,
    booking_number: bookingData.bookingNumber,
    package_name: bookingData.booking.packageName,
    // ... more parameters
  };
  
  return await emailjs.send(
    EMAIL_CONFIG.serviceId,
    EMAIL_CONFIG.templateId,
    templateParams
  );
};

// Admin notification email
export const sendAdminNotification = async (bookingData) => {
  const adminTemplateParams = {
    email: EMAIL_CONFIG.adminEmail,
    customer_name: bookingData.customer.name,
    booking_number: bookingData.bookingNumber,
    // ... more parameters
  };
  
  return await emailjs.send(
    EMAIL_CONFIG.serviceId,
    EMAIL_CONFIG.templateId,
    adminTemplateParams
  );
};
```

---

## 🌍 **INTERNATIONALIZATION**

### **Translation Structure:**
```javascript
// src/translations/id/common.json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "booking": "Booking",
    "dashboard": "Dashboard Admin"
  },
  "pages": {
    "booking": {
      "title": "Booking Paket Wisata",
      "step1": "Pilih Paket",
      "step2": "Tanggal & Tamu",
      "step3": "Aktivitas Tambahan",
      "step4": "Data Pribadi",
      "step5": "Konfirmasi"
    }
  }
}
```

### **Language Switching:**
```javascript
const { t, i18n } = useTranslation();

// Change language
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

// Use translations
<h1>{t('pages:booking.title')}</h1>
```

---

## 🎨 **UI/UX FEATURES**

### **1. Responsive Design**
- **Mobile First:** Optimized for mobile devices
- **Bootstrap Grid:** Responsive layout system
- **Touch Friendly:** Large buttons and touch targets

### **2. Loading States**
```javascript
const [loading, setLoading] = useState(false);

// Show loading spinner
{loading && (
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
)}
```

### **3. Toast Notifications**
```javascript
import { toast } from 'react-toastify';

// Success notification
toast.success('Booking berhasil dibuat!');

// Error notification
toast.error('Gagal membuat booking: ' + error.message);

// Info notification
toast.info('Memproses booking...');
```

### **4. Form Validation**
```javascript
// Real-time validation
const watchedAdults = watch('adults', 1);
const watchedChildren = watch('children', 0);

// Price calculation
useEffect(() => {
  if (selectedPackage && watchedAdults) {
    const pricing = calculateTotalPrice(
      selectedPackage,
      { adults: watchedAdults, children: watchedChildren },
      selectedActivities,
      duration
    );
    setTotalPricing(pricing);
  }
}, [selectedPackage, watchedAdults, watchedChildren, selectedActivities, duration]);
```

---

## 🚀 **PERFORMANCE OPTIMIZATION**

### **1. Code Splitting**
```javascript
// Lazy load components
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Suspense wrapper
<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

### **2. Memoization**
```javascript
// Memoize expensive calculations
const totalPricing = useMemo(() => {
  return calculateTotalPrice(package, guests, activities, duration);
}, [package, guests, activities, duration]);
```

### **3. Debounced Input**
```javascript
// Debounce search input
const debouncedSearch = useCallback(
  debounce((searchTerm) => {
    // Perform search
  }, 300),
  []
);
```

---

## 🔒 **SECURITY FEATURES**

### **1. Input Sanitization**
```javascript
// Sanitize user input
const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### **2. CSRF Protection**
```javascript
// Include CSRF token in API requests
const apiRequest = async (endpoint, options = {}) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    }
  };
  
  // ... rest of implementation
};
```

---

## 🧪 **TESTING**

### **1. Unit Testing**
```javascript
// Test booking form validation
describe('BookingForm', () => {
  test('validates required fields', () => {
    render(<BookingForm />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Nama wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Email wajib diisi')).toBeInTheDocument();
  });
});
```

### **2. Integration Testing**
```javascript
// Test booking flow
test('complete booking flow', async () => {
  render(<BookingPage />);
  
  // Select package
  fireEvent.click(screen.getByText('Basic Package'));
  
  // Fill form
  fireEvent.change(screen.getByLabelText('Nama'), {
    target: { value: 'Test Customer' }
  });
  
  // Submit
  fireEvent.click(screen.getByText('Submit'));
  
  // Check success
  await waitFor(() => {
    expect(screen.getByText('Booking berhasil dibuat!')).toBeInTheDocument();
  });
});
```

---

## 📱 **MOBILE OPTIMIZATION**

### **1. Touch Interactions**
```css
/* Large touch targets */
.btn {
  min-height: 44px;
  min-width: 44px;
}

/* Touch-friendly form inputs */
.form-control {
  font-size: 16px; /* Prevents zoom on iOS */
  padding: 12px;
}
```

### **2. Mobile Navigation**
```javascript
// Collapsible mobile menu
const [navbarCollapse, setNavbarCollapse] = useState(false);

<button 
  className="navbar-toggler"
  onClick={() => setNavbarCollapse(!navbarCollapse)}
>
  <span className="navbar-toggler-icon"></span>
</button>
```

---

## 🔧 **DEPLOYMENT**

### **1. Build Process**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### **2. Environment Variables**
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=service_iggrh35
REACT_APP_EMAILJS_TEMPLATE_ID=template_n1es8q7
REACT_APP_EMAILJS_USER_ID=cERh5Eezr8mKQn9Vt
```

### **3. Static File Serving**
```javascript
// Serve static files
app.use(express.static('build'));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```

---

## 📊 **ANALYTICS & MONITORING**

### **1. Error Tracking**
```javascript
// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }
}
```

### **2. Performance Monitoring**
```javascript
// Measure component render time
const startTime = performance.now();
// ... component logic
const endTime = performance.now();
console.log(`Component rendered in ${endTime - startTime}ms`);
```

---

## 📝 **CHANGELOG**

### **v2.0 (Current)**
- ✅ **Added:** Admin dashboard with booking management
- ✅ **Fixed:** Duplicate email issue
- ✅ **Added:** Real-time booking status updates
- ✅ **Improved:** Form validation and error handling
- ✅ **Added:** Multi-language support for dashboard

### **v1.0 (Previous)**
- ✅ **Added:** Multi-step booking form
- ✅ **Added:** Email integration
- ✅ **Added:** Responsive design
- ✅ **Added:** Basic navigation

---

## 🎯 **BEST PRACTICES**

### **1. Code Organization**
- ✅ Use functional components with hooks
- ✅ Separate concerns (UI, logic, data)
- ✅ Consistent naming conventions
- ✅ Proper file structure

### **2. Performance**
- ✅ Lazy load components
- ✅ Memoize expensive calculations
- ✅ Optimize re-renders
- ✅ Use proper key props

### **3. Accessibility**
- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader support

### **4. User Experience**
- ✅ Clear error messages
- ✅ Loading states
- ✅ Form validation feedback
- ✅ Responsive design

---

## 📞 **SUPPORT**

### **Development Tools**
- **React DevTools:** Browser extension for debugging
- **Redux DevTools:** State management debugging
- **Lighthouse:** Performance auditing

### **Documentation**
- **React Docs:** https://reactjs.org/docs/
- **Bootstrap Docs:** https://getbootstrap.com/docs/
- **EmailJS Docs:** https://www.emailjs.com/docs/

### **Community**
- **React Community:** https://reactjs.org/community/
- **Stack Overflow:** React.js tagged questions
- **GitHub Issues:** Project-specific issues 