# 📝 BOOKING FUNCTION DOCUMENTATION - KAMPUNG KWAU

## 📋 **OVERVIEW**
Dokumentasi lengkap untuk fungsi booking system Kampung Kwau yang mencakup form handling, validation, pricing calculation, dan business logic.

---

## 🏗️ **BOOKING SYSTEM ARCHITECTURE**

### 📊 **Component Structure:**
```
BookingPage.js
├── Package Selection
├── Date & Guest Management
├── Additional Activities
├── Personal Information
└── Confirmation & Submit
```

### 🔄 **Data Flow:**
```
User Input → Form Validation → Price Calculation → API Call → Database → Email → Success
```

---

## 🎯 **BOOKING FORM COMPONENTS**

### 📦 **1. PACKAGE SELECTION**

#### **Component Overview:**
Step pertama untuk memilih paket wisata dengan informasi lengkap dan pricing.

#### **Features:**
- **3 Package Options:** Basic, Standard, Premium
- **Dynamic Pricing:** Harga per malam
- **Package Details:** Deskripsi dan fasilitas
- **Visual Selection:** Card-based selection
- **Responsive Design:** Mobile-friendly

#### **Implementation:**
```javascript
const PackageSelection = ({ onPackageSelect, selectedPackage }) => {
  const packages = [
    {
      name: 'Basic Package',
      price: 250000,
      duration: '2D1N',
      maxGuests: 4,
      description: 'Basic tour package covering homestay accommodation...',
      includes: ['1 night homestay', '3x local meals', 'Birdwatching tour']
    },
    {
      name: 'Standard Package',
      price: 450000,
      duration: '3D2N',
      maxGuests: 6,
      description: 'Complete tour package with Arfak tribe cultural experience...',
      includes: ['2 nights premium homestay', 'All meals + snacks', 'Cultural tour']
    },
    {
      name: 'Premium Package',
      price: 750000,
      duration: '4D3N',
      maxGuests: 8,
      description: 'Premium tour package with all the best facilities...',
      includes: ['3 nights VIP homestay', 'All meals + welcome drink', 'Private tour']
    }
  ];

  return (
    <div className="package-selection">
      <h3>Pilih Paket Wisata</h3>
      <div className="package-grid">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`package-card ${selectedPackage?.name === pkg.name ? 'selected' : ''}`}
            onClick={() => onPackageSelect(pkg)}
          >
            <h4>{pkg.name}</h4>
            <p className="price">Rp {pkg.price.toLocaleString()}/malam</p>
            <p className="duration">{pkg.duration}</p>
            <p className="description">{pkg.description}</p>
            <ul className="includes">
              {pkg.includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

### 📅 **2. DATE & GUEST MANAGEMENT**

#### **Component Overview:**
Step kedua untuk memilih tanggal check-in/check-out dan jumlah tamu.

#### **Features:**
- **Date Picker:** Check-in dan check-out dates
- **Guest Counter:** Adults dan children
- **Duration Calculation:** Otomatis hitung durasi
- **Price Preview:** Kalkulasi harga real-time
- **Validation:** Date range dan guest limits

#### **Implementation:**
```javascript
const DateGuestSelection = ({ 
  checkInDate, 
  setCheckInDate, 
  checkOutDate, 
  setCheckOutDate,
  adults,
  setAdults,
  children,
  setChildren,
  selectedPackage,
  onPricingUpdate
}) => {
  const [duration, setDuration] = useState(0);
  const [totalPricing, setTotalPricing] = useState({
    adultPrice: 0,
    childPrice: 0,
    subtotal: 0,
    tax: 0,
    total: 0
  });

  // Calculate duration
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);
    }
  }, [checkInDate, checkOutDate]);

  // Calculate pricing
  useEffect(() => {
    if (selectedPackage && duration > 0) {
      const adultPrice = selectedPackage.price * duration;
      const childPrice = adultPrice * 0.5; // 50% discount for children
      const subtotal = (adults * adultPrice) + (children * childPrice);
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax;

      const pricing = {
        adultPrice,
        childPrice,
        subtotal,
        tax,
        total
      };

      setTotalPricing(pricing);
      onPricingUpdate(pricing);
    }
  }, [selectedPackage, duration, adults, children]);

  return (
    <div className="date-guest-selection">
      <h3>Pilih Tanggal dan Jumlah Tamu</h3>
      
      <div className="date-selection">
        <div className="form-group">
          <label>Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="form-group">
          <label>Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="guest-selection">
        <div className="form-group">
          <label>Dewasa</label>
          <div className="counter">
            <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
            <span>{adults}</span>
            <button onClick={() => setAdults(Math.min(selectedPackage?.maxGuests || 8, adults + 1))}>+</button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Anak-anak (0-12 tahun)</label>
          <div className="counter">
            <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
            <span>{children}</span>
            <button onClick={() => setChildren(children + 1)}>+</button>
          </div>
        </div>
      </div>

      <div className="pricing-preview">
        <h4>Estimasi Harga:</h4>
        <p>Dewasa: Rp {totalPricing.adultPrice.toLocaleString()}</p>
        <p>Anak-anak: Rp {totalPricing.childPrice.toLocaleString()}</p>
        <p>Subtotal: Rp {totalPricing.subtotal.toLocaleString()}</p>
        <p>Pajak (10%): Rp {totalPricing.tax.toLocaleString()}</p>
        <p><strong>Total: Rp {totalPricing.total.toLocaleString()}</strong></p>
      </div>
    </div>
  );
};
```

---

### 🎨 **3. ADDITIONAL ACTIVITIES**

#### **Component Overview:**
Step ketiga untuk memilih aktivitas tambahan (opsional).

#### **Features:**
- **Activity Catalog:** 6 aktivitas tambahan
- **Individual Pricing:** Harga per aktivitas
- **Optional Selection:** Tidak wajib dipilih
- **Total Calculation:** Update total harga
- **Activity Details:** Deskripsi lengkap

#### **Implementation:**
```javascript
const AdditionalActivities = ({ 
  selectedActivities, 
  setSelectedActivities, 
  onPricingUpdate,
  baseTotal 
}) => {
  const activities = [
    {
      id: 'extended-birdwatching',
      name: 'Extended Birdwatching Tour',
      description: 'Extra 3-hour birdwatching tour with specialist bird guide',
      price: 150000
    },
    {
      id: 'photography-workshop',
      name: 'Photography Workshop',
      description: 'Nature and wildlife photography workshop with professional photographer',
      price: 200000
    },
    {
      id: 'cooking-class',
      name: 'Traditional Cooking Class',
      description: 'Learn to cook traditional Papuan food with local mamas',
      price: 100000
    },
    {
      id: 'night-forest-walk',
      name: 'Night Forest Walk',
      description: 'Night walk in the forest to see nocturnal activities',
      price: 80000
    },
    {
      id: 'butterfly-garden',
      name: 'Butterfly Garden Tour',
      description: 'Special tour to butterfly garden with lepidopterist guide',
      price: 120000
    },
    {
      id: 'craft-workshop',
      name: 'Traditional Craft Workshop',
      description: 'Traditional handicraft making workshop of Arfak tribe',
      price: 90000
    }
  ];

  const handleActivityToggle = (activityId) => {
    const newActivities = selectedActivities.includes(activityId)
      ? selectedActivities.filter(id => id !== activityId)
      : [...selectedActivities, activityId];
    
    setSelectedActivities(newActivities);
    
    // Calculate additional cost
    const additionalCost = activities
      .filter(activity => newActivities.includes(activity.id))
      .reduce((total, activity) => total + activity.price, 0);
    
    onPricingUpdate({ additionalCost });
  };

  const selectedActivitiesData = activities.filter(
    activity => selectedActivities.includes(activity.id)
  );

  const additionalTotal = selectedActivitiesData.reduce(
    (total, activity) => total + activity.price, 0
  );

  return (
    <div className="additional-activities">
      <h3>Aktivitas Tambahan (Opsional)</h3>
      
      <div className="activities-grid">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`activity-card ${
              selectedActivities.includes(activity.id) ? 'selected' : ''
            }`}
            onClick={() => handleActivityToggle(activity.id)}
          >
            <h4>{activity.name}</h4>
            <p>{activity.description}</p>
            <p className="price">Rp {activity.price.toLocaleString()}</p>
            <input
              type="checkbox"
              checked={selectedActivities.includes(activity.id)}
              onChange={() => handleActivityToggle(activity.id)}
            />
          </div>
        ))}
      </div>

      <div className="pricing-summary">
        <h4>Ringkasan Harga:</h4>
        <p>Paket Wisata: Rp {baseTotal.toLocaleString()}</p>
        <p>Aktivitas Tambahan: Rp {additionalTotal.toLocaleString()}</p>
        <p><strong>Total: Rp {(baseTotal + additionalTotal).toLocaleString()}</strong></p>
      </div>
    </div>
  );
};
```

---

### 👤 **4. PERSONAL INFORMATION**

#### **Component Overview:**
Step keempat untuk mengumpulkan data personal pelanggan.

#### **Features:**
- **Form Validation:** Real-time validation
- **Required Fields:** Nama, email, telepon
- **Optional Fields:** Kebangsaan, kontak darurat
- **Special Requests:** Dietary, accessibility, notes
- **Error Handling:** User-friendly error messages

#### **Implementation:**
```javascript
const PersonalInformation = ({ register, errors, watch }) => {
  return (
    <div className="personal-information">
      <h3>Informasi Personal</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Nama Lengkap *</label>
          <input
            type="text"
            {...register('customerName', { 
              required: 'Nama lengkap wajib diisi',
              minLength: { value: 2, message: 'Nama minimal 2 karakter' }
            })}
            placeholder="Masukkan nama lengkap"
          />
          {errors.customerName && (
            <span className="error">{errors.customerName.message}</span>
          )}
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format email tidak valid'
              }
            })}
            placeholder="contoh@email.com"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Nomor Telepon *</label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Nomor telepon wajib diisi',
              pattern: {
                value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                message: 'Format nomor telepon tidak valid'
              }
            })}
            placeholder="+6281234567890"
          />
          {errors.phone && (
            <span className="error">{errors.phone.message}</span>
          )}
        </div>
        
        <div className="form-group">
          <label>Kebangsaan</label>
          <select {...register('nationality')}>
            <option value="Indonesia">Indonesia</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapore">Singapore</option>
            <option value="Australia">Australia</option>
            <option value="Other">Lainnya</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Kontak Darurat</label>
        <input
          type="text"
          {...register('emergencyContact')}
          placeholder="Nama - Nomor telepon"
        />
      </div>

      <div className="special-requests">
        <h4>Request Khusus (Opsional)</h4>
        
        <div className="form-group">
          <label>Dietary Restrictions</label>
          <input
            type="text"
            {...register('dietaryRestrictions')}
            placeholder="Contoh: Vegetarian, seafood allergy"
          />
        </div>
        
        <div className="form-group">
          <label>Accessibility Needs</label>
          <input
            type="text"
            {...register('accessibilityNeeds')}
            placeholder="Contoh: Wheelchair, special access"
          />
        </div>
        
        <div className="form-group">
          <label>Special Occasion</label>
          <input
            type="text"
            {...register('specialOccasion')}
            placeholder="Contoh: Anniversary, birthday"
          />
        </div>
        
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            {...register('additionalNotes')}
            placeholder="Catatan tambahan untuk tim kami"
            rows="3"
          />
        </div>
      </div>
    </div>
  );
};
```

---

### ✅ **5. BOOKING CONFIRMATION**

#### **Component Overview:**
Step kelima untuk review dan konfirmasi booking sebelum submit.

#### **Features:**
- **Booking Summary:** Review semua data
- **Price Breakdown:** Detail harga lengkap
- **Terms & Conditions:** Persetujuan
- **Submit Button:** Final submission
- **Loading State:** Processing indicator

#### **Implementation:**
```javascript
const BookingConfirmation = ({ 
  bookingData, 
  totalPricing, 
  selectedActivities,
  onSubmit,
  loading 
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const selectedActivitiesData = activities.filter(
    activity => selectedActivities.includes(activity.id)
  );

  const additionalTotal = selectedActivitiesData.reduce(
    (total, activity) => total + activity.price, 0
  );

  const finalTotal = totalPricing.total + additionalTotal;

  return (
    <div className="booking-confirmation">
      <h3>Konfirmasi Booking</h3>
      
      <div className="booking-summary">
        <h4>Ringkasan Booking Anda:</h4>
        
        <div className="summary-section">
          <h5>Informasi Personal</h5>
          <p><strong>Nama:</strong> {bookingData.customerName}</p>
          <p><strong>Email:</strong> {bookingData.email}</p>
          <p><strong>Telepon:</strong> {bookingData.phone}</p>
          <p><strong>Kebangsaan:</strong> {bookingData.nationality}</p>
          {bookingData.emergencyContact && (
            <p><strong>Kontak Darurat:</strong> {bookingData.emergencyContact}</p>
          )}
        </div>

        <div className="summary-section">
          <h5>Detail Paket</h5>
          <p><strong>Paket:</strong> {bookingData.package.name}</p>
          <p><strong>Check-in:</strong> {bookingData.checkInDate}</p>
          <p><strong>Check-out:</strong> {bookingData.checkOutDate}</p>
          <p><strong>Durasi:</strong> {bookingData.duration} hari</p>
          <p><strong>Tamu:</strong> {bookingData.adults} dewasa, {bookingData.children} anak</p>
        </div>

        {selectedActivities.length > 0 && (
          <div className="summary-section">
            <h5>Aktivitas Tambahan</h5>
            {selectedActivitiesData.map((activity) => (
              <p key={activity.id}>
                • {activity.name} - Rp {activity.price.toLocaleString()}
              </p>
            ))}
          </div>
        )}

        {bookingData.specialRequests && (
          <div className="summary-section">
            <h5>Request Khusus</h5>
            {bookingData.dietaryRestrictions && (
              <p><strong>Dietary:</strong> {bookingData.dietaryRestrictions}</p>
            )}
            {bookingData.accessibilityNeeds && (
              <p><strong>Accessibility:</strong> {bookingData.accessibilityNeeds}</p>
            )}
            {bookingData.specialOccasion && (
              <p><strong>Special Occasion:</strong> {bookingData.specialOccasion}</p>
            )}
            {bookingData.additionalNotes && (
              <p><strong>Notes:</strong> {bookingData.additionalNotes}</p>
            )}
          </div>
        )}

        <div className="summary-section">
          <h5>Rincian Harga</h5>
          <p>Paket Wisata: Rp {totalPricing.subtotal.toLocaleString()}</p>
          <p>Pajak (10%): Rp {totalPricing.tax.toLocaleString()}</p>
          {additionalTotal > 0 && (
            <p>Aktivitas Tambahan: Rp {additionalTotal.toLocaleString()}</p>
          )}
          <p><strong>Total: Rp {finalTotal.toLocaleString()}</strong></p>
        </div>
      </div>

      <div className="terms-agreement">
        <label>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
          Saya setuju dengan <a href="/terms" target="_blank">Syarat & Ketentuan</a> dan{' '}
          <a href="/privacy" target="_blank">Kebijakan Privasi</a> Kampung Kwau
        </label>
      </div>

      <button
        className="submit-button"
        onClick={onSubmit}
        disabled={!agreedToTerms || loading}
      >
        {loading ? 'Memproses...' : 'Buat Booking'}
      </button>
    </div>
  );
};
```

---

## 🔄 **FORM STATE MANAGEMENT**

### 📊 **Main Booking State:**
```javascript
const [currentStep, setCurrentStep] = useState(1);
const [selectedPackage, setSelectedPackage] = useState(null);
const [checkInDate, setCheckInDate] = useState(null);
const [checkOutDate, setCheckOutDate] = useState(null);
const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);
const [selectedActivities, setSelectedActivities] = useState([]);
const [totalPricing, setTotalPricing] = useState({
  adultPrice: 0,
  childPrice: 0,
  subtotal: 0,
  tax: 0,
  total: 0
});
```

### 🎯 **Form Validation:**
```javascript
const { register, handleSubmit, formState: { errors }, watch } = useForm({
  mode: 'onChange'
});

