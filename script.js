// Example quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Paris", "Berlin"],
    correct: 1
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5"],
    correct: 1
  },
  {
    question: "What is the capital of Germany?",
    answers: ["Munich", "Berlin", "Hamburg"],
    correct: 1
  }
];

const progress = document.getElementById('progress');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const resultContainer = document.getElementById('result-container');
const scoreEl = document.getElementById('score');
const replayBtn = document.getElementById('replay-btn');

let current = 0;
let score = 0;

function showQuestion() {
  const currentData = quizData[current];
  questionEl.textContent = currentData.question;
  answersEl.innerHTML = "";
  feedbackEl.textContent = "";

  currentData.answers.forEach((answer, i) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="answer" value="${i}"> ${answer}`;
    answersEl.appendChild(label);
  });

  updateProgress();
}

function updateProgress() {
  const percent = ((current) / quizData.length) * 100;
  progress.style.width = `${percent}%`;
}

nextBtn.onclick = () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    feedbackEl.textContent = "Please select an answer!";
    return;
  }
  if (parseInt(selected.value) === quizData[current].correct) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Incorrect.";
  }

  current++;

  if (current < quizData.length) {
    setTimeout(showQuestion, 500);
  } else {
    showResult();
  }
};

function showResult() {
  questionEl.style.display = "none";
  answersEl.style.display = "none";
  nextBtn.style.display = "none";
  feedbackEl.style.display = "none";
  progress.style.width = "100%";

  scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
  resultContainer.style.display = "block";
}

replayBtn.onclick = () => {
  // Reset state
  current = 0;
  score = 0;
  resultContainer.style.display = "none";
  questionEl.style.display = "";
  answersEl.style.display = "";
  nextBtn.style.display = "";
  feedbackEl.style.display = "";
  showQuestion();
};

showQuestion();
