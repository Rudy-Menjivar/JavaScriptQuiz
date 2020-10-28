
// Array of questions with choices and correct answers
var questions = [
    {
        currentQuestion: 'What is not true about the Constant JavaScript statement?',
        multipleChoices: {
            a: 'Const behave much like let variables',
            b: 'Const variables must be assigned a value whe they are declared',
            c: 'Constants values cannot include a function expression',
            d: 'Constant objects can change, but you cannot reassign a constant object',
        },
        answer: 'c'
    },
    {
        currentQuestion: 'What is true about JavaScript Loops?',
        multipleChoices: {
            a: 'Loops can execute a block of code a limited number of times',
            b: 'for/in - loops through the properties of any object',
            c: 'for/if - loops through the values of iterable objects',
            d: 'do/while - also loops through a block of code while a specified condition is false',
        },
        answer: 'b'
    },
    {
        currentQuestion: 'Which of the following value returns 5?',
        multipleChoices: {
            a: 'Math.floor(1.5);;',
            b: 'Math.ceil(4.4);',
            c: 'Math.sin(5 * Math.PI / 1);',
            d: 'Math.min(5, 25, 125, 625, -200);',
        },
        answer: 'b'
    },
    {
        currentQuestion: 'Which of the following is not true?',
        multipleChoices: {
            a: 'Use if to specify a block of code to be executed, if a specified condition is true',
            b: 'Use switch to specify many alternative blocks of code to be executed',
            c: 'Use else if to specify a new condition to test, if the first condition is true',
            d: 'Use else to specify a block of code to be executed, if the same condition is false',
        },
        answer: 'c'
    },
    {
        currentQuestion: 'Which of the following is not true about JavaScript outputs?',
        multipleChoices: {
            a: 'Writing into an HTML element, using innerHTML',
            b: 'Writing into the HTML output using the document.write()',
            c: 'The id attribute defines the HTML element',
            d: 'Using document.write() after the HTML document is loaded, will keep all existing HTML',
        },
        answer: 'd'
    },
]

// Global variables
var viewHighScores = document.querySelector("#highScores");
var timerContent = document.querySelector("#timeLeft");
var startTimer = document.querySelector("#startQuiz");

// HTML DOM Var Objects
var mainContent = document.querySelector("#quizContent")

// Starting score, starting time, penalty and question index
var score = 0;
var timeLeft = 6;
var penalty = 15;
var questionIndex = 0;

// Declared VARs to create new elements
var newP = document.createElement("p");
var newButton = document.createElement("button");

// Begin timer with button click
startTimer.addEventListener("click", function() {
    // Timer set to seconds with first function to run while time > 0
    startTimer = setInterval(function() {
    if (timeLeft > 0) {
        timeLeft--
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
})

// Display questions and multiple choices to window
function loadNextQuestion(questionIndex) {
    // Clear existing content for both questions & multiple choices
    mainContent.innerHTML = "";
    newP.innerHTML = "";
    // For loop to loop through data in array
    for (var i = 0; i < questions.length; i++) {
        console.log(i)
    }
}