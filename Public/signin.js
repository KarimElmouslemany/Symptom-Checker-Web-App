const form = document.getElementById("login_form"); // Gets the login form from the HTML page
form.addEventListener("submit", async (e) => {
  // Runs this function when the user submits the login form
  let verification = null;
  e.preventDefault();
  const email = document.getElementById("login_username_input").value; // Gets the email entered by the user
  const email_for_validation = document.getElementById("login_username_input"); // Gets the actual email input element so HTML validation can be checked
  const password = document.getElementById("login_password_input").value; // Gets the password entered by the user
  const error_message = document.getElementById("error_display"); // Gets the error message area from the HTML page
  try {
    verification = handling_verification(
      email,
      password,
      error_message,
      email_for_validation,
    ); // checks for validation
    console.log("verification is ", verification);
    if (verification == true) {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let error = await response.json();
      console.log("this is data ", error);
      if (error.checker === false) {
        error_handling(error.message, error_message);
      } else {
        alert("welcome");
        console.log("checkker is this: " ,error.checker);
        console.log("message from error: ", error.message);
        window.location.href = "main.html";
      }
    } else {
      console.log("the error came from handling_verification function");
    }
  } catch (error) {
    console.log("the catch " ,error);
  }
});

function handling_verification( // checks for verification to make sure user has entered the correct info before sending it to firebase
  email,
  password,
  error_message,
  EmailForValidation,
) {
  let verification_in_function = false;
  error_message.classList.remove("hidden");
  if (email == null || email == "" || email.length == 0) {
    console.log("email filed is empty please enter the username ");
    error_message.textContent = "email filed is empty please enter the email";
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
  } else {
    console.log("nothing found wrong everything is good");
    error_message.classList.add("hidden");
    return (verification_in_function = true);
  }
}

function error_handling(error, error_message) {
  error_message.classList.remove("hidden");
  error_message.textContent = error;
}

