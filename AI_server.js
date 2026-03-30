const express = require("express");
const cors = require("cors");
const fs = require("fs"); // used for reading the symptom file
const Groq = require("groq-sdk"); // Gemini SDK ( allows for Gemini to talk to code easier )

const router = express.Router(); // used to connect the groq server to the main server(sever.js)
const groq = new Groq({
  apiKey: "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",
}); //creates a groq client using the API key
const symptoms = JSON.parse(fs.readFileSync("symptoms.json")); // reads the symptom.js file and turn it into a javascript object
const allSymptoms = Object.values(symptoms).flat(); // grabs all the array and mergers them into one signal array
router.post("/chat", async (req, res) => {
  // listens for a post request from the frontend(AI.js)
  try {
    const { message } = req.body; // takes the message the user has written
    const matchedSymptoms = []; // a array for all the matching symptoms
    const all_users_input = message.split(" "); // splits the users message 
    const users_words = all_users_input.filter(word=> word.length > 3); // filters the message that have the, and , see
     // find all symptoms that match the user's message by looping every single symptom and checks if the users message contains that symptom.
    for (const symptom of allSymptoms) {
      if (users_words.some(word => symptom.name.toLowerCase().includes(word.toLowerCase()))) { 
        matchedSymptoms.push(symptom);
      }
    }

    // if no symptoms matched, tell the user
    if (matchedSymptoms.length === 0) {
      return res.json({
        reply:
          "I couldn't find any matching symptoms in my list. Please try describing your symptoms differently.",
      });
    }
    // build the context from matched symptoms that will be sent to groq.
    const context = matchedSymptoms
      .map((s) => `${s.name}: ${s.summary}`)
      .join("\n\n");

    // sends the users prompt through (generateContent) to the groq which is then waited to be responded with
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a symptom checker assistant based in the UK. Use UK specific advice, 
          recommend calling 999 instead of 911, refer to the NHS, and use British English.
          Using ONLY the following NHS/MedlinePlus symptom information as your knowledge base:
          
          ${context}
          
          Based on this, you must:
          1. Suggest what condition the user might have
          2. Give recommendations on what they should do
          3. Advise whether they should see a doctor or not
          
          Do not use any medical knowledge outside of what is provided above.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    const reply = result.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({ reply: "Something went wrong, please try again." });
  }
});

module.exports = router; // allows the file to be seen by other files so that it can be shared
