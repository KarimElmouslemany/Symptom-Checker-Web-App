import { auth } from "./Firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("login_form");
form.addEventListener("submit", async (e) => {
  let verification = null;
  e.preventDefault();
  const username = document.getElementById("login_username_input").value;
  const username_for_validation = document.getElementById("login_username_input");
  const password = document.getElementById("login_password_input").value;
  const error_message = document.getElementById("error_display");
  try {
    verification = handling_verification(username,password,error_message,username_for_validation);
    console.log("verification is ", verification);
    if (verification == true) {
      await signInWithEmailAndPassword(auth, username, password);
      window.location.href = "main.html";
    } else {
      console.log("the error came from handling_verification function");
    }
  } catch (err) {
    error_handling(err, error_message);

    
  }
});
// checker users passwords length
// check if users email has an @ symbols and gmail,yahoo and stuff
// display errors correctly to users
function handling_verification(
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

function error_handling(error, error_message) {
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
