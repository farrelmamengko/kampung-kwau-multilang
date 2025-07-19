import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db, TESTING_MODE } from '../firebase/config';
import { sendBookingConfirmation, sendAdminNotification } from './emailService';

// Mock storage for testing mode
let mockBookings = [];

// Mock timestamp for testing
const createMockTimestamp = () => {
  const now = new Date();
  return {
    toDate: () => now,
    seconds: Math.floor(now.getTime() / 1000),
    nanoseconds: 0,
    // Also include ISO string for localStorage compatibility
    toISOString: () => now.toISOString(),
    toString: () => now.toISOString()
  };
};

// Generate booking number
export const generateBookingNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `KW-${year}${month}${day}-${random}`;
};

// Calculate total price
export const calculateTotalPrice = (packageData, guests, activities = [], duration = 1) => {
  const basePrice = packageData.basePrice || 250000;
  const adultPrice = basePrice * guests.adults * duration;
  const childPrice = basePrice * guests.children * 0.5 * duration; // 50% for children
  
  // Ensure activities is an array and has valid structure
  let activitiesPrice = 0;
  if (Array.isArray(activities) && activities.length > 0) {
    activitiesPrice = activities.reduce((total, activity) => {
      // Ensure activity has price property
      const activityPrice = activity && typeof activity.price === 'number' ? activity.price : 0;
      return total + (activityPrice * (guests.adults + guests.children));
    }, 0);
  }
  
  const subtotal = adultPrice + childPrice + activitiesPrice;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  return {
    adultPrice,
    childPrice,
    activitiesPrice,
    subtotal,
    tax,
    total: Math.round(total)
  };
};

// Helper function to clean circular references
const cleanCircularReferences = (obj) => {
  const seen = new WeakSet();
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular Reference]';
      }
      seen.add(value);
    }
    return value;
  }));
};

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    // Clean the input data to prevent circular references
    const cleanBookingData = cleanCircularReferences(bookingData);
    
    const bookingNumber = generateBookingNumber();
    // Ensure all required data is valid before calculating price
    const validPackage = cleanBookingData.package || { basePrice: 250000, id: 0, name: 'Unknown Package' };
    const validGuests = cleanBookingData.guests || { adults: 1, children: 0 };
    const validActivities = Array.isArray(cleanBookingData.activities) ? cleanBookingData.activities : [];
    const validDuration = typeof cleanBookingData.duration === 'number' ? cleanBookingData.duration : 1;
    
    const pricing = calculateTotalPrice(
      validPackage,
      validGuests,
      validActivities,
      validDuration
    );
    
    const booking = {
      bookingNumber,
      status: 'pending',
      
      // Customer data
      customer: {
        name: cleanBookingData.customer?.name || 'Unknown Customer',
        email: cleanBookingData.customer?.email || '',
        phone: cleanBookingData.customer?.phone || '',
        nationality: cleanBookingData.customer?.nationality || 'Indonesia',
        emergencyContact: cleanBookingData.customer?.emergencyContact || ''
      },
      
      // Booking details
      booking: {
        packageId: validPackage.id,
        packageName: validPackage.name,
        checkIn: cleanBookingData.checkIn,
        checkOut: cleanBookingData.checkOut,
        duration: validDuration,
        guests: validGuests
      },
      
      // Activities - clean and extract only needed properties
      activities: Array.isArray(cleanBookingData.activities) ? 
        cleanBookingData.activities
          .filter(activity => activity && typeof activity === 'object')
          .map(activity => ({
            id: activity.id || 0,
            name: activity.name || 'Unknown Activity',
            description: activity.description || '',
            price: typeof activity.price === 'number' ? activity.price : 0,
            duration: activity.duration || ''
          })) : [],
      
      // Pricing
      pricing,
      
      // Special requests
      specialRequests: cleanBookingData.specialRequests || {},
      
      // Metadata
      createdAt: TESTING_MODE ? createMockTimestamp() : Timestamp.now(),
      updatedAt: TESTING_MODE ? createMockTimestamp() : Timestamp.now(),
      source: 'website'
    };
    
    // Testing mode - use local storage
    if (TESTING_MODE || !db) {
      console.log('🧪 Testing Mode: Saving booking to localStorage');
      const bookingId = 'mock_' + Date.now();
      const fullBooking = { id: bookingId, ...booking };
      
      // Save to mock storage
      mockBookings.push(fullBooking);
      
      // Also save to localStorage for persistence
      const existingBookings = JSON.parse(localStorage.getItem('kwau_bookings') || '[]');
      existingBookings.push(fullBooking);
      localStorage.setItem('kwau_bookings', JSON.stringify(existingBookings));

      // Send email notifications
      try {
        console.log('📧 Mengirim email konfirmasi...');
        await sendBookingConfirmation(fullBooking);
        await sendAdminNotification(fullBooking);
        console.log('✅ Email konfirmasi berhasil dikirim');
      } catch (emailError) {
        console.warn('⚠️ Booking berhasil dibuat, tapi email gagal dikirim:', emailError.message);
        // Don't throw error for email failure - booking is still valid
      }
      
      return {
        success: true,
        bookingId,
        bookingNumber,
        booking: fullBooking
      };
    }
    
    // Production mode - use Firebase
    const docRef = await addDoc(collection(db, 'bookings'), booking);
    const fullBooking = { id: docRef.id, ...booking };

    // Send email notifications
    try {
      console.log('📧 Mengirim email konfirmasi...');
      await sendBookingConfirmation(fullBooking);
      await sendAdminNotification(fullBooking);
      console.log('✅ Email konfirmasi berhasil dikirim');
    } catch (emailError) {
      console.warn('⚠️ Booking berhasil dibuat, tapi email gagal dikirim:', emailError.message);
      // Don't throw error for email failure - booking is still valid
    }
    
    return {
      success: true,
      bookingId: docRef.id,
      bookingNumber,
      booking: fullBooking
    };
    
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking: ' + error.message);
  }
};

