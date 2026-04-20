
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // all the letters
document.addEventListener("DOMContentLoaded", async () => {
 const adding_to_main_page = document.getElementById("Display_info");
 const response = await fetch("./symptoms.json");
 const data = await response.json();
 display_letters(data,adding_to_main_page);
});

async function display_letters(data,adding_to_main_page) { // adding letters to main page 
 for( const letter of letters){
        const letter_heading = document.createElement("h2");
        const letter_container = document.createElement("div"); 
        letter_container.className = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        letter_heading.textContent = letter;
        letter_container.appendChild(letter_heading);
        display_symptoms(data[letter],adding_to_main_page,letter_container);
    } 
}

async function display_symptoms(data,adding_to_main_page,letter_adding_to_container) { // adding symptoms to main page 
    for(const symptom of data){
        const  symptom_info_display = document.createElement("ul");
        symptom_info_display.className = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm";
        symptom_info_display.innerHTML = `<details>
        <summary>${symptom.name}</summary>
        <p>${symptom.summary}</p>
      </details>`;
      letter_adding_to_container.appendChild(symptom_info_display);
      adding_to_main_page.appendChild(letter_adding_to_container);            
    }
    
}
