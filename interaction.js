document.addEventListener("DOMContentLoaded", async () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // creating an array object
  const API_KEY = "Rkjfe4Pk6TpvJuvF1TyZgjAJh3BZJp4t"; // API Key
  const BASE_URL =
    "https://int.api.service.nhs.uk/nhs-website-content/symptoms"; // url for where we are getting everything from
  const number_of_in_dives = document.getElementById("symptoms1"); //gets the element by with a certain value
  const storage_outer_div = {}; // An object used as a lookup table to store outer divs by letter (A–Z)

  for (const letter of letters) {
    // loops through all the letters and creates
    const outer_dives = document.createElement("div"); // create a div element
    outer_dives.className =
      "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"; // creates styling for the borders of the dives
    const heading = document.createElement("h2"); // creates a header tag and assigns it to heading variable.
    heading.textContent = letter; // adds the letters as a heading.
    outer_dives.append(heading); // added the heading tag to the div outer_dives
    number_of_in_dives.append(outer_dives); // put the outerdivs to the page
    storage_outer_div[letter] = outer_dives; // stores the div for later
  }

  for (const letter of letters) {
    const response = await fetch(
      `https://corsproxy.io/?https://int.api.service.nhs.uk/nhs-website-content/symptoms/?category=${letter}`,
      { headers: { apikey: API_KEY } },
    );
    const data = await response.json();
    if (!data.significantLink) {
      continue;
    }
    const NHS_symptoms = data.significantLink;

    for (const symptom of NHS_symptoms) {
      const response2 = await fetch(
        `https://corsproxy.io/?https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${symptom.name}&rettype=topic`,
      );
      const text = await response2.text(); // MedlinePlus returns XML not JSON
      const parser = new DOMParser(); // converts XML string into something JavaScript can search
      const xml = parser.parseFromString(text, "text/xml");
      let summary = xml.querySelector("full-summary"); // gets the full summary element

      if (!summary) {
        summary = "No description available "; // no description found
      } else {
        summary = summary.textContent; // gets the text inside the element
      }

      const inner_div = document.createElement("div"); // creating an inner div
      inner_div.innerHTML = `<details>
        <summary>${symptom.name}</summary>
        <p>${summary}</p>
      </details>`;
      storage_outer_div[letter].append(inner_div);
    }
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // waits 2 seconds before it sends an api request for every letter.
  }
});
