# 📧 EMAIL DOCUMENTATION - KAMPUNG KWAU

## 📋 **OVERVIEW**
Sistem email otomatis untuk Kampung Kwau menggunakan EmailJS yang menangani konfirmasi booking, notifikasi admin, dan komunikasi dengan pelanggan.

---

## 🏗️ **EMAIL SYSTEM ARCHITECTURE**

### 📊 **Tech Stack:**
- **Email Service:** EmailJS
- **Template Engine:** EmailJS Templates
- **Frontend Integration:** React.js
- **Email Provider:** Gmail/SMTP
- **Language Support:** Multi-language (ID/EN)

### 🔄 **Email Flow:**
```
Booking Created → EmailJS Service → Template Processing → Email Sent → Customer Receives
```

---

## 📁 **PROJECT STRUCTURE**

```
src/services/
└── emailService.js          # Email service implementation

EmailJS Templates:
├── booking_confirmation     # Konfirmasi booking
├── admin_notification       # Notifikasi admin
└── booking_reminder         # Reminder booking
```

---

## 🚀 **SETUP & CONFIGURATION**

### 📦 **Dependencies:**
```json
{
  "@emailjs/browser": "^3.11.0"
}
```

### 🔧 **Installation:**
```bash
# Install EmailJS
npm install @emailjs/browser

# Initialize EmailJS
import emailjs from '@emailjs/browser';
emailjs.init('YOUR_PUBLIC_KEY');
```

### ⚙️ **Environment Variables:**
```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🔌 **EMAIL SERVICE IMPLEMENTATION**

### 📧 **Email Service (emailService.js)**

#### **Service Configuration:**
```javascript
import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.publicKey);
```

#### **Send Booking Confirmation:**
```javascript
export const sendBookingConfirmation = async (bookingData) => {
  try {
    const templateParams = {
      to_email: bookingData.customer.email,
      customer_name: bookingData.customer.name,
      booking_number: bookingData.booking_number,
      package_name: bookingData.package.name,
      check_in_date: bookingData.check_in_date,
      check_out_date: bookingData.check_out_date,
      total_amount: formatCurrency(bookingData.total_amount),
      adults_count: bookingData.adults_count,
      children_count: bookingData.children_count,
      special_requests: bookingData.special_requests || 'Tidak ada'
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams,
      EMAIL_CONFIG.publicKey
    );

    return {
      success: true,
      message: 'Email konfirmasi berhasil dikirim',
      data: response
    };

  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Gagal mengirim email konfirmasi');
  }
};
```

#### **Send Admin Notification:**
```javascript
export const sendAdminNotification = async (bookingData) => {
  try {
    const templateParams = {
      to_email: 'admin@kampungkwaupapua.com',
      subject: 'Booking Baru - Kampung Kwau',
      customer_name: bookingData.customer.name,
      customer_email: bookingData.customer.email,
      customer_phone: bookingData.customer.phone,
      booking_number: bookingData.booking_number,
      package_name: bookingData.package.name,
      total_amount: formatCurrency(bookingData.total_amount),
      booking_date: new Date().toLocaleDateString('id-ID')
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      'admin_notification_template',
      templateParams,
      EMAIL_CONFIG.publicKey
    );

    return {
      success: true,
      message: 'Notifikasi admin berhasil dikirim',
      data: response
    };

  } catch (error) {
    console.error('Admin notification error:', error);
    throw new Error('Gagal mengirim notifikasi admin');
  }
};
```

---

## 📧 **EMAIL TEMPLATES**

### 🎯 **Booking Confirmation Template**

#### **HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Konfirmasi Booking - Kampung Kwau</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8f9fa; }
        .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Konfirmasi Booking Kampung Kwau</h1>
        </div>
        
        <div class="content">
            <p>Halo {{customer_name}},</p>
            
            <p>Terima kasih telah memilih Kampung Kwau untuk liburan Anda! Booking Anda telah berhasil dibuat.</p>
            
            <div class="booking-details">
                <h3>📋 Detail Booking:</h3>
                <p><strong>Nomor Booking:</strong> {{booking_number}}</p>
                <p><strong>Paket Wisata:</strong> {{package_name}}</p>
                <p><strong>Check-in:</strong> {{check_in_date}}</p>
                <p><strong>Check-out:</strong> {{check_out_date}}</p>
                <p><strong>Jumlah Tamu:</strong> {{adults_count}} dewasa, {{children_count}} anak</p>
                <p><strong>Total Pembayaran:</strong> {{total_amount}}</p>
                <p><strong>Request Khusus:</strong> {{special_requests}}</p>
            </div>
            
            <p><strong>📞 Langkah Selanjutnya:</strong></p>
            <ol>
                <li>Tim kami akan menghubungi Anda dalam 1x24 jam</li>
                <li>Konfirmasi pembayaran dan detail perjalanan</li>
                <li>Persiapan akomodasi dan aktivitas</li>
            </ol>
            
            <p><strong>📍 Lokasi:</strong><br>
            Kampung Kwau, Distrik Mokwam, Kabupaten Manokwari, Papua Barat</p>
        </div>
        
        <div class="footer">
            <p>© 2024 Kampung Kwau. Semua hak dilindungi.</p>
            <p>Email: info@kampungkwaupapua.com | Phone: +62 823-3333</p>
        </div>
    </div>
</body>
</html>
```

