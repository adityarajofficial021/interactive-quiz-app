// Store all quiz questions, options, and correct answers
const questions = [
  {
    // First question object
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
    // Second question object
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
    // Third question object
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
    // Fourth question object
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
    // Fifth question object
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
    // Sixth question object
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
    // Seventh question object
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
    // Eighth question object
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
    // Ninth question object
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
    // Tenth question object
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

// Randomly shuffle the questions
questions.sort(() => Math.random() - 0.5);

// Print shuffled questions for debugging
console.log(questions);

// Get all required HTML elements
const questionElement = document.getElementById("question");
const questionCounter = document.getElementById("question-counter");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const progressBar = document.getElementById("progress-bar");
const themeButton = document.getElementById("theme-btn");

// Store the current question index
let currentQuestion = 0;

// Store the user's score
let score = 0;

// Store quiz start time
let startTime;

// Prevent multiple answers for one question
let answered = false;

// Display the current question and its options
function showQuestion() {

  // Reset answer status
  answered = false;

  // Clear old option buttons
  optionsElement.innerHTML = "";

  // Update question counter
  questionCounter.textContent =
    `Question ${currentQuestion + 1}/${questions.length}`;

  // Calculate quiz progress
  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  // Update progress bar width
  progressBar.style.width = `${progress}%`;

  // Display current question
  questionElement.textContent = questions[currentQuestion].question;

  // Create buttons for all options
  questions[currentQuestion].options.forEach(option => {

    // Create a new button
    const button = document.createElement("button");

    // Set option text
    button.textContent = option;

    // Check answer when button is clicked
    button.addEventListener("click", () => {

      // Ignore extra clicks
      if (answered) return;

      // Mark question as answered
      answered = true;

      // Get all option buttons
      const buttons = optionsElement.querySelectorAll("button");

      // Disable all buttons
      buttons.forEach(btn => btn.disabled = true);

      // Check if selected answer is correct
      if (option === questions[currentQuestion].answer) {

        // Increase score
        score++;

        // Highlight correct answer
        button.classList.add("correct");

      } else {

        // Highlight wrong answer
        button.classList.add("wrong");

        // Find all buttons again
        const buttons = optionsElement.querySelectorAll("button");

        // Highlight the correct answer
        buttons.forEach(btn => {
          if (btn.textContent === questions[currentQuestion].answer) {
            btn.classList.add("correct");
          }
        });
      }
    });

    // Add button to options container
    optionsElement.appendChild(button);
  });
}

// Load first question manually if needed
// showQuestion();

// Start quiz when Start button is clicked
startButton.addEventListener("click", () => {

  // Hide welcome screen
  startScreen.style.display = "none";

  // Show quiz section
  quizBox.style.display = "block";

  // Record quiz start time
  startTime = Date.now();

  // Display first question
  showQuestion();
});

// Move to next question
nextButton.addEventListener("click", () => {

  // Increase question index
  currentQuestion++;

  // Check if questions are remaining
  if (currentQuestion < questions.length) {

    // Display next question
    showQuestion();

  } else {

    // Record quiz end time
    const endTime = Date.now();

    // Calculate total time in seconds
    const timeTaken =
      Math.floor((endTime - startTime) / 1000);

    // Calculate minutes
    const minutes =
      Math.floor(timeTaken / 60);

    // Calculate remaining seconds
    const seconds =
      timeTaken % 60;

    // Calculate score percentage
    const percentage =
      Math.round((score / questions.length) * 100);

    // Store result message
    let message = "";

    // Decide message based on score
    if (percentage >= 80) {
      message = "Excellent!";
    } else if (percentage >= 60) {
      message = "Good Job!";
    } else {
      message = "Needs Improvement!";
    }

    // Display final result screen
    document.getElementById("quiz-box").innerHTML = `
      <div class="result-screen">
        <h2>🎉 Quiz Completed!</h2>

        <h3 class="result-message">${message}</h3>

        <div class="result-percentage">
          ${percentage}%
        </div>

        <p class="result-score">
          Score: ${score}/${questions.length}
        </p>

        <p class="result-time">
          Time Taken: ${minutes}m ${seconds}s
        </p>

        <button onclick="location.reload()" class="restart-btn">
          Try Again
        </button>
      </div>
    `;
  }
});
// Check saved theme
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Light Mode";
}

// Toggle theme
themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeButton.textContent = "☀️ Light Mode";
        localStorage.setItem("theme","dark");
    }else{
        themeButton.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme","light");
    }

});