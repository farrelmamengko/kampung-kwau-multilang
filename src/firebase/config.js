// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Enable testing mode flag
export const TESTING_MODE = true;

// Your web app's Firebase configuration
// For development, you can use these demo values
// Replace with your actual Firebase config when ready
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "kampung-kwau-demo.firebaseapp.com",
  projectId: "kampung-kwau-demo",
  storageBucket: "kampung-kwau-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase only if not in testing mode
let app = null;
let db = null;
let auth = null;

if (!TESTING_MODE) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase initialization failed, switching to testing mode:', error);
  }
}

// Export mock objects for testing
export { db, auth };
export default app; 