import firebase from "firebase";
import config from "./config";
// Initialize Firebase
var fbConfig = {
  apiKey: config.apiKey,
  authDomain: "augie-book-market.firebaseapp.com",
  databaseURL: "https://augie-book-market.firebaseio.com",
  projectId: "augie-book-market",
  storageBucket: "augie-book-market.appspot.com",
  messagingSenderId: config.messagingSenderId
};
firebase.initializeApp(fbConfig);

export default firebase;
