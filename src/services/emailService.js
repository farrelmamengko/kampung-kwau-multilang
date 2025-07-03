import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAIL_CONFIG = {
  serviceId: 'service_kwau_booking', // You'll need to create this in EmailJS dashboard
  templateId: 'template_booking_confirmation', // You'll need to create this template
  userId: 'your_emailjs_user_id', // Your EmailJS user ID
  // For testing, we'll use demo mode
  testMode: true,
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
    // In test mode, just log the email data
    if (EMAIL_CONFIG.testMode) {
      console.log('📧 Test Mode: Email yang akan dikirim:');
      console.log('──────────────────────────────────────');
      console.log('To:', bookingData.customer.email);
      console.log('Subject: Konfirmasi Booking Kampung Kwau - ' + bookingData.bookingNumber);
      console.log('──────────────────────────────────────');
      console.log('Email Content:');
      console.log(`
Halo ${bookingData.customer.name},

Terima kasih telah melakukan booking di Kampung Kwau!

DETAIL BOOKING:
═══════════════════════════════════════
Nomor Booking: ${bookingData.bookingNumber}
Status: ${bookingData.status === 'pending' ? 'Menunggu Konfirmasi' : bookingData.status}

PAKET WISATA:
${bookingData.booking.packageName}
Check-in: ${formatDate(bookingData.booking.checkIn)}
Check-out: ${formatDate(bookingData.booking.checkOut)}
Durasi: ${bookingData.booking.duration} hari
Jumlah Tamu: ${bookingData.booking.guests.adults} dewasa${bookingData.booking.guests.children > 0 ? `, ${bookingData.booking.guests.children} anak` : ''}

${bookingData.activities && bookingData.activities.length > 0 ? `
AKTIVITAS TAMBAHAN:
${bookingData.activities.map(activity => `• ${activity.name} - ${formatCurrency(activity.price)}`).join('\n')}
` : ''}

RINCIAN BIAYA:
═══════════════════════════════════════
Paket: ${formatCurrency(bookingData.pricing.packageTotal)}
${bookingData.activities && bookingData.activities.length > 0 ? `Aktivitas: ${formatCurrency(bookingData.pricing.activitiesTotal)}` : ''}
Pajak (10%): ${formatCurrency(bookingData.pricing.tax)}
──────────────────────────────────────
TOTAL: ${formatCurrency(bookingData.pricing.total)}

KONTAK DARURAT: ${bookingData.customer.emergencyContact || 'Tidak ada'}

${bookingData.specialRequests && Object.keys(bookingData.specialRequests).length > 0 ? `
PERMINTAAN KHUSUS:
${Object.entries(bookingData.specialRequests).map(([key, value]) => `${key}: ${value ? 'Ya' : 'Tidak'}`).join('\n')}
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
    
    const templateParams = {
      to_email: bookingData.customer.email,
      customer_name: bookingData.customer.name,
      booking_number: bookingData.bookingNumber,
      package_name: bookingData.booking.packageName,
      check_in: formatDate(bookingData.booking.checkIn),
      check_out: formatDate(bookingData.booking.checkOut),
      duration: bookingData.booking.duration,
      adults: bookingData.booking.guests.adults,
      children: bookingData.booking.guests.children,
      activities: bookingData.activities?.map(a => `${a.name} - ${formatCurrency(a.price)}`).join(', ') || 'Tidak ada',
      package_total: formatCurrency(bookingData.pricing.packageTotal),
      activities_total: formatCurrency(bookingData.pricing.activitiesTotal || 0),
      tax: formatCurrency(bookingData.pricing.tax),
      total: formatCurrency(bookingData.pricing.total),
      emergency_contact: bookingData.customer.emergencyContact || 'Tidak ada',
      special_requests: bookingData.specialRequests ? 
        Object.entries(bookingData.specialRequests).map(([key, value]) => `${key}: ${value ? 'Ya' : 'Tidak'}`).join(', ') :
        'Tidak ada'
    };

    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    console.log('✅ Email berhasil dikirim:', result);
    return { success: true, result };

  } catch (error) {
    console.error('❌ Error mengirim email:', error);
    throw new Error('Gagal mengirim email konfirmasi: ' + error.message);
  }
};

// Send notification email to admin/staff
export const sendAdminNotification = async (bookingData) => {
  try {
    // In test mode, just log the admin notification
    if (EMAIL_CONFIG.testMode) {
      console.log('📧 Test Mode: Notifikasi Admin');
      console.log('To:', EMAIL_CONFIG.adminEmail);
      console.log('Subject: [BOOKING BARU] ' + bookingData.bookingNumber);
      console.log('Body: Booking baru dari ' + bookingData.customer.name + ' dengan total ' + formatCurrency(bookingData.pricing.total));
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