// Copy-paste commands ini ke browser console untuk testing

// 1. Test booking number generation
console.log("=== Testing Booking Number ===");
const testBookingNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `KW-${year}${month}${day}-${random}`;
};
console.log("Generated booking number:", testBookingNumber());

// 2. Test price calculation
console.log("\n=== Testing Price Calculation ===");
const testPriceCalc = (basePrice, adults, children, duration, activities) => {
  const adultPrice = basePrice * adults * duration;
  const childPrice = basePrice * children * 0.5 * duration;
  const activitiesPrice = activities.reduce((total, price) => total + (price * (adults + children)), 0);
  const subtotal = adultPrice + childPrice + activitiesPrice;
  const tax = subtotal * 0.1;
  const total = Math.round(subtotal + tax);
  
  console.log(`Package: Rp ${basePrice.toLocaleString()}/night`);
  console.log(`Adults: ${adults}, Children: ${children}, Duration: ${duration} days`);
  console.log(`Activities: ${activities.length} selected`);
  console.log(`Adult price: Rp ${adultPrice.toLocaleString()}`);
  console.log(`Child price: Rp ${childPrice.toLocaleString()}`);
  console.log(`Activities price: Rp ${activitiesPrice.toLocaleString()}`);
  console.log(`Subtotal: Rp ${subtotal.toLocaleString()}`);
  console.log(`Tax (10%): Rp ${tax.toLocaleString()}`);
  console.log(`TOTAL: Rp ${total.toLocaleString()}`);
  
  return total;
};

// Test case: Basic package, 2 adults, 1 child, 2 days, 1 activity
testPriceCalc(250000, 2, 1, 2, [100000]);

// 3. Test form validation
console.log("\n=== Testing Form Validation ===");
const testValidation = (name, email, phone) => {
  const errors = [];
  if (!name) errors.push("Name required");
  if (!email || !email.includes('@')) errors.push("Valid email required");
  if (!phone) errors.push("Phone required");
  
  console.log("Validation errors:", errors.length ? errors : "None");
  return errors.length === 0;
};

testValidation("", "invalid-email", ""); // Should show errors
testValidation("John Doe", "john@example.com", "08123456789"); // Should pass

// 4. Test localStorage (untuk data sementara)
console.log("\n=== Testing Local Storage ===");
const testBooking = {
  bookingNumber: testBookingNumber(),
  customerName: "Test User",
  email: "test@example.com",
  package: "Paket Basic",
  total: 1705000,
  createdAt: new Date().toISOString()
};

localStorage.setItem('testBooking', JSON.stringify(testBooking));
console.log("Saved test booking:", JSON.parse(localStorage.getItem('testBooking')));

console.log("\n🎉 Console testing completed!");
console.log("Now test the UI manually in the browser."); 