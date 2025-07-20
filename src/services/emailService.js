import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAIL_CONFIG = {
  serviceId: 'service_iggrh35', // Gmail service ID dari EmailJS dashboard
  templateId: 'template_n1es8q7', // Template Order Confirmation yang sudah diedit
  userId: 'cERh5Eezr8mKQn9Vt', // Public Key dari EmailJS Account
  // Set false untuk production mode
  testMode: false, // Production mode - email akan terkirim real
  // Default admin email for notifications
  adminEmail: 'farrelmamengko@gmail.com'
};

// Initialize EmailJS
const initEmailJS = () => {
  if (!EMAIL_CONFIG.testMode) {
    emailjs.init(EMAIL_CONFIG.userId);
  }
};

// Format currency for email
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Format date for email
const formatDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  } else if (date && date.toDate) {
    date = date.toDate();
  }
  
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Send booking confirmation email to customer
export const sendBookingConfirmation = async (bookingData) => {
  try {
    // Clean booking data to prevent circular references
    const cleanBookingData = JSON.parse(JSON.stringify(bookingData));
    
    // In test mode, just log the email data
    if (EMAIL_CONFIG.testMode) {
      console.log('📧 Test Mode: Email yang akan dikirim:');
      console.log('──────────────────────────────────────');
      console.log('To:', cleanBookingData.customer.email);
      console.log('Subject: Konfirmasi Booking Kampung Kwau - ' + cleanBookingData.bookingNumber);
      console.log('──────────────────────────────────────');
      console.log('Email Content:');
      console.log(`
Halo ${cleanBookingData.customer.name},

Terima kasih telah melakukan booking di Kampung Kwau!

DETAIL BOOKING:
═══════════════════════════════════════
Nomor Booking: ${cleanBookingData.bookingNumber}
Status: ${cleanBookingData.status === 'pending' ? 'Menunggu Konfirmasi' : cleanBookingData.status}

PAKET WISATA:
${cleanBookingData.booking.packageName}
Check-in: ${formatDate(cleanBookingData.booking.checkIn)}
Check-out: ${formatDate(cleanBookingData.booking.checkOut)}
Durasi: ${cleanBookingData.booking.duration} hari
Jumlah Tamu: ${cleanBookingData.booking.guests.adults} dewasa${cleanBookingData.booking.guests.children > 0 ? `, ${cleanBookingData.booking.guests.children} anak` : ''}

${cleanBookingData.activities && cleanBookingData.activities.length > 0 ? `
AKTIVITAS TAMBAHAN:
${cleanBookingData.activities.map(activity => `• ${activity.name} - ${formatCurrency(activity.price)}`).join('\n')}
` : ''}

RINCIAN BIAYA:
═══════════════════════════════════════
Paket: ${formatCurrency(cleanBookingData.pricing.packageTotal)}
${cleanBookingData.activities && cleanBookingData.activities.length > 0 ? `Aktivitas: ${formatCurrency(cleanBookingData.pricing.activitiesTotal)}` : ''}
Pajak (10%): ${formatCurrency(cleanBookingData.pricing.tax)}
──────────────────────────────────────
TOTAL: ${formatCurrency(cleanBookingData.pricing.total)}

KONTAK DARURAT: ${cleanBookingData.customer.emergencyContact || 'Tidak ada'}

${cleanBookingData.specialRequests && Object.keys(cleanBookingData.specialRequests).length > 0 ? `
PERMINTAAN KHUSUS:
${Object.entries(cleanBookingData.specialRequests).map(([key, value]) => `${key}: ${value ? 'Ya' : 'Tidak'}`).join('\n')}
` : ''}

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
      `);
      console.log('──────────────────────────────────────');
      return { success: true, mode: 'test' };
    }

    // Production mode - send actual email
    initEmailJS();
    
    // Validate required data
    if (!cleanBookingData.customer?.email) {
      throw new Error('Email customer tidak boleh kosong');
    }
    
    if (!cleanBookingData.customer?.name) {
      throw new Error('Nama customer tidak boleh kosong');
    }
    
    // Prepare template parameters - using only essential variables
    const templateParams = {
      email: cleanBookingData.customer.email, // For "To Email" field
      customer_name: cleanBookingData.customer.name || 'Customer',
      booking_number: cleanBookingData.bookingNumber || 'N/A',
      package_name: cleanBookingData.booking?.packageName || 'Paket Wisata',
      check_in: cleanBookingData.booking?.checkIn ? formatDate(cleanBookingData.booking.checkIn) : 'TBD',
      check_out: cleanBookingData.booking?.checkOut ? formatDate(cleanBookingData.booking.checkOut) : 'TBD',
      duration: cleanBookingData.booking?.duration || 1,
      adults: cleanBookingData.booking?.guests?.adults || 1,
      children: cleanBookingData.booking?.guests?.children || 0,
      package_total: cleanBookingData.pricing?.packageTotal ? formatCurrency(cleanBookingData.pricing.packageTotal) : 'Rp 0',
      tax: cleanBookingData.pricing?.tax ? formatCurrency(cleanBookingData.pricing.tax) : 'Rp 0',
      total: cleanBookingData.pricing?.total ? formatCurrency(cleanBookingData.pricing.total) : 'Rp 0'
    };
    
    console.log('📧 Template Parameters:', templateParams);

    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    console.log('✅ Email berhasil dikirim:', result);
    return { success: true, result };

  } catch (error) {
    console.error('❌ Error mengirim email:', error);
    
    // If email fails, fallback to test mode for debugging
    console.log('🔄 Fallback ke test mode untuk debugging...');
    console.log('📧 Email yang gagal dikirim:');
    console.log('To:', bookingData.customer?.email);
    console.log('Subject: Konfirmasi Booking Kampung Kwau - ' + (bookingData.bookingNumber || 'N/A'));
    
    // Don't throw error - booking is still valid
    return { 
      success: false, 
      error: error.message,
      mode: 'fallback',
      message: 'Booking berhasil dibuat, tapi email gagal dikirim. Silakan cek konfigurasi EmailJS.'
    };
  }
};

// Send notification email to admin/staff
export const sendAdminNotification = async (bookingData) => {
  try {
    // Clean booking data to prevent circular references
    const cleanBookingData = JSON.parse(JSON.stringify(bookingData));
    
    // In test mode, just log the admin notification
    if (EMAIL_CONFIG.testMode) {
      console.log('📧 Test Mode: Notifikasi Admin');
      console.log('To:', EMAIL_CONFIG.adminEmail);
      console.log('Subject: [BOOKING BARU] ' + cleanBookingData.bookingNumber);
      console.log('Body: Booking baru dari ' + cleanBookingData.customer.name + ' dengan total ' + formatCurrency(cleanBookingData.pricing.total));
      return { success: true, mode: 'test' };
    }

    // Production implementation would go here
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};

// Email setup instructions
export const getEmailSetupInstructions = () => {
  return `
🔧 SETUP EMAILJS UNTUK PRODUCTION:

1. Buat akun di https://www.emailjs.com/
2. Buat Email Service (Gmail/Outlook/etc)
3. Buat Email Template dengan variables:
   - {{customer_name}}
   - {{booking_number}}
   - {{package_name}}
   - {{check_in}}
   - {{total}}
   - dst...

4. Update EMAIL_CONFIG di emailService.js:
   - serviceId: 'your_service_id'
   - templateId: 'your_template_id'  
   - userId: 'your_user_id'
   - testMode: false

5. Template email contoh sudah disiapkan di console log above.
  `;
};

export default {
  sendBookingConfirmation,
  sendAdminNotification,
  getEmailSetupInstructions
}; 