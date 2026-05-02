import { auth } from "./Firebase.js"; // Imports the auth from the  Firebase file it self 
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"; // Imports the Firebase function used to sign in users with email and password

const form = document.getElementById("signup_form"); // Gets the signup form from the HTML page

form.addEventListener("submit", async (e) => {  // Runs this function when the user submits the signup form
  e.preventDefault();
  let verification = false;
  const email = document.getElementById("signup_email_input").value.trim(); // gets the users email
  const password = document.getElementById("signup_password_input").value; // gets the users password
  const EmailForValidation = document.getElementById("signup_email_input"); // gets the email of the user but this one is used for validation of the email
  const error_message = document.getElementById("error_display"); // gets the id of the where the errors will be displayed 
  const confirm_password = document.getElementById("signup_password_confirm_input").value; // gets the id of confirm password input
  try {
    verification = handling_verification( // checks for user has inputted the correct details 
      email,
      password,
      error_message,
      EmailForValidation,
      confirm_password,
    );
    if (verification == true) { // if verification came back correct send the users details to firebase
      await createUserWithEmailAndPassword(auth, email, password); // awaits for a response that users account has been created on the firebase system
      alert("Account created");
      window.location.href = "index.html"; // goes to the login page 
    }
  } catch (err) {
    error_handling(err, error_message); // function used to handle firebase errors so that it can be displayed in a user friendly way
  }
});

function handling_verification( // handles the verification of users input
  username,
  password,
  error_message,
  EmailForValidation,
  confirm_password,
) {
  let verification_in_function = false;
  error_message.classList.remove("hidden");
  if (username == null || username == "" || username.length == 0) {
    console.log("Email filed is empty please enter the username ");
    error_message.textContent =
      "Email filed is empty please enter the username";
    return (verification_in_function = false);
  }
  if (password == null || password == "") {
    console.log("password filed is empty please enter a valid password");
    error_message.textContent =
      "password filed is empty please enter a valid password";
    return (verification_in_function = false);
  }
  if (password.length < 8 || password.length > 12) {
    console.log("password length must be between 8-12");
    error_message.textContent = "password length must be between 8-12";
    return (verification_in_function = false);
  }
  if (!/[A-Z]/.test(password)) {
    error_message.textContent = "Password must contain an uppercase letter";
    return (verification_in_function = false);
  }
  if (!/[a-z]/.test(password)) {
    error_message.textContent = "Password must contain a lowercase letter";
    return (verification_in_function = false);
  }
  if (!/[0-9]/.test(password)) {
    error_message.textContent = "Password must contain a number";
    return (verification_in_function = false);
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
    error_message.textContent = "Password must contain a special character";
    return (verification_in_function = false);
  }
  if (EmailForValidation.validity.typeMismatch) {
    console.log("This is not a valid email. Please enter a valid email");
    error_message.textContent =
      "This is not a valid email. Please enter a valid email";
    return (verification_in_function = false);
  }
  if (!username.includes("@") || !username.includes(".")) {
    console.log("This is not a valid email. Please enter a valid email");
    error_message.textContent =
      "This is not a valid email. Please enter a valid email";
    return (verification_in_function = false);
  }
  if (confirm_password != password) {
    console.log("password input does not match confirm password input ");
    error_message.textContent = "password does not match";
    return (verification_in_function = false);
  } else {
    console.log("nothing found wrong everything is good");
    error_message.classList.add("hidden");
    return (verification_in_function = true);
  }
}
function error_handling(error, error_message) { // used to displayed firebase errors in a users friendly way
  error_message.classList.remove("hidden");
  if (error.code == "auth/email-already-in-use") {
    error_message.textContent =
      "An account with this email already exists. Please log in instead.";
  }
  if (error.code == "auth/too-many-requests") {
    error_message.textContent = "Too many attempts. Please try again later";
  }
  if (error.code == "auth/network-request-failed") {
    error_message.textContent = "Network error. Please check your connection";
  } else {
    console.log("━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
    console.log("Full error object:", error);
    console.log("━━━━━━━━━━━━━━━━━━━━━━");
  }
}
