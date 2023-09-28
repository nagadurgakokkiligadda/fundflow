// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY', // Replace with your Firebase API Key
  authDomain: 'YOUR_AUTH_DOMAIN', // Replace with your Firebase Auth Domain
  projectId: 'YOUR_PROJECT_ID', // Replace with your Firebase Project ID
  storageBucket: 'YOUR_STORAGE_BUCKET', // Replace with your Firebase Storage Bucket
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID', // Replace with your Firebase Messaging Sender ID
  appId: 'YOUR_APP_ID', // Replace with your Firebase App ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
