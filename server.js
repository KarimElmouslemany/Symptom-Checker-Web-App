const express = require("express");
const path = require("path");
const app = express(); // creates a server
app.use(express.json());
const chatbot = require("./AI_server"); // import the ai_server file
const database = require("./databasepg"); // import the database file
app.post("/singup", (req, res) => {
  console.log("this is from server " ,req.body.email);
  console.log("this is from server " ,req.body.password);

  res.json({
    message: "Signup data received",
  });
  database.main_database(req.body.email,req.body.password,"creat");
});
app.post("/signin", async (req,res)=>{
  let something = null;
  console.log("this is in the singin server side ", req.body.email);
  console.log("this is from the singin server side ",req.body.password);
  something = await database.main_database( req.body.email,req.body.password,"get");
   res.json({message: something.messageJSON,
    checker: something.checker
   });
});

app.use(chatbot); // puts the file into the main server.
app.use(express.static(path.join(__dirname, "Public"))); // serve all HTML, CSS, JS and image files from this project folder
app.listen(process.env.PORT || 3000, () => console.log("Server running")); // starts server at the host server or port  3000 if host server not available
