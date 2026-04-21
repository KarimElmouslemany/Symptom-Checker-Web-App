const chat_message = document.getElementById("chat_messages");

async function toggleChat() {
  const chatbot = document.getElementById("chat_box");
  if (chatbot.hidden == false) {
    chatbot.hidden = true;
    console.log("display the box king kong");
  } else {
    chatbot.hidden = false;
    console.log("execute the box king kong");
  }
}

const chat_button = document.getElementById("chat_send").addEventListener("click", function (event) {
    const users_input = document.getElementById("chat_input").value;
    const remote_welcome_message = document.getElementById("chat_welcome").hidden = true;
    sendMessage(users_input);
  });
async function sendMessage(users_input) {
  if (users_input.trim() == "") {
    alert("enter a message please");
    return;
  } else {
    addMessage_user(users_input);
    users_input.value = "";
  }
}

async function addMessage_user(user_message) {
  const user_display_message = document.createElement("div");
  user_display_message.textContent = user_message;
  user_display_message.className =
    "self-end bg-blue-950 text-white text-sm rounded-xl rounded-br-sm px-3 py-2 max-w-4/5";
  chat_message.appendChild(user_display_message);
  chat_message.scrollTop = chat_message.scrollHeight;
  addMessage_bot("Bot is typing...");
  botsend(user_message);
}

async function addMessage_bot(bots_reply) {
  console.log(bots_reply);
  let checker_for_replying = true;
  const bot_message = document.createElement("div");
  if (bots_reply == "Bot is typing..." && checker_for_replying) {
    console.log("this message is being sent out  (Bot is typing...)");
    bot_message.className =
      "self-start  bg-emerald-700 text-white text-sm rounded-xl rounded-bl-sm px-3 py-2 max-w-4/5";
    bot_message.textContent = bots_reply;
    chat_message.appendChild(bot_message);
    checker_for_replying = false;
  } else {
    bot_message.className =
      "self-start bg-emerald-700  text-white text-sm rounded-xl rounded-bl-sm px-3 py-2 max-w-4/5";
    bot_message.textContent = bots_reply;
    chat_message.appendChild(bot_message);
  }

  chat_message.scrollTop = chat_message.scrollHeight;
}

async function botsend(user_message) {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      // sends a post request to the Ai_server.js and waits for its response
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_message }), // converts the message to a json file
    });

    const data = await response.json();
    removeLastMessage();
    addMessage_bot(data.reply);
  } catch (err) {
    addMessage_bot("Sorry i can not answer that");
  }
}
async function removeLastMessage() {
  chat_message.removeChild(chat_message.lastChild);
}

toggleChat();
