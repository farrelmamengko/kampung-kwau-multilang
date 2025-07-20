# 🎨 FRONTEND DOCUMENTATION - KAMPUNG KWAU

## 📋 **OVERVIEW**
Frontend React.js untuk website wisata Kampung Kwau yang menangani UI/UX, form handling, API communication, dan email integration.

---

## 🏗️ **ARCHITECTURE**

### 📊 **Tech Stack:**
- **Framework:** React.js
- **Build Tool:** Vite
- **UI Library:** Bootstrap 5
- **Form Handling:** React Hook Form
- **Email Service:** EmailJS
- **API Client:** Fetch API
- **Port:** 3000/5173

### 🔄 **Application Flow:**
```
User Input → React Components → API Calls → Backend → Database → Email → Success
```

---

## 📁 **PROJECT STRUCTURE**

```
src/
├── components/
│   ├── common/              # Shared components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   └── SocialIcons.jsx
│   ├── home/                # Home page components
│   │   ├── Carousel.js
│   │   ├── About.js
│   │   ├── Services.js
│   │   ├── Rooms.js
│   │   └── Team.js
│   └── data/                # Static data
│       └── Data.jsx
├── pages/                   # Page components
│   ├── BookingPage.js       # Main booking form
│   ├── BookingStatus.js     # Booking status check
│   ├── AboutUs.js
│   ├── ContactPage.js
│   └── ServicesPage.js
├── services/                # API & external services
│   ├── apiService.js        # Backend API calls
│   └── emailService.js      # EmailJS integration
├── translations/            # i18n files
│   ├── en/
│   └── id/
├── css/                     # Stylesheets
│   ├── style.css
│   └── bootstrap.min.css
├── firebase/                # Firebase config
│   └── config.js
├── App.js                   # Main app component
└── index.js                 # Entry point
```

---

## 🚀 **SETUP & INSTALLATION**

### 📦 **Dependencies:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "react-hook-form": "^7.43.0",
  "@emailjs/browser": "^3.11.0",
  "bootstrap": "^5.3.0",
  "vite": "^4.1.0"
}
```

### 🛠️ **Installation Commands:**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🔧 **Environment Setup:**
```bash
# Development server
http://localhost:5173

# Production build
npm run build
```

---

## 🎯 **KEY COMPONENTS**

### 📝 **BOOKING PAGE (BookingPage.js)**

#### **Component Overview:**
Main booking form dengan 5 step wizard untuk membuat reservasi wisata.

#### **Features:**
- **Multi-step form** dengan React Hook Form
- **Package selection** dengan pricing calculation
- **Date picker** untuk check-in/check-out
- **Guest counter** untuk dewasa dan anak-anak
- **Additional activities** selection
- **Personal information** form
- **Booking confirmation** review
- **API integration** dengan backend
- **Email notification** via EmailJS

#### **Form Steps:**
```javascript
const steps = [
  { id: 1, title: 'Select Package' },
  { id: 2, title: 'Date & Guests' },
  { id: 3, title: 'Additional Activities' },
  { id: 4, title: 'Personal Information' },
  { id: 5, title: 'Confirmation' }
];
```

#### **State Management:**
```javascript
const [currentStep, setCurrentStep] = useState(1);
const [selectedPackage, setSelectedPackage] = useState(null);
const [checkInDate, setCheckInDate] = useState(null);
const [checkOutDate, setCheckOutDate] = useState(null);
const [totalPricing, setTotalPricing] = useState({
  adultPrice: 0,
  childPrice: 0,
  subtotal: 0,
  tax: 0,
  total: 0
});
```

---

### 🔌 **API SERVICE (apiService.js)**

#### **Service Overview:**
Centralized API client untuk komunikasi dengan backend server.

#### **Key Methods:**
```javascript
// Create new booking
const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  return response.json();
};

// Get all bookings
const getBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  return response.json();
};
```

#### **Error Handling:**
```javascript
const handleApiError = (error) => {
  console.error('API Error:', error);
  throw new Error('Failed to communicate with server');
};
```

---

### 📧 **EMAIL SERVICE (emailService.js)**

#### **Service Overview:**
EmailJS integration untuk mengirim konfirmasi booking via email.

#### **Configuration:**
```javascript
const EMAIL_CONFIG = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key'
};
```

#### **Key Methods:**
```javascript
// Send booking confirmation
const sendBookingConfirmation = async (bookingData) => {
  const templateParams = {
    to_email: bookingData.customer.email,
    customer_name: bookingData.customer.name,
    booking_number: bookingData.booking_number,
    package_name: bookingData.package.name,
    check_in_date: bookingData.check_in_date,
    total_amount: bookingData.total_amount
  };

  return emailjs.send(
    EMAIL_CONFIG.serviceId,
    EMAIL_CONFIG.templateId,
    templateParams,
    EMAIL_CONFIG.publicKey
  );
};
```

---

## 🎨 **UI/UX COMPONENTS**

### 🏠 **HEADER COMPONENT**
```javascript
// Navigation menu dengan responsive design
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/">
          Kampung Kwau
        </a>
        <div className="navbar-nav">
          <a className="nav-link" href="/">Home</a>
          <a className="nav-link" href="/about">About</a>
          <a className="nav-link" href="/booking">Booking</a>
          <a className="nav-link" href="/contact">Contact</a>
        </div>
      </div>
    </nav>
  );
};
```

### 📋 **MODAL COMPONENT**
```javascript
// Reusable modal untuk notifications
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{title}</h5>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
```

---

## 🔄 **STATE MANAGEMENT**

### 📊 **Local State:**
```javascript
// Form data management
const { register, handleSubmit, formState: { errors } } = useForm();

