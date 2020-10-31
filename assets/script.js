
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
var initials = document.querySelector("#initials");
// var mainContent = document.querySelector("#quizContent");
// var subContent = document.querySelector("#subContent");

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
    // Hide welcome page after click
    welcomePage.style.visibility = "hidden";
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
    feedback.setAttribute("class", "feedback");
    setTimeout(function() {
        feedback.setAttribute("class", "feedback hide");
    }, 1000);
}

// Display questions and multiple choices to window
// function loadNextQuestion(questionIndex) {
//     // Clear existing content for both questions & multiple choices
//     mainContent.innerHTML = "";
//     newP.innerHTML = "";
//     // For loop to loop through data in array
//     for (var i = 0; i < questionsObject.length; i++) {
//         // Loads current question
//         var loadNextQuestion = questionsObject[questionIndex].currentQuestion;
//         // Loads current multiple choice options
//         var multipleChoice = questionsObject[questionIndex].multipleChoices;
//         // mainContent will now render questions
//         mainContent.textContent = loadNextQuestion;
//     }
//         // Next multiple choice for each next question
//         multipleChoice.forEach(function(newItem) {
//             // multChoice presented on window
//             var listItem = document.createElement("dd");
//             // newItem contains text of multChoice
//             listItem.textContent = newItem;
//             mainContent.appendChild(newP);
//             newP.appendChild(listItem);
//             // Correct answer will be compared after click
//             listItem.addEventListener("click", (compare));
//         })
// }

// Compare multChoice clicked with answer
// function compare(event) {
//     // declared element that triggered event
//     var clickedEl = event.target;
//     // Create new divs for correct and wrong answers
//     var newDiv = document.createElement("div");
//     newDiv.setAttribute("id", "newDiv");

//     // if correct multChoice is clicked, then..
//     if (clickedEl.textContent == questionsObject[questionIndex].answer) {
//         score++;
//         // newDiv.textContent = "Correct! The answer is " + questionsObject[questionIndex].answer;
//         // newDiv.style = ("color: blue; font-weight: bold");
//     } else {
//         timeLeft = timeLeft - penalty;
//         // newDiv.textContent = "Wrong! The correct answer is " + questionsObject[questionIndex].answer;
//         // newDiv.style = ("color: red; font-weight: bold");
//     }
//     // questionIndex increments through array
//     questionIndex++;

//     // If no more questions, end quiz, clear timer & report score
//     if (questionIndex >= questionsObject.length) {
//         endOfQuiz();
//         clearInterval(startTimer);
//         // newDiv.textContent = "Quiz has ended! " + "You got " + score + " out of " + questionsObject.length + " correct!";
//         // newDiv.style = ("color: green; font-weight: bold");
//     } else {
//         loadNextQuestion(questionIndex);
//     }
//     // Append newDiv textContent to the quizContent div
//     mainContent.appendChild(newDiv);
// }
// At end of quiz, clear mainContent and timerContent
function endOfQuiz() {
    // mainContent.innerHTML = "";
    timerContent.innerHTML = "";
    // Append & render All Done to the quizContent div 
    // mainContent.appendChild(newH2);
    // newH2.textContent = "All done!";

    // Unhide finalPage
    finalPage.removeAttribute("style");

    // Render finalScore to span element
    var finalScore = document.querySelector("#finalScore");
    finalScore.textContent = score + timeLeft;

// Calculates final score + leftTime & appends to mainContent
    // if (timeLeft >=0) {
    //     var finalScore = score + timeLeft;
    //     clearInterval(startTimer);
    //     newP.textContent = "Your final score is: " + finalScore;
    //     subContent.appendChild(newP);
    //     newP.style = ("font-weight: bold");
    // } else {
    //     var finalScore = score
    //     clearInterval(startTimer);
    //     newP.textContent = "Your final score is: " + score;
    //     subContent.appendChild(newP);
    //     newP.style = ("font-weight: bold");
    // }
}
    // newLabel created to prompt for initials
    // newLabel.textContent = "Enter initials: "
    // subContent.appendChild(newLabel);
    // newInput created to enter initials
    // newInput.placeholder = "Your initials"
    // subContent.appendChild(newInput);

    // newButton added to for saving data
    // subContent.appendChild(newButton);

    // added button click addEventListener 
    // newButton.addEventListener("click", function(event){

        // initals declared with newInput element
        // var initials = {
        //     enterInitials: newInput.value.trim(),
        // }

        // validate data to require input
        // if (initials.enterInitials === "") {
        //     alert("Initials cannot be blank");
        // } else {
            // Declared userScore object with initials and score
    //         var userScore = {
    //             initials: initials,
    //             score: finalScore
    //         };
    //         console.log(userScore);
    //     }
    // })