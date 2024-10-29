const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const currentPlayerText = document.getElementById('currentPlayer');
const resetButton = document.getElementById('reset');

// Game variables
let currentPlayer = '🌙'; // '🌙' for moon, '⭐' for star
let boardState = Array(9).fill(null);
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Start game
board.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Check if cell is already clicked
    if (boardState[index] !== null || checkWinner()) return;

    // Update board state and cell content
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check if the current player wins or if it’s a draw
    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
    } else if (boardState.every(cell => cell !== null)) {
        statusText.textContent = 'It\'s a draw!';
    } else {
        // Switch players
        currentPlayer = currentPlayer === '🌙' ? '⭐' : '🌙';
        currentPlayerText.textContent = currentPlayer;
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winPatterns.some(pattern => 
        pattern.every(index => boardState[index] === currentPlayer)
    );
}

function resetGame() {
    boardState.fill(null);
    board.forEach(cell => cell.textContent = '');
    currentPlayer = '🌙';
    currentPlayerText.textContent = currentPlayer;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}
// Get modal elements
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeModal = document.querySelector('.close');

// Function to show the winner modal
function showWinnerModal(winner) {
    winnerMessage.textContent = `Player ${winner} wins!`;
    winnerModal.style.display = 'flex';
}

// Close the modal when the close button is clicked
closeModal.onclick = function() {
    winnerModal.style.display = 'none';
    resetGame(); // Optional: reset game after closing modal
};

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target === winnerModal) {
        winnerModal.style.display = 'none';
        resetGame(); // Optional: reset game after closing modal
    }
}

// Modified checkWinner function to show the modal when someone wins
function checkWinner() {
    for (const pattern of winPatterns) {
        if (pattern.every(index => boardState[index] === currentPlayer)) {
            showWinnerModal(currentPlayer); // Show modal when there's a win
            showWinningLine(pattern);
            return true;
        }
    }
    return false;
}

