console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

///set up game array
///set up players and how they take a turn.
///

var playerOne = 0; ///score
var playerTwo = 0; ///score

var rowOneInput = ["_","_","_"];
var rowOneValues = [1,2,4];

var rowTwoInput = ["_","_","_"];
var rowTwoValues = [8,16,32];

var rowThreeInput = ["_","_","_"];
var rowThreeValues = [64,128,256];

var winningScores = [7,56,448,73,146,292,273,84]

var allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput];
var allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues];


var playerOneMove = function(rowNum,colNum,letter){
	if (allInputsArray[rowNum][colNum] === "_"){
		allInputsArray[rowNum].splice(colNum,1,letter);
	};
	console.table(allInputsArray);
	playerOne = playerOne + (allValuesArray[rowNum][colNum]);
	console.log(playerOne);
	for (var i = 0; i < winningScores.length; i++) {
		if (playerOne === winningScores[i])
		{
			console.log('playerOne wins!!!');
		}
	}
};

playerOneMove(2,0,"X");
playerOneMove(1,0,"X");
playerOneMove(0,0,"X");
