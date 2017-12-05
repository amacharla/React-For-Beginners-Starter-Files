import Rebase from 're-base';
/*
 * Connection to Firebase database
 * configuration function using Re-Base
 * @type {object of FireBase}
 */
const base = Rebase.createClass({
  // taken from FIREBASE
  apiKey: "AIzaSyDbNfDG917Q5FiixEGMbX7ZpmSOWvCr3qc",
  authDomain: "catch-of-the-day-nooplion.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-nooplion.firebaseio.com"
});

export default base;
