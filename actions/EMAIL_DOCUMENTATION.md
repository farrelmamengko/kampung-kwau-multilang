# 📧 EMAIL SYSTEM DOCUMENTATION
## Kampung Kwau Booking System

### 📋 **OVERVIEW**
Sistem email Kampung Kwau menggunakan **EmailJS** untuk mengirim email konfirmasi booking ke customer dan notifikasi ke admin.

---

## 🎯 **EMAIL TYPES**

### 1. **Customer Confirmation Email**
- **Recipient:** Customer email (dari form booking)
- **Purpose:** Konfirmasi booking yang berhasil dibuat
- **Template:** `template_n1es8q7`

### 2. **Admin Notification Email**
- **Recipient:** `kknkampungkwau@gmail.com`
- **Purpose:** Notifikasi booking baru ke admin
- **Template:** `template_n1es8q7` (sama dengan customer)

---

## ⚙️ **CONFIGURATION**

### **EmailJS Configuration**
```javascript
const EMAIL_CONFIG = {
  serviceId: 'service_iggrh35',     // Gmail service ID
  templateId: 'template_n1es8q7',   // Email template ID
  userId: 'cERh5Eezr8mKQn9Vt',      // Public key
  testMode: false,                  // Production mode
  adminEmail: 'kknkampungkwau@gmail.com'  // Admin email
};
```

### **File Location**
```
src/services/emailService.js
```

---

## 🔧 **EMAIL FUNCTIONS**

### **1. sendBookingConfirmation(bookingData)**
Mengirim email konfirmasi ke customer.

#### **Parameters:**
```javascript
{
  customer: {
    name: "Customer Name",
    email: "customer@gmail.com",
    phone: "08123456789",
    nationality: "Indonesia",
    emergencyContact: "Emergency Contact"
  },
  bookingNumber: "KW-20250720-XXX",
  booking: {
    packageName: "Basic Package",
    checkIn: "2025-07-20T00:00:00.000Z",
    checkOut: "2025-07-21T00:00:00.000Z",
    duration: 1,
    guests: {
      adults: 2,
      children: 0
    }
  },
  pricing: {
    total: 275000
  },
  specialRequests: {
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    specialOccasion: "",
    additionalNotes: ""
  }
}
```

#### **Template Variables:**
- `{{email}}` - Customer email address
- `{{customer_name}}` - Customer name
- `{{booking_number}}` - Booking number
- `{{package_name}}` - Package name
- `{{check_in}}` - Check-in date (formatted)
- `{{check_out}}` - Check-out date (formatted)
- `{{duration}}` - Duration in days
- `{{adults}}` - Number of adults
- `{{children}}` - Number of children
- `{{package_total}}` - Package total (formatted)
- `{{tax}}` - Tax amount (formatted)
- `{{total}}` - Total amount (formatted)

### **2. sendAdminNotification(bookingData)**
Mengirim notifikasi ke admin.

#### **Parameters:**
```javascript
{
  customer: {
    name: "Customer Name",
    email: "customer@gmail.com",
    phone: "08123456789",
    nationality: "Indonesia",
    emergencyContact: "Emergency Contact"
  },
  bookingNumber: "KW-20250720-XXX",
  booking: {
    packageName: "Basic Package",
    checkIn: "2025-07-20T00:00:00.000Z",
    checkOut: "2025-07-21T00:00:00.000Z",
    duration: 1,
    guests: {
      adults: 2,
      children: 0
    }
  },
  pricing: {
    total: 275000
  },
  specialRequests: {
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    specialOccasion: "",
    additionalNotes: ""
  }
}
```

#### **Template Variables:**
- `{{email}}` - Admin email address
- `{{customer_name}}` - Customer name
- `{{customer_email}}` - Customer email
- `{{customer_phone}}` - Customer phone
- `{{booking_number}}` - Booking number
- `{{package_name}}` - Package name
- `{{check_in}}` - Check-in date (formatted)
- `{{check_out}}` - Check-out date (formatted)
- `{{duration}}` - Duration in days
- `{{adults}}` - Number of adults
- `{{children}}` - Number of children
- `{{total}}` - Total amount (formatted)
- `{{special_requests}}` - Special requests (JSON string)
- `{{emergency_contact}}` - Emergency contact

