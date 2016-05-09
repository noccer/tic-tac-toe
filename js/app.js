console.log("app.js connected successfully.");
console.log("Welcome to Nialls Tic-Tac-Toe!");

var lineOne = "123";
var lineOneArray = lineOne.split("");
// console.log(lineOneArray);

var lineTwo = "456";
var lineTwoArray = lineTwo.split("");
// console.log(lineTwoArray);

var lineThree = "789";
var lineThreeArray = lineThree.split("");
// console.log(lineTwoArray);

var gameArray = [];

gameArray.push(lineOneArray);
gameArray.push(lineTwoArray);
gameArray.push(lineThreeArray);

console.table(gameArray);
