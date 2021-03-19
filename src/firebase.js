import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';
import 'firebase/storage';

// Config
const firebaseConfig = {
  
};

// Initialiser Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialiser Firestore
export const firestore = firebase.firestore();

// Initialiser Storage
export const storage = firebase.storage();

// Initialiser le widget FirebaseUI
export const widgetFirebaseui = new firebaseui.auth.AuthUI(firebase.auth());