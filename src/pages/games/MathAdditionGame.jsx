import React, { useState, useEffect, useRef } from "react";
import "./MathAdditionGame.css"; // 👈 custom CSS here

const MathAdditionGame = () => {
  const [level, setLevel] = useState(1);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [reason, setReason] = useState("");
  const [userAnswer, setUserAnswer] = useState(null);

  const inputRef = useRef(null);

  const generateQuestion = (level) => {
    const max = 10 + level * 5;
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    setNum1(a);
    setNum2(b);
    setAnswer("");
    setTimeLeft(6);
    inputRef.current?.focus();
  };

  useEffect(() => {
    generateQuestion(level);
  }, [level]);

  useEffect(() => {
    if (gameOver) return;
    if (timeLeft === 0) {
      setReason("timeout");
      setGameOver(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (parseInt(answer) === num1 + num2) {
      setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 200);
    }
  }, [answer]);

  const checkAnswer = (e) => {
    e.preventDefault();
    const numericAnswer = parseInt(answer);
    if (numericAnswer === num1 + num2) {
      setLevel((prev) => prev + 1);
    } else {
      setUserAnswer(numericAnswer);
      setReason("wrong");
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setLevel(1);
    setGameOver(false);
    setReason("");
    setUserAnswer(null);
    generateQuestion(1);
  };

  return (
    <div className="game-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="glass-card text-center p-5 animated-fade-in w-100" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 fw-bold text-light glow-text">➕ Math Addition Game</h2>

        {gameOver ? (
          <div className="alert alert-danger p-4 rounded-4 shadow-lg animated-bounce-in">
            <h3 className="fw-bold">⛔ Game Over!</h3>
            <p className="fs-5">You reached Level <strong>{level}</strong></p>
            {reason === "wrong" && (
              <div className="mt-3 fs-6">
                ❌ Your Answer: <strong>{userAnswer}</strong><br />
                ✅ Correct Answer: <strong>{num1 + num2}</strong>
              </div>
            )}
            {reason === "timeout" && (
              <div className="mt-3 fs-6">
                ⏳ <strong>Time's Up!</strong><br />
                ✅ Correct Answer: <strong>{num1 + num2}</strong>
              </div>
            )}
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
            <div className="mb-3 fs-4 text-light">
              Level: <strong>{level}</strong>
            </div>
            <div className="display-4 mb-3 text-light fw-semibold animated-pop">
              {num1} + {num2} = ?
            </div>
            <div className="mb-4">
              <span className="badge bg-warning text-dark fs-5 glowing-timer">
                ⏳ {timeLeft}s
              </span>
            </div>
            <form onSubmit={checkAnswer} className="d-flex justify-content-center gap-2">
              <input
                ref={inputRef}
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control form-control-lg w-50 rounded-4 border-0"
                placeholder="Your answer"
                autoFocus
              />
              <button type="submit" className="btn btn-success btn-lg rounded-4">
                ✅
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MathAdditionGame;
