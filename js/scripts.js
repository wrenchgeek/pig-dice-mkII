var playerOne          = null;
var playerTwo          = null;
var currentPlayer      = null;
var currentRoundScores = [];

function Player(name) {
  this.name = name;
  this.score = 0;
}

function getCurrentRoundScore() {
  var total = 0;

  currentRoundScores.forEach(function(score) {
    total += score;
  });

  return total;
}

function updatePlayerScores() {
  updateTextOnPage("#player-1-score", playerOne.score);
  updateTextOnPage("#player-2-score", playerTwo.score);
}

function updateRoundScore() {
  $("#current-round-score").text(getCurrentRoundScore());
}

function getRandomPlayer(playerOne, playerTwo) {
  var players = [playerOne, playerTwo];
  return players[Math.round(Math.random())];
}

function switchCurrentPlayer() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
  } else {
    currentPlayer = playerOne;
  }
  $("#current-player").text(currentPlayer.name);

  currentRoundScores = [];

  updateRoundScore();
}

function setMessage(message) {
  $("#message").text(message);
}

function clearMessage() {
  setMessage("");
}

function updateTextOnPage(selector, text) {
  $(selector).text(text);
}

function resetGame() {
  playerOne.score = 0;
  playerTwo.score = 0;
  updatePlayerScores();

  currentPlayer = getRandomPlayer(playerOne, playerTwo);
  setMessage("A new game begins! " + currentPlayer.name + " was randomly selected to start this round.");
}

$(function() {

  $("form#add-players").submit(function(event) {
    event.preventDefault();

    var playerOneName = $("#player-1-name").val();
    var playerTwoName = $("#player-2-name").val();

    playerOne = new Player(playerOneName);
    playerTwo = new Player(playerTwoName);

    updateTextOnPage(".player-1-name", playerOne.name);
    updateTextOnPage(".player-2-name", playerTwo.name);

    $(this).parent().hide();
    $("#show-game").show();

    currentPlayer = getRandomPlayer(playerOne, playerTwo);

    $("#current-player").text(currentPlayer.name);

    setMessage(currentPlayer.name + " was randomly selected to go first. Good luck!");
  });

  $("#roll-dice").click(function() {
    clearMessage();
    var diceResult = Math.floor(Math.random() * (7 - 1)) + 1;

    currentRoundScores.push(diceResult);

    $("#current-round-score").text(getCurrentRoundScore());

    $(".dice-result").text(diceResult);

    if (diceResult === 1) {
      switchCurrentPlayer();
      setMessage("Oh no! You rolled a 1, you lose your current points and end your turn.")
    }
  });

  $("#end-turn").click(function() {
    setMessage("Nice work! " + currentPlayer.name + " just gained " +
      getCurrentRoundScore() + " points.");
    currentPlayer.score += getCurrentRoundScore();

    updatePlayerScores();

    if (currentPlayer.score >= 100) {
      setMessage("Congratulations " + currentPlayer.name + "! You win!");
      $("#message").append("<span class='clear-scores linkify'> Click here to play again!</span>");

      $(".clear-scores").click(function() {
        resetGame();
      });
    }
    switchCurrentPlayer();
  });

});
