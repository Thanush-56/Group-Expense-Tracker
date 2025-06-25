import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

window.signInWithGoogle = function () {
  signInWithPopup(auth, provider)
    .then(result => showApp(result.user))
    .catch(error => {
      console.error("Sign-in error:", error);
      alert("Sign-in failed");
    });
};

window.signOutUser = function () {
  signOut(auth)
    .then(() => location.reload())
    .catch(error => {
      console.error("Sign-out error:", error);
      alert("Sign-out failed");
    });
};

function showApp(user) {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
  document.getElementById('user-name').textContent = user.displayName;
  document.getElementById('user-photo').src = user.photoURL;
}
  
onAuthStateChanged(auth, user => {
  if (user) showApp(user);
  else {
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
  }
});
