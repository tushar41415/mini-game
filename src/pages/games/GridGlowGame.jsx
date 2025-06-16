// GridGlowGame.jsx
import React, { useEffect, useState } from "react";
import "./GridGlowGame.css";

const totalBoxes = 64;
const getRandomIndex = () => Math.floor(Math.random() * totalBoxes);

const GridGlowGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [level, setLevel] = useState(1);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [glowIndex, setGlowIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Click to Start");

  useEffect(() => {
    if (sequence.length > 0 && isShowingSequence) {
      showSequence();
    }
  }, [sequence]);

  const generateSequence = (length) => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(getRandomIndex());
    }
    return newSequence;
  };

  const startGame = () => {
    setGameOver(false);
    setMessage("Watch the sequence");
    const newSeq = generateSequence(level + 2); // starting from 3 items
    setUserInput([]);
    setSequence(newSeq);
    setIsShowingSequence(true);
  };

  const showSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setGlowIndex(sequence[i]);
          setTimeout(() => {
            setGlowIndex(null);
            resolve();
          }, 400);
        }, 700);
      });
    }
    setIsShowingSequence(false);
    setMessage("Repeat the sequence");
  };

  const handleBoxClick = (index) => {
    if (gameOver || isShowingSequence) return;

    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 300);

    const newUserInput = [...userInput, index];
    setUserInput(newUserInput);

    for (let i = 0; i < newUserInput.length; i++) {
      if (newUserInput[i] !== sequence[i]) {
        setGameOver(true);
        setMessage("Game Over! Try Again");
        return;
      }
    }

    if (newUserInput.length === sequence.length) {
      setLevel((prev) => prev + 1);
      setTimeout(() => startGame(), 1000);
    }
  };

  return (
    <div className="game-container text-center">
      <h2 className="mb-2">🧠 GridGlow Memory Challenge</h2>
      <p className="status-message mb-3">{message}</p>
      <div className="grid-container">
  {[...Array(totalBoxes)].map((_, i) => (
    <div
      key={i}
      className={`grid-box ${glowIndex === i ? "glow" : ""} ${clickedIndex === i ? "click-glow" : ""}`}
      onClick={() => handleBoxClick(i)}
    ></div>
  ))}
</div>

      {gameOver ? (
        <button className="btn btn-danger mt-4" onClick={() => {
          setLevel(1);
          startGame();
        }}>Restart Game</button>
      ) : (
        <button className="btn btn-primary mt-4" onClick={startGame} disabled={isShowingSequence}>
          {level === 1 && sequence.length === 0 ? "Start Game" : "Next Round"}
        </button>
      )}
      <p className="mt-2">Level: {level}</p>
    </div>
  );
};

export default GridGlowGame;