// Component state
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);
```

### 🔗 **API State:**
```javascript
// API response handling
const [apiData, setApiData] = useState(null);
const [apiLoading, setApiLoading] = useState(false);
const [apiError, setApiError] = useState(null);
```

---

## 🎯 **FORM VALIDATION**

### ✅ **Validation Rules:**
```javascript
// Required fields validation
const required = { required: 'This field is required' };

// Email validation
const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email'
  }
};

// Phone validation
const phoneValidation = {
  pattern: {
    value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
    message: 'Please enter a valid phone number'
  }
};
```

### 🚨 **Error Display:**
```javascript
// Error message component
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return <span className="error-message">{error.message}</span>;
};
```

---

## 🎨 **STYLING & THEMING**

### 🎨 **CSS Architecture:**
```css
/* Global styles */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
}

/* Component styles */
.booking-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.package-card {
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.package-card.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
}
```

### 📱 **Responsive Design:**
```css
/* Mobile first approach */
@media (max-width: 768px) {
  .booking-form {
    padding: 1rem;
  }
  
  .step-indicator {
    flex-direction: column;
    gap: 1rem;
  }
  
  .package-card {
    margin-bottom: 1rem;
  }
}
```

---

## 🔧 **CONFIGURATION**

### ⚙️ **Environment Variables:**
```javascript
// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};
```

### 🎯 **Feature Flags:**
```javascript
// Development features
const DEV_FEATURES = {
  debugMode: import.meta.env.DEV,
  mockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  logApiCalls: import.meta.env.VITE_LOG_API_CALLS === 'true'
};
```

---

## 🧪 **TESTING**

### 🧪 **Component Testing:**
```javascript
// Booking form test
describe('BookingPage', () => {
  test('renders booking form', () => {
    render(<BookingPage />);
    expect(screen.getByText('Choose Tour Package')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<BookingPage />);
    const submitButton = screen.getByText('Create Booking');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });
});
```

### 🔗 **API Testing:**
```javascript
// API service test
describe('apiService', () => {
  test('creates booking successfully', async () => {
    const mockBookingData = {
      customer: { name: 'John Doe', email: 'john@example.com' },
      package: { name: 'Basic Package' }
    };

    const result = await createBooking(mockBookingData);
    expect(result.success).toBe(true);
  });
});
```

---

## 🚀 **DEPLOYMENT**

### 📦 **Build Process:**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build
npm run preview
```

### 🌐 **Deployment Options:**
- **Netlify** - Static site hosting
- **Vercel** - React app deployment
- **GitHub Pages** - Free hosting
- **AWS S3** - Static website hosting

### 🔧 **Build Configuration:**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
```

---

## 📊 **PERFORMANCE OPTIMIZATION**

### ⚡ **Code Splitting:**
```javascript
// Lazy load components
const BookingPage = lazy(() => import('./pages/BookingPage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <BookingPage />
</Suspense>
```

### 🖼️ **Image Optimization:**
```javascript
// Optimized images
<img 
  src="/assets/img/optimized-image.webp"
  loading="lazy"
  alt="Kampung Kwau"
/>
```

### 📦 **Bundle Optimization:**
```javascript
// Tree shaking
import { useState, useEffect } from 'react';
// Instead of: import React from 'react';
```

---

## 🔒 **SECURITY**

### 🛡️ **Security Measures:**
- **Input validation** - Sanitize user inputs
- **XSS prevention** - React built-in protection
- **CSRF protection** - API token validation
- **HTTPS enforcement** - Secure connections

### 🔐 **Data Protection:**
```javascript
// Sensitive data handling
const sanitizeUserInput = (input) => {
  return DOMPurify.sanitize(input);
};

// API key protection
const API_KEY = import.meta.env.VITE_API_KEY;
```

---

## 🔄 **MAINTENANCE**

### 🧹 **Regular Tasks:**
- **Dependency updates** - Security patches
- **Performance monitoring** - Bundle size analysis
- **Code cleanup** - Remove unused code
- **Documentation updates** - Keep docs current

### 🛠️ **Troubleshooting:**
```bash
# Check for issues
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update

# Clear cache
npm run clean
```

---

## 📞 **SUPPORT & CONTACT**

### 🛠️ **Development Team:**
- **Lead Developer:** AI Assistant
- **Project:** Kampung Kwau Booking System
- **Repository:** Local development

### 📧 **Contact Information:**
- **Email:** support@kampungkwaupapua.com
- **Documentation:** actions/FRONTEND_DOCUMENTATION.md
- **Last Updated:** December 2024

---

## 📋 **CHECKLIST**

### ✅ **Pre-deployment Checklist:**
- [ ] All tests passing
- [ ] Build successful
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Documentation updated
- [ ] Environment variables set
- [ ] API endpoints tested
- [ ] Email service configured

### ✅ **Post-deployment Checklist:**
- [ ] Website accessible
- [ ] Booking form functional
- [ ] Email notifications working
- [ ] Database connection stable
- [ ] Error monitoring active
- [ ] Performance monitoring active

---

*Dokumentasi ini dibuat untuk frontend React Kampung Kwau - Papua Barat* 