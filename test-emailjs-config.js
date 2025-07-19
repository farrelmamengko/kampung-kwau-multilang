// 🧪 Test EmailJS Configuration
// Jalankan script ini untuk memverifikasi setup EmailJS

console.log('🔧 EMAILJS CONFIGURATION TEST');
console.log('══════════════════════════════════════════════');

// Import EmailJS
const emailjs = require('@emailjs/browser');

// Current configuration
const EMAIL_CONFIG = {
  serviceId: 'service_iggrh35',
  templateId: 'template_n1es8q7', // Updated to use edited template
  userId: 'cERh5Eezr8mKQn9Vt',
  testMode: false,
  adminEmail: 'farrelmamengko@gmail.com'
};

console.log('\n📋 CURRENT CONFIGURATION:');
console.log('──────────────────────────────────────');
console.log('Service ID:', EMAIL_CONFIG.serviceId);
console.log('Template ID:', EMAIL_CONFIG.templateId);
console.log('User ID:', EMAIL_CONFIG.userId);
console.log('Test Mode:', EMAIL_CONFIG.testMode);
console.log('Admin Email:', EMAIL_CONFIG.adminEmail);

// Test data
const testData = {
  customer: {
    name: 'Test Customer',
    email: 'farrelmamengko@gmail.com'
  },
  bookingNumber: 'KW-20250103-TEST',
  booking: {
    packageName: 'Test Package',
    checkIn: '2025-01-15',
    checkOut: '2025-01-16',
    duration: 2,
    guests: { adults: 2, children: 1 }
  },
  activities: [
    { name: 'Test Activity 1', price: 50000 },
    { name: 'Test Activity 2', price: 75000 }
  ],
  pricing: {
    packageTotal: 500000,
    activitiesTotal: 125000,
    tax: 62500,
    total: 687500
  },
  specialRequests: {
    dietaryRestrictions: 'Vegetarian',
    accessibilityNeeds: 'None'
  }
};

console.log('\n📧 TEST EMAIL DATA:');
console.log('──────────────────────────────────────');
console.log('Customer:', testData.customer.name);
console.log('Email:', testData.customer.email);
console.log('Booking Number:', testData.bookingNumber);
console.log('Package:', testData.booking.packageName);
console.log('Total:', 'Rp ' + testData.pricing.total.toLocaleString());

// Format functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Prepare template parameters
const templateParams = {
  email: testData.customer.email, // For "To Email" field in dashboard
  customer_name: testData.customer.name,
  booking_number: testData.bookingNumber,
  package_name: testData.booking.packageName,
  check_in: formatDate(testData.booking.checkIn),
  check_out: formatDate(testData.booking.checkOut),
  duration: testData.booking.duration,
  adults: testData.booking.guests.adults,
  children: testData.booking.guests.children,
  activities: testData.activities.map(a => `${a.name} - ${formatCurrency(a.price)}`).join(', '),
  package_total: formatCurrency(testData.pricing.packageTotal),
  activities_total: formatCurrency(testData.pricing.activitiesTotal),
  tax: formatCurrency(testData.pricing.tax),
  total: formatCurrency(testData.pricing.total),
  emergency_contact: 'Test Contact',
  special_requests: Object.entries(testData.specialRequests).map(([k,v]) => `${k}: ${v}`).join(', ')
};

console.log('\n📝 TEMPLATE PARAMETERS:');
console.log('──────────────────────────────────────');
Object.entries(templateParams).forEach(([key, value]) => {
  console.log(`${key}:`, value);
});

console.log('\n🔍 POTENTIAL ISSUES:');
console.log('──────────────────────────────────────');

// Check for common issues
const issues = [];

if (!EMAIL_CONFIG.serviceId) {
  issues.push('❌ Service ID kosong');
} else {
  console.log('✅ Service ID:', EMAIL_CONFIG.serviceId);
}

if (!EMAIL_CONFIG.templateId) {
  issues.push('❌ Template ID kosong');
} else {
  console.log('✅ Template ID:', EMAIL_CONFIG.templateId);
}

if (!EMAIL_CONFIG.userId) {
  issues.push('❌ User ID kosong');
} else {
  console.log('✅ User ID:', EMAIL_CONFIG.userId);
}

if (!testData.customer.email) {
  issues.push('❌ Email customer kosong');
} else {
  console.log('✅ Email customer:', testData.customer.email);
}

if (!testData.customer.name) {
  issues.push('❌ Nama customer kosong');
} else {
  console.log('✅ Nama customer:', testData.customer.name);
}

if (issues.length > 0) {
  console.log('\n⚠️  ISSUES FOUND:');
  issues.forEach(issue => console.log(issue));
} else {
  console.log('\n✅ No issues found in configuration');
}

console.log('\n🎯 NEXT STEPS:');
console.log('──────────────────────────────────────');
console.log('1. Verify EmailJS template variables match the ones above');
console.log('2. Check if template_n1es8q7 exists in EmailJS dashboard');
console.log('3. Ensure service_iggrh35 is properly connected to Gmail');
console.log('4. Test with a simple template first');
console.log('5. Check EmailJS dashboard for any error messages');

console.log('\n💡 TROUBLESHOOTING TIPS:');
console.log('──────────────────────────────────────');
console.log('• Template variables are case-sensitive');
console.log('• Make sure template exists in EmailJS dashboard');
console.log('• Check if Gmail service is properly connected');
console.log('• Verify User ID (Public Key) is correct');
console.log('• Test with EmailJS dashboard first before using in code');

console.log('\n📞 EMAILJS SUPPORT:');
console.log('──────────────────────────────────────');
console.log('• Dashboard: https://dashboard.emailjs.com/');
console.log('• Documentation: https://www.emailjs.com/docs/');
console.log('• Template Editor: https://dashboard.emailjs.com/admin/templates'); 