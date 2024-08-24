import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDhtioBP3qKHrWekBkqsQgYagB0a7fyRR8",
//   authDomain: "ngoproject-7e7b5.firebaseapp.com",
//   projectId: "ngoproject-7e7b5",
//   storageBucket: "ngoproject-7e7b5.appspot.com",
//   messagingSenderId: "868218736396",
//   appId: "1:868218736396:web:0434a9d6b28e593b3d4329"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const database=getFirestore(app); 
export const firebaseApp = getApp();
export const storage=getStorage(app)
export default app;