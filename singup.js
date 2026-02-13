import { auth } from "./Firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("signup_form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signup_email").value.trim();
  const password = document.getElementById("signup_password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created");
      window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});
