# 🔧 PANDUAN PERBAIKAN KONFIGURASI EMAILJS

## 🚨 **MASALAH:**
Email masih dikirim ke `farrelmamengko22@gmail.com` meskipun template HTML sudah benar.

## 🔍 **PENYEBAB:**
Konfigurasi "To Email" di EmailJS Dashboard masih hardcoded.

---

## 🛠️ **LANGKAH PERBAIKAN:**

### **1. Login ke EmailJS Dashboard**
```
https://dashboard.emailjs.com/
```

### **2. Pilih Template `template_z84bt4c`**

### **3. Edit Template Settings**

#### **A. Cek "To Email" Field**
```
❌ SALAH (Hardcoded):
To Email: farrelmamengko22@gmail.com

✅ BENAR (Dynamic):
To Email: {{email}}
```

#### **B. Cek "From Email" Field**
```
From Email: kknkampungkwau@gmail.com
```

#### **C. Cek "Subject" Field**
```
Subject: Konfirmasi Booking Kampung Kwau - {{booking_number}}
```

### **4. Save Template**
- Klik "Save" untuk menyimpan perubahan

---

## 🧪 **TESTING:**

### **1. Test dengan Console**
```javascript
// Buka browser console dan test
emailjs.send('service_htloaex', 'template_z84bt4c', {
  email: 'test@example.com',
  customer_name: 'Test Customer',
  booking_number: 'KW-20250101-001',
  package_name: 'Basic Package',
  check_in: '01 Januari 2025',
  check_out: '02 Januari 2025',
  duration: '1',
  adults: '2',
  children: '0',
  package_total: 'Rp 500.000',
  tax: 'Rp 50.000',
  total: 'Rp 550.000'
});
```

### **2. Cek Email yang Diterima**
- Email harus terkirim ke `test@example.com`
- Bukan ke `farrelmamengko22@gmail.com`

---

## ✅ **VERIFIKASI:**

### **1. Template Variables**
Template HTML sudah benar menggunakan:
- `{{customer_name}}`
- `{{booking_number}}`
- `{{package_name}}`
- `{{check_in}}`
- `{{check_out}}`
- `{{duration}}`
- `{{adults}}`
- `{{children}}`
- `{{package_total}}`
- `{{tax}}`
- `{{total}}`

### **2. Konfigurasi yang Harus Diperbaiki**
- **To Email:** `{{email}}` (bukan hardcoded email)
- **Subject:** `Konfirmasi Booking Kampung Kwau - {{booking_number}}`

---

## 🎯 **KESIMPULAN:**

**Template HTML sudah benar!** 

**Masalah ada di konfigurasi "To Email" field di EmailJS Dashboard yang masih hardcoded.**

**Setelah diperbaiki, email akan terkirim ke email customer yang benar!** 🚀

---

## 📞 **JIKA MASIH BERMASALAH:**

1. **Cek Service ID:** `service_htloaex`
2. **Cek Template ID:** `template_z84bt4c`
3. **Cek Public Key:** Pastikan public key benar
4. **Cek Console Log:** Lihat error di browser console 