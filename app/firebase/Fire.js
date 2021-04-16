import firebase from "firebase";
import "@firebase/firestore";
import APP_CONFIG from "../config/config";

const config = {
  apiKey: APP_CONFIG.API_KEY,
  authDomain: APP_CONFIG.AUTH_DOMAIN,
  databaseURL: APP_CONFIG.DATABASE_URL,
  projectId: APP_CONFIG.PROJECT_ID,
  storageBucket: APP_CONFIG.STORAGE_BUCKET,
  messagingSenderId: APP_CONFIG.MESSAGING_SENDER_ID,
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
