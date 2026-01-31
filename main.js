'use strict';
// Num of disks currently in play
let diskCount = 3;
// Creates the initial board state
// Peg 1 starts with all disks, largest -> smallest
const createBoard = (disks) => {
  const firstPeg = [];
  for (let i = disks; i >= 1; i--) {
    firstPeg.push(i);
  }
  return [firstPeg, [], []];
};
// Current game state, is an array of pegs, pegs contain disks
let board = createBoard(diskCount);
// Moves top disk from one peg to another
const moveDisk = (source, target) => {
  // Converts 1-indexed user input to 0-based indexing
  const sourcePeg = board[source - 1];
  const targetPeg = board[target - 1];
  // Move if target is empty or top disk is larger
  const successfulMove =
    (targetPeg.length === 0 && sourcePeg.length > 0) ||
    targetPeg[targetPeg.length - 1] > sourcePeg[sourcePeg.length - 1];
  if (!successfulMove) {
    alert('You cannot do that move');
    return;
  } else {
    // Non-null assertion, because successful move guarantees sourcePeg has disk(s)
    targetPeg.push(sourcePeg.pop());
  }
  renderBoard();
  checkWinner();
};
// Checks if all disks are present on winning pegs
const checkWinner = () => {
  if (board[1].length === diskCount) {
    alert("Congrats, you moved all the disks onto peg #2, you're a genius!");
  }
  if (board[2].length === diskCount) {
    alert("Congrats, you moved all the disks onto peg #3, you're a genius!");
  }
  return;
};
// DOM elements
const gameDisplay = document.getElementById('game');
const changeSelect = document.querySelector('#change');
const resetBtn = document.querySelector('#reset');
const fromSelect = document.querySelector('#from');
const toSelect = document.querySelector('#to');
const moveBtn = document.querySelector('#move');
// Renders the current board state to the DOM
const renderBoard = () => {
  gameDisplay.innerHTML = '';
  board.forEach((peg, index) => {
    const pegDisplay = document.createElement('div');
    pegDisplay.className =
      'peg card shadow-sm bg-light-subtle d-flex flex-column-reverse align-items-center';
    pegDisplay.textContent = `Peg ${index + 1}`;
    // Render each disk on the peg
    peg.forEach((disk) => {
      const diskDisplay = document.createElement('div');
      diskDisplay.className = 'disk bg-light-subtle';
      diskDisplay.style.width = `${disk * 30}px`;
      diskDisplay.textContent = '---'.repeat(disk);
      pegDisplay.appendChild(diskDisplay);
    });
    gameDisplay.appendChild(pegDisplay);
  });
};
// Change disk quantity (difficulty)
changeSelect.addEventListener('change', () => {
  const value = Number(changeSelect.value);
  if (![3, 4, 5].includes(value)) {
    return;
  }
  diskCount = value;
  board = createBoard(diskCount);
  renderBoard();
});
// Handle user move
moveBtn.addEventListener('click', () => {
  const from = Number(fromSelect.value);
  const to = Number(toSelect.value);
  if (to === from) {
    alert('You must select different pegs');
    return;
  }
  moveDisk(from, to);
});
// Reset board/game to initial state
resetBtn.addEventListener('click', () => {
  // Check if game i already in starting postion
  if (
    board[0].length === diskCount &&
    board[1].length === 0 &&
    board[2].length === 0
  ) {
    alert('The game already set to be played');
  } else {
    alert('Your current game has been reset');
    board = createBoard(diskCount);
  }
  renderBoard();
});
