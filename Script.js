// JavaScript for Tic Tac Toe game

// Constants for class names and winning combinations
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Selecting necessary elements from the DOM
const cellElements = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const resultMessageElement = document.getElementById('resultMessage');
const resultMessageTextElement = document.getElementById('resultMessageText');
const restartButton = document.getElementById('restartButton');
const playerTurnElement = document.getElementById('playerTurn');

// Variable to track whose turn it is
let circleTurn;

// Function to start the game
function startGame() {
    // Initially, it's X's turn
    circleTurn = false;
    // Resetting each cell's class and event listeners
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    // Setting up the initial state of the game board and result message
    setBoardHoverClass();
    resultMessageElement.classList.remove('show');
}

// Event listener for restart button
restartButton.addEventListener('click', startGame);

// Function to handle click on a cell
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // Placing the mark (X or O) on the clicked cell
    placeMark(cell, currentClass);
    // Checking if the game is won or ended in a draw
    if (checkWin(currentClass)) {
        endGame(false); // Ends the game with a win
    } else if (isDraw()) {
        endGame(true); // Ends the game in a draw
    } else {
        swapTurns(); // Swaps turns between X and O
        setBoardHoverClass(); // Sets hover effect based on whose turn it is
    }
}

// Function to end the game
function endGame(draw) {
    // Displaying result message
    if (draw) {
        resultMessageTextElement.innerText = 'Draw!';
    } else {
        resultMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Won!`;
    }
    resultMessageElement.classList.add('show'); // Showing the result message
}

// Function to check if the game ended in a draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

// Function to place X or O mark on the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Function to swap turns between X and O
function swapTurns() {
    circleTurn = !circleTurn; // Toggles between true and false
    // Updates the display to show whose turn it is
    playerTurnElement.innerText = circleTurn ? "O's Turn" : "X's Turn";
}

// Function to set hover effect based on whose turn it is
function setBoardHoverClass() {
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        gameBoard.classList.add(CIRCLE_CLASS); // Adds hover effect for O's turn
        playerTurnElement.innerText = "O's Turn"; // Updates turn display
    } else {
        gameBoard.classList.add(X_CLASS); // Adds hover effect for X's turn
        playerTurnElement.innerText = "X's Turn"; // Updates turn display
    }
}

// Function to check if a player has won the game
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

// Starting the game when the page loads
startGame();
