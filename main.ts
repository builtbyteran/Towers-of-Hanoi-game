// Represents 3 pegs
let board: number[][] = [[5, 4, 3, 2, 1], [], []];

const printBoard = () => {
  // Creates the pegs
  const currentBoard = board.map((peg) => `---${peg.join(' ')}`);

  // Logs the pegs
  currentBoard.forEach((peg) => {
    console.log('peg', peg);
  });
};

type PegIndex = 1 | 2 | 3;

const moveDisc = (source: PegIndex, target: PegIndex) => {
  // Turns the user inout to 0 based indexing for user convenience
  const sourcePeg: number[] = board[source - 1];
  const targetPeg: number[] = board[target - 1];

  // Logic for moving discs, ex: peg[disc]
  const successfulMove =
    (targetPeg.length === 0 && sourcePeg.length > 0) ||
    targetPeg[targetPeg.length - 1] > sourcePeg[sourcePeg.length - 1];

  // Check for invalid move before executing
  if (!successfulMove) {
    console.log(
      'You cannot move a larger disc on top of a smaller one, board is still:',
    );
  } else {
    console.log('That move was successful, board is now:');
    targetPeg.push(sourcePeg.pop()!);
  }

  printBoard();
  checkWinner();
};

const checkWinner = () => {
  if (board[1].length === 5) {
    console.log(
      "Congrats, you have successfully moved all the discs onto peg #2, you're a genius!",
    );
  }
  if (board[2].length === 5) {
    console.log(
      "Congrats, you have successfully moved all the discs onto peg #3, you're a genius!",
    );
  }

  return;
};

// Using non-null assertion operator, hard coded elements
const fromSelect = document.querySelector<HTMLSelectElement>('#from')!;
const toSelect = document.querySelector<HTMLSelectElement>('#to')!;
const moveBtn = document.querySelector<HTMLButtonElement>('#move')!;
const resetBtn = document.querySelector<HTMLButtonElement>('#reset')!;

moveBtn.addEventListener('click', () => {
  const from = Number(fromSelect.value) as PegIndex;
  const to = Number(toSelect.value) as PegIndex;

  if (to === from) {
    console.log('You must select different pegs');
    return;
  }

  moveDisc(from, to);
});

resetBtn.addEventListener('click', () => {
  // Arrays are truthy and [] === [] is false
  if (board[0].length === 5 && board[1].length === 0 && board[2].length === 0) {
    console.log('The board is already set to be played on');
  } else {
    console.log('The current board has been reset');
    board = [[5, 4, 3, 2, 1], [], []];
  }

  printBoard();
});

printBoard();
