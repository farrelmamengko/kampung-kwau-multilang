# ✅ **Testing Checklist - Kampung Kwau Booking System**

## 🚀 **Setup Testing**
- [ ] Server running di `http://localhost:3000`
- [ ] Browser Developer Tools terbuka (F12)
- [ ] Console tab siap untuk debugging

---

## 📝 **Test 1: Booking Flow (Critical Path)**

### **Step 1: Pilih Paket**
- [ ] Akses `/booking` atau klik tombol "Booking" di card paket
- [ ] Tampil 3 paket dengan harga baru:
  - [ ] Basic: Rp 250.000/malam
  - [ ] Standard: Rp 450.000/malam  
  - [ ] Premium: Rp 750.000/malam
- [ ] Klik "Pilih Paket" → Progress bar ke step 2
- [ ] Detail paket tampil lengkap (includes, durasi, max guests)

### **Step 2: Tanggal & Tamu**
- [ ] **Date Picker Check-in:**
  - [ ] Tidak bisa pilih hari ini/kemarin ✅
  - [ ] Bisa pilih mulai besok ✅
- [ ] **Date Picker Check-out:**
  - [ ] Tidak bisa pilih sebelum check-in ✅
  - [ ] Auto-update saat check-in berubah ✅
- [ ] **Jumlah Tamu:**
  - [ ] Dewasa: dropdown 1-8 orang ✅
  - [ ] Anak: dropdown 0-4 orang ✅
- [ ] **Real-time Price:**
  - [ ] Harga update otomatis saat input berubah ✅
  - [ ] Formula: (dewasa × harga × hari) + (anak × harga × 0.5 × hari) ✅
- [ ] Button "Lanjut" hanya aktif jika semua terisi

### **Step 3: Aktivitas Tambahan**
- [ ] Tampil 6 aktivitas dengan ikon dan harga:
  - [ ] Extended Birdwatching Tour - Rp 75.000
  - [ ] Photography Workshop - Rp 100.000
  - [ ] Traditional Cooking Class - Rp 85.000
  - [ ] Night Forest Walk - Rp 90.000
  - [ ] Butterfly Garden Tour - Rp 60.000
  - [ ] Traditional Craft Workshop - Rp 95.000
- [ ] **Checkbox Functionality:**
  - [ ] Bisa centang/uncentang multiple aktivitas ✅
  - [ ] Harga total update real-time ✅
  - [ ] Formula aktivitas: harga × (dewasa + anak) ✅
- [ ] **Total Price Display:**
  - [ ] Subtotal paket ✅
  - [ ] Subtotal aktivitas ✅
  - [ ] Pajak 10% ✅
  - [ ] Total final ✅

### **Step 4: Data Pribadi**
- [ ] **Required Fields:**
  - [ ] Nama lengkap (error jika kosong) ✅
  - [ ] Email (error jika format salah) ✅
  - [ ] No. telepon (error jika kosong) ✅
- [ ] **Optional Fields:**
  - [ ] Kewarganegaraan (default: Indonesia) ✅
  - [ ] Kontak darurat ✅
- [ ] **Special Requests:**
  - [ ] Pantangan makanan ✅
  - [ ] Kebutuhan khusus ✅
  - [ ] Acara spesial ✅
  - [ ] Catatan tambahan ✅
- [ ] **Validation Testing:**
  - [ ] Submit form kosong → error messages ❌
  - [ ] Email tanpa @ → error message ❌
  - [ ] Form valid → submit berhasil ✅

### **Step 5: Success Page**
- [ ] **Success Elements:**
  - [ ] Icon checkmark hijau ✅
  - [ ] "Booking Berhasil!" message ✅
  - [ ] Booking number format: KW-YYYYMMDD-XXX ✅
- [ ] **Booking Details:**
  - [ ] Nama paket ✅
  - [ ] Total harga ✅
  - [ ] Status: "Menunggu Konfirmasi" ✅
- [ ] **Info Box:**
  - [ ] Email konfirmasi info ✅
  - [ ] Timeline 1x24 jam ✅
- [ ] Button "Kembali ke Home" berfungsi ✅

---

## 🔍 **Test 2: Status Checker**

### **Akses Halaman**
- [ ] Menu "Page" → "Cek Status Booking" ✅
- [ ] URL: `/booking-status` ✅

