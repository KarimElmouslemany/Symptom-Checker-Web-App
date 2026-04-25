// stores the user's answers
const userAnswers = {
  bodyPart: null,
};
// questions for each body part
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
const questions = {
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
function selectBodyPart(part) {
  userAnswers.bodyPart = part;
  if (userAnswers.bodyPart == "chest") {
    hidden_step_2.classList.remove("hidden");
    restart_button.classList.remove("hidden");
    chest();
  }
  if (userAnswers.bodyPart == "stomach") {
    hidden_step_2.classList.remove("hidden");
    restart_button.classList.remove("hidden");
    stomach();
  }
  if (userAnswers.bodyPart == "back") {
    restart_button.classList.remove("hidden");
    hidden_step_2.classList.remove("hidden");
    Back();
  }
  if (userAnswers.bodyPart == "head") {
    hidden_step_2.classList.remove("hidden");
    restart_button.classList.remove("hidden");
    Head();
  }
  if (userAnswers.bodyPart == "legs") {
    hidden_step_2.classList.remove("hidden");
    restart_button.classList.remove("hidden");
    Legs();
  }
  if (userAnswers.bodyPart == "arms") {
    hidden_step_2.classList.remove("hidden");
    restart_button.classList.remove("hidden");
    Arms();
  }
}

function getRecommendation() {
  // console.log("getting recommendation for", userAnswers.bodyPart);
  const part = userAnswers.bodyPart;
  for (let i = 0; i < questions[part].length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);

    if (selected != null) {
      question_answers.push({
        answer: selected.value,
        severity: questions[part][i].severity,
      });
    } else {
      console.log("please select one of the following");
    }
  }
  checker_answer = recommendation_calc();
  console.log(checker_answer);
  hidden_step_3.classList.remove("hidden");
  if (checker_answer == 0) {
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid green;">
      <h3 class="text-black font-bold text-lg">Monitor Your Symptoms</h3>
      <p class="text-black mt-2">Your symptoms appear mild. Rest and monitor how you feel over the next few days.</p>
    </div>`;
  }
  if (checker_answer >= 7 && checker_answer <= 10) {
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid red;">
      <h3 class="text-black font-bold text-lg">Call 999 Immediately!</h3>
      <p class="text-black mt-2">Your symptoms suggest a serious emergency. Call 999 or go to A&E right away.</p>
    </div>`;
  }
  if (checker_answer >= 4 && checker_answer <= 6) {
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid orange;">
      <h3 class="text-black font-bold text-lg">Call 111</h3>
      <p class="text-black mt-2">Your symptoms need medical attention. Call 111 or visit an urgent care centre.</p>
    </div>`;
  }
  if (checker_answer >= 1 && checker_answer <= 3) {
    display_results.innerHTML = `
    <div class="rounded-2xl p-4" style="border: 4px solid blue;">
      <h3 class="text-black font-bold text-lg">See Your GP</h3>
      <p class="text-black mt-2">Your symptoms suggest you should book an appointment with your GP to get further clarification on your symptoms.</p>
    </div>`;
  }

  console.log(question_answers);
}

function restart() {
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

function recommendation_calc() {
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

function chest() {
  if (selected_peace == false) {
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
function stomach() {
  if (selected_peace == false) {
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
function Back() {
  if (selected_peace == false) {
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
function Head() {
  if (selected_peace == false) {
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
function Legs() {
  if (selected_peace == false) {
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
function Arms() {
  if (selected_peace == false) {
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
 
selectBodyPart();
getRecommendation();
restart();
