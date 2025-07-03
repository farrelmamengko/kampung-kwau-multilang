import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heading from "../components/common/Heading";
import { roomItems, additionalActivities } from '../components/data/Data';
import { createBooking, calculateTotalPrice } from '../services/bookingService';

const BookingPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [totalPricing, setTotalPricing] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // Watch form values for real-time calculation
  const watchedAdults = watch('adults', 1);
  const watchedChildren = watch('children', 0);

  // Calculate duration
  const duration = checkInDate && checkOutDate 
    ? Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    : 1;

  // Real-time price calculation
  useEffect(() => {
    if (selectedPackage && watchedAdults) {
      const guests = { 
        adults: parseInt(watchedAdults) || 1, 
        children: parseInt(watchedChildren) || 0 
      };
      
      const pricing = calculateTotalPrice(
        selectedPackage,
        guests,
        selectedActivities,
        duration
      );
      setTotalPricing(pricing);
    }
  }, [selectedPackage, watchedAdults, watchedChildren, selectedActivities, duration]);

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setCurrentStep(2);
  };

  // Handle activity toggle
  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => {
      const existing = prev.find(a => a.id === activity.id);
      if (existing) {
        return prev.filter(a => a.id !== activity.id);
      } else {
        return [...prev, activity];
      }
    });
  };

  // Handle date validation
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date >= checkOutDate) {
      setCheckOutDate(null);
    }
  };

  // Submit booking
  const onSubmit = async (data) => {
    if (!selectedPackage || !checkInDate || !checkOutDate) {
      toast.error('Harap lengkapi semua data booking');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        customer: {
          name: data.customerName,
          email: data.email,
          phone: data.phone,
          nationality: data.nationality,
          emergencyContact: data.emergencyContact
        },
        package: selectedPackage,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        duration,
        guests: {
          adults: parseInt(data.adults),
          children: parseInt(data.children)
        },
        activities: selectedActivities,
        specialRequests: {
          dietaryRestrictions: data.dietaryRestrictions,
          accessibilityNeeds: data.accessibilityNeeds,
          specialOccasion: data.specialOccasion,
          additionalNotes: data.additionalNotes
        }
      };

      const result = await createBooking(bookingData);
      setBookingResult(result);
      setCurrentStep(5); // Success step
      toast.success('Booking berhasil dibuat!');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Gagal membuat booking: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Heading heading="Booking Paket Wisata" title="Home" subtitle="Booking" />
      
      <div className="container-xxl py-5">
        <div className="container">
          {/* Progress Steps */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="d-flex align-items-center">
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'
                      }`}
                      style={{ width: '40px', height: '40px' }}
                    >
                      {step}
                    </div>
                    {step < 5 && (
                      <div 
                        className={`bg-${currentStep > step ? 'primary' : 'light'}`}
                        style={{ width: '50px', height: '2px' }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-2">
                <small className="text-muted">
                  {currentStep === 1 && 'Pilih Paket'}
                  {currentStep === 2 && 'Tanggal & Tamu'}
                  {currentStep === 3 && 'Aktivitas Tambahan'}
                  {currentStep === 4 && 'Data Pribadi'}
                  {currentStep === 5 && 'Konfirmasi'}
                </small>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Package Selection */}
            {currentStep === 1 && (
              <div className="row">
                <div className="col-12">
                  <h3 className="mb-4 text-center">Pilih Paket Wisata</h3>
                  <div className="row g-4">
                    {roomItems.map((pkg) => (
                      <div key={pkg.id} className="col-lg-4 col-md-6">
                        <div className="card h-100 shadow-sm">
                          <img src={pkg.img} className="card-img-top" alt={pkg.name} style={{height: '200px', objectFit: 'cover'}} />
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{pkg.name}</h5>
                            <p className="text-primary fw-bold fs-5">{pkg.price}</p>
                            <p className="card-text">{pkg.description}</p>
                            <div className="mb-3">
                              <small className="text-muted">
                                <strong>Durasi:</strong> {pkg.duration} | <strong>Max:</strong> {pkg.maxGuests} orang
                              </small>
                            </div>
                            <div className="mb-3">
                              <strong>Termasuk:</strong>
                              <ul className="list-unstyled mt-2">
                                {pkg.includes.map((item, idx) => (
                                  <li key={idx}><i className="fa fa-check text-primary me-2"></i>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <button 
                              type="button"
                              className="btn btn-primary mt-auto"
                              onClick={() => handlePackageSelect(pkg)}
                            >
                              Pilih Paket
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date & Guests */}
            {currentStep === 2 && selectedPackage && (
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h3 className="mb-4 text-center">Tanggal & Jumlah Tamu</h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Tanggal Check-in</label>
                          <DatePicker
                            selected={checkInDate}
                            onChange={handleCheckInChange}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            placeholderText="Pilih tanggal check-in"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Tanggal Check-out</label>
                          <DatePicker
                            selected={checkOutDate}
                            onChange={setCheckOutDate}
                            minDate={checkInDate ? new Date(checkInDate.getTime() + 24*60*60*1000) : new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            placeholderText="Pilih tanggal check-out"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Dewasa</label>
                          <select 
                            className="form-select" 
                            {...register('adults', { required: 'Jumlah dewasa harus diisi', min: 1 })}
                          >
                            {[1,2,3,4,5,6,7,8].map(num => (
                              <option key={num} value={num}>{num} orang</option>
                            ))}
                          </select>
                          {errors.adults && <div className="text-danger">{errors.adults.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Anak-anak (0-12 tahun)</label>
                          <select className="form-select" {...register('children')}>
                            {[0,1,2,3,4].map(num => (
                              <option key={num} value={num}>{num} anak</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      {/* Price Preview */}
                      {totalPricing && (
                        <div className="mt-4 p-3 bg-light rounded">
                          <h6>Estimasi Harga:</h6>
                          <div className="d-flex justify-content-between">
                            <span>Dewasa ({watchedAdults} x {duration} hari)</span>
                            <span>Rp {totalPricing.adultPrice.toLocaleString()}</span>
                          </div>
                          {totalPricing.childPrice > 0 && (
                            <div className="d-flex justify-content-between">
                              <span>Anak-anak ({watchedChildren} x {duration} hari)</span>
                              <span>Rp {totalPricing.childPrice.toLocaleString()}</span>
                            </div>
                          )}
                          <hr />
                          <div className="d-flex justify-content-between fw-bold">
                            <span>Subtotal</span>
                            <span>Rp {totalPricing.subtotal.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-between mt-4">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setCurrentStep(1)}
                        >
                          Kembali
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          onClick={() => setCurrentStep(3)}
                          disabled={!checkInDate || !checkOutDate}
                        >
                          Lanjut
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Activities */}
            {currentStep === 3 && (
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <h3 className="mb-4 text-center">Aktivitas Tambahan (Opsional)</h3>
                  <div className="row g-3">
                    {additionalActivities.map((activity) => (
                      <div key={activity.id} className="col-md-6">
                        <div className={`card h-100 ${selectedActivities.find(a => a.id === activity.id) ? 'border-primary bg-light' : ''}`}>
                          <div className="card-body">
                            <div className="d-flex align-items-start">
                              <div className="me-3 text-primary fs-4">
                                {activity.icon}
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="card-title">{activity.name}</h6>
                                <p className="card-text small">{activity.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="text-primary fw-bold">
                                    Rp {activity.price.toLocaleString()}
                                  </span>
                                  <small className="text-muted">{activity.duration}</small>
                                </div>
                              </div>
                              <div className="ms-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedActivities.find(a => a.id === activity.id) ? true : false}
                                  onChange={() => handleActivityToggle(activity)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Updated Price with Activities */}
                  {totalPricing && (
                    <div className="mt-4 p-3 bg-light rounded">
                      <h6>Total Harga:</h6>
                      <div className="d-flex justify-content-between">
                        <span>Paket ({duration} hari)</span>
                        <span>Rp {(totalPricing.adultPrice + totalPricing.childPrice).toLocaleString()}</span>
                      </div>
                      {totalPricing.activitiesPrice > 0 && (
                        <div className="d-flex justify-content-between">
                          <span>Aktivitas tambahan</span>
                          <span>Rp {totalPricing.activitiesPrice.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="d-flex justify-content-between">
                        <span>Pajak (10%)</span>
                        <span>Rp {totalPricing.tax.toLocaleString()}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total</span>
                        <span className="text-primary">Rp {totalPricing.total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setCurrentStep(2)}
                    >
                      Kembali
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setCurrentStep(4)}
                    >
                      Lanjut
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Personal Information */}
            {currentStep === 4 && (
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h3 className="mb-4 text-center">Data Pribadi</h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Nama Lengkap *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            {...register('customerName', { required: 'Nama lengkap harus diisi' })}
                          />
                          {errors.customerName && <div className="text-danger">{errors.customerName.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email *</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            {...register('email', { 
                              required: 'Email harus diisi',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Format email tidak valid'
                              }
                            })}
                          />
                          {errors.email && <div className="text-danger">{errors.email.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">No. Telepon *</label>
                          <input 
                            type="tel" 
                            className="form-control" 
                            {...register('phone', { required: 'No. telepon harus diisi' })}
                          />
                          {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Kewarganegaraan</label>
                          <select className="form-select" {...register('nationality')}>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Australia">Australia</option>
                            <option value="Other">Lainnya</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label">Kontak Darurat</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nama dan nomor telepon kontak darurat"
                            {...register('emergencyContact')}
                          />
                        </div>
                        
                        <div className="col-12">
                          <h6 className="mt-3">Permintaan Khusus (Opsional)</h6>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Pantangan Makanan</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Vegetarian, halal, alergi, dll"
                            {...register('dietaryRestrictions')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Kebutuhan Khusus</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Kursi roda, dll"
                            {...register('accessibilityNeeds')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Acara Spesial</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ulang tahun, anniversary, dll"
                            {...register('specialOccasion')}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Catatan Tambahan</label>
                          <textarea 
                            className="form-control" 
                            rows="3"
                            placeholder="Catatan khusus untuk perjalanan Anda"
                            {...register('additionalNotes')}
                          ></textarea>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setCurrentStep(3)}
                        >
                          Kembali
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Memproses...' : 'Buat Booking'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {currentStep === 5 && bookingResult && (
              <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                  <div className="card">
                    <div className="card-body">
                      <i className="fa fa-check-circle text-success" style={{fontSize: '4rem'}}></i>
                      <h3 className="mt-3 text-success">Booking Berhasil!</h3>
                      <p className="text-muted">Terima kasih telah mempercayai Kampung Kwau untuk liburan Anda.</p>
                      
                      <div className="alert alert-info">
                        <h5>Detail Booking:</h5>
                        <p><strong>Nomor Booking:</strong> {bookingResult.bookingNumber}</p>
                        <p><strong>Paket:</strong> {selectedPackage.name}</p>
                        <p><strong>Total:</strong> Rp {totalPricing?.total.toLocaleString()}</p>
                        <p className="mb-0"><strong>Status:</strong> Menunggu Konfirmasi</p>
                      </div>
                      
                      <div className="alert alert-warning">
                        <p><i className="fa fa-info-circle me-2"></i>
                          Email konfirmasi akan dikirim dalam 1x24 jam. Tim kami akan menghubungi Anda untuk konfirmasi pembayaran dan detail lebih lanjut.
                        </p>
                      </div>
                      
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => window.location.href = '/'}
                      >
                        Kembali ke Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
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

export default BookingPage;