### **Search by Booking Number**
- [ ] Radio button "Nomor Booking" ✅
- [ ] Input placeholder sesuai format ✅
- [ ] Masukkan booking number dari test sebelumnya
- [ ] Klik "Cari" → data tampil lengkap ✅
- [ ] **Data yang tampil:**
  - [ ] Booking number & status badge ✅
  - [ ] Detail paket & tanggal ✅
  - [ ] Info customer ✅
  - [ ] Aktivitas tambahan (jika ada) ✅
  - [ ] Special requests (jika ada) ✅
  - [ ] Tanggal booking dibuat ✅

### **Search by Email**
- [ ] Radio button "Email" ✅
- [ ] Input type email ✅
- [ ] Masukkan email yang digunakan saat booking
- [ ] Klik "Cari" → semua booking dengan email tampil ✅

### **Error Cases**
- [ ] Search kosong → error message ✅
- [ ] Booking number tidak ditemukan → info message ✅
- [ ] Email tidak ada booking → info message ✅

---

## ⚠️ **Test 3: Error Handling & Edge Cases**

### **Form Validation Errors**
- [ ] Nama kosong + submit → "Nama lengkap harus diisi" ❌
- [ ] Email "test@" → "Format email tidak valid" ❌
- [ ] Phone kosong → "No. telepon harus diisi" ❌
- [ ] Tanggal tidak dipilih → button disabled ❌

### **Date Validation**
- [ ] Check-in hari ini → error/disabled ❌
- [ ] Check-out sebelum check-in → error ❌
- [ ] Check-in = check-out → error minimal 1 hari ❌

### **Price Calculation Edge Cases**
- [ ] 0 dewasa → validation error ❌
- [ ] 8 dewasa + 4 anak → max capacity check ⚠️
- [ ] Durasi 30 hari → kalkulasi benar ✅
- [ ] Semua aktivitas dipilih → total benar ✅

### **Browser Compatibility**
- [ ] Chrome ✅
- [ ] Firefox ✅  
- [ ] Safari ✅
- [ ] Edge ✅

### **Responsive Testing**
- [ ] Desktop (>1200px) ✅
- [ ] Tablet (768-1199px) ✅
- [ ] Mobile (<768px) ✅
- [ ] Date picker mobile-friendly ✅

---

## 🖥️ **Test 4: Console Testing**

### **Copy-paste ke Browser Console:**
```javascript
// Paste semua kode dari file console-test-commands.js
```

### **Expected Console Output:**
- [ ] Booking number generation ✅
- [ ] Price calculation test ✅
- [ ] Form validation test ✅
- [ ] LocalStorage test ✅
- [ ] "Console testing completed!" message ✅

---

## 📊 **Test 5: Performance & UX**

### **Loading States**
- [ ] Form steps transition smooth ✅
- [ ] Price calculation instant ✅
- [ ] Button loading states saat submit ✅

### **User Experience**
- [ ] Progress indicator jelas ✅
- [ ] Navigation back/forward works ✅
- [ ] Error messages helpful ✅
- [ ] Success feedback clear ✅

### **Data Persistence**
- [ ] Form data tetap ada saat back/forward ✅
- [ ] Selected activities tetap checked ✅
- [ ] Price calculation tetap akurat ✅

---

## 🚨 **Critical Issues to Watch**

### **Must Fix Before Deploy:**
- [ ] ❌ Email tidak dikirim (expected - belum implement)
- [ ] ❌ Data tidak tersimpan ke database (expected - demo mode)
- [ ] ❌ Payment integration belum ada (expected - future feature)

### **Nice to Fix:**
- [ ] ⚠️ ESLint warnings (tidak critical)
- [ ] ⚠️ React-datepicker warnings (tidak critical)
- [ ] ⚠️ Accessibility warnings (bisa diperbaiki later)

---

## ✅ **Sign-off Criteria**

### **Minimum Requirements:**
- [ ] Booking flow 5 step berfungsi 100%
- [ ] Price calculation akurat
- [ ] Form validation working
- [ ] Status checker functional
- [ ] Responsive di mobile

### **Ready for Production:**
- [ ] Firebase project setup
- [ ] Email integration
- [ ] Payment gateway
- [ ] Security measures
- [ ] Performance optimization

---

## 📝 **Test Report Template**

```
Date: ___________
Tester: ___________
Environment: Development / Production

✅ Booking Flow: PASS / FAIL
✅ Price Calculation: PASS / FAIL  
✅ Form Validation: PASS / FAIL
✅ Status Checker: PASS / FAIL
✅ Responsive Design: PASS / FAIL
✅ Error Handling: PASS / FAIL

Critical Issues Found: ___________
Minor Issues Found: ___________

Overall Status: READY / NEEDS WORK
Deployment Recommendation: GO / NO-GO

Notes: ___________
```

---

**Happy Testing! 🎯** 