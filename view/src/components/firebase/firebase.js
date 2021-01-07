import firebase from "firebase/app";
import "firebase/storage";
const config = {
    apiKey: "AIzaSyBhARjmT38wnuIBti8k_pcjdhDUzN7Apeg",
    authDomain: "electronics-club-iitg-storage.firebaseapp.com",
    projectId: "electronics-club-iitg-storage",
    storageBucket: "electronics-club-iitg-storage.appspot.com",
    messagingSenderId: "984421746580",
    appId: "1:984421746580:web:7c9395175866a9b3f2f181",
    measurementId: "G-63KQY7ZMN1"
};
// Initialize Firebase
firebase.initializeApp(config);
const storage = firebase.storage();
export { storage, firebase as default };