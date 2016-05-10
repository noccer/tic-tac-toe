$(function() {
console.log( "jQuery ready!" )

console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

///set up game array
///set up players and how they take a turn.
///

var gridSize = 4; ///this will determine the grid size

var playerOne = ["Player 1", 0, "X"]; ///name, score & symbol
var playerTwo = ["Player 2", 0, "O"]; ///name, score & symbol

var whoIsPlayingNow = playerOne; ///check whose turn it is
console.log("whoIsPlayingNow = "+whoIsPlayingNow[0]);

var numberOfTurns = 0; ///when this = 9, the game is over and it's possibly a draw
var winner = undefined;

var emptyCellSymbol = "_"; ///this is just to set a default value. I might use this value in the front end at some point.
var emptyCellSymbolString = "";///variable length string that we split into an array later to populate the rowsInput arrays
var createEmptyCellSymbolString = function(){
	for (var i = 0; i < gridSize; i++) {
		emptyCellSymbolString+=emptyCellSymbol;
	}///close for loop
};///close createEmptyCellSymbolString
createEmptyCellSymbolString();

///manually inputting rows for now, but hope to make these automatic
var rowOneInput = emptyCellSymbolString.split("");///make an array from emptyCellSymbolString >>> if gridSize is 3, rowOneInput => ['_','_','_']
var rowOneValues = [1,2,4];

var rowTwoInput = emptyCellSymbolString.split("");
var rowTwoValues = [8,16,32];

var rowThreeInput = emptyCellSymbolString.split("");
var rowThreeValues = [64,128,256];

var winningScores = [7,56,448,73,146,292,273,84];///these are the scores that will return a winning score hit. Because each 'cell' is worth double the value of its predecessor, we can do a CHECKSUM on the results to see if somebody won.
var playerScoreThisRound = 0;

var allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput]; ///nest array
var allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues]; ///nest array

///this function is the main game engine.
///HOW IT WORKS:
///there are 2 sets of arrays: input arrays, and cell value arrays. When a user selects a cell, the value of that cell is pulled out and added to their comulative score. When a player score matches one of the winning combinations i.e. 3 in a row in any of these directions: horiz - vert | or either diagonal / \ ...
var playerMove = function(player,rowNum,colNum){ ///update arguments
	if (allInputsArray[rowNum][colNum] === emptyCellSymbol){///checks allInputs array to see if a move has been made already. If no move has been made, the 'empty' cell will contain emptyCellSymbol
		allInputsArray[rowNum].splice(colNum,1,player[2]);///updates the allInputsArray to contain the players marker rather than emptyCellSymbol
	}
	console.table(allInputsArray);
	player[1] = player[1] + (allValuesArray[rowNum][colNum]);
	playerScoreThisRound = (allValuesArray[rowNum][colNum]);
	console.log(player[0]+" current score is: "+player[1]);
	checkWhoWon(player);
	console.log(whoIsPlayingNow[0]+ " has just taken a turn");
	console.log("right now the winner is: "+winner);
	///check who has been playing this round then swap to other player
	if (whoIsPlayingNow[0] === playerOne[0]) {
		whoIsPlayingNow = playerTwo;
	}
	else {
		whoIsPlayingNow = playerOne;
	}
	if (winner === undefined){
		console.log(whoIsPlayingNow[0]+ " is up next");
	}
};///close playerMove

var checkWhoWon = function(player){
	for (var i = 0; i < winningScores.length; i++) {
		///THIS IS A KEY FUNCTION.
		///the following if statement checks to see if the player score to date has a component of winningScores[i] in it. this is achieved using the '&' /'AND' symbol.
		///See "JavaScript Bitwise Operators" on http://www.w3schools.com/jsref/jsref_operators.asp for more information about this
		if ((player[1] & winningScores[i]) === winningScores[i])
		{
			console.log(player[0]+" won!");
			winner = player[0];
			console.log("winner = "+winner);
		}
		playerScoreThisRound = 0;
	}///close for loop
};///close checkWhoWon

