document.addEventListener("DOMContentLoaded", async () => { // waits for the page to fully load before running file
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // all the letters 
  // creating an array object
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
    const response = await fetch( // ask the server.js for a certain letter which the server then sends the array of that letter
      `http://localhost:3000/symptoms?category=${letter}`
    );
    const symptoms = await response.json(); // convert the response to a json format 

    for (const symptom of symptoms) { // loops through every letter and creates the drop down every oen with name and description
      const inner_div = document.createElement("div"); // creating an inner div
      inner_div.innerHTML = `<details>
        <summary>${symptom.name}</summary>
        <p>${symptom.summary}</p>
      </details>`;
      outer_dives.append(inner_div);
    }

   
    number_of_in_dives.append(outer_dives); // adds  letters box (with all its symptoms) to the actual page so the user can see it. 
    storage_outer_div[letter] = outer_dives; // stores the letter box and creates it.   
  }
});