
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
var mainContent = document.querySelector("#quizContent");
var subContent = document.querySelector("#subContent");

// Declared VARs to create new elements
var newP = document.createElement("p");
newP.setAttribute("id", "newP");

var newButton = document.createElement("button");
newButton.setAttribute("type", "submit");
newButton.setAttribute("id", "newButton");
newButton.setAttribute("class", "btn btn-primary");
newButton.textContent = "Submit";

var newH2 = document.createElement("h2");
newH2.setAttribute("id", "newH2");

var newLabel = document.createElement("label");
newLabel.setAttribute("id", "newLabel");

var newInput = document.createElement("input");
newInput.setAttribute("id", "newInput");

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
        newDiv.style = ("color: blue; font-weight: bold");
    } else {
        timeLeft = timeLeft - penalty;
        newDiv.textContent = "Wrong! The correct answer is " + questionsObject[questionIndex].answer;
        newDiv.style = ("color: red; font-weight: bold");
    }
    // questionIndex increments through array
    questionIndex++;

    // If no more questions, end quiz, clear timer & report score
    if (questionIndex >= questionsObject.length) {
        endOfQuiz();
        clearInterval(startTimer);
        newDiv.textContent = "Quiz has ended! " + "You got " + score + " out of " + questionsObject.length + " correct!";
        newDiv.style = ("color: green; font-weight: bold");
    } else {
        loadNextQuestion(questionIndex);
    }
    // Append newDiv textContent to the quizContent div
    mainContent.appendChild(newDiv);
}
// At end of quiz, clear mainContent and timerContent
function endOfQuiz() {
    mainContent.innerHTML = "";
    timerContent.innerHTML = "";
    // Append & render All Done to the quizContent div 
    mainContent.appendChild(newH2);
    newH2.textContent = "All done!";

// Calculates final score + leftTime & appends to mainContent
    if (timeLeft >=0) {
        var finalScore = score + timeLeft;
        clearInterval(startTimer);
        newP.textContent = "Your final score is: " + finalScore;
        subContent.appendChild(newP);
        newP.style = ("font-weight: bold");
    } else {
        var finalScore = score
        clearInterval(startTimer);
        newP.textContent = "Your final score is: " + score;
        subContent.appendChild(newP);
        newP.style = ("font-weight: bold");
    }
    // newLabel created to prompt for initials
    newLabel.textContent = "Enter initials: "
    subContent.appendChild(newLabel);
    // newInput created to enter initials
    newInput.placeholder = "Your initials"
    subContent.appendChild(newInput);
    // newButton added to for saving data
    subContent.appendChild(newButton);

    // added button click addEventListener 
    newButton.addEventListener("click", function(event){
        // preventDefault added to prevent a page refresh
        event.preventDefault();
    })
}