#### **Template Variables:**
```javascript
const templateVariables = {
  customer_name: 'John Doe',
  booking_number: 'KW-20241225-001',
  package_name: 'Basic Package',
  check_in_date: '2024-12-25',
  check_out_date: '2024-12-26',
  adults_count: 2,
  children_count: 1,
  total_amount: 'Rp 625.000',
  special_requests: 'Vegetarian meal'
};
```

---

## 🔧 **INTEGRATION WITH BOOKING SYSTEM**

### 📝 **Booking Page Integration:**
```javascript
// In BookingPage.js
import { sendBookingConfirmation } from '../services/emailService';

const onSubmit = async (data) => {
  try {
    // 1. Send to backend API
    const apiResult = await bookingAPI.create(cleanBookingData);
    
    // 2. Send email confirmation
    const emailResult = await sendBookingConfirmation({
      customer: {
        name: data.customerName,
        email: data.email
      },
      booking_number: apiResult.data.booking_number,
      package: selectedPackage,
      check_in_date: checkInDate.toISOString().split('T')[0],
      check_out_date: checkOutDate.toISOString().split('T')[0],
      adults_count: parseInt(data.adults),
      children_count: parseInt(data.children),
      total_amount: totalPricing.total,
      special_requests: data.additionalNotes || 'Tidak ada'
    });
    
    // 3. Show success message
    setSuccess(true);
    setBookingNumber(apiResult.data.booking_number);
    
  } catch (error) {
    setError('Gagal membuat booking: ' + error.message);
  }
};
```

### 🔄 **Error Handling:**
```javascript
const handleEmailError = (error) => {
  console.error('Email service error:', error);
  
  // Log error for debugging
  if (import.meta.env.DEV) {
    console.log('Email error details:', {
      error: error.message,
      timestamp: new Date().toISOString(),
      bookingData: bookingData
    });
  }
  
  // Show user-friendly error
  throw new Error('Gagal mengirim email konfirmasi. Booking tetap tersimpan.');
};
```

---

## 🌍 **MULTI-LANGUAGE SUPPORT**

### 🇮🇩 **Indonesian Template:**
```javascript
const indonesianTemplate = {
  subject: 'Konfirmasi Booking - Kampung Kwau',
  greeting: 'Halo {{customer_name}},',
  message: 'Terima kasih telah memilih Kampung Kwau untuk liburan Anda!',
  nextSteps: 'Langkah Selanjutnya:',
  contact: 'Tim kami akan menghubungi Anda dalam 1x24 jam'
};
```

### 🇺🇸 **English Template:**
```javascript
const englishTemplate = {
  subject: 'Booking Confirmation - Kampung Kwau',
  greeting: 'Hello {{customer_name}},',
  message: 'Thank you for choosing Kampung Kwau for your vacation!',
  nextSteps: 'Next Steps:',
  contact: 'Our team will contact you within 24 hours'
};
```

