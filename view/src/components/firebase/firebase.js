import firebase from "firebase/app";
import "firebase/storage";
require('dotenv').config();
const config = {
    apiKey: process.env.REACT_APP_firebaseapiKey,
    authDomain: "electronics-club-iitg-storage.firebaseapp.com",
    projectId: "electronics-club-iitg-storage",
    storageBucket: "electronics-club-iitg-storage.appspot.com",
    messagingSenderId: process.env.REACT_APP_firebasemessagingSenderId,
    appId: process.env.REACT_APP_firebaseappId,
    measurementId: process.env.REACT_APP_firebasemeasurementId
};
// Initialize Firebase
firebase.initializeApp(config);
const storage = firebase.storage();
export { storage, firebase as default };