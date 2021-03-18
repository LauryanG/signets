import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';

// Config
const firebaseConfig = {
  apiKey: "AIzaSyDYXixKoQkDQRBQM6g_v0lspnYwWsUV2OM",
  authDomain: "veille-technologique-173fb.firebaseapp.com",
  databaseURL: "https://veille-technologique-173fb-default-rtdb.firebaseio.com",
  projectId: "veille-technologique-173fb",
  storageBucket: "veille-technologique-173fb.appspot.com",
  messagingSenderId: "884338243671",
  appId: "1:884338243671:web:1e216f22b558fb53a98b12",
  measurementId: "G-95QWWJ1VMS"
};

// Initialiser Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialiser Firestore
export const firestore = firebase.firestore();

// Initialiser le widget FirebaseUI
export const widgetFirebaseui = new firebaseui.auth.AuthUI(firebase.auth());