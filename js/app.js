$(function() {
	console.log("jQuery ready!");

	console.log("app.js connected successfully.");
	console.log("Welcome to Nialls Tic-Tac-Toe!");

	// __      __        _       _     _
	// \ \    / /       (_)     | |   | |
	//  \ \  / /_ _ _ __ _  __ _| |__ | | ___  ___
	//   \ \/ / _` | '__| |/ _` | '_ \| |/ _ \/ __|
	//    \  / (_| | |  | | (_| | |_) | |  __/\__ \
	// 	\/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/

	var gridSize = 3; ///this will determine the grid size
	console.log("gridSize " + gridSize);
	var consecutiveTiles = 3; ///I may use this to build a
	console.log("consecutiveTiles " + consecutiveTiles);
	var numOfGamesToWinMatch = 3;

	var playerOne = ["Player 1", 0, "X", 0]; ///name, score, symbol, gamesWon
	console.log("playerOne " + playerOne);
	var playerTwo = ["Player 2", 0, "O", 0]; ///name, score, symbol, gamesWon
	console.log("playerTwo " + playerTwo);
	var whoIsPlayingNow = playerOne; ///check whose turn it is TODO
	console.log("whoIsPlayingNow = " + whoIsPlayingNow[0]);
	var numberOfTurns = 0; ///when this = gridSize^2, the game is over and it's possibly a draw
	console.log("numberOfTurns " + numberOfTurns);
	var winner;
	console.log("winner " + winner);

	var currentRound = 1;
	console.log("currentRound " + currentRound);

	var overallWinner;
	console.log("overallWinner " + overallWinner);

	var emptyCellSymbol = "_"; ///this is just to set a default value. I might use this value in the front end at some point.
	console.log("emptyCellSymbol " + emptyCellSymbol);
	var emptyCellSymbolString = ""; ///variable length string that we split into an array later to populate the rowsInput arrays
	console.log("emptyCellSymbolString " + emptyCellSymbolString);
	var createEmptyCellSymbolString = function(gridSize) {
		emptyCellSymbolString = "";
		for (var i = 0; i < gridSize; i++) {
			emptyCellSymbolString += emptyCellSymbol; ///concatenate!
		} ///close for loop
	}; ///close createEmptyCellSymbolString
	createEmptyCellSymbolString(gridSize);
	console.log("emptyCellSymbolString " + emptyCellSymbolString);

	///manually inputting rows for now, but hope to make these automatic
	var valuesArray = [1];
	console.log("valuesArray " + valuesArray);
	var createValuesArray = function() {
		for (var i = 1; i < (gridSize * gridSize); i++) {
			valuesArray.push((valuesArray[i - 1]) * 2);
		}
		console.log("valuesArray for a grid size of " + gridSize + " = " + valuesArray);
	};
	createValuesArray();
	console.log("valuesArray " + valuesArray);

	///these are the scores that will return a winning score hit. Because each 'cell' is worth double the value of its predecessor, we can do a CHECKSUM on the results to see if somebody won.
	///I generated these values from an Excel sheet, refer to resources/calculate_winningScores.xlsx
	var winningScoresG3L3 = [273, 84, 73, 146, 292, 7, 56, 448];
	var winningScoresG4L3 = [273, 546, 1092, 2184, 4368, 8736, 17472, 34944, 7, 14, 112, 224, 1792, 3584, 28672, 57344, 1057, 2114, 16912, 33824, 292, 584, 4672, 9344];
	console.log(winningScoresG4L3);
	console.log((winningScoresG4L3).sort(sortWinningScores));
	var winningScoresG4L4 = [33825,4680, 4369, 8738, 17476, 34952, 15, 240, 3840, 61440];
	var winningScoresG5L3 = [1057, 2114, 4228, 8456, 16912, 33824, 67648, 135296, 270592, 541184, 1082368, 2164736, 4329472, 8658944, 17317888, 7, 224, 7168, 229376, 7340032, 14, 448, 14336, 458752, 14680064, 28, 896, 28672, 917504, 29360128, 4161, 8322,
		16644, 133152, 266304, 532608, 4260864, 8521728, 17043456, 1092, 2184, 4368, 34944, 69888, 139776, 2236416, 4472832
	];
	var winningScoresG5L4 = [266305, 532610, 8521760, 17043520, 34952, 69904, 1118464, 2236928, 33825, 67650, 135300, 270600, 541200, 1082400, 2164800, 4329600, 8659200, 17318400, 15, 30, 480, 960, 15360, 30720, 491520, 983040, 15728640, 31457280];
	var winningScoresG5L5 = [17043521, 1118480, 1082401, 2164802, 4329604, 8659208, 17318416, 31, 992, 31744, 1015808, 32505856];

	var populateWinningScores = function() {
		if (gridSize === 3) {
			winningScores = winningScoresG3L3;
		} else if (gridSize === 4) {
			if (consecutiveTiles === 3) {
				winningScores = winningScoresG4L3;
			} else {
				winningScores = winningScoresG4L4;
			}
		} else {
			if (consecutiveTiles === 3) {
				winningScores = winningScoresG5L3;
			} else if (consecutiveTiles === 4) {
				winningScores = winningScoresG5L4;
			} else {
				winningScores = winningScoresG5L5;
			}
		}
	};
	populateWinningScores();
	console.log("winningScores " + winningScores);

	///this is just a nicey function so that when we loop over the winningScores,
	///the logged results are in numerical order.
	var sortWinningScores = function(a, b) {
		return a - b;
	};
	winningScores.sort(sortWinningScores);
	console.log("winningScores " + winningScores); ///check it worked

	var rowOneInput = emptyCellSymbolString.split(""); ///make an array from emptyCellSymbolString >>> if gridSize is 3, rowOneInput => ['_','_','_']
	var rowTwoInput = emptyCellSymbolString.split("");
	var rowThreeInput = emptyCellSymbolString.split("");
	var rowFourInput = emptyCellSymbolString.split("");
	var rowFiveInput = emptyCellSymbolString.split("");

	var rowOneValues = [];
	var rowTwoValues = [];
	var rowThreeValues = [];
	var rowFourValues = [];
	var rowFiveValues = [];

	var createRowValues = function() {
		rowOneValues = [1];
		var pushRow = function(whichRow) {
			for (var i = 0; i < (gridSize - 1); i++) {
				whichRow.push((whichRow[i] * 2));
			}
		};
		pushRow(rowOneValues);
		console.log("rowOneValues " + rowOneValues);
		// var addendRow = function(previous, current){ ///WONT WORK, trying to DRY
		// 	console.log("previous = "+previous);
		// 	console.log("current = "+current);
		// 	current = [previous[(previous.length-1)]*2];
		// 	console.log("addend row function has run");
		// };
		// addendRow(rowOneValues,rowTwoValues);
		rowTwoValues = [rowOneValues[(gridSize - 1)] * 2];
		pushRow(rowTwoValues);
		console.log("rowTwoValues " + rowTwoValues);

		rowThreeValues = [rowTwoValues[(gridSize - 1)] * 2];
		pushRow(rowThreeValues);
		console.log("rowThreeValues " + rowThreeValues);

		rowFourValues = [rowThreeValues[(gridSize - 1)] * 2];
		pushRow(rowFourValues);
		console.log("rowFourValues " + rowFourValues);

		rowFiveValues = [rowFourValues[(gridSize - 1)] * 2];
		pushRow(rowFiveValues);
		console.log("rowFiveValues " + rowFiveValues);
	};
	createRowValues();

	var allInputsArray = []; ///nest array

	var allValuesArray = [];
	var createValuesAndInputsArrays = function() {
		if (gridSize === 3) {
			allInputsArray = [rowOneInput, rowTwoInput, rowThreeInput];
			allValuesArray = [rowOneValues, rowTwoValues, rowThreeValues];
		} else if (gridSize === 4) {
			allInputsArray = [rowOneInput, rowTwoInput, rowThreeInput, rowFourInput];
			allValuesArray = [rowOneValues, rowTwoValues, rowThreeValues, rowFourValues];
		} else {
			allInputsArray = [rowOneInput, rowTwoInput, rowThreeInput, rowFourInput, rowFiveInput];
			allValuesArray = [rowOneValues, rowTwoValues, rowThreeValues, rowFourValues, rowFiveValues];
		}
		console.table(allInputsArray);
		console.table(allValuesArray);
	};
	createValuesAndInputsArrays(); ///Creates both nested arrays.

	// _____                      _____  _
	// / ____|                    |  __ \| |
	// | |  __  __ _ _ __ ___   ___| |__) | | __ _ _   _
	// | | |_ |/ _` | '_ ` _ \ / _ \  ___/| |/ _` | | | |
	// | |__| | (_| | | | | | |  __/ |    | | (_| | |_| |
	// \_____|\__,_|_| |_| |_|\___|_|    |_|\__,_|\__, |
	// 										   __/ |
	// 										  |___/

	var playerScoreThisRound = 0;
	console.log("playerScoreThisRound " + playerScoreThisRound);

	///this function is the main game engine.
	///HOW IT WORKS:
	///there are 2 sets of arrays: input arrays, and cell value arrays. When a user selects a cell, the value of that cell is pulled out and added to their comulative score. When a player score matches one of the winning combinations i.e. 3 in a row in any of these directions: horiz - vert | or either diagonal / \ ...
	var playerMove = function(player, rowNum, colNum) { ///update arguments
		if ((numberOfTurns > -1) && (winner === undefined)) {
			$('#actionButton')
				.css({
					'background-color': '',
					'border': '',
					'color': '',
					'box-shadow': ''
				});
		}
		if (allInputsArray[rowNum][colNum] === emptyCellSymbol) { ///checks allInputs array to see if a move has been made already. If no move has been made, the 'empty' cell will contain emptyCellSymbol
			allInputsArray[rowNum].splice(colNum, 1, player[2]); ///updates the allInputsArray to contain the players marker rather than emptyCellSymbol
		}
		console.table(allInputsArray);
		player[1] = player[1] + (allValuesArray[rowNum][colNum]);
		playerScoreThisRound = (allValuesArray[rowNum][colNum]);
		console.log(player[0] + " current score is: " + player[1]);
		checkWhoWon(player);
		console.log(whoIsPlayingNow[0] + " has just taken a turn");
		console.log("this round winner is: " + winner);
		///check who has been playing this round then swap to other player
		checkWhoWonMatch();
		if (whoIsPlayingNow[0] === playerOne[0]) {
			whoIsPlayingNow = playerTwo;
		} else {
			whoIsPlayingNow = playerOne;
		}
		if (winner === undefined) {
			console.log(whoIsPlayingNow[0] + " is up next");
		}
	}; ///close playerMove

	var checkWhoWonMatch = function(){
		console.log("checkWhoWonMatch");
		console.log(playerOne[3]);
		console.log(numOfGamesToWinMatch);
		if (playerOne[3] === numOfGamesToWinMatch){
			overallWinner = playerOne;
		} else if (playerTwo[3] === numOfGamesToWinMatch) {
			overallWinner = playerTwo;
		}
	};

	var checkWhoWon = function(player) {
		for (var i = 0; i < winningScores.length; i++) {
			///THIS IS A KEY FUNCTION.
			///the following if statement checks to see if the player score to date has a component of winningScores[i] in it. this is achieved using the '&' /'AND' symbol.
			///See "JavaScript Bitwise Operators" on http://www.w3schools.com/jsref/jsref_operators.asp for more information about this. BITWISE checking.
			///http://www.i-programmer.info/programming/javascript/2550-javascript-bit-manipulation.html
			/// PRESENTATION
			console.log("checking winning scores for loop no." + i);
			console.log(player[0]+" score = " + player[1]);
			console.log(player[0]+" score in binary = " + player[1].toString(2));
			console.log("winningScores[i] = " + winningScores[i]);
			console.log("winningScores[i] in binary = " + winningScores[i].toString(2));
			if ((player[1] & winningScores[i]) === winningScores[i]) {
				console.log(player[0] + " won!");
				winner = player[0];
				console.log("WE HAVE A WINNER: WINNER = " + winner);
			}
			playerScoreThisRound = 0;


		} ///close for loop
	}; ///close checkWhoWon



	// _____   ____  __  __   ______                _   _
	// |  __ \ / __ \|  \/  | |  ____|              | | (_)
	// | |  | | |  | | \  / | | |__ _   _ _ __   ___| |_ _  ___  _ __  ___
	// | |  | | |  | | |\/| | |  __| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
	// | |__| | |__| | |  | | | |  | |_| | | | | (__| |_| | (_) | | | \__ \
	// |_____/ \____/|_|  |_| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
	//

	var welcomeMessages = function() {
		var welcomeBanner1 = $('<h3>').text("Welcome! " + playerOne[0] + " (" + playerOne[2] + ") you're up first.");
		// var welcomeBanner2 = $('<h4>').addClass("welcomeBanner2").text(playerTwo[0]+" ("+playerTwo[2]+") hang tight, you're next!");
		welcomeBanner1.appendTo($('#playerMessage'));
		// welcomeBanner2.appendTo($('#playerMessage'));
	};

	var makeGameArea = function() { ///generates the gaming area
		welcomeMessages();
		var gameOutline = $('<div>')
			.attr('id', 'gameOutline');
		gameOutline.appendTo($('#gameSection'));
		// var gameSidePanel = $('<div>') ///ABANDON SIDEPANELS FOR NOW
		//     .attr('id', 'gameSidePanel');
		// gameSidePanel.appendTo($('#gameSection'));
		// var gameOutline = $('<div>')
		//     .attr('id', 'gameOutline');
		// gameOutline.appendTo($('#gameSidePanel'));
		///make rows
		for (var i = 0; i < gridSize; i++) {
			var rows = $('<div>')
				.addClass('rowz ' + 'row' + (i)); //add row classes
			rows.appendTo($('#gameOutline')); ///pass into webpage
			///make columns
			for (var j = 0; j < gridSize; j++) {
				var cols = $('<div>') ///create divs
					///KEY STEP: give columns unique identifiers!
					///Format: rowNumberColNumber, shortened to r#c#
					///this will be split into an array later on and used to detect which column/row the click was upon. This makes the game scaleable.
					.addClass(('r' + (i)) + 'c' + (j) + ' colz enableClick');
				cols.appendTo($('.row' + (i))); ///apply
			} ///close 'j' for loop
		} ///close 'i' for loop
		$('#actionButton')
			.css({
				'background-color': 'Transparent',
				'border': 'none',
				'color': '#BBDEFB',
				'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
			});
	}; ///close makeGameArea
	makeGameArea(); ///initiate the gameArea

	// var makeSidePanel = function() {
	// 	var sidePanel = $('<div>')
	//         .attr('id', 'sidePanel');
	//         // .addClass('col-md-6')
	// 		sidePanel.appendTo($('#gameSection'))
	// 		;
	// };
	// makeSidePanel();
	var updatePlayerOneScore = function (){
		$('#playerOneScore').text(playerOne[0]+" = " + playerOne[3]);
	};
	var updatePlayerTwoScore = function (){
		$('#playerTwoScore').text(playerTwo[0]+" = " + playerTwo[3]);
	};

	var gameOver = function() { ///runs at the end of each click to see if the game is over by DRAW or by WINNER.
		if (numberOfTurns === (gridSize * gridSize) && (winner === undefined)) { ///check if the game is a draw
			$('#playerMessage h3').text("Drawn Game, Try Again!");
			$('#gameOutline').css({
				'background-color': '#EEEEEE',
				'border': 'none',
				'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
			});
			$('html').css({
				'background-color': '#EEEEEE'
			});
			$('#actionButton')
				.css({
					'background-color': '#D32F2F',
					'box-shadow': '20px 20px 20px 0 rgba(0,0,0,0.5)'
				});
			$('#gridSizeSection, #inARowSection')
			.css({
				'display' : 'none !important' ,
			});
		} else if (winner !== undefined) { ///check if a winner has been found
			$('#playerMessage h3').text(winner + " wins!");
			$('#actionButton')
				.text('Next')
				.css({
					'background-color': '#388E3C',
					'box-shadow': '20px 20px 20px 0 rgba(0,0,0,0.5)'
				});
			if (winner === playerOne[0]) {
				playerOne[3]++;
				updatePlayerOneScore();
				$('html')
					.css({
						'background-color': '#EF9A9A',
					});
				$('#gameOutline')
					.css({
						'background-color': '#EF9A9A',
						'border': 'none',
						'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
					});
				$('.enableClick')
				    .css({
				        'background-color': '#EF9A9A',
				        'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
				    });
				checkWhoWonMatch();
			} else if (winner === playerTwo[0]) {
				playerTwo[3]++;
				updatePlayerTwoScore();
				$('html')
					.css({
						'background-color': '#A5D6A7',
					});
				$('#gameOutline')
					.css({
						'background-color': '#A5D6A7',
						'border': 'none',
						'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
					});
				$('.enableClick')
				    .css({
				        'background-color': '#A5D6A7',
				        'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
				    });
				checkWhoWonMatch();
			}
			console.log(playerOne[0] + ' score = ' + playerOne[3] + ' - ' + playerTwo[0] + ' score = ' + playerTwo[3]);
		} else {
			console.log("from gameOver function: Game still in progress");
		}
		///check if match won!!!
		if (overallWinner !== undefined){
			if (overallWinner === playerOne)
				$('html')
				.css({
					'background-color' : '#F44336',
				});
			} else if (overallWinner === playerTwo){
				$('html')
				.css({
					'background-color' : '#4CAF50',
				});
			}

	}; ///close gameOver function

	var cellClickListener = function() {
		$('.colz').on('click', function() {
			console.log("click listener intiated. winner is " + winner);
			if (winner === undefined) { ///check if the round is over or not
				console.log("here are the classes from your click");
				var clickedCellClassList = ($(this).attr("class")); ///returns string of  the classes that were clicked
				console.log("clickedCellClassList is " + clickedCellClassList);
				var clickedCellClassListArray = clickedCellClassList.split(""); ///split the original classes string into an array which we can now index, with index[1] being the row value, and index[3] being the column value
				var checkIfDisabled = 0;
				var checkIfDisabledFunction = function() {
					var searchclickedCellClassList = clickedCellClassList.search('disableClick');
					console.log("the value of disableClick is: " + searchclickedCellClassList);
					checkIfDisabled = searchclickedCellClassList;
					console.log("checkIfDisabled value is: " + checkIfDisabled);
				};
				checkIfDisabledFunction();

				if ((checkIfDisabled === (-1)) && winner === undefined) {
					console.log(clickedCellClassList);
					var rowClicked = clickedCellClassListArray[1]; ///make playerMove more readable!
					var colClicked = clickedCellClassListArray[3]; ///make playerMove more readable!
					// if ()
					playerMove(whoIsPlayingNow, rowClicked, colClicked);

					if (whoIsPlayingNow === playerOne) { ///adds the css class for playerTwo
						$(this)
							.addClass('playerTwoClicked disableClick')
							.removeClass('enableClick');
						$(this)
							.text(playerTwo[2]);
						$('#gameOutline').css({
							'background-color': '#A5D6A7'
						});
					} else { ///adds the css class for playerOne
						$(this)
							.addClass('playerOneClicked disableClick')
							.removeClass('enableClick');
						$(this)
							.text(playerOne[2]);
						$('#gameOutline').css({
							'background-color': '#EF9A9A'
						});
					}
					$('#playerMessage h4').empty();
					$('#playerMessage h3').text(whoIsPlayingNow[0] + ": make your move!")
						.css({
							'color': ''
						}); ///close css
					numberOfTurns++; ///increase the number of turns that have been played
					console.log("numberOfTurns so far = " + numberOfTurns);
				} ///close if disableClick
				else if (numberOfTurns != (gridSize * gridSize)) {
					$('#playerMessage h3').text("Try again " + whoIsPlayingNow[0] + "!")
						.css({
							'color': 'red',
						}); ///close css
					$(this).addClass('shake-horizontal');
				} ///close elseif
			} ///close the "if there is a winner" if statement.
			gameOver();
		}); ///close the click listener

	};
	cellClickListener(); ///initiate the listener

	// ___                _     ______
	// |  __ \              | |   |  ____|
	// | |__) |___  ___  ___| |_  | |__ _ __
	// |  _  // _ \/ __|/ _ \ __| |  __| '_ \
	// | | \ \  __/\__ \  __/ |_  | |  | | | |_
	// |_|  \_\___||___/\___|\__| |_|  |_| |_(_)
	//
	var resetRound = function() {
		///reset variables
		winner = undefined;
		playerOne[1] = 0;
		playerTwo[1] = 0;
		whoIsPlayingNow = playerOne;
		winner = undefined;
		// checkIfDisabled = 0;
		whoIsPlayingNow = playerOne; ///CREATE AN IF FUNCTION TODO
		numberOfTurns = 0;
		winner = undefined;
		emptyCellSymbolString = "";
		createEmptyCellSymbolString(gridSize);
		valuesArray = [1];
		createValuesArray();
		populateWinningScores();
		rowOneInput = emptyCellSymbolString.split("");
		rowTwoInput = emptyCellSymbolString.split("");
		rowThreeInput = emptyCellSymbolString.split("");
		rowFourInput = emptyCellSymbolString.split("");
		rowFiveInput = emptyCellSymbolString.split("");
		rowOneValues = [];
		rowTwoValues = [];
		rowThreeValues = [];
		rowFourValues = [];
		rowFiveValues = [];
		createRowValues();
		allInputsArray = [];
		allValuesArray = [];
		createValuesAndInputsArrays();
		playerScoreThisRound = 0;
		///reset css
		$('html')
			.css({
				'background-color': '',
			});
		$('#gameOutline')
			.css({
				'background-color': '',
				'box-shadow': '',
				'border': ''
			});
		$('.enableClick')
			.css({
				'background-color': '',
				'box-shadow': '',
				'border': ''
			});
		console.log("resetRound has been run");
		$('#actionButton')
			.text('Reset')
			.css({
				'background-color': 'Transparent',
				'border': 'none',
				'color': '#BBDEFB',
				'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
			});
		consoleLogs();
	};

	$('#actionButton').on('click', function() {
		gameAreaEraser();
	});

	////GRID OPTIONS
	var gameAreaEraser = function() {
		$('#playerMessage').empty();
		$('#gameSection').empty();
		makeGameArea();
		resetRound();
		cellClickListener(); ///initiate the listener
		$('.enableClick')
			.css({
				'background-color': '',
				'box-shadow': '',
				'border': ''
			});
		$('#actionButton')
			.text('Reset')
			.css({
				'background-color': 'Transparent',
				'border': 'none',
				'color': '#BBDEFB',
				'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
			});
	};

	var buttonFader = function(){
		$('this')
		.css({
			'background-color': 'Transparent',
			'border': 'none',
			'color': '#BBDEFB',
			'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
		});
	};

	$('#gridSize3').on('click', function() {
		gridSize = 3;
		consecutiveTiles = 3;
		gameAreaEraser();
		playerOne[3] = 0;
		playerTwo[3] = 0;
		updatePlayerOneScore();
		updatePlayerTwoScore();
		$('#gridSize4, #gridSize5, #inARow3, #inARow4, #inARow5')
		.css({
			'background-color': 'Transparent',
			'border': 'none',
			'color': '#BBDEFB',
			'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
		});
	});
	$('#gridSize4').on('click', function() {
		gridSize = 4;
		consecutiveTiles = 4;
		gameAreaEraser();
		playerOne[3] = 0;
		playerTwo[3] = 0;
		updatePlayerOneScore();
		updatePlayerTwoScore();
		$('#gridSize3, #gridSize5, #inARow5')
		.css({
			'background-color': 'Transparent',
			'border': 'none',
			'color': '#BBDEFB',
			'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
		});
	});
	$('#gridSize5').on('click', function() {
		gridSize = 5;
		consecutiveTiles = 5;
		gameAreaEraser();
		playerOne[3] = 0;
		playerTwo[3] = 0;
		updatePlayerOneScore();
		updatePlayerTwoScore();
		$('#gridSize3, #gridSize4')
		.css({
			'background-color': 'Transparent',
			'border': 'none',
			'color': '#BBDEFB',
			'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
		});
	});
	$('#inARow3').on('click', function() {
		consecutiveTiles = 3;
		gameAreaEraser();
		updatePlayerOneScore();
		updatePlayerTwoScore();
		$('#inARow4, #inARow5')
		.css({
			'background-color': 'Transparent',
			'border': 'none',
			'color': '#BBDEFB',
			'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
		});
	});
	$('#inARow4').on('click', function() {
		consecutiveTiles = 4;
		gameAreaEraser();
		updatePlayerOneScore();
		updatePlayerTwoScore();
		$('#inARow3, #inARow5')
		.css({
			'background-color': 'Transparent',
			'border': 'none',
			'color': '#BBDEFB',
			'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
		});
	});
	$('#inARow5').on('click', function() {
		consecutiveTiles = 5;
		gameAreaEraser();
		updatePlayerOneScore();
		updatePlayerTwoScore();
		$('#inARow3, #inARow4')
		.css({
			'background-color': 'Transparent',
			'border': 'none',
			'color': '#BBDEFB',
			'box-shadow': '0 0 0 0 rgba(0,0,0,0.0)'
		});
	});
	////DEBUG
	var consoleLogs = function() {
		console.log("HERE ARE THE consoleLogs() OUTPUTS");
		console.log("gridSize " + gridSize);
		console.log("consecutiveTiles " + consecutiveTiles);
		console.log("playerOne " + playerOne);
		console.log("playerTwo " + playerTwo);
		console.log("whoIsPlayingNow = " + whoIsPlayingNow[0]);
		console.log("numberOfTurns " + numberOfTurns);
		console.log("winner " + winner);
		console.log("currentRound " + currentRound);
		console.log("overallWinner " + overallWinner);
		console.log("emptyCellSymbol " + emptyCellSymbol);
		console.log("gridSize " + gridSize);
		console.log("emptyCellSymbolString " + emptyCellSymbolString);
		console.log("valuesArray for a grid size of " + gridSize + " = " + valuesArray);
		console.log("valuesArray " + valuesArray);
		console.log("winningScores " + winningScores);
		console.log("rowOneValues " + rowOneValues);
		console.log("rowTwoValues " + rowTwoValues);
		console.log("rowThreeValues " + rowThreeValues);
		console.log("rowFourValues " + rowFourValues);
		console.log("rowFiveValues " + rowFiveValues);
		console.table(allInputsArray);
		console.table(allValuesArray);
		console.log("playerScoreThisRound " + playerScoreThisRound);

	};

	$('img').on('click', function() {
		consoleLogs();
	});


}); ///close the jQuery listener. $(function() means the page Document Object Model (DOM) is ready for JavaScript code to execute, images/scaffolding will load before any JavaScript does.
