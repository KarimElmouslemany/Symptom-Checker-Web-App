// stores the user's answers
const userAnswers = {
  bodyPart: null,
};

const severity = [];
const question_answers = [];
const display = document.getElementById("questions");
const display_results = document.getElementById("result");
const hidden_step_2 = document.getElementById("step2");
const hidden_step_3 = document.getElementById("step3");
const restart_button = document.getElementById("restart_button");
let checker = 0;
let checker_answer = 0;
let selected_peace = false;
const questions = { // questions for each body part
  head: [
    { question: "Do you have a headache?", severity: "low" },
    { question: "Do you have a fever?", severity: "medium" },
    { question: "Are you feeling dizzy?", severity: "low" },
    { question: "Have you lost consciousness?", severity: "high" },
  ],
  chest: [
    { question: "Do you have chest pain?", severity: "high" },
    { question: "Are you short of breath?", severity: "high" },
    { question: "Do you have a cough?", severity: "low" },
    { question: "Is your heart beating irregularly?", severity: "high" },
  ],
  stomach: [
    { question: "Do you have stomach pain?", severity: "low" },
    { question: "Are you feeling sick or vomiting?", severity: "medium" },
    { question: "Do you have diarrhoea?", severity: "low" },
    { question: "Is there blood in your stool?", severity: "high" },
  ],
  back: [
    { question: "Do you have back pain?", severity: "low" },
    { question: "Does the pain go down your legs?", severity: "medium" },
    { question: "Have you lost bladder control?", severity: "high" },
  ],
  arms: [
    { question: "Do you have arm pain?", severity: "low" },
    { question: "Is your arm swollen?", severity: "medium" },
    { question: "Have you lost feeling in your arm?", severity: "high" },
  ],
  legs: [
    { question: "Do you have leg pain?", severity: "low" },
    { question: "Is your leg swollen?", severity: "medium" },
    { question: "Have you lost feeling in your leg?", severity: "high" },
  ],
};
function selectBodyPart(part) { // checks which body part the user has entered
  userAnswers.bodyPart = part;
  if (userAnswers.bodyPart == "chest") { // if user selected the chest button execute code in the if statement 
    hidden_step_2.classList.remove("hidden"); // shows the second step (the questions)
    restart_button.classList.remove("hidden"); // shows the restart button
    chest(); // goes to the chest questions
  }
  if (userAnswers.bodyPart == "stomach") { // if user selected the stomach button execute code in the if statement
    hidden_step_2.classList.remove("hidden"); // shows the second step which is (Do you have any of these symptoms? )
    restart_button.classList.remove("hidden");  // shows the restart button
    stomach();
  }
  if (userAnswers.bodyPart == "back") { // if user selected the back button execute code in the if statement
    restart_button.classList.remove("hidden");  // shows the second step which is (Do you have any of these symptoms? )
    hidden_step_2.classList.remove("hidden");  // shows the restart button
    Back();
  }
  if (userAnswers.bodyPart == "head") { // if user selected the head button execute code in the if statement
    hidden_step_2.classList.remove("hidden");  // shows the second step which is (Do you have any of these symptoms? )
    restart_button.classList.remove("hidden");  // shows the restart button
    Head();
  }
  if (userAnswers.bodyPart == "legs") { // if user selected the legs button execute code in the if statement
    hidden_step_2.classList.remove("hidden");  // shows the second step which is (Do you have any of these symptoms? )
    restart_button.classList.remove("hidden");  // shows the restart button
    Legs();
  }
  if (userAnswers.bodyPart == "arms") { // if user selected the arms button execute code in the if statement
    hidden_step_2.classList.remove("hidden");  // shows the second step which is (Do you have any of these symptoms? )
    restart_button.classList.remove("hidden");  // shows the restart button
    Arms();
  }
}

