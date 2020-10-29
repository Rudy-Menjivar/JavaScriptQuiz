
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

// HTML DOM Var Objects
var mainContent = document.querySelector("#quizContent")

// Declared VARs to create new elements
var newP = document.createElement("p");
var newButton = document.createElement("button");

// Begin timer with button click
startTimer.addEventListener("click", function() {
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
    }
    }, 1000)
    loadNextQuestion(questionIndex);
});

// Display questions and multiple choices to window
function loadNextQuestion(questionIndex) {
    // Clear existing content for both questions & multiple choices
    mainContent.innerHTML = "";
    newP.innerHTML = "";
    // For loop to loop through data in array
    for (var i = 0; i < questionsObject.length; i++) {
        // Loads current question
        var loadNextQuestion = questionsObject[questionIndex].currentQuestion;
        // Loads current multiple choice options
        var multipleChoice = questionsObject[questionIndex].multipleChoices;
        // mainContent will now render questions
        mainContent.textContent = loadNextQuestion;
    }
        // Next multiple choice for each next question
        multipleChoice.forEach(function(newItem) {
            // multChoice presented on window
            var listItem = document.createElement("dd");
            // newItem contains text of multChoice
            listItem.textContent = newItem;
            mainContent.appendChild(newP);
            newP.appendChild(listItem);
            // Correct answer will be compared after click
            listItem.addEventListener("click", (compare));
        })
}

// Compare multChoice clicked with answer
function compare(event) {
    // declared element that triggered event
    var clickedEl = event.target;
    // Create new divs for correct and wrong answers
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newDiv");

    // if correct multChoice is clicked, then..
    if (clickedEl.textContent == questionsObject[questionIndex].answer) {
        score++;
        newDiv.textContent = "Correct! The answer is " + questionsObject[questionIndex].answer;
        console.log(newDiv)
    } else {
        timeLeft = timeLeft - penalty;
        newDiv.textContent = "Wrong! The correct answer is " + questionsObject[questionIndex].answer;
        console.log(newDiv)
    }
    // questionIndex increments through array
    questionIndex++;

    // If no more questions, clear timer
    if (questionIndex >= questionsObject.length) {
        clearInterval(startTimer);
    } else {
        loadNextQuestion(questionIndex);
    }
}