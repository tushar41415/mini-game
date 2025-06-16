import React from "react";
import { Link } from "react-router-dom";
import "./GameList.css";

const games = [
    {
        name: "➕ Math Addition",
        description: "Add numbers quickly before the time runs out!",
        path: "/math-addition",
    },
    {
        name: "🎨 Color Match",
        description: "Match the actual color of the text, not the word!",
        path: "/color-match",
    },
    {
        name: "😂 Emoji Tap",
        description: "Tap the matching emoji before the time runs out!",
        path: "/emoji-tap",
    },
    {
        name: "🧠 GridGlow Memory",
        description: "Watch the glowing boxes and repeat the sequence to level up!",
        path: "/grid-glow",
    },
    {
        name: "🎴 Flip the Card",
        description: "Memorize and flip the correct cards to level up!",
        path: "/flip-card",
    }

];

const GameList = () => {
  return (
    <div className="game-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="container text-center animated-fade-in">
        <h1 className="mb-5 text-light glow-text">🎮 Choose a Game</h1>
        <div className="row justify-content-center">
          {games.map((game, index) => (
            <div className="col-md-5 mb-4" key={index}>
              <Link to={game.path} className="text-decoration-none">
                <div className="glass-card p-4 h-100 hover-glow">
                  <h4 className="text-light glow-text">{game.name}</h4>
                  <p className="text-white-50">{game.description}</p>
                  <button className="btn btn-outline-light mt-3">▶ Play</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
