import { auth } from "./Firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("login_form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username_input").value.trim();
  const password = document.getElementById("password_input").value;
  try {
    await signInWithEmailAndPassword(auth, username, password);
    alert("valid user");
    window.location.href = "main.html";
  } catch (err) {
    if (err.code === "auth/invalid-credential")
      alert("Email or password is wrong");
    else if (err.code === "auth/user-not-found")
      alert("No account found for that email");
    alert(err.message);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in as:", user.email);
  } else {
    console.log("Not logged in");
  }
});
