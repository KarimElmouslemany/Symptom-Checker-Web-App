const fetch = require("node-fetch"); // import used to make calls to APIs
const fs = require("fs"); // allows use to save stuff to the file

const API_KEY = "Rkjfe4Pk6TpvJuvF1TyZgjAJh3BZJp4t"; // api key
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const results = {}; // a object that holds all the results for each letter

async function generate() {
  // Function called generate
  for (const letter of letters) {
    // loops through every letter a,b,c,d ect
    console.log(`Fetching letter ${letter}...`);
    results[letter] = []; // creates an empty array for that letter

    const response = await fetch(
      // fetches the symptoms of all the letters from the nhs api
      `https://int.api.service.nhs.uk/nhs-website-content/symptoms/?category=${letter}`,
      { headers: { apikey: API_KEY } },
    );
    const data = await response.json(); // converts the request into an json format
    if (!data.significantLink) {
      // if the name and description does not exits just skip it
      continue;
    }

    await Promise.all(
      data.significantLink.map(async (symptom) => {
        // loops the nhs symptoms and runs the code inside.
        const response2 = await fetch(
          // fetchs the symptom
          `https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${symptom.name}&rettype=topic`,
        );
        const text = await response2.text(); // gets it as a text
        const { DOMParser } = require("@xmldom/xmldom"); //Imports the XML parser library
        const parser = new DOMParser(); // creates a parser object
        const xml = parser.parseFromString(text, "text/xml"); // converts the xml text to an object we can search through
        const health_topic = xml.getElementsByTagName("health-topic")[0]; // finds the health topic element that has the title of the symptom
        const summary = xml.getElementsByTagName("full-summary")[0]; // finds the full summary element that has the symptoms description

        if (health_topic == null || summary == null) {
          // if the elements has no title or description it skips it
          return;
        }

        const nhsname = symptom.name.toLowerCase(); // get the title(name) and makes it lowercase
        const medlinename = health_topic.getAttribute("title").toLowerCase(); // get the title and from title attribute inn health-topic tag
        if (!medlinename.includes(nhsname) && !nhsname.includes(medlinename)) {
          // compares the two apis symptoms tittles and if they dont match they skip it
          return;
        }

        results[letter].push({
          // adds the description and title of the symptom to the letters array
          name: symptom.name,
          summary: summary.textContent.replace(/<[^>]*>/g, ""), // get rid of any html tag
        });
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, 1000)); // waits 1 second between every letter to not hit the api rate limit
  }

  fs.writeFileSync("symptoms.json", JSON.stringify(results, null, 2)); // saves everything to the json file symptoms.json
  console.log("Done! symptoms.json created.");
}

generate(); // calls the generate function.
