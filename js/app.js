$(function() {
console.log( "jQuery ready!" )

console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

///set up game array
///set up players and how they take a turn.
///

var gridSize = 5; ///this will determine the grid size
var consecutiveTiles = 4;///I may use this to build a

var playerOne = ["Player 1", 0, "X"]; ///name, score & symbol
var playerTwo = ["Player 2", 0, "P2"]; ///name, score & symbol
var whoIsPlayingNow = playerOne; ///check whose turn it is
console.log("whoIsPlayingNow = "+whoIsPlayingNow[0]);
var numberOfTurns = 0; ///when this = 9, the game is over and it's possibly a draw
var winner = undefined;
var emptyCellSymbol = "_"; ///this is just to set a default value. I might use this value in the front end at some point.
var emptyCellSymbolString = "";///variable length string that we split into an array later to populate the rowsInput arrays
var createEmptyCellSymbolString = function(){
	for (var i = 0; i < gridSize; i++) {
		emptyCellSymbolString+=emptyCellSymbol;///concatenate!
	}///close for loop
};///close createEmptyCellSymbolString
createEmptyCellSymbolString();
///manually inputting rows for now, but hope to make these automatic
var valuesArray = [1];
var createValuesArray = function(){
	for (var i = 1; i < (gridSize*gridSize); i++) {
		valuesArray.push((valuesArray[i-1])*2);
	}
	console.log("valuesArray for a grid size of "+gridSize+" = "+valuesArray)
}
createValuesArray();

///these are the scores that will return a winning score hit. Because each 'cell' is worth double the value of its predecessor, we can do a CHECKSUM on the results to see if somebody won.
///I generated these values from an Excel sheet, refer to resources/calculate_winningScores.xlsx
var winningScoresG3L3 = [273,84,73,146,292,7,56,448]
var winningScoresG4L3 = [273,546,1092,2184,4368,8736,17472,34944,7,14,112,224,1792,3584,28672,57344];
var winningScoresG4L4 = [33825,4680,4369,8738,17476,34952,15,240,3840,61440];
var winningScoresG5L3 = [1057,2114,4228,8456,16912,33824,67648,135296,270592,541184,1082368,2164736,4329472,8658944,17317888,7,224,7168,229376,7340032,14,448,14336,458752,14680064,28,896,28672,917504,29360128,4161,8322,16644,133152,266304,532608,4260864,8521728,17043456,1092,2184,4368,34944,69888,139776,2236416,4472832];
var winningScoresG5L4 = [266305,532610,8521760,17043520,34952,69904,1118464,2236928,33825,67650,135300,270600,541200,1082400,2164800,4329600,8659200,17318400,15,30,480,960,15360,30720,491520,983040,15728640,31457280];
var winningScoresG5L5 = [17043521,1118480,1082401,2164802,4329604,8659208,17318416,31,992,31744,1015808,32505856];

var populateWinningScores = function (){
	if (gridSize === 3){
		winningScores = winningScoresG3L3;
	} else if (gridSize === 4){
		if (consecutiveTiles === 4){
			winningScores = winningScoresG4L3;
		} else {
			winningScores = winningScoresG4L4;
		}
	} else {
		if (consecutiveTiles === 3) {
			winningScores = winningScoresG5L3;
		}
		else if (consecutiveTiles === 4) {
			winningScores = winningScoresG5L4;
		}
		else {
			winningScores = winningScoresG5L5;
		}
	};
};
populateWinningScores();

var sortWinningScores = function(a,b) {
    return a - b;
}
winningScores.sort(sortWinningScores);
console.log(winningScores);

var rowOneInput = emptyCellSymbolString.split("");///make an array from emptyCellSymbolString >>> if gridSize is 3, rowOneInput => ['_','_','_']
var rowTwoInput = emptyCellSymbolString.split("");
var rowThreeInput = emptyCellSymbolString.split("");
var rowFourInput = emptyCellSymbolString.split("");
var rowFiveInput = emptyCellSymbolString.split("");

var rowOneValues = [];
var rowTwoValues = [];

var createRowValues = function(){
	rowOneValues = [1];
	var pushRow = function(whichRow){
		for (var i = 0; i < (gridSize-1); i++) {
			whichRow.push((whichRow[i]*0.5))
		};
	};
	pushRow(rowOneValues);
	console.log(rowOneValues);
	// var addendRow = function(previous, current){ ///WONT WORK, trying to DRY
	// 	console.log("previous = "+previous);
	// 	console.log("current = "+current);
	// 	current = [previous[(previous.length-1)]*2];
	// 	console.log("addend row function has run");
	// };
	// addendRow(rowOneValues,rowTwoValues);
	rowTwoValues = [rowOneValues[(gridSize-1)]*2];
	pushRow(rowTwoValues);
	console.log(rowTwoValues);

	rowThreeValues = [rowTwoValues[(gridSize-1)]*2];
	pushRow(rowThreeValues);
	console.log(rowThreeValues);

	rowFourValues = [rowThreeValues[(gridSize-1)]*2];
	pushRow(rowFourValues);
	console.log(rowFourValues);

	rowFiveValues = [rowFourValues[(gridSize-1)]*2];
	pushRow(rowFiveValues);
	console.log(rowFiveValues);
}
createRowValues();



// var createRowTwoValues = function(){
// 	console.log("winningScores log before rowOneValues loop: "+winningScores);
// 	for (var i = gridSize; i < (gridSize*2); i++) {
// 		rowTwoValues.push(winningScores[i])
// 	}
// 	console.log(rowTwoValues);
// }
// createRowTwoValues();

var playerScoreThisRound = 0;

var allInputsArray = []; ///nest array

var allValuesArray = [];
var createValuesAndInputsArrays = function(){
	if (gridSize === 3){
		allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput];
		allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues];
	} else if (gridSize === 4) {
		allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput,rowFourInput];
		allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues,rowFourValues];
	} else {
		allInputsArray = [rowOneInput,rowTwoInput,rowThreeInput,rowFourInput,rowFiveInput];
		allValuesArray = [rowOneValues,rowTwoValues,rowThreeValues,rowFourValues,rowFiveValues];
	}
	console.table(allInputsArray);
	console.table(allValuesArray);
}
createValuesAndInputsArrays(); ///Creates both nested arrays.

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
		console.log("checking winning scores for loop no."+i);
		console.log("player[1]score = "+player[1]);
		console.log("player[1]score in binary = "+player[1].toString(2));
		console.log("winningScores[i] = "+winningScores[i]);
		console.log("winningScores[i] in binary = "+winningScores[i].toString(2));
		if ((player[1] & winningScores[i]) === winningScores[i])
		{
			console.log(player[0]+" won!");
			winner = player[0];
			console.log("WE HAVE A WINNER: WINNER = "+winner);
		};
		playerScoreThisRound = 0;
	}///close for loop
};///close checkWhoWon

