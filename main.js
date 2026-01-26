let board = [[5, 4, 3, 2, 1], [], []]; // Represents the 3 pegs

const printBoard = function () {
  const currentBoard = board.map(function (peg) {
    return '---' + peg.join(' ');
  });

  currentBoard.forEach(function (peg) {
    console.log('peg', peg);
  });
};

const checkWinner = function () {
  if (board[1].length === 5) {
    console.log(
      "Congrats, you have successfully moved all the discs onto peg #2, you're a genius!"
    );
  } else if (board[2].length === 5) {
    console.log(
      "Congrats, you have successfully moved all the discs onto peg #3, you're a genius!"
    );
  }

  return;
};

const moveDisc = function (sourcePeg, targetPeg) {
  let successfulMove = 'That move was successful, board is now:';
  let error =
    'You cannot move a larger disc on top of a smaller one, board is still:';

  let originPeg = board[sourcePeg - 1];
  let moveToPeg = board[targetPeg - 1];

  if (moveToPeg.length === 0) {
    moveToPeg.push(originPeg.pop());
    console.log(successfulMove);
  } else if (
    moveToPeg[moveToPeg.length - 1] > originPeg[originPeg.length - 1]
  ) {
    moveToPeg.push(originPeg.pop());
    console.log(successfulMove);
  } else {
    console.log(error);
  }

  checkWinner();
  printBoard();
};

document.querySelector('.reset').addEventListener('click', function () {
  // Arrays are truthy and [] === [] is false, so I had to write out some winded logic
  if (board[0].length === 5 && board[1].length === 0 && board[2].length === 0) {
    console.log('The board is already set to be played on!');
  } else {
    console.log('The current board has been reset!');
    board = [[5, 4, 3, 2, 1], [], []];
  }

  printBoard();
});

printBoard();
