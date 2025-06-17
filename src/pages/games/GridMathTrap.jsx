import React, { useState, useEffect } from "react";
import "./GridMathTrap.css";

const GRID_SIZE = 6;
const MAX_SELECTION = 4;

const generateGrid = (level) => {
  let numbers = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    let min = Math.max(1, level * 2);
    let max = level * 10;
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
};

const pickTarget = (grid) => {
  const indices = [];
  while (indices.length < 2 + Math.floor(Math.random() * 3)) {
    const idx = Math.floor(Math.random() * grid.length);
    if (!indices.includes(idx)) indices.push(idx);
  }
  const target = indices.reduce((sum, idx) => sum + grid[idx], 0);
  return { target, correctIndices: indices };
};

const GridMathTrap = () => {
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState([]);
  const [target, setTarget] = useState(0);
  const [correctIndices, setCorrectIndices] = useState([]);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    setupNewLevel();
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [level, gameOver]);

  const setupNewLevel = () => {
    const newGrid = generateGrid(level);
    const { target, correctIndices } = pickTarget(newGrid);
    setGrid(newGrid);
    setTarget(target);
    setCorrectIndices(correctIndices);
    setSelected([]);
    setTimer(10);
  };

  const handleClick = (index) => {
    if (gameOver || selected.includes(index)) return;
    const newSelected = [...selected, index];
    const total = newSelected.reduce((sum, idx) => sum + grid[idx], 0);

    if (newSelected.length <= MAX_SELECTION) {
      setSelected(newSelected);
      if (total === target) {
        setLevel(level + 1);
        setupNewLevel();
      } else if (total > target || newSelected.length === MAX_SELECTION) {
        setGameOver(true);
      }
    }
  };

  const restart = () => {
    setLevel(1);
    setGameOver(false);
    setupNewLevel();
  };

  return (
    <div className="trap-wrapper text-center">
      <h2>🧮 Grid Math Trap</h2>
      <div className="target-box my-3">
        🎯 Target: <span className="glow">{target}</span>
      </div>
      <div className="info-bar">
        <span>Level: {level}</span>
        <span>Time Left: {timer}s</span>
      </div>
      {gameOver && (
        <div className="alert alert-danger">
          <h4>Game Over!</h4>
          <p>Correct Answer was: {correctIndices.map(i => grid[i]).join(" + ")} = {target}</p>
          <button className="btn btn-danger m-2" onClick={restart}>Restart This Game</button>
          <a href="/" className="btn btn-secondary m-2">Go to Home</a>
        </div>
      )}
      <div className="grid-box mt-4">
        {grid.map((num, idx) => (
          <button
            key={idx}
            className={`cell ${selected.includes(idx) ? "selected" : ""}`}
            onClick={() => handleClick(idx)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GridMathTrap;
