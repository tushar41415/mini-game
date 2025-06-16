import React, { useEffect, useRef, useState } from "react";
import "./ColorMatchGame.css";

const colors = ["Red", "Green", "Blue"];
const colorMap = {
  Red: "#dc3545",
  Green: "#28a745",
  Blue: "#007bff",
};

const ColorMatchGame = () => {
  const [displayColorName, setDisplayColorName] = useState("");
  const [actualColor, setActualColor] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reason, setReason] = useState("");

  const generateColor = () => {
    const name = colors[Math.floor(Math.random() * colors.length)];
    let actual = colors[Math.floor(Math.random() * colors.length)];
    while (actual === name) {
      actual = colors[Math.floor(Math.random() * colors.length)];
    }
    setDisplayColorName(name);
    setActualColor(actual);
    setTimeLeft(5);
  };

  useEffect(() => {
    generateColor();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    if (timeLeft === 0) {
      setReason("timeout");
      setGameOver(true);
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const handleClick = (selected) => {
    if (selected === actualColor) {
      setScore((prev) => prev + 1);
      generateColor();
    } else {
      setReason("wrong");
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setReason("");
    generateColor();
  };

  return (
    <div className="game-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="glass-card text-center p-5 animated-fade-in w-100" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 fw-bold text-light glow-text">🎨 Color Match Game</h2>

        {gameOver ? (
          <div className="alert alert-danger p-4 rounded-4 shadow-lg animated-bounce-in">
            <h3 className="fw-bold">⛔ Game Over!</h3>
            <p className="fs-5">Score: <strong>{score}</strong></p>
            {reason === "wrong" && <div className="fs-6">❌ Wrong choice!</div>}
            {reason === "timeout" && <div className="fs-6">⏳ Time's up!</div>}

            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <button className="btn btn-primary px-4 rounded-4" onClick={restartGame}>
                🔁 Restart this Game
              </button>
              <a href="/" className="btn btn-outline-light px-4 rounded-4">
                🏠 Go to Home
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="fs-4 text-light">Score: <strong>{score}</strong></div>
            <div className="display-4 fw-bold my-4 glow-text" style={{ color: colorMap[actualColor] }}>
              {displayColorName}
            </div>
            <div className="mb-3">
              <span className="badge bg-warning text-dark fs-5 glowing-timer">
                ⏳ {timeLeft}s
              </span>
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`btn btn-lg px-4 rounded-4 text-white`}
                  style={{
                    backgroundColor: colorMap[color],
                    border: "none",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  }}
                  onClick={() => handleClick(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorMatchGame;
