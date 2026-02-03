document.addEventListener("DOMContentLoaded", () => {
   // creating an array object 
   const symptoms = [{
      symptoms_name: "fever",
      symptoms_description: "run"

   }];
   const number_of_dives = document.getElementById("symptoms1");

   for(let i =0; i< 20; i++){
      const dives =  document.createElement("div"); // create a div element 
      dives.className = "symptoms"; // gives the dives a class called symptoms
      dives.innerHTML = `<h2>${symptoms[0].symptoms_name}</h2> <p>${symptoms[0].symptoms_description}<p>`; 
      number_of_dives.append(dives); // adds the dives to the dummy div element called symptoms1
   }
});