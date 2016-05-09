console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

///set up game array
///set up players and how they take a turn.
///

var playerOne = ["Player 1", 0]; ///name and score
var playerTwo = ["Player 2", 0]; ///name and score

var rowOneInput = ["_","_","_"];
var rowOneValues = [1,2,4];

var rowTwoInput = ["_","_","_"];
var rowTwoValues = [8,16,32];

var rowThreeInput = ["_","_","_"];
var rowThreeValues = [64,128,256];

var winningScores = [7,56,448,73,146,292,273,84]

var allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput];
var allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues];

var checkWhoWon = function(player){
	for (var i = 0; i < winningScores.length; i++) {
		if (player[1] === winningScores[i])
		{
			console.log(player[0]+" won!");
		}
	}
};

var playerOneScoreMove = function(rowNum,colNum,letter){
	if (allInputsArray[rowNum][colNum] === "_"){
		allInputsArray[rowNum].splice(colNum,1,letter);
	}
	console.table(allInputsArray);
	playerOne[1] = playerOne[1] + (allValuesArray[rowNum][colNum]);
	console.log(playerOne[0]+" current score is: "+playerOne[1]);
	checkWhoWon(playerOne);
};

playerOneScoreMove(2,2,"X");
playerOneScoreMove(1,1,"X");
playerOneScoreMove(0,0,"X");
