const express = require("express");
const cors = require("cors");
const app = express(); // creates a server
app.use(cors()); // turns on CORS( this is for nhs api to work)
app.use(express.json()); // lets the server read json body that ai.js sends.
const chatbot = require("./AI_server"); // import the ai_server file
app.use(chatbot); // puts the file into the main server.
// serve all HTML, CSS, JS and image files from this project folder
app.use(express.static(__dirname));
app.listen(process.env.PORT || 3000, () => console.log("Server running")); // starts server at the host server or port  3000 if host server not available
