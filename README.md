# 💸  Group Expense Tracker

A stylish, animated web application to track, manage, and settle shared group expenses — ideal for trips, roommates, or event planning. Built with HTML, CSS, JS, Firebase Auth, and LocalStorage. Includes modern UI with glassmorphism and 3D-style animations.

---

## 🚀 Features

- 🔐 **Google Authentication** via Firebase
- 👥 **Friend System**: Add & manage friends
- 🏘️ **Group Management**: Create, join, leave or delete groups
- 💰 **Expense Tracking**: Split expenses equally or unequally
- 📊 **Balance Calculation**: See who owes whom
- 💳 **Settlement Suggestions**: Optimized repayment plan
- 📱 **Responsive UI**: Beautiful, animated glassmorphism design

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS (Glassmorphism), JavaScript
- **Auth**: Firebase Authentication (Google Sign-In)
- **Storage**: LocalStorage for persisting group and expense data

---

## 📂 File Structure

```bash
📁 project-root
├── index.html         # Main UI
├── style.css          # Glassmorphic UI with animations
├── script.js          # App logic: groups, members, expenses
└── auth.js            # Google Sign-In using Firebase Auth
```

---

## ✅ Setup Instructions

1. **Clone or download** this repository.
2. Replace the Firebase configuration in `auth.js` with your own if needed.
3. Open `index.html` in a browser.
4. Sign in with Google and start managing group expenses.

> No backend database needed — data is stored locally in the browser.

---

## ✨ UI Showcase

- Smooth floating cards & animated transitions
- Responsive layout
- Avatar, name display, and colorful status indicators

---

## 🧪 Known Limitations

- Data is stored in browser `LocalStorage` — not synced across devices.
- Simulated friend system — no real-time invite notifications.

---

## 📌 Future Improvements

- Sync data across devices using Firestore or Realtime Database
- Friend request notifications and acceptance
- Export/Import group data
- Dashboard analytics

---

## 🔒 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project
3. Enable **Authentication > Google Sign-In**
4. Replace credentials in `auth.js` under `firebaseConfig`

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

**Chandra Siddhartha Raavi**  
Built with 💙 and JavaScript
