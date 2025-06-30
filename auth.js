import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAz7iTbMCI8ch_TDCLL0ce47B0yYHuQOyw",
  authDomain: "group-expense-web-tracker.firebaseapp.com",
  projectId: "group-expense-web-tracker",
  storageBucket: "group-expense-web-tracker.firebasestorage.app",
  messagingSenderId: "1078950070719",
  appId: "1:1078950070719:web:3766f7639101495de6790a",
  measurementId: "G-58R6W5VVQ6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In
window.signInWithGoogle = function () {
  signInWithPopup(auth, provider)
    .then(result => showApp(result.user))
    .catch(error => {
      console.error("Sign-in error:", error);
      alert("Sign-in failed");
    });
};

// Sign Out
window.signOutUser = function () {
  signOut(auth)
    .then(() => location.reload())
    .catch(error => {
      console.error("Sign-out error:", error);
      alert("Sign-out failed");
    });
};

// Show main app after login
function showApp(user) {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  document.getElementById('user-name').textContent = user.displayName;
  document.getElementById('user-photo').src = user.photoURL;
}

// Auth state listener (correct modular version)
onAuthStateChanged(auth, async user => {
  if (user) {
    // Set global currentUser
    if (!user.displayName) {
      const name = prompt("Enter your name:");
      if (name) {
        await updateProfile(user, { displayName: name });
        user.displayName = name; // Update local object
      }
    }

    window.currentUser = user;
    showApp(user);
    loadFriends(); // 👈 Load friends after login
    loadGroups(); // ← Important: triggers script.js loading groups
  } else {
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
  }
});