function getRecommendation() {
  const part = userAnswers.bodyPart;
  for (let i = 0; i < questions[part].length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`); //It checks which answer the user selected for question

    if (selected != null) { //  check if nothing has been selected 
      question_answers.push({ // adds it to the answer and the severity of the answer to the system
        answer: selected.value,
        severity: questions[part][i].severity,
      });
    } else {
      console.log("please select one of the following");
    }
  }
  checker_answer = recommendation_calc();
  console.log(checker_answer);
  hidden_step_3.classList.remove("hidden"); // shows the recomended action 
  if (checker_answer == 0) { // if the severity calculated is zero out put this(Monitor Your Symptoms) to the user 
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid green;">
      <h3 class="text-black font-bold text-lg">Monitor Your Symptoms</h3>
      <p class="text-black mt-2">Your symptoms appear mild. Rest and monitor how you feel over the next few days.</p>
    </div>`;
  }
  if (checker_answer >= 7 && checker_answer <= 10) { // if the severity calculated is 7 to 10 out put this(Call 999 Immediately!) to the user 
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid red;">
      <h3 class="text-black font-bold text-lg">Call 999 Immediately!</h3>
      <p class="text-black mt-2">Your symptoms suggest a serious emergency. Call 999 or go to A&E right away.</p>
    </div>`;
  }
  if (checker_answer >= 4 && checker_answer <= 6) { // if the severity calculated is 4 to 6 out put this(Call 111) to the user
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid orange;">
      <h3 class="text-black font-bold text-lg">Call 111</h3>
      <p class="text-black mt-2">Your symptoms need medical attention. Call 111 or visit an urgent care centre.</p>
    </div>`;
  }
  if (checker_answer >= 1 && checker_answer <= 3) { //if the severity calculated is 1 to 3 out put this(See Your GP to the user
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid blue;">
      <h3 class="text-black font-bold text-lg">See Your GP</h3>
      <p class="text-black mt-2">Your symptoms suggest you should book an appointment with your GP to get further clarification on your symptoms.</p>
    </div>`;
  }

  console.log(question_answers);
}

function restart() { // restarts the whole symptom checker goes back to the first step
  console.log("restart function executed");
  hidden_step_2.classList.add("hidden");
  hidden_step_3.classList.add("hidden");
  restart_button.classList.add("hidden");
  question_answers.length = 0;
  checker = 0;
  checker_answer = 0;
  selected_peace = false;
  console.log("restarting");
  display.innerHTML = ``;
  display_results.innerHTML = ``;
}

function recommendation_calc() { // calculates the serverty based on how high it is and what the users answer was and then returns the amount  
  for (let i = 0; i < question_answers.length; i++) {
    if (
      question_answers[i].answer == "yes" &&
      question_answers[i].severity == "high"
    ) {
      checker += 3;
    }
    if (
      question_answers[i].answer == "yes" &&
      question_answers[i].severity == "medium"
    ) {
      checker += 2;
    }
    if (
      question_answers[i].answer == "yes" &&
      question_answers[i].severity == "low"
    ) {
      checker += 1;
    }
    if (
      question_answers[i].answer == "unsure" &&
      question_answers[i].severity == "high"
    ) {
      checker += 2;
    }
    if (
      question_answers[i].answer == "unsure" &&
      question_answers[i].severity == "medium"
    ) {
      checker += 1;
    }
    if (
      question_answers[i].answer == "unsure" &&
      question_answers[i].severity == "low"
    ) {
      checker += 0;
    }
    if (question_answers[i].answer == "no") {
      checker += 0;
    }
  }
  return checker;
}

function chest() { // display the chest questions to the user
  if (selected_peace == false) { // check if another section questions  is already selected and if its false runs this section questions 
    for (let i = 0; i < questions.chest.length; i++) {
      display.innerHTML += `
      <div class="rounded-2xl border border-slate-200w bg-white p-4 shadow-sm">
        <p class="font-medium mb-3">${questions.chest[i].question}</p>
        <div class="flex gap-4">
          <label><input type="radio" id="chest_q${i}_yes" name="q${i}" value="yes"> Yes</label>
          <label><input type="radio" id="chest_q${i}_no" name="q${i}" value="no"> No</label>
          <label><input type="radio" id="chest_q${i}_unsure" name="q${i}" value="unsure"> Not sure</label>
        </div>
      </div>`;
      console.log("chest selected and outputted");
    }
    selected_peace = true;
    recommendation_calc();
  } else {
    console.log("this peace is already selected");
  }
}
function stomach() {  // display the stomach questions to the user
  if (selected_peace == false) { // check if another section questions  is already selected and if its false runs this section questions 
    for (let i = 0; i < questions.stomach.length; i++) {
      display.innerHTML += `
      <div class="rounded-2xl border border-slate-200w bg-white p-4 shadow-sm">
        <p class="font-medium mb-3">${questions.stomach[i].question}</p>
        <div class="flex gap-4">
          <label><input type="radio" id="chest_q${i}_yes" name="q${i}" value="yes"> Yes</label>
          <label><input type="radio" id="chest_q${i}_no" name="q${i}" value="no"> No</label>
          <label><input type="radio" id="chest_q${i}_unsure" name="q${i}" value="unsure"> Not sure</label>
        </div>
      </div>`;
      console.log("stomach selected and outputted");
    }
    selected_peace = true;
    recommendation_calc();
  } else {
    console.log("this peace is already selected");
  }
}

function Back() {   // display the Back questions to the user
  if (selected_peace == false) { // check if another section questions  is already selected and if its false runs this section questions 
    for (let i = 0; i < questions.back.length; i++) {
      display.innerHTML += `
      <div class="rounded-2xl border border-slate-200w bg-white p-4 shadow-sm">
        <p class="font-medium mb-3">${questions.back[i].question}</p>
        <div class="flex gap-4">
          <label><input type="radio" id="chest_q${i}_yes" name="q${i}" value="yes"> Yes</label>
          <label><input type="radio" id="chest_q${i}_no" name="q${i}" value="no"> No</label>
          <label><input type="radio" id="chest_q${i}_unsure" name="q${i}" value="unsure"> Not sure</label>
        </div>
      </div>`;
      console.log("Back selected and outputted");
    }
    selected_peace = true;
    recommendation_calc();
  }
}
function Head() { // displays the head questions to user
  if (selected_peace == false) { // check if another section questions  is already selected and if its false runs this section questions 
    for (let i = 0; i < questions.head.length; i++) {
      display.innerHTML += `
      <div class="rounded-2xl border border-slate-200w bg-white p-4 shadow-sm">
        <p class="font-medium mb-3">${questions.head[i].question}</p>
        <div class="flex gap-4">
          <label><input type="radio" id="chest_q${i}_yes" name="q${i}" value="yes"> Yes</label>
          <label><input type="radio" id="chest_q${i}_no" name="q${i}" value="no"> No</label>
          <label><input type="radio" id="chest_q${i}_unsure" name="q${i}" value="unsure"> Not sure</label>
        </div>
      </div>`;
      console.log("Head selected and outputted");
    }
    selected_peace = true;
    recommendation_calc();
  }
}
function Legs() { // displays the leg question to users 
  if (selected_peace == false) { // check if another section questions  is already selected and if its false runs this section questions 
    for (let i = 0; i < questions.legs.length; i++) {
      display.innerHTML += `
      <div class="rounded-2xl border border-slate-200w bg-white p-4 shadow-sm">
        <p class="font-medium mb-3">${questions.legs[i].question}</p>
        <div class="flex gap-4">
          <label><input type="radio" id="chest_q${i}_yes" name="q${i}" value="yes"> Yes</label>
          <label><input type="radio" id="chest_q${i}_no" name="q${i}" value="no"> No</label>
          <label><input type="radio" id="chest_q${i}_unsure" name="q${i}" value="unsure"> Not sure</label>
        </div>
      </div>`;
      console.log("Legs selected and outputted");
    }
    selected_peace = true;
    recommendation_calc();
  }
}
function Arms() { // displays the arms questions to user 
  if (selected_peace == false) { // check if another section questions  is already selected and if its false runs this section questions 
    for (let i = 0; i < questions.arms.length; i++) {
      display.innerHTML += `
      <div class="rounded-2xl border border-slate-200w bg-white p-4 shadow-sm">
        <p class="font-medium mb-3">${questions.arms[i].question}</p>
        <div class="flex gap-4">
          <label><input type="radio" id="chest_q${i}_yes" name="q${i}" value="yes"> Yes</label>
          <label><input type="radio" id="chest_q${i}_no" name="q${i}" value="no"> No</label>
          <label><input type="radio" id="chest_q${i}_unsure" name="q${i}" value="unsure"> Not sure</label>
        </div>
      </div>`;
      console.log("Arms selected and outputted");
    }
    selected_peace = true;
    recommendation_calc();
  }
}
 
selectBodyPart(); // excutes the function
getRecommendation(); // excutes the function
restart(); // excutes the function
