$(function() {
console.log( "jQuery ready!" )

console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

///set up game array
///set up players and how they take a turn.
///

var gridSize = 3; ///this will determine the grid size

var playerOne = ["Player 1 RED", 0, "X"]; ///name, score & symbol
var playerTwo = ["Player 2 GREEN", 0, "O"]; ///name, score & symbol

var whoIsPlayingNow = playerOne; ///check whose turn it is
console.log("whoIsPlayingNow = "+whoIsPlayingNow[0]);

var numberOfTurns = 0; ///when this = 9, the game is over and it's possibly a draw

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

var playerMove = function(player,rowNum,colNum){ ///update arguments
	if (allInputsArray[rowNum][colNum] === emptyCellSymbol){
		allInputsArray[rowNum].splice(colNum,1,player[2]);
	}
	console.table(allInputsArray);
	player[1] = player[1] + (allValuesArray[rowNum][colNum]);
	playerScoreThisRound = (allValuesArray[rowNum][colNum])
	console.log(player[0]+" current score is: "+player[1]);
	checkWhoWon(player);
	console.log(whoIsPlayingNow[0]+ " has just taken a turn");
	///check who has been playing this round then swap to other player
	if (whoIsPlayingNow[0] === playerOne[0]) {
		whoIsPlayingNow = playerTwo;
	}
	else {
		whoIsPlayingNow = playerOne;
	}
	console.log(whoIsPlayingNow[0]+ " is up next");
};///close playerMove

var checkWhoWon = function(player){
	for (var i = 0; i < winningScores.length; i++) {
		if ((player[1] & winningScores[i]) === winningScores[i])
		{
			console.log(player[0]+" won!");
		}
		playerScoreThisRound = 0;
	}///close for loop
};///close checkWhoWon

var makeGameArea = function (){
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
makeGameArea();

$('.col').on('click', function(){
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
	if (checkIfDisabled === (-1)){
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

		///code to insert a message into page
		$('#playerMessage h3').text(whoIsPlayingNow[0]+": make your move!")
		.css({
			'color' : 'black'
		});///close css
	} ///close if disableClick
	else {
		$('#playerMessage h3').text("Try again "+whoIsPlayingNow[0]+"! That box is already chosen...")
		.css({
			'color' : 'red',
			});///close css
		}///close else
	};

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
