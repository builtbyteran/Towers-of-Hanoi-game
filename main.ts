const createBoard = (disks: number): number[][] => {
  const firstPeg: number[] = [];

  for (let i = disks; i >= 1; i--) {
    firstPeg.push(i);
  }

  return [firstPeg, [], []];
};

let diskCount = 3;
let board = createBoard(diskCount);

const printBoard = () => {
  // Creates the pegs
  const currentBoard = board.map((peg) => `---${peg.join(' ')}`);

  // Logs the pegs
  currentBoard.forEach((peg) => {
    console.log('peg', peg);
  });
};

type PegIndex = 1 | 2 | 3;

const moveDisk = (source: PegIndex, target: PegIndex) => {
  // Turns the user inout to 0 based indexing for user convenience
  const sourcePeg: number[] = board[source - 1];
  const targetPeg: number[] = board[target - 1];

  // Logic for moving disks, ex: peg[disk]
  const successfulMove =
    (targetPeg.length === 0 && sourcePeg.length > 0) ||
    targetPeg[targetPeg.length - 1] > sourcePeg[sourcePeg.length - 1];

  // Check for invalid move before executing
  if (!successfulMove) {
    console.log(
      'You cannot move a larger disk on top of a smaller one, board is still:',
    );
  } else {
    console.log('That move was successful, board is now:');
    targetPeg.push(sourcePeg.pop()!);
  }

  printBoard();
  checkWinner();
};

const checkWinner = () => {
  if (board[1].length === diskCount) {
    console.log(
      "Congrats, you have successfully moved all the disks onto peg #2, you're a genius!",
    );
  }
  if (board[2].length === diskCount) {
    console.log(
      "Congrats, you have successfully moved all the disks onto peg #3, you're a genius!",
    );
  }

  return;
};

// Using non-null assertion operator, hard coded elements
const changeSelect = document.querySelector<HTMLSelectElement>('#change')!;
const resetBtn = document.querySelector<HTMLButtonElement>('#reset')!;
const fromSelect = document.querySelector<HTMLSelectElement>('#from')!;
const toSelect = document.querySelector<HTMLSelectElement>('#to')!;
const moveBtn = document.querySelector<HTMLButtonElement>('#move')!;

changeSelect.addEventListener('click', () => {
  diskCount = Number(changeSelect.value);
  board = createBoard(diskCount);
  console.log('The current board has been reset');
  console.log(`Board is now ${diskCount} disks.`);
  printBoard();
});

moveBtn.addEventListener('click', () => {
  const from = Number(fromSelect.value) as PegIndex;
  const to = Number(toSelect.value) as PegIndex;

  if (to === from) {
    console.log('You must select different pegs');
    return;
  }

  moveDisk(from, to);
});

resetBtn.addEventListener('click', () => {
  // Arrays are truthy and [] === [] is false
  if (
    board[0].length === diskCount &&
    board[1].length === 0 &&
    board[2].length === 0
  ) {
    console.log('The board is already set to be played on');
  } else {
    console.log('The current board has been reset');
    board = createBoard(diskCount);
  }

  printBoard();
});

printBoard();
