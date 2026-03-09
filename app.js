// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB9WxNwFwGS1OCFXNo00cP4XfKnsq01k-E",
  authDomain: "pusatsoftware-1520d.firebaseapp.com",
  projectId: "pusatsoftware-1520d",
  storageBucket: "pusatsoftware-1520d.firebasestorage.app",
  messagingSenderId: "9573540669",
  appId: "1:9573540669:web:4c6bce642cb28e067d5b54",
  measurementId: "G-PEMB6TKB7F"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
