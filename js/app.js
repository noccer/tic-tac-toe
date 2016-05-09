$(function() {
console.log( "jQuery ready!" )

console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

///set up game array
///set up players and how they take a turn.
///

var gridSize = 3; ///this will determine the grid size

var playerOne = ["Player 1", 0, "X"]; ///name, score & symbol
var playerTwo = ["Player 2", 0, "O"]; ///name, score & symbol

var defaultBlankSymbol = "_";
var defaultBlankSymbolString = "";
var createDefaultBlankSymbolString = function(){
	for (var i = 0; i < gridSize; i++) {
		defaultBlankSymbolString+=defaultBlankSymbol;
	}
};
createDefaultBlankSymbolString();

///manually inputting rows for now, but hope to make these automatic
var rowOneInput = defaultBlankSymbolString.split("");
var rowOneValues = [1,2,4];

var rowTwoInput = defaultBlankSymbolString.split("");
var rowTwoValues = [8,16,32];

var rowThreeInput = defaultBlankSymbolString.split("");
var rowThreeValues = [64,128,256];

var winningScores = [7,56,448,73,146,292,273,84];
var playerScoreThisRound = 0;

var allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput];
var allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues];

var playerMove = function(player, rowNum,colNum/*,letter*/){
	if (allInputsArray[rowNum][colNum] === defaultBlankSymbol){
		allInputsArray[rowNum].splice(colNum,1,player[2]);
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

var makeGameArea = function (){
	var gameOutline = $('<div>').attr('id','gameOutline');
	gameOutline.appendTo($('#gameSection'));
	///make rows
	for (var i = 0; i < gridSize; i++) {
		var rows = $('<div>').addClass('row '+'row'+(i+1));
		rows.appendTo($('#gameOutline'));
		///make columns
		for (var j = 0; j < gridSize; j++) {
			var cols = $('<div>').addClass('col '+'col'+(j+1));
			cols.appendTo($('.row'+(i+1)));
		}
	}
}
makeGameArea();



//////////////////////////////////
///SAMPLE PLAY MOVES//////////////
//////////////////////////////////
// playerMove(playerOne,0,0);
// playerMove(playerTwo,0,1);
// playerMove(playerOne,0,2);
// // playerMove(playerTwo,1,0,"O");
// playerMove(playerOne,1,1);
// // playerMove(playerTwo,1,2,"O");
// // playerMove(playerOne,2,0,"X");
// playerMove(playerTwo,2,2);
// playerMove(playerTwo,2,1);
// playerMove(playerTwo,2,0);

});///close the jQuery listener. $(function() means the page Document Object Model (DOM) is ready for JavaScript code to execute, images/scaffolding will load before any JavaScript does.
