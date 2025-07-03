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
  
  const activitiesPrice = activities.reduce((total, activity) => {
    return total + (activity.price * (guests.adults + guests.children));
  }, 0);
  
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

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    const bookingNumber = generateBookingNumber();
    const pricing = calculateTotalPrice(
      bookingData.package,
      bookingData.guests,
      bookingData.activities,
      bookingData.duration
    );
    
    const booking = {
      bookingNumber,
      status: 'pending',
      
      // Customer data
      customer: {
        name: bookingData.customer.name,
        email: bookingData.customer.email,
        phone: bookingData.customer.phone,
        nationality: bookingData.customer.nationality || 'Indonesia',
        emergencyContact: bookingData.customer.emergencyContact
      },
      
      // Booking details
      booking: {
        packageId: bookingData.package.id,
        packageName: bookingData.package.name,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        duration: bookingData.duration,
        guests: bookingData.guests
      },
      
      // Activities
      activities: bookingData.activities || [],
      
      // Pricing
      pricing,
      
      // Special requests
      specialRequests: bookingData.specialRequests || {},
      
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