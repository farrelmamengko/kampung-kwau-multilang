import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import apiService from '../services/apiService';

const Dashboard = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch bookings data
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await apiService.getBookings();
      if (response.success) {
        setBookings(response.data);
        calculateStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Gagal mengambil data booking');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (bookingData) => {
    const stats = {
      total: bookingData.length,
      pending: bookingData.filter(b => b.status === 'pending').length,
      confirmed: bookingData.filter(b => b.status === 'confirmed').length,
      completed: bookingData.filter(b => b.status === 'completed').length,
      cancelled: bookingData.filter(b => b.status === 'cancelled').length
    };
    setStats(stats);
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await apiService.updateBookingStatus(bookingId, newStatus);
      if (response.success) {
        toast.success(`Status booking berhasil diubah ke ${newStatus}`);
        fetchBookings(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Gagal mengubah status booking');
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'info',
      completed: 'success',
      cancelled: 'danger'
    };
    return colors[status] || 'secondary';
  };

  // Load data on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Memuat data dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-primary text-white py-4">
        <div className="container">
          <h1 className="mb-0">
            <i className="fas fa-tachometer-alt me-3"></i>
            Dashboard Admin - Kampung Kwau
          </h1>
          <p className="mb-0">Kelola booking dan monitoring sistem</p>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          {/* Statistics Cards */}
          <div className="row g-4 mb-5">
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <i className="fas fa-calendar-check fa-2x mb-2"></i>
                  <h4 className="mb-1">{stats.total}</h4>
                  <small>Total Booking</small>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <i className="fas fa-clock fa-2x mb-2"></i>
                  <h4 className="mb-1">{stats.pending}</h4>
                  <small>Pending</small>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <i className="fas fa-check-circle fa-2x mb-2"></i>
                  <h4 className="mb-1">{stats.confirmed}</h4>
                  <small>Confirmed</small>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <i className="fas fa-flag-checkered fa-2x mb-2"></i>
                  <h4 className="mb-1">{stats.completed}</h4>
                  <small>Completed</small>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card bg-danger text-white">
                <div className="card-body text-center">
                  <i className="fas fa-times-circle fa-2x mb-2"></i>
                  <h4 className="mb-1">{stats.cancelled}</h4>
                  <small>Cancelled</small>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card bg-secondary text-white">
                <div className="card-body text-center">
                  <i className="fas fa-users fa-2x mb-2"></i>
                  <h4 className="mb-1">{bookings.length > 0 ? new Set(bookings.map(b => b.customer_id)).size : 0}</h4>
                  <small>Unique Customers</small>
                </div>
              </div>
            </div>
          </div>

          {/* Booking List */}
          <div className="card">
            <div className="card-header bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  Daftar Booking
                </h5>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={fetchBookings}
                >
                  <i className="fas fa-sync-alt me-1"></i>
                  Refresh
                </button>
              </div>
            </div>
            <div className="card-body">
              {bookings.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">Belum ada booking</h5>
                  <p className="text-muted">Booking akan muncul di sini setelah customer melakukan reservasi</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Booking #</th>
                        <th>Customer</th>
                        <th>Package</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Guests</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <strong>{booking.booking_number}</strong>
                            <br />
                            <small className="text-muted">
                              {formatDate(booking.created_at)}
                            </small>
                          </td>
                          <td>
                            <div>
                              <strong>{booking.customer_name}</strong>
                              <br />
                              <small className="text-muted">{booking.customer_email}</small>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">
                              {booking.package_name}
                            </span>
                          </td>
                          <td>{formatDate(booking.check_in_date)}</td>
                          <td>{formatDate(booking.check_out_date)}</td>
                          <td>
                            {booking.adults_count} dewasa
                            {booking.children_count > 0 && `, ${booking.children_count} anak`}
                          </td>
                          <td>
                            <strong>{formatCurrency(booking.total_amount)}</strong>
                          </td>
                          <td>
                            <span className={`badge bg-${getStatusBadge(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowModal(true);
                                }}
                                title="View Details"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                className="btn btn-outline-success"
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                title="Confirm"
                                disabled={booking.status === 'confirmed'}
                              >
                                <i className="fas fa-check"></i>
                              </button>
                              <button
                                className="btn btn-outline-warning"
                                onClick={() => updateBookingStatus(booking.id, 'completed')}
                                title="Complete"
                                disabled={booking.status === 'completed'}
                              >
                                <i className="fas fa-flag-checkered"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Detail Booking - {selectedBooking.booking_number}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p><strong>Name:</strong> {selectedBooking.customer_name}</p>
                    <p><strong>Email:</strong> {selectedBooking.customer_email}</p>
                    <p><strong>Phone:</strong> {selectedBooking.customer_phone || 'N/A'}</p>
                    <p><strong>Nationality:</strong> {selectedBooking.customer_nationality || 'Indonesia'}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Booking Information</h6>
                    <p><strong>Package:</strong> {selectedBooking.package_name}</p>
                    <p><strong>Check-in:</strong> {formatDate(selectedBooking.check_in_date)}</p>
                    <p><strong>Check-out:</strong> {formatDate(selectedBooking.check_out_date)}</p>
                    <p><strong>Duration:</strong> {selectedBooking.duration} hari</p>
                    <p><strong>Guests:</strong> {selectedBooking.adults_count} dewasa, {selectedBooking.children_count} anak</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <h6>Pricing</h6>
                    <p><strong>Adult Price:</strong> {formatCurrency(selectedBooking.adult_price)}</p>
                    <p><strong>Child Price:</strong> {formatCurrency(selectedBooking.child_price)}</p>
                    <p><strong>Subtotal:</strong> {formatCurrency(selectedBooking.subtotal)}</p>
                    <p><strong>Tax:</strong> {formatCurrency(selectedBooking.tax_amount)}</p>
                    <p><strong>Total:</strong> {formatCurrency(selectedBooking.total_amount)}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Status & Notes</h6>
                    <p>
                      <strong>Status:</strong>
                      <span className={`badge bg-${getStatusBadge(selectedBooking.status)} ms-2`}>
                        {selectedBooking.status}
                      </span>
                    </p>
                    <p><strong>Created:</strong> {formatDate(selectedBooking.created_at)}</p>
                    <p><strong>Source:</strong> {selectedBooking.source || 'Website'}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    // Add action to send email or update status
                    toast.info('Feature coming soon!');
                  }}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </>
  );
};

export default Dashboard; 