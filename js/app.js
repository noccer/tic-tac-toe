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

var winningScores = [7,56,448,73,146,292,273,84];
var playerScoreThisRound = 0;

var allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput];
var allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues];

var playerMove = function(player, rowNum,colNum,letter){
	if (allInputsArray[rowNum][colNum] === "_"){
		allInputsArray[rowNum].splice(colNum,1,letter);
	}
	console.table(allInputsArray);
	player[1] = player[1] + (allValuesArray[rowNum][colNum]);
	playerScoreThisRound = (allValuesArray[rowNum][colNum])
	console.log(player[0]+" current score is: "+player[1]);
	checkWhoWon(player);
};

var checkWhoWon = function(player){
	for (var i = 0; i < winningScores.length; i++) {
		if ((player[1] & winningScores[i]) === winningScores[i])
		{
			console.log(player[0]+" won!");
		}
		playerScoreThisRound = 0;
	}
};

playerMove(playerOne,0,0,"X");
// playerMove(playerTwo,0,1,"O");
playerMove(playerOne,0,2,"X");
// playerMove(playerTwo,1,0,"O");
playerMove(playerOne,1,1,"X");
// playerMove(playerTwo,1,2,"O");
// playerMove(playerOne,2,0,"X");
playerMove(playerTwo,2,2,"O");
playerMove(playerTwo,2,1,"O");
playerMove(playerTwo,2,0,"O");
