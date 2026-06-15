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
}
];

// Display questions in console for debugging
console.log(questions);

// Select required HTML elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

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
  questionElement.textContent = questions[currentQuestion].question;

  questions[currentQuestion].options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

button.addEventListener("click", () => {

  if (answered) return;

  answered = true;

  if (option === questions[currentQuestion].answer) {
    score++;
    alert("Correct Answer!");
  } else {
    alert("Wrong Answer!");
  }
});

optionsElement.appendChild(button);
  });
}

// Load first question when page opens
showQuestion();

nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  }
});