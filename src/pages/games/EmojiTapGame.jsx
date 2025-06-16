import React, { useEffect, useState } from "react";
import "./EmojiTapGame.css";
import { Link } from "react-router-dom";

const emojiList = [
  "🐶", "🐱", "🐰", "🦊", "🐼", "🐸", "🐵", "🐯", "🦁", "🐷",
  "🐮", "🐔", "🦄", "🐙", "🦕", "🐳", "🐢", "🦉", "🦀", "🐞",
  "🦋", "🐝", "🐍", "🦓", "🦧", "🐧", "🐊", "🦭", "🐫", "🐇",
  "🐿️", "🦔", "🐓", "🐡", "🦚", "🦩"
];

const getRandomEmojis = (correctEmoji, total = 12) => {
  let options = new Set([correctEmoji]);
  while (options.size < total) {
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    options.add(randomEmoji);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
};


const EmojiTapGame = () => {
  const [targetEmoji, setTargetEmoji] = useState("");
  const [emojiOptions, setEmojiOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [reason, setReason] = useState("");

  const startRound = () => {
  const newEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  setTargetEmoji(newEmoji);

  // 🧠 Dynamic emoji count: 6 + 1 for every 3 points, max 20
  const emojiCount = Math.min(6 + Math.floor(score / 3), 20);

  setEmojiOptions(getRandomEmojis(newEmoji, emojiCount));
  setTimeLeft(5);
};


  useEffect(() => {
    startRound();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    if (timeLeft === 0) {
      setGameOver(true);
      setReason("timeout");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const handleEmojiClick = (emoji) => {
    if (emoji === targetEmoji) {
      setScore((prev) => prev + 1);
      startRound();
    } else {
      setGameOver(true);
      setReason("wrong");
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setReason("");
    startRound();
  };

  return (
    <div className="game-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="glass-card text-center p-4 w-100 animated-fade-in" style={{ maxWidth: "500px" }}>
        <h2 className="mb-3 glow-text text-light">😂 Emoji Tap Game</h2>

        {gameOver ? (
          <div className="alert alert-danger rounded-4 p-4 animated-bounce-in">
            <h3 className="fw-bold">Game Over</h3>
            <p className="fs-5">Score: {score}</p>
            {reason === "timeout" && <div>⏳ Time's up!</div>}
            {reason === "wrong" && <div>❌ Wrong emoji clicked!</div>}
            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <button className="btn btn-primary rounded-4" onClick={restartGame}>
                🔁 Restart this Game
              </button>
              <Link to="/" className="btn btn-outline-light rounded-4">
                🏠 Go to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="fs-4 text-light">Score: {score}</div>
            <div className="display-1 mb-3 glow-text">{targetEmoji}</div>
            <div className="mb-3">
              <span className="badge bg-warning text-dark fs-5 glowing-timer">⏳ {timeLeft}s</span>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
              {emojiOptions.map((emoji, index) => (
                <button
                  key={index}
                  className="btn btn-light fs-2 shadow rounded-4 px-3 animated-pop"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmojiTapGame;
