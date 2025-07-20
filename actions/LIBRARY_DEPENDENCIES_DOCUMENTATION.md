# 📚 LIBRARY & DEPENDENCIES DOCUMENTATION - KAMPUNG KWAU

## 📋 **OVERVIEW**
Dokumentasi lengkap untuk semua library, dependencies, dan tools yang digunakan dalam sistem booking Kampung Kwau.

---

## 🏗️ **TECH STACK OVERVIEW**

### 📊 **Frontend Stack:**
- **React.js** - UI Framework
- **Vite** - Build Tool
- **Bootstrap 5** - CSS Framework
- **React Hook Form** - Form Management
- **EmailJS** - Email Service

### ⚙️ **Backend Stack:**
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **SQLite** - Database
- **better-sqlite3** - SQLite Driver

### 🌍 **Development Tools:**
- **Git** - Version Control
- **npm** - Package Manager
- **ESLint** - Code Linting
- **Prettier** - Code Formatting

---

## 📦 **FRONTEND DEPENDENCIES**

### 🎨 **Core Dependencies**

#### **React.js (^18.2.0)**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```
**Purpose:** UI framework untuk building user interface
**Features:**
- Component-based architecture
- Virtual DOM for performance
- JSX syntax
- Hooks for state management

**Usage:**
```javascript
import React, { useState, useEffect } from 'react';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  useEffect(() => {
    // Component lifecycle
  }, []);
  
  return (
    <div className="booking-page">
      {/* JSX content */}
    </div>
  );
};
```

#### **React Router DOM (^6.8.0)**
```json
{
  "react-router-dom": "^6.8.0"
}
```
**Purpose:** Client-side routing untuk single-page application
**Features:**
- Declarative routing
- Nested routes
- Route parameters
- Navigation guards