// Get booking by ID
export const getBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);
    
    if (bookingSnap.exists()) {
      return {
        id: bookingSnap.id,
        ...bookingSnap.data()
      };
    } else {
      throw new Error('Booking not found');
    }
  } catch (error) {
    console.error('Error getting booking:', error);
    throw error;
  }
};

// Get booking by booking number
export const getBookingByNumber = async (bookingNumber) => {
  try {
    // Testing mode - search in localStorage
    if (TESTING_MODE || !db) {
      console.log('🧪 Testing Mode: Searching booking in localStorage');
      const existingBookings = JSON.parse(localStorage.getItem('kwau_bookings') || '[]');
      const booking = existingBookings.find(b => b.bookingNumber === bookingNumber);
      
      if (booking) {
        return booking;
      } else {
        throw new Error('Booking not found');
      }
    }
    
    // Production mode - use Firebase
    const q = query(
      collection(db, 'bookings'),
      where('bookingNumber', '==', bookingNumber)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } else {
      throw new Error('Booking not found');
    }
  } catch (error) {
    console.error('Error getting booking by number:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status, notes = '') => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status,
      updatedAt: Timestamp.now(),
      statusNotes: notes
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

// Get all bookings (for admin)
export const getAllBookings = async (limit = 50) => {
  try {
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const bookings = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting all bookings:', error);
    throw error;
  }
};

// Get bookings by customer email
export const getBookingsByCustomer = async (email) => {
  try {
    // Testing mode - search in localStorage
    if (TESTING_MODE || !db) {
      console.log('🧪 Testing Mode: Searching bookings by email in localStorage');
      const existingBookings = JSON.parse(localStorage.getItem('kwau_bookings') || '[]');
      const customerBookings = existingBookings.filter(b => b.customer.email === email);
      
      // Sort by creation date (newest first)
      customerBookings.sort((a, b) => {
        const dateA = new Date(a.createdAt.seconds ? a.createdAt.seconds * 1000 : a.createdAt);
        const dateB = new Date(b.createdAt.seconds ? b.createdAt.seconds * 1000 : b.createdAt);
        return dateB - dateA;
      });
      
      return customerBookings;
    }
    
    // Production mode - use Firebase
    const q = query(
      collection(db, 'bookings'),
      where('customer.email', '==', email),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const bookings = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting customer bookings:', error);
    throw error;
  }
}; 