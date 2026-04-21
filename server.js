const express = require("express");
const cors = require("cors");
const app = express(); // creates a server
app.use(cors()); // turns on CORS( this is for nhs api to work)
app.use(express.json()); // lets the server read json body that ai.js sends.
const chatbot = require("./AI_server"); // import the ai_server file
app.use(chatbot); // puts the file into the main server.
app.listen(3000, () => console.log("Server running on http://localhost:3000")); // starts server at port 3000
