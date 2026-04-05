// stores the user's answers
const userAnswers = {
  bodyPart: null,
};
// questions for each body part
const severity = [];
const question_answers = [];
const display = document.getElementById("questions");
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
    chest();
  }
  if (userAnswers.bodyPart == "stomach") {
    stomach();
  }
  if (userAnswers.bodyPart == "back") {
    Back();
  }
  if (userAnswers.bodyPart == "head") {
    Head();
  }
  if (userAnswers.bodyPart == "legs") {
    Legs();
  }
  if (userAnswers.bodyPart == "arms") {
    Arms();
  }
}

function getRecommendation() {
  // console.log("getting recommendation for", userAnswers.bodyPart);
  const part = userAnswers.bodyPart;
  for (let i = 0; i < questions[part].length; i++) {
    const selected = document.querySelector(
      `input[name="q${i}"]:checked`,
    ).value;
    if (selected != null) {
      question_answers.push({
        answer: selected,
        severity: questions[part][i].severity,
      });
    } else {
      console.log("please select one of the following");
    }
  }
  checker_answer = recommendation_calc();
  console.log(checker_answer);
  if (checker_answer == 0) {
    console.log("monitor symptoms  and if you feel worse visit a GP");
  }
  if (checker_answer >= 7 && checker_answer <= 10) {
    console.log("call 999");
  }
  if (checker_answer >= 4 && checker_answer <= 6) {
    console.log("call 111");
  }
  if (checker_answer >= 1 && checker_answer <= 3) {
    console.log("see a GP");
  }

  console.log(question_answers);
}

function restart() {
  question_answers.length = 0;
  checker = 0;
  checker_answer = 0;
  selected_peace = false;
  console.log("restarting");
  display.innerHTML = ``;
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
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
