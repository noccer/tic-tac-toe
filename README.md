# Niall's Tic-Tac-Toe

The key features I wanted in my game were:

- A game that is simple to look at and is mobile responsive.
- An option to vary the grid size from a 3x3 grid to a 5x5 grid.
- For larger grids, an option to choose how many tiles in a row win the game.

## Technologies Used

- HTML5
- CSS3 - Many transition effects!
- JavaScript
- jQuery
- Google Fonts
- [ShakyCSS](https://elrumordelaluz.github.io/csshake/ "Get your shake on!") - To make already clicked buttons shake!

## Approach Taken

I opted to go for the Magic numbers solution. This was fairly challenging concept because the 'winning values' of each cell change depending on number of tiles and number of tiles-in-a-row to win. Here are the following possibilities:

- 3x3 grid - 3-in-a-row
- 4x4 grid - 3-in-a-row
- 4x4 grid - 4-in-a-row
- 5x5 grid - 3-in-a-row
- 5x5 grid - 4-in-a-row
- 5x5 grid - 5-in-a-row

The magic numbers solution means assigning a value of 1 to the top-left cell, then double the following cell, and so on to the end. The last value in the 3x3 grid is 256, while the last in the 5x5 is worth 16777216!  When a player selects a cell, the value of this cell is added to their score to be checked against the 'winningScores' array.

I gathered up all the possible winning combinations for the 6 arrays, concatenated the values in to comma separated strings, then imported directly into 6 unique arrays in my JavaScript app. When a player chooses a grid size or how many tiles to be used, the program checks these parameters and pulls out the correct 'winningScores' array.

The final piece of the magic numbers is when a player happens to win a round, but their score is not a number contained in the winningScores array. I used a Bitwise operator to check if the players winning score was a component of the 'winningScores' array. See notes on line 228 of the app.js file.

## Unsolved Problems

- No reset button at the end of the game
- When a round is complete, if the winning player clicks the board again, they win another round! This was actually very useful for simulating full game runs.
- The bottom buttons need more logic added so that they display at the correct times.
- Bottom buttons need further conditional styling so that their text does not display when a round is won.

## Features Left Out

I would have liked to roll out more features into the frontend of the game. The backend engine has been programmed to take some of the following user inputs:

- Player Name
- Player Letter (X or O or anything else)
- Number of Games to win match

I would have liked to have programmed in the following logic:

- After round 1, 1st player to play is the loser from the last round.
- When a player wins, the tiles that won their game are highlighted.

## My GitHub Repo

<https://github.com/noccer2016/tic-tac-toe>

## Hosted Version of My Game
(temporary until loaded into gh-pages)
https://dl.dropboxusercontent.com/u/16431072/niall_tic-tac-toe/index.html
