const board = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeModal = document.querySelector('.close');

let currentPlayer = '🌙'; // Starting player (Moon)
let boardState = Array(9).fill(null);
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] || checkWinner()) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        showWinnerModal(currentPlayer);
    } else {
        currentPlayer = currentPlayer === '🌙' ? '⭐' : '🌙'; // Switch players
    }
}

function checkWinner() {
    for (const pattern of winPatterns) {
        if (pattern.every(index => boardState[index] === currentPlayer)) {
            return true; // Return true if a winner is found
        }
    }
    return false; // No winner
}

function showWinnerModal(winner) {
    winnerMessage.textContent = `You win, Player ${winner}!`;
    winnerModal.style.display = 'flex'; // Show the modal
}

// Close modal functionality with one click
closeModal.onclick = function() {
    closeModalFunction();
};

window.onclick = function(event) {
    if (event.target === winnerModal) {
        closeModalFunction();
    }
};

function closeModalFunction() {
    winnerModal.style.display = 'none'; // Hide the modal
    resetGame(); // Reset the game when the modal is closed
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = '🌙'; // Reset to starting player
}