### 🔄 **Language Detection:**
```javascript
const getEmailTemplate = (language = 'id') => {
  const templates = {
    id: indonesianTemplate,
    en: englishTemplate
  };
  
  return templates[language] || templates.id;
};
```

---

## 📊 **EMAIL ANALYTICS & MONITORING**

### 📈 **Success Rate Tracking:**
```javascript
const trackEmailSuccess = (emailType, success) => {
  const analytics = {
    emailType,
    success,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };
  
  // Send to analytics service
  console.log('Email analytics:', analytics);
};
```

### 📊 **Email Metrics:**
```javascript
const emailMetrics = {
  totalSent: 0,
  successCount: 0,
  failureCount: 0,
  averageResponseTime: 0
};

const updateMetrics = (success, responseTime) => {
  emailMetrics.totalSent++;
  if (success) {
    emailMetrics.successCount++;
  } else {
    emailMetrics.failureCount++;
  }
  emailMetrics.averageResponseTime = 
    (emailMetrics.averageResponseTime + responseTime) / 2;
};
```

---

## 🔒 **SECURITY & VALIDATION**

### ✅ **Email Validation:**
```javascript
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeEmailData = (data) => {
  return {
    ...data,
    customer_name: data.customer_name.trim(),
    customer_email: data.customer_email.toLowerCase().trim(),
    booking_number: data.booking_number.toUpperCase()
  };
};
```

### 🛡️ **Rate Limiting:**
```javascript
const emailRateLimit = {
  maxEmailsPerHour: 10,
  currentCount: 0,
  resetTime: Date.now() + 3600000 // 1 hour
};

const checkRateLimit = () => {
  if (Date.now() > emailRateLimit.resetTime) {
    emailRateLimit.currentCount = 0;
    emailRateLimit.resetTime = Date.now() + 3600000;
  }
  
  if (emailRateLimit.currentCount >= emailRateLimit.maxEmailsPerHour) {
    throw new Error('Email rate limit exceeded. Please try again later.');
  }
  
  emailRateLimit.currentCount++;
};
```

---

## 🚀 **DEPLOYMENT & PRODUCTION**

### 🔧 **Production Configuration:**
```javascript
const productionConfig = {
  serviceId: 'production_service_id',
  templateId: 'production_template_id',
  publicKey: 'production_public_key',
  rateLimit: {
    maxEmailsPerHour: 100,
    maxEmailsPerDay: 1000
  }
};
```

### 📧 **Email Provider Setup:**
```javascript
// Gmail SMTP Configuration
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@kampungkwaupapua.com',
    pass: 'app_password'
  }
};
```

---

## 🛠️ **TROUBLESHOOTING**

### 🚨 **Common Issues:**

#### **1. Email Not Sending:**
```javascript
// Check EmailJS initialization
if (!emailjs) {
  console.error('EmailJS not initialized');
  return;
}

// Check configuration
if (!EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId) {
  console.error('EmailJS configuration missing');
  return;
}
```

#### **2. Template Variables Missing:**
```javascript
// Validate template parameters
const validateTemplateParams = (params) => {
  const required = ['customer_name', 'booking_number', 'package_name'];
  const missing = required.filter(field => !params[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
};
```

#### **3. Network Issues:**
```javascript
// Retry mechanism
const sendEmailWithRetry = async (params, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        params,
        EMAIL_CONFIG.publicKey
      );
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

---

## 📞 **SUPPORT & MAINTENANCE**

### 🛠️ **Regular Tasks:**
- Monitor email delivery rates
- Update email templates
- Check EmailJS service status
- Review email analytics
- Update contact information

### 📧 **Contact Information:**
- **EmailJS Support:** support@emailjs.com
- **Kampung Kwau Email:** info@kampungkwaupapua.com
- **Documentation:** actions/EMAIL_DOCUMENTATION.md
- **Last Updated:** December 2024

---

*Dokumentasi ini dibuat untuk sistem email Kampung Kwau - Papua Barat* 