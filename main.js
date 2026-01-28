"use strict";
// Using non-null assertion operator for hard coded elements
let diskCount = 3;
// Allows me to let the user select how many disks they want
const createBoard = (disks) => {
    const firstPeg = [];
    for (let i = disks; i >= 1; i--) {
        firstPeg.push(i);
    }
    return [firstPeg, [], []];
};
let board = createBoard(diskCount);
const moveDisk = (source, target) => {
    // Turns the user input to 0 based indexing
    const sourcePeg = board[source - 1];
    const targetPeg = board[target - 1];
    // Logic for moving disks, ex: peg[disk]
    const successfulMove = (targetPeg.length === 0 && sourcePeg.length > 0) ||
        targetPeg[targetPeg.length - 1] > sourcePeg[sourcePeg.length - 1];
    if (!successfulMove) {
        alert('You cannot do that move');
        return;
    }
    else {
        targetPeg.push(sourcePeg.pop());
    }
    renderBoard();
    checkWinner();
};
const checkWinner = () => {
    if (board[1].length === diskCount) {
        alert("Congrats, you moved all the disks onto peg #2, you're a genius!");
    }
    if (board[2].length === diskCount) {
        alert("Congrats, you moved all the disks onto peg #3, you're a genius!");
    }
    return;
};
const gameDisplay = document.getElementById('game');
const renderBoard = () => {
    gameDisplay.innerHTML = '';
    board.forEach((peg, index) => {
        const pegDisplay = document.createElement('div');
        pegDisplay.className =
            'peg card shadow-sm bg-light-subtle d-flex flex-column-reverse align-items-center';
        pegDisplay.textContent = `Peg ${index + 1}`;
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
const changeSelect = document.querySelector('#change');
const resetBtn = document.querySelector('#reset');
const fromSelect = document.querySelector('#from');
const toSelect = document.querySelector('#to');
const moveBtn = document.querySelector('#move');
changeSelect.addEventListener('change', () => {
    const value = Number(changeSelect.value);
    if (![3, 4, 5].includes(value)) {
        return;
    }
    diskCount = value;
    board = createBoard(diskCount);
    renderBoard();
});
moveBtn.addEventListener('click', () => {
    const from = Number(fromSelect.value);
    const to = Number(toSelect.value);
    if (to === from) {
        alert('You must select different pegs');
        return;
    }
    moveDisk(from, to);
});
resetBtn.addEventListener('click', () => {
    // Arrays are truthy and [] === [] is false
    if (board[0].length === diskCount &&
        board[1].length === 0 &&
        board[2].length === 0) {
        alert('The game already set to be played');
    }
    else {
        alert('Your current game has been reset');
        board = createBoard(diskCount);
    }
    renderBoard();
});
