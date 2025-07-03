# 📧 Email Setup Guide - Kampung Kwau Booking System

## 🎯 Overview
Sistem booking sudah dilengkapi dengan fitur email otomatis yang akan mengirim konfirmasi booking langsung ke email customer setelah booking berhasil dibuat.

## 🔧 Setup EmailJS (Recommended)

### 1. Buat Akun EmailJS
1. Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/)
2. Daftar dengan email Anda
3. Verifikasi email dan login

### 2. Setup Email Service
1. Di dashboard EmailJS, klik "Add New Service"
2. Pilih provider email (Gmail/Outlook/Yahoo)
3. Ikuti instruksi untuk connect email Anda
4. Catat **Service ID** (contoh: `service_kwau_booking`)

### 3. Buat Email Template
Buat template dengan **Template ID**: `template_booking_confirmation`

**Subject Template:**
```
Konfirmasi Booking Kampung Kwau - {{booking_number}}
```

**Email Body Template:**
```html
<h2>Halo {{customer_name}},</h2>

<p>Terima kasih telah melakukan booking di <strong>Kampung Kwau</strong>!</p>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>🎫 DETAIL BOOKING</h3>
    <table style="width: 100%; border-collapse: collapse;">
        <tr><td><strong>Nomor Booking:</strong></td><td>{{booking_number}}</td></tr>
        <tr><td><strong>Status:</strong></td><td>Menunggu Konfirmasi</td></tr>
    </table>
</div>

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>🏞️ PAKET WISATA</h3>
    <table style="width: 100%; border-collapse: collapse;">
        <tr><td><strong>Paket:</strong></td><td>{{package_name}}</td></tr>
        <tr><td><strong>Check-in:</strong></td><td>{{check_in}}</td></tr>
        <tr><td><strong>Check-out:</strong></td><td>{{check_out}}</td></tr>
        <tr><td><strong>Durasi:</strong></td><td>{{duration}} hari</td></tr>
        <tr><td><strong>Jumlah Tamu:</strong></td><td>{{adults}} dewasa{{#if children}}, {{children}} anak{{/if}}</td></tr>
    </table>
</div>

{{#if activities}}
<div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>🎯 AKTIVITAS TAMBAHAN</h3>
    <p>{{activities}}</p>
</div>
{{/if}}

<div style="background: #f1f8e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>💰 RINCIAN BIAYA</h3>
    <table style="width: 100%; border-collapse: collapse;">
        <tr><td>Paket:</td><td>{{package_total}}</td></tr>
        {{#if activities_total}}
        <tr><td>Aktivitas:</td><td>{{activities_total}}</td></tr>
        {{/if}}
        <tr><td>Pajak (10%):</td><td>{{tax}}</td></tr>
        <tr style="border-top: 2px solid #333; font-weight: bold;">
            <td><strong>TOTAL:</strong></td><td><strong>{{total}}</strong></td>
        </tr>
    </table>
</div>

<div style="background: #fce4ec; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>📞 KONTAK DARURAT</h3>
    <p>{{emergency_contact}}</p>
</div>

{{#if special_requests}}
<div style="background: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>⭐ PERMINTAAN KHUSUS</h3>
    <p>{{special_requests}}</p>
</div>
{{/if}}

<div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>📋 LANGKAH SELANJUTNYA</h3>
    <ol>
        <li>Tim kami akan menghubungi Anda dalam <strong>24 jam</strong> untuk konfirmasi</li>
        <li>Setelah dikonfirmasi, Anda akan menerima instruksi pembayaran</li>
        <li>Silakan simpan email ini sebagai bukti booking</li>
    </ol>
</div>

<div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
    <p><strong>Jika ada pertanyaan, hubungi kami:</strong></p>
    <p>📞 WhatsApp: +62-823-xxxx-xxxx<br>
    📧 Email: farrelmamengko@gmail.com</p>
    
    <p style="margin-top: 20px;">Terima kasih dan sampai jumpa di Kampung Kwau!</p>
    
    <p><strong>Salam,<br>
    Tim Kampung Kwau<br>
    Ekowisata Papua Barat</strong></p>
</div>
```

### 4. Update Konfigurasi
Edit file `src/services/emailService.js`:

```javascript
const EMAIL_CONFIG = {
  serviceId: 'service_kwau_booking', // Ganti dengan Service ID Anda
  templateId: 'template_booking_confirmation', // Ganti dengan Template ID Anda  
  userId: 'your_emailjs_user_id', // Ganti dengan User ID EmailJS Anda
  testMode: false // Ubah ke false untuk production
};
```

