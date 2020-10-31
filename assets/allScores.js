// Global Variables
var newOl = document.querySelector("#highScores");
var newLi = document.createElement("li");


// create elements to store and add new scores
function renderHighScores() {
    // get scores from local storage or an empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort highscores
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        // li tag will list last score with initials
        newLi.textContent = score.initials + " - " + score.score;
        
        
    })
}


// create a Clear High Scores button