var welcomeMessages = function(){
	var welcomeBanner1 = $('<h3>').text("Welcome! Player 1, you're up first and your symbol today is: "+playerOne[2]);
	var welcomeBanner2 = $('<h4>').addClass("welcomeBanner2").text("Player 2, you'll be next and your symbol is: "+playerTwo[2]);
	welcomeBanner1.appendTo($('#playerMessage'));
	welcomeBanner2.appendTo($('#playerMessage'));
};

var makeGameArea = function (){///generates the gaming area
	welcomeMessages();
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
	if (numberOfTurns === (gridSize*gridSize) && (winner === undefined)) { ///check if the game is a draw
		$('#playerMessage h3').text("DRAWN GAME!")
		$('#gameOutline').css({
			'background-color' : '#000000'
		});
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

			if (whoIsPlayingNow === playerOne){ ///adds the css class for playerTwo
				$(this)
				.addClass('playerTwoClicked disableClick');
				$(this)
				.text(playerTwo[2]);
				$('#gameOutline').css({
					'background-color' : '#A5D6A7'
				});
			}
			else { ///adds the css class for playerOne
				$(this)
				.addClass('playerOneClicked disableClick');
				$(this)
				.text(playerOne[2]);
				$('#gameOutline').css({
					'background-color' : '#EF9A9A'
				});
			}
			$('#playerMessage h4').empty();
			$('#playerMessage h3').text(whoIsPlayingNow[0]+": make your move!")
			.css({
				'color' : 'black'
			});///close css
			numberOfTurns++; ///increase the number of turns that have been played
			console.log("numberOfTurns so far = "+numberOfTurns);
		} ///close if disableClick
		else if (numberOfTurns != (gridSize*gridSize)){
			$('#playerMessage h3').text("Try again "+whoIsPlayingNow[0]+"! That box is already chosen...")
			.css({
				'color' : 'red',
			});///close css
		};///close elseif
	};///close the "if there is a winner" if statement.
	gameOver();
});///close the click listener

var resetRound = function(){
	///reset variables
	winner = undefined;
	playerOne[1] = 0;
	playerTwo[1] = 0;
	numberOfTurns = 0;
	whoIsPlayingNow = playerOne;
	winner = undefined;
	rowOneInput = emptyCellSymbolString.split("");
	rowTwoInput = emptyCellSymbolString.split("");
	rowThreeInput = emptyCellSymbolString.split("");
	playerScoreThisRound = 0;
	///reset css
	$('body').css({
		'background-color' : 'chartreuse',
	});
	console.log(allInputsArray);
	console.log("resetRound has been run");
};

$('#resetButton').on('click', function(){
	resetRound();
});

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
