// FindTheDifferentEmoji.jsx
import React, { useEffect, useState } from "react";
import "./FindTheDifferentEmoji.css";

const allEmojis = [
  "😄", "😅", "😂", "😊", "😁", "🤣", "😆", "😃",
  "🙃", "😜", "🤪", "😋", "😎", "🥰", "😍", "😗"
];

const getRandomEmoji = () => {
  const idx = Math.floor(Math.random() * allEmojis.length);
  return allEmojis[idx];
};

const FindTheDifferentEmoji = () => {
  const [gridSize, setGridSize] = useState(4);
  const [emojis, setEmojis] = useState([]);
  const [oddIndex, setOddIndex] = useState(null);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const generateGrid = () => {
    const correct = getRandomEmoji();
    let odd;
    do {
      odd = getRandomEmoji();
    } while (odd === correct);
    const total = gridSize * gridSize;
    const index = Math.floor(Math.random() * total);
    const arr = Array(total).fill(correct);
    arr[index] = odd;
    setOddIndex(index);
    setEmojis(arr);
    setTimeLeft(5);
  };

  useEffect(() => {
    generateGrid();
  }, [level]);

  const handleClick = (index) => {
    if (gameOver) return;
    if (index === oddIndex) {
      setLevel(level + 1);
      if ((level + 1) % 3 === 0 && gridSize < 8) setGridSize(gridSize + 1);
    } else {
      setGameOver(true);
    }
  };

  const restart = () => {
    setGameOver(false);
    setLevel(1);
    setGridSize(4);
    generateGrid();
  };

  return (
    <div className="emoji-game-container">
      <h2>Find the Different Emoji! 🕵️‍♂️</h2>
      <p>Level: {level} | Time Left: {timeLeft}s</p>
      {gameOver ? (
        <div className="emoji-game-over">
          <h3>Game Over 💥</h3>
          <button onClick={restart} className="btn btn-primary">Restart Game</button>
        </div>
      ) : (
        <div
          className="emoji-grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {emojis.map((e, i) => (
            <div
              key={i}
              className="emoji-box"
              onClick={() => handleClick(i)}
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindTheDifferentEmoji;
