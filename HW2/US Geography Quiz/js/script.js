document.querySelector("button").addEventListener("click", gradeQuiz);

// attempts
let attempts = localStorage.getItem("total_attempts");
attempts = attempts === null ? 0 : Number(attempts);

// initial Q4 choices
displayQ4Choices();

let score = 0;

// shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Q4 generator
function displayQ4Choices() {
  let arr = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(arr);

  let container = document.querySelector("#q4Choices");
  container.innerHTML = "";

  for (let c of arr) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.value = c;
    input.id = "q4_" + c;
    input.className = "form-check-input ms-2";

    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = c;
    label.className = "form-check-label me-3";

    container.appendChild(input);
    container.appendChild(label);
  }
}

// mark image
function setMarkImage(index, img, alt) {
  let el = document.querySelector(`#markImg${index}`);
  el.innerHTML = "";

  let image = document.createElement("img");
  image.src = `img/${img}`;
  image.alt = alt;
  image.style.width = "22px";

  el.appendChild(image);
}

// correct
function rightAnswer(i) {
  document.querySelector(`#q${i}Feedback`).textContent = "Correct!";
  document.querySelector(`#q${i}Feedback`).className = "text-success fw-bold mt-2";
  setMarkImage(i, "checkmark.png", "correct");
  score += 10;
}

// wrong
function wrongAnswer(i) {
  document.querySelector(`#q${i}Feedback`).textContent = "Incorrect!";
  document.querySelector(`#q${i}Feedback`).className = "text-danger fw-bold mt-2";
  setMarkImage(i, "xmark.png", "wrong");
}

// validation
function isFormValid() {
  let ok = true;

  if (document.querySelector("#q1").value.trim() === "") ok = false;
  if (document.querySelector("#q2").value === "") ok = false;

  // Check if at least one checkbox is selected for Q3
  if (!document.querySelector("#q3_jackson").checked && !document.querySelector("#q3_franklin").checked &&
      !document.querySelector("#q3_jefferson").checked && !document.querySelector("#q3_roosevelt").checked) ok = false;

  if (!document.querySelector("input[name=q4]:checked")) ok = false;
  if (!document.querySelector("input[name=q5]:checked")) ok = false;

  if (document.querySelector("#q6").value.trim() === "") ok = false;
  if (document.querySelector("#q7").value === "") ok = false;

  // Check if at least one checkbox is selected for Q8
  if (!document.querySelector("#q8_wa").checked && !document.querySelector("#q8_fl").checked &&
      !document.querySelector("#q8_or").checked && !document.querySelector("#q8_ga").checked) ok = false;

  if (!document.querySelector("input[name=q9]:checked")) ok = false;
  if (!document.querySelector("input[name=q10]:checked")) ok = false;

  if (!ok) {
    let fdbk = document.querySelector("#validationFdbk");
    fdbk.textContent = "Please answer all questions before submitting.";
    fdbk.className = "bg-danger text-white p-2 rounded"; // apply style only when triggered
  }

  return ok;
}

// main
function gradeQuiz() {
  let validationFdbk = document.querySelector("#validationFdbk");
  validationFdbk.textContent = "";
  validationFdbk.className = ""; // clear alert container style
  document.querySelector("#congratsMessage").textContent = "";

  // reset UI each submit
  for (let i = 1; i <= 10; i++) {
    let fb = document.querySelector(`#q${i}Feedback`);
    if (fb) fb.textContent = "";

    let mark = document.querySelector(`#markImg${i}`);
    if (mark) mark.innerHTML = "";
  }

  if (!isFormValid()) return;

  score = 0;

  if (document.querySelector("#q1").value.toLowerCase().trim() === "sacramento")
    rightAnswer(1); else wrongAnswer(1);

  if (document.querySelector("#q2").value === "mo")
    rightAnswer(2); else wrongAnswer(2);

  // strict check for checkboxes
  if (document.querySelector("#q3_jefferson").checked && document.querySelector("#q3_roosevelt").checked &&
      !document.querySelector("#q3_jackson").checked && !document.querySelector("#q3_franklin").checked)
    rightAnswer(3); else wrongAnswer(3);

  let q4 = document.querySelector("input[name=q4]:checked");
  if (q4 && q4.value === "Rhode Island") rightAnswer(4); else wrongAnswer(4);

  let q5 = document.querySelector("input[name=q5]:checked");
  if (q5 && q5.value === "California") rightAnswer(5); else wrongAnswer(5);

  if (document.querySelector("#q6").value.toLowerCase().trim() === "albany")
    rightAnswer(6); else wrongAnswer(6);

  if (document.querySelector("#q7").value === "tx")
    rightAnswer(7); else wrongAnswer(7);

  // strict check for checkboxes
  if (document.querySelector("#q8_wa").checked && document.querySelector("#q8_or").checked &&
      !document.querySelector("#q8_fl").checked && !document.querySelector("#q8_ga").checked)
    rightAnswer(8); else wrongAnswer(8);

  let q9 = document.querySelector("input[name=q9]:checked");
  if (q9 && q9.value === "True") rightAnswer(9); else wrongAnswer(9);

  let q10 = document.querySelector("input[name=q10]:checked");
  if (q10 && q10.value === "California") rightAnswer(10); else wrongAnswer(10);

  // score display
  let scoreEl = document.querySelector("#totalScore");
  scoreEl.textContent = `Total Score: ${score}`;

  if (score >= 80) {
    scoreEl.className = "text-success fw-bold";
    document.querySelector("#congratsMessage").textContent =
      "🎉 Congratulations! You passed!";
  } else {
    scoreEl.className = "text-danger fw-bold";
  }

  // attempts
  attempts++;
  localStorage.setItem("total_attempts", attempts);
  document.querySelector("#totalAttempts").textContent =
    `Total Attempts: ${attempts}`;
}

// init display attempts
document.querySelector("#totalAttempts").textContent =
  `Total Attempts: ${attempts}`;