**Usage:**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
};
```

---

### 📝 **Form Management**

#### **React Hook Form (^7.43.0)**
```json
{
  "react-hook-form": "^7.43.0"
}
```
**Purpose:** Performant form library dengan minimal re-renders
**Features:**
- Uncontrolled components
- Built-in validation
- Error handling
- Form state management

**Usage:**
```javascript
import { useForm } from 'react-hook-form';

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('customerName', { 
          required: 'Nama wajib diisi' 
        })}
        placeholder="Nama lengkap"
      />
      {errors.customerName && (
        <span>{errors.customerName.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
```

**Validation Rules:**
```javascript
const validationRules = {
  customerName: {
    required: 'Nama lengkap wajib diisi',
    minLength: { value: 2, message: 'Minimal 2 karakter' }
  },
  email: {
    required: 'Email wajib diisi',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Format email tidak valid'
    }
  },
  phone: {
    required: 'Nomor telepon wajib diisi',
    pattern: {
      value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
      message: 'Format nomor telepon tidak valid'
    }
  }
};
```

---

### 🎨 **UI Framework**

#### **Bootstrap 5 (^5.3.0)**
```json
{
  "bootstrap": "^5.3.0"
}
```
**Purpose:** CSS framework untuk responsive design
**Features:**
- Grid system
- Component library
- Utility classes
- Responsive breakpoints

**Usage:**
```javascript
// Import in main CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

// Component usage
const PackageCard = () => {
  return (
    <div className="card package-card">
      <div className="card-body">
        <h5 className="card-title">Basic Package</h5>
        <p className="card-text">Package description</p>
        <button className="btn btn-primary">Select Package</button>
      </div>
    </div>
  );
};
```

**Custom Bootstrap Variables:**
```css
:root {
  --bs-primary: #007bff;
  --bs-secondary: #6c757d;
  --bs-success: #28a745;
  --bs-danger: #dc3545;
  --bs-warning: #ffc107;
  --bs-info: #17a2b8;
}
```

---

### 📧 **Email Service**

#### **EmailJS Browser (^3.11.0)**
```json
{
  "@emailjs/browser": "^3.11.0"
}
```
**Purpose:** Email service integration untuk mengirim email dari frontend
**Features:**
- Template-based emails
- SMTP integration
- Email tracking
- Spam protection

**Usage:**
```javascript
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

// Send email
const sendEmail = async (templateParams) => {
  try {
    const response = await emailjs.send(
      'service_id',
      'template_id',
      templateParams,
      'public_key'
    );
    
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};
```

**Email Template Parameters:**
```javascript
const emailParams = {
  to_email: 'customer@example.com',
  customer_name: 'John Doe',
  booking_number: 'KW-20241225-001',
  package_name: 'Basic Package',
  total_amount: 'Rp 625.000',
  check_in_date: '2024-12-25'
};
```

---

### 🛠️ **Build Tools**

#### **Vite (^4.1.0)**
```json
{
  "vite": "^4.1.0",
  "@vitejs/plugin-react": "^3.0.0"
}
```
**Purpose:** Modern build tool untuk fast development dan optimized production builds
**Features:**
- Hot module replacement
- Fast build times
- Optimized bundling
- Plugin ecosystem

**Configuration (vite.config.js):**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
});
```

---

## ⚙️ **BACKEND DEPENDENCIES**

### 🚀 **Core Dependencies**

#### **Express.js (^4.18.2)**
```json
{
  "express": "^4.18.2"
}
```
**Purpose:** Web framework untuk Node.js
**Features:**
- Routing
- Middleware support
- Static file serving
- Error handling

**Usage:**
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/bookings', async (req, res) => {
  try {
    // Handle booking creation
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

---

### 🗄️ **Database**

#### **Better SQLite3 (^9.2.2)**
```json
{
  "better-sqlite3": "^9.2.2"
}
```
**Purpose:** High-performance SQLite3 driver untuk Node.js
**Features:**
- Synchronous API
- Prepared statements
- Transactions
- Connection pooling

**Usage:**
```javascript
const Database = require('better-sqlite3');

// Create database connection
const db = new Database('./database/kwau_booking.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
  )
`);

// Insert data
const insertPackage = db.prepare(`
  INSERT INTO packages (name, price) VALUES (?, ?)
`);
insertPackage.run('Basic Package', 250000);

// Query data
const packages = db.prepare('SELECT * FROM packages').all();
console.log(packages);

// Close connection
db.close();
```

**Transaction Example:**
```javascript
const createBooking = db.transaction((bookingData) => {
  // Insert customer
  const customerResult = insertCustomer.run(
    bookingData.customer.name,
    bookingData.customer.email
  );
  
  // Insert booking
  const bookingResult = insertBooking.run(
    customerResult.lastInsertRowid,
    bookingData.package.id
  );
  
  return {
    customer_id: customerResult.lastInsertRowid,
    booking_id: bookingResult.lastInsertRowid
  };
});
```

---

### 🌐 **CORS Support**

#### **CORS (^2.8.5)**
```json
{
  "cors": "^2.8.5"
}
```
**Purpose:** Cross-origin resource sharing middleware
**Features:**
- Cross-origin requests
- Configurable origins
- Credentials support
- Preflight handling

**Usage:**
```javascript
const cors = require('cors');

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

app.use(cors(corsOptions));
```

---

## 🛠️ **DEVELOPMENT DEPENDENCIES**

### 🔍 **Code Quality**

#### **ESLint (^8.0.0)**
```json
{
  "eslint": "^8.0.0",
  "eslint-plugin-react": "^7.33.0",
  "eslint-plugin-react-hooks": "^4.6.0"
}
```
**Purpose:** Code linting untuk maintain code quality
**Features:**
- Syntax checking
- Code style enforcement
- Best practices
- Customizable rules

**Configuration (.eslintrc.js):**
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
};
```

#### **Prettier (^2.8.0)**
```json
{
  "prettier": "^2.8.0"
}
```
**Purpose:** Code formatter untuk consistent code style
**Features:**
- Automatic formatting
- Configurable rules
- Editor integration
- Pre-commit hooks

**Configuration (.prettierrc):**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

### 🧪 **Testing**

#### **Jest (^29.0.0)**
```json
{
  "jest": "^29.0.0",
  "@testing-library/react": "^13.0.0",
  "@testing-library/jest-dom": "^5.16.0"
}
```
**Purpose:** Testing framework untuk unit dan integration tests
**Features:**
- Test runner
- Mocking
- Snapshot testing
- Coverage reporting

**Usage:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import BookingPage from './BookingPage';

describe('BookingPage', () => {
  test('renders booking form', () => {
    render(<BookingPage />);
    expect(screen.getByText('Choose Tour Package')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<BookingPage />);
    const submitButton = screen.getByText('Create Booking');
    fireEvent.click(submitButton);
    
    await screen.findByText('Name is required');
  });
});
```

---

## 📦 **PACKAGE.JSON SCRIPTS**

### 🚀 **Frontend Scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx",
    "lint:fix": "eslint src --ext .js,.jsx --fix",
    "format": "prettier --write src/**/*.{js,jsx,css,md}",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### ⚙️ **Backend Scripts:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "create-db": "node create-database.js",
    "lint": "eslint . --ext .js",
    "test": "jest"
  }
}
```

---

## 🔧 **CONFIGURATION FILES**

### ⚙️ **Vite Configuration:**
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          form: ['react-hook-form']
        }
      }
    }
  },
  define: {
    'process.env': {}
  }
});
```

### 🗄️ **Database Configuration:**
```javascript
// backend/config/database.js
const Database = require('better-sqlite3');
const path = require('path');

