// Global Variables
var newOl = document.querySelector("#highScores");
var newLi = document.createElement("li");


// create elements to store and add new scores
function renderHighScores() {
    // get scores from local storage or an empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

}


// create a Clear High Scores button
