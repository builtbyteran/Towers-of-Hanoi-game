// Represents 3 pegs
var board = [[5, 4, 3, 2, 1], [], []];
var printBoard = function () {
    // Creates the pegs
    var currentBoard = board.map(function (peg) { return "---".concat(peg.join(' ')); });
    // Logs the pegs
    currentBoard.forEach(function (peg) {
        console.log('peg', peg);
    });
};
var moveDisc = function (source, target) {
    // Turns the user inout to 0 based indexing for user convenience
    var sourcePeg = board[source - 1];
    var targetPeg = board[target - 1];
    // Logic for moving discs, ex: peg[disc]
    var successfulMove = (targetPeg.length === 0 && sourcePeg.length > 0) ||
        targetPeg[targetPeg.length - 1] > sourcePeg[sourcePeg.length - 1];
    // Check for invalid move before executing
    if (!successfulMove) {
        console.log('You cannot do that move');
    }
    else {
        targetPeg.push(sourcePeg.pop());
    }
    checkWinner();
    printBoard();
};
var checkWinner = function () {
    if (board[1].length === 5) {
        console.log("Congrats, you have successfully moved all the discs onto peg #2, you're a genius!");
    }
    if (board[2].length === 5) {
        console.log("Congrats, you have successfully moved all the discs onto peg #3, you're a genius!");
    }
};
// Using non-null assertion operator for 'reset'
document
    .querySelector('.reset')
    .addEventListener('click', function () {
    // Arrays are truthy and [] === [] is false, so I came up with this
    if (board[0].length === 5 &&
        board[1].length === 0 &&
        board[2].length === 0) {
        console.log('The board is already set to be played on!');
    }
    else {
        console.log('The current board has been reset!');
        board = [[5, 4, 3, 2, 1], [], []];
    }
    printBoard();
});
printBoard();
