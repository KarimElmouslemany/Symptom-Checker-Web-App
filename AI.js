const chatInput = document.getElementById("chat_input"); //  the text input where the user types their symptoms
const chatSend = document.getElementById("chat_send"); //  the Send button
const chatMessages = document.getElementById("chat_messages"); //  the Send button

function toggleChat() {
  const box = document.getElementById("chat_box"); // gets the div id of chat_box
  if (box.style.display === "flex") {
    // check if the chat is open

    box.style.display = "none"; // if open close the chat.
  } else {
    box.style.display = "flex"; // if it is closed open it
  }
}
async function sendMessage() {
  const message = chatInput.value.trim(); // takes what the user has inputted and removes any spaces
  if (!message) {
    // if no value in the input stops function
    return;
  }

  addMessage(message, "user"); // displays users message in the chat box
  chatInput.value = ""; // clears message for next input

  addMessage("Typing...", "bot"); // shows "typing message" when user is waiting for gemini response.
  try {
    const response = await fetch("http://localhost:3000/chat", { // sends a post request to the Ai_server.js and waits for its response
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }), // converts the message to a json file 
    });

    const data = await response.json(); // converts the request into a json object

    removeLastMessage(); // removes the typing message 
    addMessage(data.reply, "bot"); // and inputs the response
  } catch (err) { // error catch 
    removeLastMessage(); // removes the typing message 
    addMessage("Something went wrong, please try again.", "bot"); // out put this if an error has happened. 
  }

  function addMessage(text, sender) {
 
  const div = document.createElement("div");  // create a new div to hold the message

 
  if (sender === "user") {  // check if the message is from the user or the bot
    
    div.className = "self-end bg-blue-950 text-white text-sm rounded-xl rounded-br-sm px-3 py-2 max-w-4/5"; // user messages are dark blue and on the right
  } else {
    
    div.className = "self-start bg-white border border-slate-200 text-slate-900 text-sm rounded-xl rounded-bl-sm px-3 py-2 max-w-4/5"; // bot messages are white and on the left
  }

  
  div.textContent = text; // set the text inside the div

 
  chatMessages.appendChild(div);  // add the div to the messages area

  chatMessages.scrollTop = chatMessages.scrollHeight; // scroll to the bottom so the latest message is always visible
}

    

}
function removeLastMessage() { 
  chatMessages.removeChild(chatMessages.lastChild); // removes the last message from the chat(mostly the typing.. message)
}
chatSend.addEventListener("click", sendMessage); // waits for user to press the send button to activate the send message function to display user out put 

chatInput.addEventListener("keydown", (e) => { // runs the code when any key is pressed
  if (e.key === "Enter"){ // checks if the key that is pressed is the Enter key and runs the send message function
    sendMessage(); 
  } 
});
