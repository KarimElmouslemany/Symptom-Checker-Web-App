document.addEventListener("DOMContentLoaded", () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // creating an array object
  const symptoms = [
    {
      symptoms_name: "fever",
      symptoms_causes: "run",
      symptoms_diagnostic: "hello world this the",
      does_and_dont: {
        dos: [
          "gently brush your teeth and gums at least twice a day for 2 minutes",
          "do everything good",
        ],
        donts: ["donnt do bad things", "dont cause war"],
      },
    },
    {
      symptoms_name: "cough",
      symptoms_causes: "freeze",
      does_and_dont: {
        dos: [
          "gently brush your teeth and gums at least twice a day for 2 minutes",
          "do everything good",
        ],
        donts: ["donnt do bad things", "dont cause war"],
      },
    },
    {
      symptoms_name: "Arm pain",
      symptoms_causes:
        "Elbow and arm pain is not usually a sign of anything serious. If it does not go away after a few weeks, see a GP.",
      symptoms_diagnostic: "hello world this the",
      does_and_dont: {
        dos: [
          "gently brush your teeth and gums at least twice a day for 2 minutes",
          "do everything good",
        ],
        donts: ["donnt do bad things", "dont cause war"],
      },
    },
    {
      symptoms_name: "wolf",
      symptoms_causes: "hello there i am the king  ",
      symptoms_diagnostic: "hello world this the",
      does_and_dont: {
        dos: [
          "gently brush your teeth and gums at least twice a day for 2 minutes",
          "do everything good",
        ],
        donts: ["donnt do bad things", "dont cause war"],
      },
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
    inner_div.innerHTML = `
  <details class="mt-2">
    <summary class="cursor-pointer font-medium text-slate-900">
      ${symptoms[i].symptoms_name}
    </summary>

    <h3 class="mt-2 text-sm font-semibold text-slate-900">Description</h3>
    <p class="mt-1 text-sm text-slate-700">${symptoms[i].symptoms_causes}</p>

    <hr class="my-4 border-slate-200">

    <h3 class="mt-3 text-sm font-semibold text-red-600">Don't</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
      ${symptoms[i].does_and_dont.donts.map((item) => `<li>${item}</li>`).join("")}
    </ul>

    <h3 class="mt-3 text-sm font-semibold text-green-600">Do</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
      ${symptoms[i].does_and_dont.dos.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  </details>
`; // adds the symptoms name and the description and Uses <details> to toggle the symptom description, with <summary> as the clickable heading.
    const letter = symptoms[i].symptoms_name[0].toUpperCase();
    storage_outer_div[letter].append(inner_div); // looks up the correct outer dive and adds the symptoms and description to it.
  }
});
