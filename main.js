var createBoard = function (disks) {
    var firstPeg = [];
    for (var i = disks; i >= 1; i--) {
        firstPeg.push(i);
    }
    return [firstPeg, [], []];
};
var diskCount = 3;
var board = createBoard(diskCount);
var printBoard = function () {
    // Creates the pegs
    var currentBoard = board.map(function (peg) { return "---".concat(peg.join(' ')); });
    // Logs the pegs
    currentBoard.forEach(function (peg) {
        console.log('peg', peg);
    });
};
var moveDisk = function (source, target) {
    // Turns the user inout to 0 based indexing for user convenience
    var sourcePeg = board[source - 1];
    var targetPeg = board[target - 1];
    // Logic for moving disks, ex: peg[disk]
    var successfulMove = (targetPeg.length === 0 && sourcePeg.length > 0) ||
        targetPeg[targetPeg.length - 1] > sourcePeg[sourcePeg.length - 1];
    // Check for invalid move before executing
    if (!successfulMove) {
        console.log('You cannot move a larger disk on top of a smaller one, board is still:');
    }
    else {
        console.log('That move was successful, board is now:');
        targetPeg.push(sourcePeg.pop());
    }
    printBoard();
    checkWinner();
};
var checkWinner = function () {
    if (board[1].length === diskCount) {
        console.log("Congrats, you have successfully moved all the disks onto peg #2, you're a genius!");
    }
    if (board[2].length === diskCount) {
        console.log("Congrats, you have successfully moved all the disks onto peg #3, you're a genius!");
    }
    return;
};
// Using non-null assertion operator, hard coded elements
var changeSelect = document.querySelector('#change');
var resetBtn = document.querySelector('#reset');
var fromSelect = document.querySelector('#from');
var toSelect = document.querySelector('#to');
var moveBtn = document.querySelector('#move');
changeSelect.addEventListener('click', function () {
    diskCount = Number(changeSelect.value);
    board = createBoard(diskCount);
    console.log('The current board has been reset');
    console.log("Board is now ".concat(diskCount, " disks."));
    printBoard();
});
moveBtn.addEventListener('click', function () {
    var from = Number(fromSelect.value);
    var to = Number(toSelect.value);
    if (to === from) {
        console.log('You must select different pegs');
        return;
    }
    moveDisk(from, to);
});
resetBtn.addEventListener('click', function () {
    // Arrays are truthy and [] === [] is false
    if (board[0].length === diskCount &&
        board[1].length === 0 &&
        board[2].length === 0) {
        console.log('The board is already set to be played on');
    }
    else {
        console.log('The current board has been reset');
        board = createBoard(diskCount);
    }
    printBoard();
});
printBoard();
