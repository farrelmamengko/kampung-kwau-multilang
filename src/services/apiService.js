// API Service for Frontend
// File: src/services/apiService.js

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Make API request to backend
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('❌ API Request Error:', error);
    throw error;
  }
}

/**
 * Booking API functions
 */
export const bookingAPI = {
  // Get all bookings
  getAll: () => apiRequest('/bookings'),

  // Create new booking
  create: (bookingData) => apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  }),

  // Update booking status
  updateStatus: (bookingId, status) => apiRequest(`/bookings/${bookingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};

/**
 * Health check
 */
export const healthCheck = () => apiRequest('/health');

// Convenience functions
export const getBookings = () => bookingAPI.getAll();
export const createBooking = (bookingData) => bookingAPI.create(bookingData);
export const updateBookingStatus = (bookingId, status) => bookingAPI.updateStatus(bookingId, status);

export default {
  bookingAPI,
  healthCheck,
  getBookings,
  createBooking,
  updateBookingStatus,
}; 