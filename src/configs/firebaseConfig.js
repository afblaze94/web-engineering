import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// config
const firebaseConfig = {
  apiKey: "AIzaSyCt1A7LBsjJ2fJOMv8LbQmzEPFB4pYYgUY",
  authDomain: "osmes-a0f67.firebaseapp.com",
  databaseURL: "https://osmes-a0f67.firebaseio.com",
  projectId: "osmes-a0f67",
  storageBucket: "osmes-a0f67.appspot.com",
  messagingSenderId: "232982052889",
  appId: "1:232982052889:web:9d2e0a0bc6f8c37d1faa88",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Init firestore instance 
firebase.firestore();
firebase.firestore().settings({timestampsInSnapshots: true});

firebase.storage();

export default firebase;