---

## 📧 **EMAIL TEMPLATES**

### **Customer Confirmation Email Template**
```
Subject: Konfirmasi Booking Kampung Kwau - {{booking_number}}

Halo {{customer_name}},

Terima kasih telah melakukan booking di Kampung Kwau!

DETAIL BOOKING:
═══════════════════════════════════════
Nomor Booking: {{booking_number}}
Status: Menunggu Konfirmasi

PAKET WISATA:
{{package_name}}
Check-in: {{check_in}}
Check-out: {{check_out}}
Durasi: {{duration}} hari
Jumlah Tamu: {{adults}} dewasa{{#if children}}, {{children}} anak{{/if}}

RINCIAN BIAYA:
═══════════════════════════════════════
Paket: {{package_total}}
Pajak (10%): {{tax}}
──────────────────────────────────────
TOTAL: {{total}}

LANGKAH SELANJUTNYA:
1. Tim kami akan menghubungi Anda dalam 24 jam untuk konfirmasi
2. Setelah dikonfirmasi, Anda akan menerima instruksi pembayaran
3. Silakan simpan email ini sebagai bukti booking

Jika ada pertanyaan, hubungi kami:
📞 WhatsApp: +62-823-xxxx-xxxx
📧 Email: kknkampungkwau@gmail.com

Terima kasih dan sampai jumpa di Kampung Kwau!

Salam,
Tim Kampung Kwau
Ekowisata Papua Barat
```

### **Admin Notification Email Template**
```
Subject: [BOOKING BARU] {{booking_number}}

BOOKING BARU DITERIMA!

DETAIL CUSTOMER:
═══════════════════════════════════════
Nama: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Nationality: Indonesia
Emergency Contact: {{emergency_contact}}

DETAIL BOOKING:
═══════════════════════════════════════
Nomor Booking: {{booking_number}}
Paket: {{package_name}}
Check-in: {{check_in}}
Check-out: {{check_out}}
Durasi: {{duration}} hari
Jumlah Tamu: {{adults}} dewasa, {{children}} anak
Total: {{total}}

PERMINTAAN KHUSUS:
{{special_requests}}

LANGKAH SELANJUTNYA:
1. Review booking details
2. Hubungi customer untuk konfirmasi
3. Update status di dashboard admin
4. Kirim instruksi pembayaran

Dashboard: http://localhost:3000/dashboard
```

---

## 🚀 **IMPLEMENTATION**

### **Frontend Integration**
```javascript
// In BookingPage.js
import { sendBookingConfirmation, sendAdminNotification } from '../services/emailService';

// Send admin notification
const adminNotificationData = {
  customer: { /* customer data */ },
  bookingNumber: apiResult.data.booking_number,
  booking: { /* booking data */ },
  pricing: { /* pricing data */ },
  specialRequests: { /* special requests */ }
};

await sendAdminNotification(adminNotificationData);

// Send customer confirmation
const customerEmailData = {
  customer: { /* customer data */ },
  bookingNumber: apiResult.data.booking_number,
  booking: { /* booking data */ },
  pricing: { /* pricing data */ },
  specialRequests: { /* special requests */ }
};

await sendBookingConfirmation(customerEmailData);
```

### **Error Handling**
```javascript
try {
  await sendBookingConfirmation(bookingData);
  console.log('✅ Email berhasil dikirim');
} catch (error) {
  console.warn('⚠️ Email gagal dikirim:', error);
  // Don't throw error - booking is still valid
}
```

---

## 📊 **EMAIL LIMITS**

### **EmailJS Free Plan**
- **Monthly Limit:** 200 emails
- **Daily Limit:** ~6-7 emails
- **Templates:** 2 templates

### **EmailJS Paid Plans**
- **Starter ($15/month):** 1,000 emails
- **Professional ($49/month):** 10,000 emails

