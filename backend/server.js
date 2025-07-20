// Simple Backend Server for Kampung Kwau
// File: backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbPath = path.join(__dirname, 'database', 'kwau_booking.db');
const db = new Database(dbPath);

console.log('🗄️ Database connected:', dbPath);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Kampung Kwau Backend is running',
    database: 'Connected'
  });
});

// GET /api/bookings - Get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = db.prepare(`
      SELECT 
        b.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone,
        c.nationality as customer_nationality,
        p.name as package_name
      FROM bookings b
      JOIN customers c ON b.customer_id = c.id
      JOIN packages p ON b.package_id = p.id
      ORDER BY b.created_at DESC
    `).all();

    res.json({
      success: true,
      data: bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error('❌ Error getting bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get bookings'
    });
  }
});

// PUT /api/bookings/:id/status - Update booking status
app.put('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    console.log(`📝 Updating booking ${id} status to: ${status}`);
    
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled'
      });
    }
    
    // Update booking status
    const result = db.prepare(`
      UPDATE bookings 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(status, id);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Add to status history
    db.prepare(`
      INSERT INTO booking_status_history (booking_id, status, notes)
      VALUES (?, ?, ?)
    `).run(id, status, `Status updated to ${status}`);
    
    // Get updated booking
    const updatedBooking = db.prepare(`
      SELECT 
        b.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone,
        c.nationality as customer_nationality,
        p.name as package_name
      FROM bookings b
      JOIN customers c ON b.customer_id = c.id
      JOIN packages p ON b.package_id = p.id
      WHERE b.id = ?
    `).get(id);
    
    console.log('✅ Booking status updated:', updatedBooking.booking_number);
    
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });
    
  } catch (error) {
    console.error('❌ Error updating booking status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update booking status',
      message: error.message
    });
  }
});

// POST /api/bookings - Create new booking
app.post('/api/bookings', (req, res) => {
  try {
    const bookingData = req.body;
    console.log('📝 Creating booking:', bookingData);

    // Validate required fields
    if (!bookingData.customer || !bookingData.package || !bookingData.check_in_date || !bookingData.check_out_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Generate booking number
    const date = new Date();
    const bookingNumber = `KW-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    // Start transaction
    const transaction = db.transaction(() => {
      let customerId;

      // Check if customer exists
      const existingCustomer = db.prepare('SELECT id FROM customers WHERE email = ?').get(bookingData.customer.email);
      
      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        // Create new customer
        const customerResult = db.prepare(`
          INSERT INTO customers (name, email, phone, nationality) 
          VALUES (?, ?, ?, ?)
        `).run(
          bookingData.customer.name,
          bookingData.customer.email,
          bookingData.customer.phone || '',
          bookingData.customer.nationality || 'Indonesia'
        );
        customerId = customerResult.lastInsertRowid;
      }

      // Get package
      const package = db.prepare('SELECT id FROM packages WHERE name = ?').get(bookingData.package.name);
      if (!package) {
        throw new Error(`Package not found: ${bookingData.package.name}`);
      }

      // Calculate total
      const adultPrice = bookingData.adult_price || 250000;
      const childPrice = bookingData.child_price || 125000;
      const subtotal = (adultPrice * bookingData.adults_count) + (childPrice * bookingData.children_count);
      const taxAmount = subtotal * 0.1;
      const totalAmount = subtotal + taxAmount;

      // Create booking
      const bookingResult = db.prepare(`
        INSERT INTO bookings (
          booking_number, customer_id, package_id, status, check_in_date, 
          check_out_date, duration, adults_count, children_count, adult_price, 
          child_price, subtotal, tax_amount, total_amount, special_requests, source
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        bookingNumber,
        customerId,
        package.id,
        'pending',
        bookingData.check_in_date,
        bookingData.check_out_date,
        bookingData.duration || 1,
        bookingData.adults_count,
        bookingData.children_count,
        adultPrice,
        childPrice,
        subtotal,
        taxAmount,
        totalAmount,
        JSON.stringify(bookingData.special_requests || {}),
        'website'
      );

      // Get complete booking data
      const newBooking = db.prepare(`
        SELECT 
          b.*,
          c.name as customer_name,
          c.email as customer_email,
          c.phone as customer_phone,
          c.nationality as customer_nationality,
          p.name as package_name
        FROM bookings b
        JOIN customers c ON b.customer_id = c.id
        JOIN packages p ON b.package_id = p.id
        WHERE b.id = ?
      `).get(bookingResult.lastInsertRowid);

      return newBooking;
    });

    // Execute transaction
    const newBooking = transaction();

    console.log('✅ Booking created:', newBooking.booking_number);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });

  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Kampung Kwau Backend started!');
  console.log('📡 Server running on port:', PORT);
  console.log('🌐 API URL: http://localhost:' + PORT);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close();
  process.exit(0);
}); 