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
  }
];

// Display questions in console for debugging
console.log(questions);

// Select required HTML elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

// Track current question index
let currentQuestion = 0;

// Display the current question and options
function showQuestion() {
  questionElement.textContent = questions[currentQuestion].question;

  questions[currentQuestion].options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    optionsElement.appendChild(button);
  });
}

// Load first question when page opens
showQuestion();