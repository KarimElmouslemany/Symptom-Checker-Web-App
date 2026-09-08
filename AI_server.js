require("dotenv").config();
const express = require("express");
const fs = require("fs"); // used for reading the symptom file
const Groq = require("groq-sdk"); // Gemini SDK ( allows for Gemini to talk to code easier )
const path = require("path");
const router = express.Router(); // used to connect the groq server to the main server(sever.js)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
}); //creates a groq client using the API key

const symptoms = JSON.parse(
  fs.readFileSync(path.join(__dirname, "symptoms.json"), "utf8"),
); // reads the symptom.js file and turn it into a javascript object and uses __dirname to correctly locate symptoms.json in both local and deployed environments.
const allSymptoms = Object.values(symptoms).flat(); // grabs all the array and mergers them into one signal array
router.post("/chat", async (req, res) => {
  // listens for a post request from the frontend(AI.js)
  try {
    const { user_message, chat_history } = req.body; // takes the message the user has written
    const matchedSymptoms = []; // a array for all the matching symptoms
    const all_users_input = user_message.split(" "); // splits the users message
    const users_words = all_users_input.filter((word) => word.length > 3); // filters the message that have the, and , see
    // find all symptoms that match the user's message by looping every single symptom and checks if the users message contains that symptom.
    for (const symptom of allSymptoms) {
      if (
        users_words.some((word) =>
          symptom.name.toLowerCase().includes(word.toLowerCase()),
        )
      ) {
        matchedSymptoms.push(symptom);
      }
    }

    // if no symptoms matched, tell the user
    let context = "No relevant symptom information was found.";
    if (matchedSymptoms.length > 0) {
      context = matchedSymptoms
        .map((s) => `${s.name}: ${s.summary}`)
        .join("\n\n");
    }
    const messages = [
      {
        role: "system",
        content: `You are a friendly symptom checker assistant based in the UK.

          For greetings and simple small talk, respond briefly, naturally and conversationally. For a greeting such as "hello" or "hi", greet the user back, ask how they are, and ask how you can help them today. Do not immediately mention symptoms, health concerns, the NHS, or medical advice unless the user brings up a health-related topic.
  
          Always respond directly to the user's most recent message. Use previous messages only to understand the conversation. Do not repeat greetings, answers, or questions from earlier messages unless the user brings them up again.
          
          You may respond naturally to greetings, simple small talk, and basic conversational questions such as what you do, what you can help with, or how you are. You should still keep the conversation generally focused on your role as a symptom checker.

          You should mainly help users understand symptoms, possible causes, what they can do next, and whether they may need medical attention.

          If the user asks about something unrelated to health or symptom checking that goes beyond basic conversation, such as gaming, coding, news, entertainment, or other general knowledge, politely explain that the request is outside your capabilities and that you are designed to help with symptoms and health-related questions.

          If the user asks about symptoms or health, use the following NHS/MedlinePlus information when it is relevant:

          ${context}

          You may also use your own general health knowledge if the information above is not enough.

          When a user first tells you about a symptom, do not immediately give possible causes, treatments, or a full medical explanation.

          First acknowledge the symptom naturally and ask one or two short relevant questions to understand it better. Keep these responses short.

          When the user gives more information, continue from the previous conversation. Do not greet them again, restart the symptom check, or repeat questions they have already answered.

          Once you have enough information about the symptom, give a short initial assessment. Do not try to cover everything at once:
          1. Explain what it might be related to
          2. Give recommendations on what the user could do
          3. Advise whether they should seek medical attention

          If the symptoms suggest something potentially urgent, you may give urgent advice immediately without waiting for more information.

          Do not tell the user that they definitely have a condition. You are providing general health information, not a medical diagnosis.

          Use UK-specific advice, refer to the NHS where appropriate, and use 999 instead of 911 for emergencies.

          Use British English.

          Do not use markdown formatting, bullet points or asterisks. Write in plain paragraphs only.`,
      },
    ];
    if (chat_history) {
      for (const message of chat_history) {
        messages.push(message);
      }
    }
    messages.push({
      role: "user",
      content: user_message,
    });
    // sends the users prompt through (generateContent) to the groq which is then waited to be responded with
    const result = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: messages,
    });

    const reply = result.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({ reply: "Something went wrong, please try again." });
  }
});

module.exports = router; // allows the file to be seen by other files so that it can be shared