const validationRules = {
  customerName: {
    required: 'Nama lengkap wajib diisi',
    minLength: { value: 2, message: 'Nama minimal 2 karakter' }
  },
  email: {
    required: 'Email wajib diisi',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Format email tidak valid'
    }
  },
  phone: {
    required: 'Nomor telepon wajib diisi',
    pattern: {
      value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
      message: 'Format nomor telepon tidak valid'
    }
  }
};
```

---

## 🧮 **PRICING CALCULATION**

### 💰 **Price Calculation Logic:**
```javascript
const calculatePricing = (package, duration, adults, children, activities) => {
  // Base package price
  const basePrice = package.price * duration;
  
  // Adult and child pricing
  const adultPrice = basePrice;
  const childPrice = basePrice * 0.5; // 50% discount for children
  
  // Subtotal
  const subtotal = (adults * adultPrice) + (children * childPrice);
  
  // Tax calculation (10%)
  const tax = subtotal * 0.1;
  
  // Activities cost
  const activitiesCost = activities.reduce((total, activity) => total + activity.price, 0);
  
  // Final total
  const total = subtotal + tax + activitiesCost;
  
  return {
    adultPrice,
    childPrice,
    subtotal,
    tax,
    activitiesCost,
    total
  };
};
```

### 📊 **Price Breakdown Component:**
```javascript
const PriceBreakdown = ({ pricing, activities }) => {
  return (
    <div className="price-breakdown">
      <h4>Rincian Harga</h4>
      
      <div className="price-item">
        <span>Paket Wisata</span>
        <span>Rp {pricing.subtotal.toLocaleString()}</span>
      </div>
      
      <div className="price-item">
        <span>Pajak (10%)</span>
        <span>Rp {pricing.tax.toLocaleString()}</span>
      </div>
      
      {activities.length > 0 && (
        <div className="price-item">
          <span>Aktivitas Tambahan</span>
          <span>Rp {pricing.activitiesCost.toLocaleString()}</span>
        </div>
      )}
      
      <div className="price-item total">
        <span>Total</span>
        <span>Rp {pricing.total.toLocaleString()}</span>
      </div>
    </div>
  );
};
```

---

## 🔄 **SUBMISSION PROCESS**

### 📤 **Submit Handler:**
```javascript
const onSubmit = async (data) => {
  try {
    setLoading(true);
    setError(null);

    // Validate required data
    if (!selectedPackage || !checkInDate || !checkOutDate) {
      throw new Error('Data booking tidak lengkap');
    }

    // Prepare booking data
    const bookingData = {
      customer: {
        name: data.customerName,
        email: data.email,
        phone: data.phone,
        nationality: data.nationality || 'Indonesia',
        emergencyContact: data.emergencyContact
      },
      package: {
        name: selectedPackage.name,
        price: selectedPackage.price,
        duration: selectedPackage.duration,
        maxGuests: selectedPackage.maxGuests
      },
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      duration: calculateDuration(checkInDate, checkOutDate),
      adults_count: adults,
      children_count: children,
      adult_price: totalPricing.adultPrice,
      child_price: totalPricing.childPrice,
      subtotal: totalPricing.subtotal,
      tax_amount: totalPricing.tax,
      total_amount: totalPricing.total,
      selected_activities: selectedActivities,
      special_requests: {
        dietaryRestrictions: data.dietaryRestrictions || '',
        accessibilityNeeds: data.accessibilityNeeds || '',
        specialOccasion: data.specialOccasion || '',
        additionalNotes: data.additionalNotes || ''
      }
    };

    // Send to backend API
    const apiResult = await bookingAPI.create(bookingData);
    
    // Send email confirmation
    await emailService.sendBookingConfirmation({
      ...bookingData,
      booking_number: apiResult.data.booking_number
    });

    // Show success
    setSuccess(true);
    setBookingNumber(apiResult.data.booking_number);
    
    // Reset form
    resetForm();

  } catch (error) {
    console.error('Booking error:', error);
    setError('Gagal membuat booking: ' + error.message);
  } finally {
    setLoading(false);
  }
};
```

---

## 🎨 **UI/UX FEATURES**

### 📱 **Responsive Design:**
```css
.booking-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .booking-form {
    padding: 1rem;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .package-grid {
    grid-template-columns: 1fr;
  }
}
```

### 🎯 **Step Indicator:**
```javascript
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`step ${index + 1 <= currentStep ? 'active' : ''}`}
        >
          <span className="step-number">{index + 1}</span>
          <span className="step-title">{getStepTitle(index + 1)}</span>
        </div>
      ))}
    </div>
  );
};
```

---

## 🔒 **VALIDATION & ERROR HANDLING**

### ✅ **Form Validation:**
```javascript
const validateBookingData = (data) => {
  const errors = [];

  // Required fields
  if (!data.customerName?.trim()) {
    errors.push('Nama lengkap wajib diisi');
  }

  if (!data.email?.trim()) {
    errors.push('Email wajib diisi');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Format email tidak valid');
  }

  if (!data.phone?.trim()) {
    errors.push('Nomor telepon wajib diisi');
  }

  // Date validation
  if (!data.checkInDate) {
    errors.push('Tanggal check-in wajib dipilih');
  }

  if (!data.checkOutDate) {
    errors.push('Tanggal check-out wajib dipilih');
  }

  if (data.checkInDate && data.checkOutDate) {
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    
    if (checkOut <= checkIn) {
      errors.push('Tanggal check-out harus setelah check-in');
    }
  }

  // Guest validation
  if (data.adults < 1) {
    errors.push('Minimal 1 orang dewasa');
  }

  if (data.adults + data.children > data.package?.maxGuests) {
    errors.push(`Maksimal ${data.package.maxGuests} tamu untuk paket ini`);
  }

  return errors;
};
```

### 🚨 **Error Display:**
```javascript
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="error-message">
      <i className="fas fa-exclamation-triangle"></i>
      <span>{error}</span>
    </div>
  );
};
```

---

## 📊 **ANALYTICS & TRACKING**

### 📈 **Booking Analytics:**
```javascript
const trackBookingEvent = (event, data) => {
  const analytics = {
    event,
    timestamp: new Date().toISOString(),
    package: data.package?.name,
    total_amount: data.total_amount,
    adults: data.adults_count,
    children: data.children_count,
    activities_count: data.selected_activities?.length || 0
  };

  // Send to analytics service
  console.log('Booking analytics:', analytics);
};
```

---

## 🚀 **PERFORMANCE OPTIMIZATION**

### ⚡ **Code Splitting:**
```javascript
// Lazy load booking components
const PackageSelection = lazy(() => import('./PackageSelection'));
const DateGuestSelection = lazy(() => import('./DateGuestSelection'));
const AdditionalActivities = lazy(() => import('./AdditionalActivities'));
const PersonalInformation = lazy(() => import('./PersonalInformation'));
const BookingConfirmation = lazy(() => import('./BookingConfirmation'));
```

### 🎯 **Memoization:**
```javascript
const MemoizedPackageCard = memo(({ package, isSelected, onSelect }) => {
  return (
    <div
      className={`package-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(package)}
    >
      {/* Package content */}
    </div>
  );
});
```

---

## 📞 **SUPPORT & MAINTENANCE**

### 🛠️ **Regular Tasks:**
- Update package pricing
- Add new activities
- Improve form validation
- Optimize performance
- Update UI/UX

### 📧 **Contact Information:**
- **Email:** support@kampungkwaupapua.com
- **Documentation:** actions/BOOKING_FUNCTION_DOCUMENTATION.md
- **Last Updated:** December 2024

---

*Dokumentasi ini dibuat untuk fungsi booking Kampung Kwau - Papua Barat* 