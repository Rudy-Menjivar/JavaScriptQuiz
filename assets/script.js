
// Array of questions with choices and correct answers
var questionsObject = [
    {
        currentQuestion: 'True or False? Constant values cannot include a function expression.',
        multipleChoices: ['True', 'False'],
        answer: 'False'
    },
    {
        currentQuestion: 'What is true about JavaScript Loops?',
        multipleChoices: [
            'Loops can execute a block of code a limited number of times',
            'for/in - loops through the properties of any object',
            'for/if - loops through the values of iterable objects',
            'do/while - also loops through a block of code while a specified condition is false'],
        answer: 'for/in - loops through the properties of any object'
    },
    {
        currentQuestion: 'True or False? Use else if to specify a new condition to test, if the first condition is true.',
        multipleChoices: ['True', 'False'],
        answer: 'False'
    },
    {
        currentQuestion: 'True or False? Using document.write() after the HTML document is loaded, will keep all existing HTML',
        multipleChoices: ['True', 'False'],
        answer: 'False'
    },
]

// Starting score, starting time, penalty and question index
var score = 0;
var questionIndex = 0;
var timeLeft = questionsObject.length * 10;
var penalty = 15;

// Global variables
var timerContent = document.querySelector("#timeLeft");
var startTimer = document.querySelector("#startQuiz");

// VAR for HTML DOM
var welcomePage = document.querySelector("#welcomePage");
var multChoice = document.querySelector("#multChoice");
var feedback = document.querySelector("#feedback");
var finalPage = document.querySelector("#finalPage");
var initialsInput = document.querySelector("#initialsInput");

// Begin timer with button click
startTimer.addEventListener("click", function() {
    welcomePage.style.display = "none"; // Hide entire elements for welcome page after click
    // Timer set to seconds with first function to run while time > 0
    startTimer = setInterval(function() {
    if (timeLeft > 0) {
        timeLeft--;
        timerContent.textContent = "Time: " + timeLeft;
        timerContent.style = ("font-weight: bold");
    } else {
        timeRanOut();
    }
    }, 1000)
    nextQuestion(); // loadNextQuestion(questionIndex);
});

function nextQuestion() {
    loadNextQuestion = questionsObject[questionIndex]; // Get current question from questionsObject
    var question = document.querySelector("#question"); // Render question within h3 tag
    question.textContent = loadNextQuestion.currentQuestion; // Get next question from object
    multChoice.innerHTML = ""; // Clears previous render
    // Loop over multipleChoices
    loadNextQuestion.multipleChoices.forEach(function(choice, i) {
        // New button per choices
        var choiceB = document.createElement("button");
        choiceB.setAttribute("value", choice);
        choiceB.setAttribute("class", "choiceB");
        // Choices will render by ordered list, or numbered
        choiceB.textContent = i + 1 + ". " + choice;
        multChoice.appendChild(choiceB); // Append multiple choices to buttons
        choiceB.onclick = optionClick; // Event listener on every choice clicked
    })
}

function optionClick() {
    // If wrong answer, then penalize time left
    if (this.value !== questionsObject[questionIndex].answer) {
        timeLeft = timeLeft - penalty // Penalize time with every wrong answer
        // Penalized time cannot be less than zero
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        feedback.textContent = "Wrong!"; // Render text on wrong answer clicks
    } else {
        feedback.textContent = "Correct!"; // Render text on correct answers
    }
    feedback.removeAttribute("style"); // Reveal feedback text for 1 second
    setTimeout(function() {
        feedback.style.display = "none";
    }, 1000);
    questionIndex++; // Onto next question
    // If no more questions then end quiz, or load next
    if (questionIndex === questionsObject.length) {
        endOfQuiz();
    } else {
        nextQuestion();
    }
}
// Display text if time runs out
function timeRanOut() {
    timerContent.textContent = "Time ran out on you!";
    timerContent.style = ("color: red; font-weight: bold");
    setTimeout(function() {
    timerContent.style.display = "none";
    }, 2000);
    endOfQuiz()
}

function endOfQuiz() {
    clearInterval(startTimer); // Stop timer
    finalPage.removeAttribute("style"); // Unhide finalPage
    var finalScore = document.querySelector("#finalScore");
    finalScore.textContent = score + timeLeft; // Render final score
    quizContent.style.display = "none"; // Hide questionContent & feedback
    feedback.removeAttribute("style");
    setTimeout(function() {
        feedback.style.display = "none";
        timerContent.innerHTML = "";
    }, 1000);
}

function saveScore() {
    // get data from initialsInput id
    var initials = initialsInput.value.trim();
    // Score will be higher if there's more time left + correct answers
    var finalScore = timeLeft + score;
    // If statement, if initials aren't empty
    if (initials !== "") {
    // Get saved scores, if none, set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // New score object for score and initials
    var newScore = {
        score: finalScore,
        initials: initials
    };
    // Save input data to localStorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // window highscores redirect
    window.location.href = "highscores.html";
    }
    else {
        alert("Enter initials to continue")
    }
}
// Submit score with enter key function
function key13(event) {
    if (event.key === "Enter") {
        saveScore();
    }
}
// Save score if submit button is clicked
submitButton.onclick = saveScore;
// Listen for enter key, so enter function fires
initialsInput.onkeyup = key13;