// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIlmdII297W6A9gdwCMa43w0cj3pXgH0s",
  authDomain: "pgpbooked.firebaseapp.com",
  projectId: "pgpbooked",
  storageBucket: "pgpbooked.appspot.com",
  messagingSenderId: "325511325459",
  appId: "1:325511325459:web:84153d6ea55c8c149a5ce6",
  measurementId: "G-QGPZ0FQER5",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
