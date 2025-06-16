// TypeDash.jsx
import React, { useState, useEffect, useRef } from "react";
import "./TypeDash.css";

const WORDS = [
  "react", "javascript", "keyboard", "function", "variable",
  "typing", "coding", "object", "state", "props",
  "developer", "import", "export", "async", "await"
];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const TypeDash = () => {
  const [word, setWord] = useState(getRandomWord());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;
    inputRef.current.focus();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [word, gameOver]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (val === word) {
      const nextScore = score + 1;
      setScore(nextScore);
      setInput("");
      setWord(getRandomWord());
      setTimeLeft(Math.max(2, 5 - Math.floor(nextScore / 5))); // faster over time
      if (nextScore % 5 === 0) setLevel((l) => l + 1);
    }
  };

  const restart = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(5);
    setWord(getRandomWord());
    setInput("");
    setGameOver(false);
  };

  return (
    <div className="typedash-wrapper text-center">
      <h2>🔤 Type Dash</h2>
      <p>Score: {score} | Level: {level} | Time Left: {timeLeft}s</p>
      {gameOver ? (
        <div className="alert alert-danger">
          <h4>⏱️ Time's Up!</h4>
          <button onClick={restart} className="btn btn-danger m-2">Restart This Game</button>
          <a href="/" className="btn btn-secondary m-2">Go to Home</a>
        </div>
      ) : (
        <>
          <h3 className="mt-4 mb-3">{word}</h3>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            className="form-control text-center mx-auto"
            style={{ maxWidth: "300px" }}
          />
        </>
      )}
    </div>
  );
};

export default TypeDash;