### 5. Test Email
1. Ubah `testMode: false` di `emailService.js`
2. Lakukan booking test
3. Cek email inbox customer
4. Verifikasi format email sudah sesuai

## 🚀 Testing Mode

Saat ini sistem dalam **Test Mode** yang akan:
- ✅ Menampilkan preview email di console browser
- ✅ Tidak mengirim email real
- ✅ Logging semua detail email

**Cara melihat test email:**
1. Buka browser console (F12)
2. Lakukan booking
3. Lihat output email di console

## 🎛️ Alternative: Setup Gmail SMTP

Jika ingin menggunakan Gmail langsung (lebih advanced):

### 1. Setup Gmail App Password
1. Enable 2FA di Gmail
2. Generate App Password
3. Catat password untuk config

### 2. Backend Email Service
Buat backend service (Node.js) dengan nodemailer:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'farrelmamengko@gmail.com',
    pass: 'your_app_password'
  }
});
```

## 📊 Email Templates

### Customer Confirmation Email ✅
- Subject: "Konfirmasi Booking Kampung Kwau - [BOOKING_NUMBER]"
- Content: Lengkap dengan detail booking, pricing, next steps
- Status: **Implemented**

### Admin Notification Email ✅
- Subject: "[BOOKING BARU] [BOOKING_NUMBER]"
- Content: Brief notification untuk admin
- Status: **Implemented**

### Future Email Templates (Optional)
- **Payment Reminder**: Pengingat pembayaran
- **Status Update**: Update status booking
- **Pre-arrival**: Info persiapan sebelum datang
- **Post-visit**: Follow up dan review request

## 🔧 Troubleshooting

### Email Tidak Terkirim
1. **Cek console errors**: Buka F12 → Console
2. **Verify EmailJS config**: Service ID, Template ID, User ID
3. **Check email limits**: EmailJS free tier = 200 emails/month
4. **Test template**: Pastikan template variables match

### Template Variables Tidak Muncul
1. **Case sensitive**: `{{customer_name}}` bukan `{{Customer_Name}}`
2. **Exact match**: Nama variable harus sama persis
3. **Test di EmailJS dashboard**: Preview template dulu

### Production Issues
1. **Rate limiting**: Jangan spam email
2. **Spam filters**: Email masuk ke spam folder
3. **Error handling**: Email gagal tidak mempengaruhi booking

## 📈 Best Practices

### Email Deliverability
- ✅ Use professional "From" address
- ✅ Include unsubscribe link
- ✅ Avoid spam trigger words
- ✅ Test across email providers

### User Experience
- ✅ Clear subject lines
- ✅ Mobile-responsive templates
- ✅ Call-to-action buttons
- ✅ Contact information visible

### Performance
- ✅ Async email sending
- ✅ Error handling yang baik
- ✅ Retry mechanism untuk failed emails
- ✅ Queue untuk bulk emails

## 💰 Pricing Options

### EmailJS (Recommended)
- **Free**: 200 emails/month
- **Pro**: $15/month = 5,000 emails
- **Enterprise**: Custom pricing

### SendGrid
- **Free**: 100 emails/day
- **Essentials**: $14.95/month = 40,000 emails

### Mailgun
- **Free**: 5,000 emails/month
- **Flex**: $0.80 per 1,000 emails

## 🎯 Production Checklist

### Before Go-Live:
- [ ] EmailJS account setup & verified
- [ ] Email templates tested
- [ ] Production configs updated
- [ ] Error handling tested
- [ ] Spam folder testing
- [ ] Mobile email testing

### Post Go-Live:
- [ ] Monitor email delivery rates
- [ ] Check spam complaints
- [ ] Track email opens (optional)
- [ ] Customer feedback on emails
- [ ] Monthly usage review

## 📞 Support

Jika ada masalah dengan email setup:
- 📧 **Email**: tech@kampungkwau.com
- 📱 **WhatsApp**: +62-823-xxxx-xxxx
- 📚 **Documentation**: EmailJS docs
- 🎬 **Video Tutorial**: [Setup EmailJS for React](https://youtube.com/...)

---

**Status**: ✅ Email system implemented and ready for production
**Last Updated**: 3 Januari 2025
**Next Update**: Add payment notification emails 