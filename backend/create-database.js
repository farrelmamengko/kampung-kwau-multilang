// Create SQLite Database
// File: backend/create-database.js

const Database = require('better-sqlite3');
const path = require('path');

async function createDatabase() {
  const dbPath = path.join(__dirname, 'database', 'kwau_booking.db');
  
  try {
    console.log('🗄️ Creating SQLite database...');
    console.log('📁 Database path:', dbPath);
    
    const db = new Database(dbPath);
    
    // Create tables
    const schema = `
      -- 1. TABEL PACKAGES (Paket Wisata)
      CREATE TABLE IF NOT EXISTS packages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          base_price DECIMAL(10,2) NOT NULL,
          duration VARCHAR(20) NOT NULL,
          max_guests INTEGER NOT NULL,
          includes TEXT,
          is_active BOOLEAN DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- 2. TABEL CUSTOMERS (Data Pelanggan)
      CREATE TABLE IF NOT EXISTS customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          phone VARCHAR(20),
          nationality VARCHAR(50) DEFAULT 'Indonesia',
          emergency_contact TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- 3. TABEL BOOKINGS (Data Booking Utama)
      CREATE TABLE IF NOT EXISTS bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          booking_number VARCHAR(20) UNIQUE NOT NULL,
          customer_id INTEGER NOT NULL,
          package_id INTEGER NOT NULL,
          status VARCHAR(20) DEFAULT 'pending',
          check_in_date DATE NOT NULL,
          check_out_date DATE NOT NULL,
          duration INTEGER NOT NULL,
          adults_count INTEGER NOT NULL,
          children_count INTEGER NOT NULL,
          adult_price DECIMAL(10,2) NOT NULL,
          child_price DECIMAL(10,2) NOT NULL,
          subtotal DECIMAL(10,2) NOT NULL,
          tax_amount DECIMAL(10,2) NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          special_requests TEXT,
          source VARCHAR(20) DEFAULT 'website',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (customer_id) REFERENCES customers(id),
          FOREIGN KEY (package_id) REFERENCES packages(id)
      );

      -- INDEXES
      CREATE INDEX IF NOT EXISTS idx_bookings_number ON bookings(booking_number);
      CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
    `;

    db.exec(schema);
    console.log('✅ Tables created successfully');

    // Insert sample packages
    const insertPackage = db.prepare(`
      INSERT INTO packages (name, description, base_price, duration, max_guests, includes) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertPackage.run(
      'Basic Package',
      'Basic tour package covering homestay accommodation, local food, and birdwatching activities with an experienced local guide.',
      250000,
      '2D1N',
      4,
      JSON.stringify(['1 night homestay', '3x local meals', 'Birdwatching tour (3 hours)', 'Local guide', 'Local transportation'])
    );

    insertPackage.run(
      'Standard Package',
      'Complete tour package with Arfak tribe cultural experience, nature exploration, and various other interesting activities.',
      450000,
      '3D2N',
      6,
      JSON.stringify(['2 nights premium homestay', 'All meals + snacks', 'Birdwatching + tracking', 'Cultural tour', 'Waterfall tour', 'Craft workshop'])
    );

    insertPackage.run(
      'Premium Package',
      'Premium tour package with all the best facilities, exclusive experience, and professional private guide service.',
      750000,
      '4D3N',
      8,
      JSON.stringify(['3 nights VIP homestay', 'All meals + welcome drink', 'Private birdwatching', 'Photography workshop', 'Cooking class', 'Souvenir package'])
    );

    console.log('✅ Sample packages inserted');

    // Show database info
    const packageCount = db.prepare('SELECT COUNT(*) as count FROM packages').get();
    const customerCount = db.prepare('SELECT COUNT(*) as count FROM customers').get();
    const bookingCount = db.prepare('SELECT COUNT(*) as count FROM bookings').get();

    console.log('\n📊 Database Summary:');
    console.log('├── Packages:', packageCount.count);
    console.log('├── Customers:', customerCount.count);
    console.log('└── Bookings:', bookingCount.count);

    console.log('\n🎉 Database created successfully!');
    console.log('📁 File location:', dbPath);

    db.close();

  } catch (error) {
    console.error('❌ Error creating database:', error);
  }
}

createDatabase(); 