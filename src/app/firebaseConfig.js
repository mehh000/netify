// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC3McYd-qiztCb83LzUDKU2hecp1GbkeJc",
    authDomain: "fishcoin-14e42.firebaseapp.com",
    projectId: "fishcoin-14e42",
    storageBucket: "fishcoin-14e42.appspot.com",
    messagingSenderId: "941797545071",
    appId: "1:941797545071:web:096de5456875455b13e99a",
    measurementId: "G-01L47QT7MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db }

















// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional