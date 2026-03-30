const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express(); // creates a server
app.use(cors()); // turns on CORS( this is for nhs api to work)
app.use(express.json()); // lets the server read json body that ai.js sends.
// load the symptoms data from the JSON file
const symptoms = JSON.parse(fs.readFileSync("symptoms.json")); // reads the symptom data from the symptom.json file and converts it into a Javascript object

// NHS symptoms route(get request)
app.get("/symptoms", (req, res) => {
  // when the front end calls this section grabs a letter and looks it up in the  symptoms object and send the array of that letter. and if nothing has been found itt send and empty array
  const category = req.query.category.toUpperCase();
  res.json(symptoms[category] || []);
});

const chatbot = require("./AI_server"); // import the ai_server file
app.use(chatbot); // puts the file into the main server.
app.listen(3000, () => console.log("Server running on http://localhost:3000")); // starts server at port 3000
