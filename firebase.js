

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Replace this example object with the EXACT config
// you copied from your Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyDItW3LgHzZOpBAjdeNkUufSKJXzoGX2AE",
  authDomain: "netra-7f36c.firebaseapp.com",
  databaseURL: "https://netra-7f36c-default-rtdb.firebaseio.com",
  projectId: "netra-7f36c",
  storageBucket: "netra-7f36c.firebasestorage.app",
  messagingSenderId: "60996646629",
  appId: "1:60996646629:web:9de16973fbad74dcf2c60c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function registerUser(name, email, password) {
  const credential = await createUserWithEmailAndPassword(
    auth, email, password
  );

  await setDoc(doc(db, "users", credential.user.uid), {
    name,
    email,
    createdAt: serverTimestamp()
  });

  return credential.user;
}

async function loginUser(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth, email, password
  );
  return credential.user;
}

function logoutUser() {
  return signOut(auth);
}

function watchLoginStatus(callback) {
  return onAuthStateChanged(auth, callback);
}

export {
  auth,
  db,
  registerUser,
  loginUser,
  logoutUser,
  watchLoginStatus
};
