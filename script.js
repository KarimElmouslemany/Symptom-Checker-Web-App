const fetch = require("node-fetch"); // import used to make calls to APIs
const fs = require("fs"); // allows use to save stuff to the file
const { DOMParser } = require("@xmldom/xmldom");
require('dotenv').config();
const API_KEY = process.env.NHS_API_KEY; // api key
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const results = {}; // a object that holds all the results for each letter

async function script() {
  for (const letter of letters) {
    console.log(`Fetching letter ${letter}...`);
    results[letter] = [];
    const response = await fetch(
      // fetches the symptoms names from the nhs api
      `https://int.api.service.nhs.uk/nhs-website-content/symptoms/?category=${letter}`,
      { headers: { apikey: API_KEY } },
    );
    const data = await response.json();
    if (!data.significantLink) {
      continue;
    }
    for (const symptoms of data.significantLink) {
      let wordmatch = false;
      const response2 = await fetch(
        // fetches the symptom description meadlinePlus
        `https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${symptoms.name}&rettype=topic`,
      );
      const text = await response2.text(); // this is text
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const health_topic = xml.getElementsByTagName("health-topic")[0];
      const summary = xml.getElementsByTagName("full-summary")[0];
      if (health_topic == null || summary == null) {
        // if the elements has no title or description it skips it
        continue;
      }
      const nhsname = symptoms.name.toLowerCase();
      const medline_title = health_topic.getAttribute("title").toLowerCase();
      const allwords = nhsname.split(" "); // split the title  into individual words
      const nhswords = allwords.filter((word) => word.length > 3);

      for (const word of nhswords) {
        if (medline_title.includes(word)) {
          wordmatch = true;
          break;
        }
      }
      if (!wordmatch) {
        //if the two apis  dont match they skip it and we use
        continue;
      }
      results[letter].push({
        // adds the description and title of the symptom to the letters array
        name: symptoms.name,
        summary: summary.textContent.replace(/<[^>]*>/g, ""),
      });
      console.log(results);
    }
  }
 
  fs.writeFileSync("symptoms.json", JSON.stringify(results, null, 2)); // saves everything to the json file symptoms.json
  console.log("Done! symptoms.json created.");
}
script();
