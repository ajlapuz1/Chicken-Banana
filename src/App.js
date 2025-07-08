import React, { useState } from 'react';
import './App.css';

const bananaUrl = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';
const chickenUrl = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
const youDiedUrl = 'https://www.pngall.com/wp-content/uploads/15/You-Died-PNG-Photos.png';

const GRID_SIZE = 6;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

function getRandomBoard() {
const board = [];
for (let i = 0; i < TOTAL_TILES; i++) {
board.push(Math.random() < 0.5 ? 'banana' : 'chicken');
}
return board;
}

function App() {
const [board, setBoard] = useState(getRandomBoard);
const [revealed, setRevealed] = useState(Array(TOTAL_TILES).fill(false));
const [playerChoice, setPlayerChoice] = useState(null); // 'banana' or 'chicken'
const [gameOver, setGameOver] = useState(false);
const [message, setMessage] = useState('');
const [showYouDied, setShowYouDied] = useState(false);

const handleTileClick = (index) => {
if (gameOver || revealed[index] || !playerChoice) return;

const newRevealed = [...revealed];
newRevealed[index] = true;
setRevealed(newRevealed);

const clickedItem = board[index];

if (clickedItem !== playerChoice) {
setGameOver(true);
setShowYouDied(true);
} else if (newRevealed.every((rev, idx) => !rev || board[idx] !== playerChoice)) {
setMessage(`Congratulations! You found all the ${playerChoice}s. You win!`);
setGameOver(true);
}
};

const startNewGame = () => {
setBoard(getRandomBoard());
setRevealed(Array(TOTAL_TILES).fill(false));
setGameOver(false);
setMessage('');
setPlayerChoice(null);
setShowYouDied(false);
};

return (
<div className="container">
<h1>Chicken Banana</h1>

{!playerChoice && (
<div className="choice">
<p>Select your side:</p>
<button onClick={() => setPlayerChoice('banana')}>Banana🍌</button>
<button onClick={() => setPlayerChoice('chicken')}>Chicken🐔</button>
</div>
)}

{playerChoice && <p>You are the <strong>{playerChoice.toUpperCase()} Player</strong>.</p>}

<div className="grid">
{board.map((item, index) => (
<div key={index} className="square" onClick={() => handleTileClick(index)}>
{revealed[index] ? (
<img src={item === 'banana' ? bananaUrl : chickenUrl} alt={item} />
) : (
<div className="hidden-tile">?</div>
)}
</div>
))}
</div>

{message && <h2>{message}</h2>}
<button onClick={startNewGame}>Restart Game</button>

{showYouDied && (
<div className="you-died-overlay">
<img src={youDiedUrl} alt="YOU DIED" />
</div>
)}
</div>
);
}

export default App;