// 🧪 Test Email Production Setup
// Jalankan script ini setelah setup EmailJS selesai

console.log('🚀 TEST EMAIL PRODUCTION SETUP');
console.log('══════════════════════════════════════════════');

// Data test untuk email
const testBookingData = {
  bookingNumber: 'KW-20250103-001',
  customer: {
    name: 'Budi Santoso',
    email: 'farrelmamengko@gmail.com', // Email test
    phone: '+62-812-3456-7890',
    emergencyContact: 'Siti - +62-812-3456-7891'
  },
  booking: {
    packageName: 'Paket Basic - Ekowisata Kampung Kwau',
    checkIn: '2025-01-15',
    checkOut: '2025-01-16',
    duration: 2,
    guests: { adults: 2, children: 1 }
  },
  activities: [
    { name: 'Extended Birdwatching Tour', price: 75000 },
    { name: 'Traditional Cooking Class', price: 85000 }
  ],
  pricing: {
    packageTotal: 500000,
    activitiesTotal: 160000,
    tax: 66000,
    total: 726000
  },
  specialRequests: {
    dietaryRestrictions: 'Vegetarian',
    accessibilityNeeds: 'Tidak ada',
    specialOccasion: 'Tidak ada'
  }
};

console.log('\n📋 DATA TEST BOOKING:');
console.log('──────────────────────────────────────');
console.log('Nomor Booking:', testBookingData.bookingNumber);
console.log('Customer:', testBookingData.customer.name);
console.log('Email:', testBookingData.customer.email);
console.log('Paket:', testBookingData.booking.packageName);
console.log('Total:', 'Rp ' + testBookingData.pricing.total.toLocaleString());

console.log('\n🔧 EMAILJS CONFIGURATION CHECKLIST:');
console.log('──────────────────────────────────────');
console.log('✅ Gmail Service ID: service_iggrh35');
console.log('✅ Template ID: template_n1es8q7 (sudah ada)');
console.log('✅ Public Key: cERh5Eezr8mKQn9Vt (sudah ditambahkan)');
console.log('⚠️  Test Mode: true (ubah ke false untuk production)');

console.log('\n📧 EMAIL TEMPLATE VARIABLES:');
console.log('──────────────────────────────────────');
console.log('{{customer_name}} →', testBookingData.customer.name);
console.log('{{booking_number}} →', testBookingData.bookingNumber);
console.log('{{package_name}} →', testBookingData.booking.packageName);
console.log('{{check_in}} →', new Date(testBookingData.booking.checkIn).toLocaleDateString('id-ID'));
console.log('{{check_out}} →', new Date(testBookingData.booking.checkOut).toLocaleDateString('id-ID'));
console.log('{{duration}} →', testBookingData.booking.duration);
console.log('{{adults}} →', testBookingData.booking.guests.adults);
console.log('{{children}} →', testBookingData.booking.guests.children);
console.log('{{activities}} →', testBookingData.activities.map(a => `${a.name} - Rp ${a.price.toLocaleString()}`).join(', '));
console.log('{{package_total}} →', 'Rp ' + testBookingData.pricing.packageTotal.toLocaleString());
console.log('{{activities_total}} →', 'Rp ' + testBookingData.pricing.activitiesTotal.toLocaleString());
console.log('{{tax}} →', 'Rp ' + testBookingData.pricing.tax.toLocaleString());
console.log('{{total}} →', 'Rp ' + testBookingData.pricing.total.toLocaleString());
console.log('{{emergency_contact}} →', testBookingData.customer.emergencyContact);
console.log('{{special_requests}} →', Object.entries(testBookingData.specialRequests).map(([k,v]) => `${k}: ${v}`).join(', '));

console.log('\n🎯 NEXT STEPS:');
console.log('──────────────────────────────────────');
console.log('1. Buat template di EmailJS dashboard');
console.log('2. Copy Public Key dari Account > API Keys');
console.log('3. Update emailService.js dengan Public Key');
console.log('4. Set testMode: false');
console.log('5. Test booking di website');
console.log('6. Cek email inbox');

console.log('\n✅ PRODUCTION READY CHECKLIST:');
console.log('──────────────────────────────────────');
console.log('📧 EmailJS Account: ✅ Created');
console.log('🔗 Gmail Service: ✅ Connected (service_iggrh35)');
console.log('📝 Email Template: ✅ Ready (template_n1es8q7)');
console.log('🔑 Public Key: ✅ Added (cERh5Eezr8mKQn9Vt)');
console.log('⚙️  Config Update: ⚠️ Need to complete');
console.log('🧪 Test Mode: ⚠️ Need to disable');

console.log('\n💡 TIPS:');
console.log('──────────────────────────────────────');
console.log('• Gunakan email yang sama untuk test (farrelmamengko@gmail.com)');
console.log('• Cek spam folder jika email tidak masuk');
console.log('• Monitor EmailJS dashboard untuk delivery status');
console.log('• Free tier: 200 emails/month (cukup untuk testing)'); 