var makeGameArea = function (){///generates the gaming area
	var welcomeBanner1 = $('<h3>').text("Welcome! Player 1, you're up first and your symbol today is: "+playerOne[2]);
	var welcomeBanner2 = $('<h4>').addClass("welcomeBanner2").text("Player 2, you'll be next and your symbol is: "+playerTwo[2]);
	welcomeBanner1.appendTo($('#playerMessage'));
	welcomeBanner2.appendTo($('#playerMessage'));
	var gameOutline = $('<div>').attr('id','gameOutline');
	gameOutline.appendTo($('#gameSection'));
	///make rows
	for (var i = 0; i < gridSize; i++) {
		var rows = $('<div>')
		.addClass('row '+'row'+(i));//add row classes
		rows.appendTo($('#gameOutline'));///pass into webpage
		///make columns
		for (var j = 0; j < gridSize; j++) {
			var cols = $('<div>') ///create divs
			///KEY STEP: give columns unique identifiers!
			///Format: rowNumberColNumber, shortened to r#c#
			///this will be split into an array later on and used to detect which column/row the click was upon. This makes the game scaleable.
			.addClass(('r'+(i))+'c'+(j)+' col');
			cols.appendTo($('.row'+(i))); ///apply
		}///close 'j' for loop
	}///close 'i' for loop
};///close makeGameArea
makeGameArea();///initiate the gameArea

var gameOver = function(){///runs at the end of each click to see if the game is over by DRAW or by WINNER.
	if (numberOfTurns === (gridSize*gridSize)) { ///check if the game is a draw
		$('#playerMessage h3').text("DRAWN GAME!")
		.css({
			'color' : 'green',
			});///close css
	}
	else if (winner != undefined) { ///check if a winner has been found
		$('#playerMessage h3').text("Congratulations "+winner+", you have won!")
		.css({
			'color' : 'green',
			});///close css
	}
	else {
		console.log("from gameOver function: Game still in progress");
	};
};///close gameOver function

$('.col').on('click', function(){
	console.log("click listener intiated. winner is "+winner);
	if (winner === undefined){///check if the game is over or not
		console.log("here are the classes from your click");
		var clickedBoxClassList = ($(this).attr("class"));///returns string of  the classes that were clicked
		console.log("clickedBoxClassList is "+clickedBoxClassList);
		var clickedBoxClassListArray = clickedBoxClassList.split(""); ///split the original classes string into an array which we can now index, with index[1] being the row value, and index[3] being the column value
		var checkIfDisabled = 0;
		var checkIfDisabledFunction = function(){
			var searchClickedBoxClassList = clickedBoxClassList.search('disableClick');
			console.log("the value of disableClick is: "+searchClickedBoxClassList);
			checkIfDisabled = searchClickedBoxClassList;
		};
		checkIfDisabledFunction();
		console.log("checkIfDisabled value is: "+checkIfDisabled);
		if ((checkIfDisabled === (-1)) && winner === undefined){
			console.log(clickedBoxClassList);

			var rowClicked = clickedBoxClassListArray[1];///make playerMove more readable!
			var colClicked = clickedBoxClassListArray[3];///make playerMove more readable!

			playerMove(whoIsPlayingNow,rowClicked,colClicked);

			if (whoIsPlayingNow === playerOne){
				$(this)
				.addClass('playerTwoClicked disableClick');
			}
			else {
				$(this)
				.addClass('playerOneClicked disableClick');
			}
			$('#playerMessage h4').empty();
			$('#playerMessage h3').text(whoIsPlayingNow[0]+": make your move!")
			.css({
				'color' : 'black'
			});///close css
			numberOfTurns++; ///increase the number of turns that have been played
			console.log("numberOfTurns so far = "+numberOfTurns);
		} ///close if disableClick
		else if (numberOfTurns != 9){
			$('#playerMessage h3').text("Try again "+whoIsPlayingNow[0]+"! That box is already chosen...")
			.css({
				'color' : 'red',
			});///close css
		};///close elseif
	};///close the "if there is a winner" if statement.
	gameOver();
});///close the click listener

var resetFunction = function(){
	winner = undefined;
	playerOne[1] = 0;
	playerTwo[1] = 0;
	numberOfTurns = 0;
	whoIsPlayingNow = undefined;
	rowOneInput = emptyCellSymbolString.split("");
	rowTwoInput = emptyCellSymbolString.split("");
	rowThreeInput = emptyCellSymbolString.split("");
}

//////////////////////////////////
///SAMPLE PLAY MOVES//////////////
//////////////////////////////////
// playerMove(playerOne,0,0);
// playerMove(playerTwo,0,1);
// playerMove(playerOne,0,2);
// playerMove(playerTwo,1,0);
// playerMove(playerOne,1,1);
// // playerMove(playerTwo,1,2);
// // playerMove(playerOne,2,0);
// playerMove(playerTwo,2,2);
// playerMove(playerTwo,2,1);
// playerMove(playerTwo,2,0);

});///close the jQuery listener. $(function() means the page Document Object Model (DOM) is ready for JavaScript code to execute, images/scaffolding will load before any JavaScript does.