### **Usage Tracking**
```javascript
// Email count tracking
let emailCount = {
  daily: 0,
  monthly: 0,
  lastReset: new Date().getDate()
};

// Check limits before sending
const limitCheck = checkEmailLimits();
if (!limitCheck.canSend) {
  console.warn(`⚠️ Email limit reached: ${limitCheck.reason}`);
  return { success: false, error: limitCheck.reason };
}
```

---

## 🔧 **TROUBLESHOOTING**

### **Common Issues**

#### **1. Email Not Sent**
```javascript
// Check EmailJS configuration
console.log('EmailJS Config:', EMAIL_CONFIG);

// Check template parameters
console.log('Template Params:', templateParams);

// Check network requests
// Browser DevTools → Network → Filter by "emailjs"
```

#### **2. Duplicate Emails**
- **Cause:** Multiple function calls
- **Solution:** Ensure single email call per booking
- **Fixed:** Removed duplicate `createBooking()` call

#### **3. Template Variables Not Working**
- **Check:** Variable names match template
- **Format:** Use correct data types
- **Test:** Use EmailJS dashboard

### **Debug Mode**
```javascript
// Enable test mode
const EMAIL_CONFIG = {
  testMode: true,  // Logs email content instead of sending
  // ... other config
};
```

---

## 📈 **MONITORING**

### **Console Logs**
```javascript
// Successful email
✅ Email berhasil dikirim: EmailJSResponseStatus {status: 200, text: 'OK'}

// Admin notification
✅ Admin notification sent: EmailJSResponseStatus {status: 200, text: 'OK'}

// Error
❌ Error mengirim email: Error message
```

### **EmailJS Dashboard**
- **URL:** https://dashboard.emailjs.com
- **Features:** Email logs, delivery status, usage statistics
- **Monitoring:** Failed emails, delivery rates

---

## 🔒 **SECURITY**

### **Email Validation**
```javascript
// Validate customer email
if (!cleanBookingData.customer?.email) {
  throw new Error('Email customer tidak boleh kosong');
}

// Validate customer name
if (!cleanBookingData.customer?.name) {
  throw new Error('Nama customer tidak boleh kosong');
}
```

### **Data Sanitization**
```javascript
// Clean circular references
const cleanBookingData = JSON.parse(JSON.stringify(bookingData));

// Sanitize special characters
const sanitizeText = (text) => {
  return text.replace(/[<>]/g, '');
};
```

---

## 📝 **CHANGELOG**

### **v2.0 (Current)**
- ✅ **Fixed:** Duplicate email issue
- ✅ **Added:** Admin notification email
- ✅ **Improved:** Error handling
- ✅ **Added:** Email limits tracking
- ✅ **Updated:** Template variables
- ✅ **Updated:** Admin email to kknkampungkwau@gmail.com

### **v1.0 (Previous)**
- ✅ **Added:** Customer confirmation email
- ✅ **Added:** EmailJS integration
- ✅ **Added:** Basic template

---

## 🎯 **BEST PRACTICES**

### **1. Email Content**
- ✅ Use clear, professional language
- ✅ Include all necessary booking details
- ✅ Provide contact information
- ✅ Add next steps instructions

### **2. Error Handling**
- ✅ Don't break booking flow for email failures
- ✅ Log errors for debugging
- ✅ Provide fallback options

### **3. Performance**
- ✅ Send emails asynchronously
- ✅ Use proper error boundaries
- ✅ Monitor email delivery rates

### **4. Testing**
- ✅ Test with different email providers
- ✅ Verify template variables
- ✅ Check mobile email rendering
- ✅ Test error scenarios

---

## 📞 **SUPPORT**

### **EmailJS Support**
- **Documentation:** https://www.emailjs.com/docs/
- **Community:** https://community.emailjs.com/
- **Contact:** support@emailjs.com

### **Kampung Kwau Support**
- **Email:** kknkampungkwau@gmail.com
- **WhatsApp:** +62-823-xxxx-xxxx
- **Dashboard:** http://localhost:3000/dashboard 