const dbConfig = {
  path: path.join(__dirname, '../database/kwau_booking.db'),
  options: {
    verbose: console.log, // Enable SQL logging in development
    fileMustExist: false, // Create database if not exists
    readonly: false
  }
};

const createConnection = () => {
  return new Database(dbConfig.path, dbConfig.options);
};

module.exports = { createConnection, dbConfig };
```

---

## 📊 **DEPENDENCY VERSIONS**

### 📦 **Current Versions:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-hook-form": "^7.43.0",
    "@emailjs/browser": "^3.11.0",
    "bootstrap": "^5.3.0",
    "express": "^4.18.2",
    "better-sqlite3": "^9.2.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "vite": "^4.1.0",
    "@vitejs/plugin-react": "^3.0.0",
    "eslint": "^8.0.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^2.8.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^5.16.0"
  }
}
```

---

## 🔄 **DEPENDENCY MANAGEMENT**

### 📦 **Installation Commands:**
```bash
# Install all dependencies
npm install

# Install specific dependency
npm install react-hook-form

# Install dev dependency
npm install --save-dev eslint

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Audit security vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

### 🔒 **Security Best Practices:**
```bash
# Regular security audits
npm audit

# Update vulnerable packages
npm audit fix

# Check package licenses
npm ls

# Use npm ci for production
npm ci
```

---

## 🚀 **PERFORMANCE OPTIMIZATION**

### 📦 **Bundle Optimization:**
```javascript
// Code splitting
const BookingPage = lazy(() => import('./pages/BookingPage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

// Tree shaking
import { useState, useEffect } from 'react';
// Instead of: import React from 'react';
```

### 🗄️ **Database Optimization:**
```javascript
// Prepared statements
const findPackage = db.prepare('SELECT * FROM packages WHERE name = ?');

// Indexes for performance
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_bookings_number ON bookings(booking_number);
  CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
`);
```

---

## 📞 **SUPPORT & MAINTENANCE**

### 🛠️ **Regular Tasks:**
- Update dependencies monthly
- Security audits weekly
- Performance monitoring
- Bundle size analysis
- Dependency cleanup

### 📧 **Contact Information:**
- **Email:** support@kampungkwaupapua.com
- **Documentation:** actions/LIBRARY_DEPENDENCIES_DOCUMENTATION.md
- **Last Updated:** December 2024

---

*Dokumentasi ini dibuat untuk library dan dependencies Kampung Kwau - Papua Barat* 