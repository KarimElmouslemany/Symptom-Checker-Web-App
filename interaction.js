document.addEventListener("DOMContentLoaded", () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // creating an array object
  const symptoms = [
    {
      symptoms_name: "fever",
      symptoms_description: "run",
    },
    {
      symptoms_name: "cough",
      symptoms_description: "freeze",
    },
  ];
  const number_of_in_dives = document.getElementById("symptoms1"); //gets the element by with a certain value
  const number_of_outer_dives = document.getElementById("outer_div"); //gets the element by with a certain value
  const storage_outer_div = {}; // An object used as a lookup table to store outer divs by letter (A–Z)
  let outer_dives; // defining a variable outer_dives
  for (const letter of letters) {
    // loops through all the letters and creates
    outer_dives = document.createElement("div"); // create a div element
    // outer_dives.className = "outerdivs"; // assigns a class called outer
    outer_dives.className =
    "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"; // creates styling for the borders of the dives
    const heading = document.createElement("h2"); // creates a header tag and assigns it to heading variable.
    heading.textContent = letter; // adds the letters as a heading.
    outer_dives.append(heading); // added the heading tag to the div outer_dives
    number_of_in_dives.append(outer_dives); // put the outerdivs to the page
    storage_outer_div[letter] = outer_dives; // stores the div for later
  }

  for (let i = 0; i < symptoms.length; i++) {
    // loops through the object array
    const inner_div = document.createElement("div"); // creating outer div
    inner_div.className = "symptoms"; // gives the dives a class called symptoms
    inner_div.innerHTML = `<h2>${symptoms[i].symptoms_name}</h2> <p>${symptoms[i].symptoms_description}<p>`; // adds the symptoms name and the description
    const letter = symptoms[i].symptoms_name[0].toUpperCase();
    storage_outer_div[letter].append(inner_div); // looks up the correct outer dive and adds the symptoms and description to it.
  }
});
