import icons from "./icons/icons.js";
const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]



//Gets the div.field element ID// 
function getElementID(e) {
    var element = e.target;
    console.log(element.tagName);
    if(element.tagName != "DIV") {
        while (element.tagName != "DIV") {
            element = element.parentElement;
        }
    }
    return element.id;
}


function checkIfThereIsWinner(inputs, player) {
    var inputs = inputs;
    var returningOutput = {
        output: false,
        result:[],
        winner: ""
    }

    if (inputs.length >= 3){
        winningCombinations.forEach(combination => {
            if (returningOutput.result.length != 3) {
                returningOutput.result = [];
                combination.forEach(number => {
                    inputs.forEach(input => {
                        if (number == input) {
                            returningOutput.result.push(number);
                        }
                    })
                })
            }
       });
    }

    if (returningOutput.result.length == 3) {
        console.log(returningOutput.result);
        returningOutput.winner = player;
        returningOutput.output = true;
    } 
    console.log(returningOutput);
    return returningOutput;
}

function winEvent(winner, combination) {
    console.log(combination);
    combination.forEach(number => {
        $(`#${number}`).addClass("winning-combination");
    });

    $(".winner-card").addClass("show").on("click", (e) => {
        playerIndex = 2;
        currentSession.circles = [];
        currentSession.crosses = [];
        $(".field").html("").removeClass("winning-combination");
        $(".winner-card").removeClass("show");
    });

    $(".winner").text(winner);
}


//Player 1 has index not divisible by 2//
//PLayer 2 has index divisible by 2//
var playerIndex = 2;
var currentSession = {
    crosses: [],
    circles: []
}



$(".field").on("click", (e) => {
    var elementID = getElementID(e);
    var icon; 
    var clickedSound;
    var squareID = parseInt(elementID);
    var result;
    var currentPlayer;

    if (playerIndex % 2 == 0) {
        currentPlayer = "Player 1"
        icon = icons.cross;
        clickedSound  = new Audio('./Sounds/mixkit-hard-typewriter-click-1119.wav');
        currentSession.crosses.push(squareID);
        result = checkIfThereIsWinner(currentSession.crosses, currentPlayer);
    } else {
        currentPlayer = "Player 2"
        icon = icons.circle;
        clickedSound  = new Audio('./Sounds/mixkit-modern-click-box-check-1120.wav');
        currentSession.circles.push(squareID);
        result = checkIfThereIsWinner(currentSession.circles, currentPlayer);
    }

    $(`#${elementID}`).html(icon);
    clickedSound.play();

    if (result.output) {
        winEvent(result.winner, result.result);
    } else {
        playerIndex += 1;
    }

})

