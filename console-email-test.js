// 📧 Email Test for Kampung Kwau Booking System
// Copy dan paste script ini ke browser console setelah booking berhasil

console.log('🚀 KAMPUNG KWAU EMAIL SYSTEM TEST');
console.log('══════════════════════════════════════════════');

// Test data yang akan digunakan untuk booking
const emailTestData = {
  customerName: 'Budi Santoso',
  email: 'farrelmamengko@gmail.com',
  phone: '+62-812-3456-7890',
  packageName: 'Paket Basic - Ekowisata Kampung Kwau',
  checkIn: '2025-01-15',
  checkOut: '2025-01-16',
  adults: 2,
  children: 1,
  activities: ['Bird Watching & Photography', 'Traditional Cooking Class'],
  estimatedTotal: 'Rp 726.000'
};

console.log('\n📋 DATA TEST UNTUK BOOKING FORM:');
console.log('──────────────────────────────────────');
console.log('Nama Lengkap:', emailTestData.customerName);
console.log('Email:', emailTestData.email);
console.log('Telepon:', emailTestData.phone);
console.log('Paket:', emailTestData.packageName);
console.log('Check-in:', emailTestData.checkIn);
console.log('Check-out:', emailTestData.checkOut);
console.log('Dewasa:', emailTestData.adults, 'orang');
console.log('Anak:', emailTestData.children, 'orang');
console.log('Aktivitas:', emailTestData.activities.join(', '));
console.log('Estimasi Total:', emailTestData.estimatedTotal);

console.log('\n📧 PREVIEW EMAIL YANG AKAN DIKIRIM:');
console.log('═══════════════════════════════════════════════');
console.log('To:', emailTestData.email);
console.log('Subject: Konfirmasi Booking Kampung Kwau - [AUTO_GENERATED]');
console.log('──────────────────────────────────────');

const emailPreview = `
Halo ${emailTestData.customerName},

Terima kasih telah melakukan booking di Kampung Kwau!

DETAIL BOOKING:
═══════════════════════════════════════
Nomor Booking: [AUTO_GENERATED - KW-YYYYMMDD-XXX]
Status: Menunggu Konfirmasi

PAKET WISATA:
${emailTestData.packageName}
Check-in: Rabu, 15 Januari 2025
Check-out: Kamis, 16 Januari 2025
Durasi: 2 hari
Jumlah Tamu: ${emailTestData.adults} dewasa, ${emailTestData.children} anak

AKTIVITAS TAMBAHAN:
• Bird Watching & Photography - Rp 75.000
• Traditional Cooking Class - Rp 85.000

RINCIAN BIAYA:
═══════════════════════════════════════
Paket: Rp 500.000
Aktivitas: Rp 160.000
Pajak (10%): Rp 66.000
──────────────────────────────────────
TOTAL: Rp 726.000

KONTAK DARURAT: [Sesuai input form]

PERMINTAAN KHUSUS:
[Sesuai pilihan di form]

LANGKAH SELANJUTNYA:
1. Tim kami akan menghubungi Anda dalam 24 jam untuk konfirmasi
2. Setelah dikonfirmasi, Anda akan menerima instruksi pembayaran
3. Silakan simpan email ini sebagai bukti booking

Jika ada pertanyaan, hubungi kami:
📞 WhatsApp: +62-823-xxxx-xxxx
📧 Email: farrelmamengko@gmail.com

Terima kasih dan sampai jumpa di Kampung Kwau!

Salam,
Tim Kampung Kwau
Ekowisata Papua Barat
`;

console.log(emailPreview);
console.log('══════════════════════════════════════════════');

console.log('\n🧪 CARA TEST EMAIL SYSTEM:');
console.log('──────────────────────────────────────');
console.log('1. Buka halaman Booking di website');
console.log('2. Isi form dengan data di atas');
console.log('3. Submit booking form');
console.log('4. Cek console browser untuk melihat email preview');
console.log('5. Dalam TEST MODE, email tidak benar-benar terkirim');
console.log('6. Untuk production, setup EmailJS di EMAIL_SETUP_GUIDE.md');

console.log('\n✅ EMAIL SYSTEM STATUS:');
console.log('──────────────────────────────────────');
console.log('📧 Email Service: ✅ Implemented');
console.log('🔧 Integration: ✅ Connected to booking flow');
console.log('📱 Test Mode: ✅ Active (console output only)');
console.log('🚀 Production Ready: ⚠️ Needs EmailJS setup');

console.log('\n🎯 NEXT STEPS:');
console.log('──────────────────────────────────────');
console.log('1. Test booking dengan data di atas');
console.log('2. Verifikasi email preview di console');
console.log('3. Setup EmailJS untuk production');
console.log('4. Update email config di emailService.js');
console.log('5. Test email real dengan akun EmailJS'); 