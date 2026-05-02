const chat_message = document.getElementById("chat_messages");

function toggleChat() { // function for toggling the chatbot 
  const chatbot = document.getElementById("chat_box");
  const toggleButton = document.getElementById("chat_toggle");
  if (chatbot.hidden == true) {
    chatbot.hidden = false;
    toggleButton.setAttribute("aria-expanded", "true");
    toggleButton.setAttribute("aria-label", "Close symptom assistant chat");
  } else {
    chatbot.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Open symptom assistant chat");
  }
}

const chat_button = document .getElementById("chat_send").addEventListener("click", function (event) { // checks if the send button has been clicked
    const users_input = document.getElementById("chat_input").value; // gets the users input
    const remote_welcome_message = document.getElementById("chat_welcome").hidden = true; // hides the welcome message 
    sendMessage(users_input); // adds the users input 
  });  
function sendMessage(users_input) { // check if users has entered a message 
  if (users_input.trim() == "") {
    alert("enter a message please");
    return;
  } else {
    addMessage_user(users_input);
    users_input.value = "";
  }
}

function addMessage_user(user_message) {
  const user_display_message = document.createElement("div");
  user_display_message.textContent = user_message; // adds the users message to the div thats created
  user_display_message.className =
    "self-end bg-blue-950 text-white text-sm rounded-xl rounded-br-sm px-3 py-2 max-w-4/5"; // styles the div into a message bubble that is blue 
  chat_message.appendChild(user_display_message); // adds the message to the chat
  chat_message.scrollTop = chat_message.scrollHeight; // scrolls to the latest message
  addMessage_bot("Bot is typing..."); // adds this message to the chat
  botsend(user_message); // sends users message to the bot 
}

function addMessage_bot(bots_reply) {
  let checker_for_replying = true;
  const bot_message = document.createElement("div");
  if (bots_reply == "Bot is typing..." && checker_for_replying) { // checks if a certain message is being sent 
    bot_message.className =
      "self-start  bg-emerald-700 text-white text-sm rounded-xl rounded-bl-sm px-3 py-2 max-w-4/5"; // styles the div of the bot message into a message bubble
    bot_message.textContent = bots_reply; // adds the message to the div that was created 
    chat_message.appendChild(bot_message); // adds the bot message to the chat
    checker_for_replying = false;
  } else {
    bot_message.className =
      "self-start bg-emerald-700  text-white text-sm rounded-xl rounded-bl-sm px-3 py-2 max-w-4/5"; // styles the div of the bot message into a message bubble
    bot_message.textContent = bots_reply; // adds the bot message to the div 
    chat_message.appendChild(bot_message); // adds the bot message to the chat
  }

  chat_message.scrollTop = chat_message.scrollHeight;
}

async function botsend(user_message) {
  try {
    const response = await fetch("/chat", {
      // sends a post request to the Ai_server.js and waits for its response
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_message }), // converts the message to a json file
    });

    const data = await response.json(); // waits for the response
    removeLastMessage(); // removes the last message that was sent 
    addMessage_bot(data.reply); // sends it to the function that adds the bots reply to the system
  } catch (err) {
    addMessage_bot("Sorry i can not answer that"); // adds this message in the chat if there is an error
  }
}
function removeLastMessage() {
  chat_message.removeChild(chat_message.lastChild); // removes the last message 
}

toggleChat(); // runs the function 
