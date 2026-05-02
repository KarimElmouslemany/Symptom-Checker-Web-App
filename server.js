const express = require("express");
const app = express(); // creates a server
app.use(express.json()); // lets the server read json body that ai.js sends.
const chatbot = require("./AI_server"); // import the ai_server file
app.use(chatbot); // puts the file into the main server.
app.use(express.static(__dirname)); // serve all HTML, CSS, JS and image files from this project folder
app.listen(process.env.PORT || 3000, () => console.log("Server running")); // starts server at the host server or port  3000 if host server not available
