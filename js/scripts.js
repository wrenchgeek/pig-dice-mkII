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
  var randomPlayer = players[Math.round(Math.random())];
  $("#current-player").text(randomPlayer.name);
  return randomPlayer;
  // return players[Math.round(Math.random())];
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
  disableEndTurnBtn();
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
  enableRollBtn();

  currentPlayer = getRandomPlayer(playerOne, playerTwo);
  setMessage("A new game begins! " + currentPlayer.name + " was randomly selected to start this round.");
}

function disableEndTurnBtn() {
  $("#end-turn").prop('disabled', true);
}

function enableEndTurnBtn() {
  $("#end-turn").prop('disabled', false);
}
function disableRollBtn() {
  $("#roll-dice").prop('disabled', true);
}

function enableRollBtn() {
  $("#roll-dice").prop('disabled', false);
}

function updateBackground(url) {
  $("body").css({"background": "url('./images/" + url + "')", "background-size": "100% 100%"});
}

function rolledOne() {
  switchCurrentPlayer();
  setMessage("Oh no! You rolled a 1, you lose your current points and end your turn. You're up, " + currentPlayer.name + "!");
  disableEndTurnBtn();
  setRandomFailBackground();
  $(".dice-image").effect("shake", {times: 8}, 800);
}

function setRandomFailBackground() {
  var failImages = ["fail1.gif",
                    "fail2.gif",
                    "fail3.gif",
                    "fail4.gif",
                    "fail5.gif",
                    "fail6.gif"];

  updateBackground(failImages[Math.floor(Math.random() * failImages.length)]);
}

$(function() {
  disableEndTurnBtn();

  var variation = NaN;

  $(".dice-result-wrapper *").hide();

  var diceImage = $(".dice-image");
  var diceImage2 =$(".dice-image2");

  $("form#add-players").submit(function(event) {
    event.preventDefault();

    var playerOneName = $("#player-1-name").val();
    var playerTwoName = $("#player-2-name").val();

    playerOne = new Player(playerOneName);
    playerTwo = new Player(playerTwoName);

    // updateTextOnPage(".player-1-name", playerOne.name + "'s score: ");
    // updateTextOnPage(".player-2-name", playerTwo.name + "'s score: ");
    updateTextOnPage(".player-1-name", playerOne.name + "'s");
    updateTextOnPage(".player-2-name", playerTwo.name + "'s");

    $(this).parent().hide();

    variation = $("#variation").val();
    if (variation !== "traditional") {
      $(".dice-result-wrapper").append('<div class="dice-image2"></div>');
      diceImage2 = $(".dice-image2");
    }

    $("#show-game").show();

    currentPlayer = getRandomPlayer(playerOne, playerTwo);

    $("#current-player").text(currentPlayer.name);

    setMessage(currentPlayer.name + " was randomly selected to go first. Good luck!");
  });

  $("#roll-dice").click(function() {
    updateBackground("");
    clearMessage();
    enableEndTurnBtn();

    var diceResult = Math.floor(Math.random() * 6) + 1;
    currentRoundScores.push(diceResult);

    $("#current-round-score").text(getCurrentRoundScore());

    diceImage.removeClass().addClass("dice");

    if (diceResult === 1) {
      diceImage.addClass("dice-one");
      rolledOne();
    } else if (diceResult === 2) {
      diceImage.addClass("dice-two");
    } else if (diceResult === 3) {
      diceImage.addClass("dice-three");
    } else if (diceResult === 4) {
      diceImage.addClass("dice-four");
    } else if (diceResult === 5) {
      diceImage.addClass("dice-five");
    } else if (diceResult === 6) {
      diceImage.addClass("dice-six");
    }

    if (variation !== "traditional") {
      diceResult = Math.floor(Math.random() * 6) + 1;

      currentRoundScores.push(diceResult);

      $("#current-round-score").text(getCurrentRoundScore());
      diceImage2.removeClass().addClass("dice");

      if (diceResult === 1) {
        diceImage2.addClass("dice-one");
        rolledOne();
      } else if (diceResult === 2) {
        diceImage2.addClass("dice-two");
      } else if (diceResult === 3) {
        diceImage2.addClass("dice-three");
      } else if (diceResult === 4) {
        diceImage2.addClass("dice-four");
      } else if (diceResult === 5) {
        diceImage2.addClass("dice-five");
      } else if (diceResult === 6) {
        diceImage2.addClass("dice-six");
      }

    }

    $(".dice-result-wrapper *").show();

  });

  $("#end-turn").click(function() {
    setMessage("Nice work! " + currentPlayer.name + " just gained " +
      getCurrentRoundScore() + " points.");
    currentPlayer.score += getCurrentRoundScore();

    updatePlayerScores();

    $(".dice-result-wrapper *").hide();

    if (currentPlayer.score >= 20) {
    // if (currentPlayer.score >= 100) {
      setMessage("Congratulations " + currentPlayer.name + "! You win!");
      $("#message").append("<span class='clear-scores linkify'> Click here to play again!</span>");

      updateBackground("success1.gif");
      disableRollBtn();

      $(".clear-scores").click(function() {
        resetGame();
      });
    }
    switchCurrentPlayer();
  });

});
