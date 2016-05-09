console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

///set up game array
///set up players and how they take a turn.
///

var playerOne;
var playerTwo;

var rowOneInput = ["_","_","_"];
var rowOneValues = [1,2,4];

var rowTwoInput = ["_","_","_"];
var rowTwoValues = [8,16,32];

var rowThreeInput = ["_","_","_"];
var rowThreeValues = [64,128,256];

var allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput];

var makeMove = function(rowNum,colNum, letter){
	console.log(allInputsArray[rowNum][colNum]);
	if (allInputsArray[rowNum][colNum] === "_"){
	allInputsArray[rowNum].splice(colNum,1,letter);
	};
	console.table(allInputsArray);
};

makeMove(1,1,"X");
makeMove(0,0,"O");
makeMove(1,1,"X");
makeMove(1,1,"X");
makeMove(1,1,"X");
