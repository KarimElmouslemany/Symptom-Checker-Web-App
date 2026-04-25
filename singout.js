import { auth } from "./Firebase.js"; // import from the firebase.js file
import { signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"; // importing the firebase signout function
import {onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"; // importing the firebase onAuthStateChanged function
document.addEventListener("DOMContentLoaded", () => {
  const signOut_button = document.getElementsByClassName("singout_button") //gets all the element with the class name singout_button. 
  for(let i = 0; i<signOut_button.length; i++){ // loops through the class element and attaches the click listener to each one.
        signOut_button[i].addEventListener("click", signout); 
  }

});

// checks if the user is logged in.
onAuthStateChanged(auth, (user) => {
  if (user === null) {
    // if user is null (so no one has logged in )
    window.location.href = "index.html"; // goes to the login page
  }
});
async function signout() {
  try {
    await signOut(auth); // sing out users ( does: Ends the user session ,Clears authentication state ,Triggers onAuthStateChanged Sets user = null).
    window.location.href = "index.html"; // sends user to login page
  } catch (err) {
    console.error("Sign out failed:", err);
    alert("Something went wrong signing out. Please try again.");
  }
}
