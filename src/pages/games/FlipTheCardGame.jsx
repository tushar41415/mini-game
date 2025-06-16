// FlipTheCardGame.jsx (Auto next level on correct)
import React, { useEffect, useState } from "react";
import "./FlipTheCardGame.css";

const gridSize = 6 * 6;

const FlipTheCardGame = () => {
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [actualFlipped, setActualFlipped] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const [level, setLevel] = useState(1);
  const [gamePhase, setGamePhase] = useState("start");

  useEffect(() => {
    if (gamePhase === "memorize") {
      const indices = generateRandomIndices(level + 2);
      setFlippedIndices(indices);
      setActualFlipped(indices);
      setTimeout(() => {
        setGamePhase("select");
        setFlippedIndices([]);
      }, 2000);
    }
  }, [gamePhase, level]);

  const generateRandomIndices = (count) => {
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * gridSize));
    }
    return [...indices];
  };

  const startGame = () => {
    setUserSelections([]);
    setGamePhase("memorize");
  };

  const handleCardClick = (index) => {
    if (gamePhase !== "select" || userSelections.includes(index)) return;
    const newSelections = [...userSelections, index];
    setUserSelections(newSelections);

    if (newSelections.length === level + 2) {
      const correct = actualFlipped.sort().toString();
      const selected = newSelections.sort().toString();
      setTimeout(() => {
        if (correct === selected) {
          setLevel((prev) => prev + 1);
          setUserSelections([]);
          setGamePhase("memorize");
        } else {
          setGamePhase("lose");
        }
      }, 500);
    }
  };

  return (
    <div className="flip-game-container text-center">
      <h2>🧠 Flip the Card Memory Game</h2>
      <p>Level: {level}</p>

      {gamePhase === "start" && (
        <button className="btn btn-primary" onClick={startGame}>Start Game</button>
      )}

      {gamePhase === "lose" && (
        <div>
          <h4 className="text-danger">❌ Game Over! Try Again</h4>
          <button className="btn btn-warning mt-2" onClick={() => setGamePhase("start")}>Restart</button>
        </div>
      )}

      <div className="flip-grid mt-3">
        {[...Array(gridSize)].map((_, i) => {
          const isFlipped =
            (gamePhase === "memorize" && flippedIndices.includes(i)) ||
            userSelections.includes(i);
          return (
            <div
              key={i}
              className={`flip-card-square ${isFlipped ? "flipped-square" : ""}`}
              onClick={() => handleCardClick(i)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FlipTheCardGame;

// Game List Entry:
// {
//   name: "🎴 Flip the Card",
//   description: "Memorize the flipped cards and pick them to level up!",
//   path: "/flip-card",
// }