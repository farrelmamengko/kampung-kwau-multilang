import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heading from "../components/common/Heading";
import { getBookingByNumber, getBookingsByCustomer } from '../services/bookingService';

const BookingStatus = () => {
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState('booking'); // 'booking' or 'email'
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      toast.error('Harap masukkan nomor booking atau email');
      return;
    }

    setIsLoading(true);
    setSearched(true);
    try {
      let result;
      if (searchType === 'booking') {
        result = await getBookingByNumber(searchValue.trim());
        setBookings([result]);
      } else {
        result = await getBookingsByCustomer(searchValue.trim());
        setBookings(result);
      }
      
      if (bookings.length === 0) {
        toast.info('Tidak ada booking ditemukan');
      }
    } catch (error) {
      console.error('Search error:', error);
      setBookings([]);
      toast.error('Booking tidak ditemukan: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { class: 'warning', text: 'Menunggu Konfirmasi' },
      'confirmed': { class: 'success', text: 'Dikonfirmasi' },
      'paid': { class: 'info', text: 'Sudah Dibayar' },
      'completed': { class: 'primary', text: 'Selesai' },
      'cancelled': { class: 'danger', text: 'Dibatalkan' }
    };
    
    const statusInfo = statusMap[status] || { class: 'secondary', text: status };
    return <span className={`badge bg-${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    
    let date;
    if (typeof dateString === 'string') {
      date = new Date(dateString);
    } else if (dateString.toDate && typeof dateString.toDate === 'function') {
      // Firebase Timestamp
      date = dateString.toDate();
    } else if (dateString.seconds) {
      // Firebase Timestamp object
      date = new Date(dateString.seconds * 1000);
    } else {
      date = new Date(dateString);
    }
    
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <>
      <Heading heading={t('pages:bookingStatus.title')} title="Home" subtitle="Status Booking" />
      
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {/* Search Form */}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{t('pages:bookingStatus.searchTitle')}</h5>
                  <form onSubmit={handleSearch}>
                    <div className="mb-3">
                      <label className="form-label">{t('pages:bookingStatus.searchBy')}</label>
                      <div className="d-flex gap-3 mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="searchType"
                            id="searchBooking"
                            value="booking"
                            checked={searchType === 'booking'}
                            onChange={(e) => setSearchType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="searchBooking">
                            {t('pages:bookingStatus.bookingNumber')}
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="searchType"
                            id="searchEmail"
                            value="email"
                            checked={searchType === 'email'}
                            onChange={(e) => setSearchType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="searchEmail">
                            {t('pages:bookingStatus.email')}
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="input-group mb-3">
                      <input
                        type={searchType === 'booking' ? 'text' : 'email'}
                        className="form-control"
                        placeholder={searchType === 'booking' ? t('pages:bookingStatus.searchPlaceholder') : t('pages:bookingStatus.emailPlaceholder')}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <button 
                        className="btn btn-primary" 
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        ) : (
                          <i className="fa fa-search me-2"></i>
                        )}
                        {t('pages:bookingStatus.search')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Search Results */}
              {searched && (
                <div className="row">
                  {bookings.length === 0 ? (
                    <div className="col-12">
                      <div className="alert alert-info">
                        <i className="fa fa-info-circle me-2"></i>
                        {t('pages:bookingStatus.noResults')}
                      </div>
                    </div>
                  ) : (
                    bookings.map((booking, index) => (
                      <div key={booking.id || index} className="col-12 mb-4">
                        <div className="card">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Booking #{booking.bookingNumber}</h6>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <h6>Detail Booking</h6>
                                <p><strong>Paket:</strong> {booking.booking?.packageName}</p>
                                <p><strong>Check-in:</strong> {formatDate(booking.booking?.checkIn)}</p>
                                <p><strong>Check-out:</strong> {formatDate(booking.booking?.checkOut)}</p>
                                <p><strong>Durasi:</strong> {booking.booking?.duration} hari</p>
                                <p><strong>Tamu:</strong> {booking.booking?.guests?.adults} dewasa
                                  {booking.booking?.guests?.children > 0 && `, ${booking.booking.guests.children} anak`}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <h6>Informasi Kontak</h6>
                                <p><strong>Nama:</strong> {booking.customer?.name}</p>
                                <p><strong>Email:</strong> {booking.customer?.email}</p>
                                <p><strong>Telepon:</strong> {booking.customer?.phone}</p>
                                
                                <h6 className="mt-3">Harga</h6>
                                <p><strong>Total:</strong> {formatCurrency(booking.pricing?.total)}</p>
                              </div>
                            </div>
                            
                            {booking.activities && booking.activities.length > 0 && (
                              <div className="mt-3">
                                <h6>Aktivitas Tambahan</h6>
                                <ul className="list-unstyled">
                                  {booking.activities.map((activity, idx) => (
                                    <li key={idx}>
                                      <i className="fa fa-check-circle text-success me-2"></i>
                                      {activity.name} - {formatCurrency(activity.price)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {booking.specialRequests && Object.values(booking.specialRequests).some(val => val) && (
                              <div className="mt-3">
                                <h6>Permintaan Khusus</h6>
                                {booking.specialRequests.dietaryRestrictions && (
                                  <p><strong>Pantangan makanan:</strong> {booking.specialRequests.dietaryRestrictions}</p>
                                )}
                                {booking.specialRequests.accessibilityNeeds && (
                                  <p><strong>Kebutuhan khusus:</strong> {booking.specialRequests.accessibilityNeeds}</p>
                                )}
                                {booking.specialRequests.specialOccasion && (
                                  <p><strong>Acara spesial:</strong> {booking.specialRequests.specialOccasion}</p>
                                )}
                                {booking.specialRequests.additionalNotes && (
                                  <p><strong>Catatan:</strong> {booking.specialRequests.additionalNotes}</p>
                                )}
                              </div>
                            )}
                            
                            <div className="alert alert-info mt-3">
                              <small>
                                <i className="fa fa-info-circle me-2"></i>
                                <strong>Booking dibuat:</strong> {formatDate(booking.createdAt)}
                                {booking.statusNotes && (
                                  <><br /><strong>Catatan:</strong> {booking.statusNotes}</>
                                )}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default BookingStatus; 