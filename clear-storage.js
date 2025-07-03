// Script untuk clear localStorage - copy paste ke browser console

console.log("🧹 Clearing localStorage...");

// Clear booking data
localStorage.removeItem('kwau_bookings');

// Clear semua data kampung kwau
Object.keys(localStorage).forEach(key => {
  if (key.includes('kwau') || key.includes('booking')) {
    localStorage.removeItem(key);
    console.log(`Removed: ${key}`);
  }
});

console.log("✅ localStorage cleared!");
console.log("🔄 Please refresh the page and try booking again");

// Show current localStorage
console.log("Current localStorage:", {...localStorage}); 