const questions = [
  {
    question: "What does JS stand for?",
    options: [
      "JavaScript",
      "Java Source",
      "Just Script",
      "Java System"
    ],
    answer: "JavaScript"
  },

  {
  question: "Which keyword is used to declare a variable?",
  options: [
    "let",
    "print",
    "show",
    "echo"
  ],
  answer: "let"
},

{
  question: "What is JavaScript?",
  options: [
    "A compiled programming language",
    "A lightweight, interpreted scripting language",
    "A database query language",
    "A markup language"
  ],
  answer: "A lightweight, interpreted scripting language"
},

{
  question: "What is the output of typeof null?",
  options: [
    "null",
    "undefined",
    "object",
    "boolean"
  ],
  answer: "object"
},

{
  question: "Which of the following is NOT a JavaScript data type?",
  options: [
    "String",
    "Boolean",
    "Float",
    "Symbol"
  ],
  answer: "Float"
},

{
  question: "What does === mean in JavaScript?",
  options: [
    "Assignment",
    "Loose equality",
    "Strict equality (value and type)",
    "Not equal"
  ],
  answer: "Strict equality (value and type)"
},

{
  question: "What is a closure in JavaScript?",
  options: [
    "A way to close the browser",
    "A function that retains access to its outer scope",
    "A method to end a loop",
    "A type of error"
  ],
  answer: "A function that retains access to its outer scope"
},

{
  question: "What does the this keyword refer to in JavaScript?",
  options: [
    "The previous function",
    "The global object always",
    "The object the function belongs to",
    "The parent class"
  ],
  answer: "The object the function belongs to"
},

{
  question: "Which method removes the last element from an array?",
  options: [
    "shift()",
    "unshift()",
    "pop()",
    "splice()"
  ],
  answer: "pop()"
},

{
  question: "What is the purpose of use strict?",
  options: [
    "Enables ES6 features",
    "Enforces stricter parsing and error handling",
    "Disables console.log",
    "Forces synchronous execution"
  ],
  answer: "Enforces stricter parsing and error handling"
}
];

// Shuffle questions randomly
questions.sort(() => Math.random() - 0.5);

// Display questions in console for debugging
console.log(questions);

// Select required HTML elements
const questionElement = document.getElementById("question");
const questionCounter = document.getElementById("question-counter");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");

// Track current question index
let currentQuestion = 0;

// Track user score
let score = 0;

// Track whether current question is already answered
let answered = false;

// Display the current question and options
function showQuestion() {
  answered = false;
  optionsElement.innerHTML = "";
  questionCounter.textContent =
  `Question ${currentQuestion + 1}/${questions.length}`;
  questionElement.textContent = questions[currentQuestion].question;

  questions[currentQuestion].options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

button.addEventListener("click", () => {

  if (answered) return;

  answered = true;

  const buttons = optionsElement.querySelectorAll("button");

  buttons.forEach(btn => btn.disabled = true);
  
  if (option === questions[currentQuestion].answer) {
  score++;
  button.classList.add("correct");
} else {
  button.classList.add("wrong");

  const buttons = optionsElement.querySelectorAll("button");

  buttons.forEach(btn => {
    if (btn.textContent === questions[currentQuestion].answer) {
      btn.classList.add("correct");
    }
  });
}
});

optionsElement.appendChild(button);
  });
}

// Load first question when page opens
//showQuestion();

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizBox.style.display = "block";

  showQuestion();
});

nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    const percentage =
  Math.round((score / questions.length) * 100);

  let message = "";

if (percentage >= 80) {
  message = "Excellent!";
} else if (percentage >= 60) {
  message = "Good Job!";
} else {
  message = "Needs Improvement!";
}

    document.getElementById("quiz-box").innerHTML = `
  <h2>Quiz Completed!</h2>
  <p>Score: ${score}/${questions.length}</p>
  <p>Percentage: ${percentage}%</p>
  <h3>${message}</h3>
  <button onclick="location.reload()">Restart Quiz</button>
`;
  }
});