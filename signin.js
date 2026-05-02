import { auth } from "./Firebase.js"; // Imports the auth from the  Firebase file it self 
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"; // Imports the Firebase function used to sign in users with email and password

const form = document.getElementById("login_form"); // Gets the login form from the HTML page
form.addEventListener("submit", async (e) => { // Runs this function when the user submits the login form
  let verification = null;
  e.preventDefault();
  const username = document.getElementById("login_username_input").value;  // Gets the email entered by the user
  const username_for_validation = document.getElementById("login_username_input"); // Gets the actual email input element so HTML validation can be checked
  const password = document.getElementById("login_password_input").value;  // Gets the password entered by the user
  const error_message = document.getElementById("error_display"); // Gets the error message area from the HTML page
  try {
    verification = handling_verification(username,password,error_message,username_for_validation); // checks for validation
    console.log("verification is ", verification);
    if (verification == true) {
      await signInWithEmailAndPassword(auth, username, password); // waits to hear back from firebase
      window.location.href = "main.html";
    } else {
      console.log("the error came from handling_verification function");
    }
  } catch (err) {
    error_handling(err, error_message);

    
  }
});

function handling_verification( // checks for verification to make sure user has entered the correct info before sending it to firebase
  username,
  password,
  error_message,
  EmailForValidation
 
) {
  let verification_in_function = false;
  error_message.classList.remove("hidden");
  if (username == null || username == "" || username.length == 0) {
    console.log("username filed is empty please enter the username ");
    error_message.textContent =
      "username filed is empty please enter the username";
    return (verification_in_function = false);
  }
  if (password == null || password == "") {
    console.log("password filed is empty please enter a valid password");
    error_message.textContent =
      "password filed is empty please enter a valid password";
    return (verification_in_function = false);
  }
  if (password.length < 6) {
    console.log("password  does not match");
    error_message.textContent = "password  does not match";
    return (verification_in_function = false);
  }
  if (EmailForValidation.validity.typeMismatch) {
    console.log("This is not a valid email. Please enter a valid email");
    error_message.textContent =
      "This is not a valid email. Please enter a valid email";
    return (verification_in_function = false);
  }
  
  else {
    console.log("nothing found wrong everything is good");
    error_message.classList.add("hidden");
    return (verification_in_function = true);
  }
}

function error_handling(error, error_message) { // check error codes and presents them in a friendly way for the user
  error_message.classList.remove("hidden");
  if (error.code === "auth/invalid-credential") {
    error_message.textContent = "Email or password is wrong";
  } else if (error.code === "auth/too-many-requests") {
    error_message.textContent = "Too many failed attempts. Please try again later";
  } else if (error.code === "auth/network-request-failed") {
    error_message.textContent = "Network error. Please check your connection";
  }else{
    error_messages.textContent = "something went wrong. Please try again";
  }
 
  console.log("━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Error code:", error.code);
  console.log("Error message:", error.message);
  console.log("Full error object:", error);
  console.log("━━━━━━━━━━━━━━━━━━━━━━");
}
