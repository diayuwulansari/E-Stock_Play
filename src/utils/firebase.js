import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";

firebase.initializeApp({
  apiKey: "AIzaSyAzDkWSPE7mrRBJwOyIcUySUWSWUOni5qI",
  authDomain: "e-stock-dde87.firebaseapp.com",
  databaseURL: "https://e-stock-dde87-default-rtdb.firebaseio.com",
  projectId: "e-stock-dde87",
  storageBucket: "e-stock-dde87.appspot.com",
  messagingSenderId: "338912322691",
  appId: "1:338912322691:web:65354c03d8d815e8bf27b6",
});

const FIREBASE = firebase;


export default FIREBASE; 
export const database = firebase.database();