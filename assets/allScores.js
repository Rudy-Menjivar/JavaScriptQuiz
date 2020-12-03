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
        var newLi = document.createElement("li");
        newLi.textContent = score.initials + " - " + score.score;    
        // Append new li tag to OL highScores
        var scoresOL = document.querySelector("#highScores");
        scoresOL.appendChild(newLi);
    });
}
// Clear high scores with function
function clearHighScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}
// Clear High Scores with onclick (and function)
document.querySelector("#clearHighScores").onclick = clearHighScores;

renderHighScores(); // Run renderHighScores when page loads