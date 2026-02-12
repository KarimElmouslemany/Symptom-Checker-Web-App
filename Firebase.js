import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAfZ18riIOgy_LYncKU8EsklK3YM0nuAg4",
    authDomain: "symptome-checker-web.firebaseapp.com",
    projectId: "symptome-checker-web",
    storageBucket: "symptome-checker-web.firebasestorage.app",
    messagingSenderId: "543106592716",
    appId: "1:543106592716:web:db7ce29ac4a37bd01eb769",
    measurementId: "G-1ERT4F6ZYQ"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);