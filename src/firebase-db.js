import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIQdkhs10SqKhSMFoltR9pc5H_LLSJhLk",
  authDomain: "badger-website-c0ca3.firebaseapp.com",
  projectId: "badger-website-c0ca3",
  storageBucket: "badger-website-c0ca3.appspot.com",
  messagingSenderId: "543372506058",
  appId: "1:543372506058:web:e56722e3637c9765725533",
  measurementId: "G-HZX04PWY76"
};

// Initialize Firebase app + database (get reference to firestore)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

//function to add email to mailing list
export async function addEmail(email){
  try {
    await setDoc(doc(db, 'emails', email), {
      'email': email,
      'active': true
    });
    return Promise.resolve("Successfully added email!");
  }
  catch(e){
    return Promise.reject(new Error("Error adding email: " + e));
  }
}