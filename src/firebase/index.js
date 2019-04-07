import firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCalcsBPPiKqeweUkLttnlCX763LRP9jJ8",
  authDomain: "augie-book-market.firebaseapp.com",
  databaseURL: "https://augie-book-market.firebaseio.com",
  projectId: "augie-book-market",
  storageBucket: "augie-book-market.appspot.com",
  messagingSenderId: "596338877385"
};
firebase.initializeApp(config);

export default firebase;
