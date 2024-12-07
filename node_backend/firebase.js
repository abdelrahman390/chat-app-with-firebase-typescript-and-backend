// const firebaseAdmin = require("firebase-admin");
// import firebaseAdmin from "firebase-admin";

// // Initialize Firebase Admin with your service account credentials
// const serviceAccount = require("./firebase_credentials/service-account.json"); // Path to your Firebase admin SDK private key file

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: "https://chat-app-7742a-default-rtdb.firebaseio.com/", // Your Firebase Realtime Database URL
// });

// const db = firebaseAdmin.database(); // Firebase Realtime Database instance

// module.exports = { firebaseAdmin, db };

import admin from "firebase-admin";
import serviceAccount from "./firebase_credentials/service-account.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-app-7742a-default-rtdb.firebaseio.com/", // Ensure this has both opening and closing quotes
});

const db = admin.database();

export { admin as firebaseAdmin, db };
