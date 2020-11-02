
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
var timeLeft = 30;
var penalty = 10;

// Global variables
var viewHighScores = document.querySelector("#highScores");
var timerContent = document.querySelector("#timeLeft");
var startTimer = document.querySelector("#startQuiz");

// VAR for HTML DOM
var welcomePage = document.querySelector("#welcomePage");
var multChoice = document.querySelector("#multChoice");
var feedback = document.querySelector("#feedback");
var finalPage = document.querySelector("#finalPage");
var initialsInput = document.querySelector("#initialsInput");

// Declared VARs to create new elements
var newP = document.createElement("p");
newP.setAttribute("id", "newP");

var newH2 = document.createElement("h2");
newH2.setAttribute("id", "newH2");

var newLabel = document.createElement("label");
newLabel.setAttribute("id", "newLabel");

var newInput = document.createElement("input");
newInput.setAttribute("id", "newInput");

// Begin timer with button click
startTimer.addEventListener("click", function() {
    // Hide entire elements for welcome page after click
    welcomePage.style.display = "none";
    // Timer set to seconds with first function to run while time > 0
    startTimer = setInterval(function() {
    if (timeLeft > 0) {
        timeLeft--;
        timerContent.textContent = "Time: " + timeLeft;
        timerContent.style = ("font-weight: bold");
    } else {
        // Clear timer set by setInterval
        clearInterval(startTimer);
        // Change time to this text
        timerContent.textContent = "Time ran out on you!";
        timerContent.style = ("color: red; font-weight: bold");
        endOfQuiz();
    }
    }, 1000)
    nextQuestion();
    // loadNextQuestion(questionIndex);
});

function nextQuestion() {
    // Get current question from questionsObject
    loadNextQuestion = questionsObject[questionIndex];

    // Render question within h2 tag
    var question = document.querySelector("#question");
    // Var gets current question from object
    question.textContent = loadNextQuestion.currentQuestion;

    // Clears previous render
    multChoice.innerHTML = "";

    // Loop over multipleChoices
    loadNextQuestion.multipleChoices.forEach(function(choice, i) {

        // New button per choices
        var choiceB = document.createElement("button");
        choiceB.setAttribute("value", choice);
        choiceB.setAttribute("class", "choiceB");

        // Choices will render by ordered list, or numbered
        choiceB.textContent = i + 1 + ". " + choice;

        // Render multiple choices on window
        multChoice.appendChild(choiceB);

        // Event listener on every choice clicked
        choiceB.onclick = optionClick;
    })
}

function optionClick() {
    // If wrong answer
    if (this.value !== questionsObject[questionIndex].answer) {
        
        // Penalize time with every wrong answer
        timeLeft = timeLeft - penalty

        // But penalized time cannot be less than zero
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        // Render text on wrong answer clicks
        feedback.textContent = "Wrong!";
    } else {
        // Render text on correct answers
        feedback.textContent = "Correct!";
    }
    // Pause 1 second to display feedback text
    feedback.removeAttribute("style");
    setTimeout(function() {
        feedback.style.display = "none";
    }, 1000);
    // Render next question
    questionIndex++;

    // If statement to load next question or end quiz
    if (questionIndex === questionsObject.length) {
        endOfQuiz();
    } else {
        nextQuestion();
    }
}

function endOfQuiz() {
    timerContent.innerHTML = "";
    // Stop timer
    clearInterval(startTimer);

    // Unhide finalPage
    finalPage.removeAttribute("style");

    // Render finalScore to span element
    var finalScore = document.querySelector("#finalScore");
    finalScore.textContent = score + timeLeft;

    // Hide all elements for questionContent div and feedback div
    quizContent.style.display = "none";
    feedback.removeAttribute("style");
    setTimeout(function() {
        feedback.style.display = "none";
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