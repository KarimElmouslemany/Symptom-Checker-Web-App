import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"; // import the initializeApp function from Firebase which is used to start the system with our firebase configs
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"; // import the getAuth function from Firebase, used to access the authentication service
const firebaseConfig = {
  // the configs for the project
  apiKey: "AIzaSyAfZ18riIOgy_LYncKU8EsklK3YM0nuAg4",
  authDomain: "symptome-checker-web.firebaseapp.com",
  projectId: "symptome-checker-web",
  storageBucket: "symptome-checker-web.firebasestorage.app",
  messagingSenderId: "543106592716",
  appId: "1:543106592716:web:db7ce29ac4a37bd01eb769",
  measurementId: "G-1ERT4F6ZYQ",
};
const app = initializeApp(firebaseConfig); // initialise the Firebase app using the config above
export const auth = getAuth(app); // create the auth instance and export it so other files can import and use it
