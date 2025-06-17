// PrecisionCut.jsx
import React, { useEffect, useState, useRef } from "react";
import "./PrecisionCut.css";

const getRandomPercentage = () => Math.floor(Math.random() * 90) + 5;

const PrecisionCut = () => {
  const [targetPercent, setTargetPercent] = useState(getRandomPercentage());
  const [cutPercent, setCutPercent] = useState(null);
  const [moving, setMoving] = useState(true);
  const [result, setResult] = useState(null);
  const [position, setPosition] = useState(0);
  const direction = useRef(1);
  const barRef = useRef(null);

  useEffect(() => {
    let anim;
    if (moving) {
      anim = requestAnimationFrame(move);
    }
    return () => cancelAnimationFrame(anim);
  }, [moving]);

  const move = () => {
    setPosition((prev) => {
      let next = prev + direction.current * 1;
      if (next >= 100 || next <= 0) direction.current *= -1;
      return Math.max(0, Math.min(100, next));
    });
    requestAnimationFrame(move);
  };

  const handleClick = () => {
    if (!moving) return;
    setMoving(false);
    setCutPercent(position);
    const diff = Math.abs(position - targetPercent);
    setResult(100 - diff);
  };

  const restart = () => {
    setTargetPercent(getRandomPercentage());
    setCutPercent(null);
    setMoving(true);
    setResult(null);
    setPosition(0);
    direction.current = 1;
  };

  return (
    <div className="precision-wrapper text-center" onClick={handleClick}>
      <h2>🎯 Precision Cut</h2>
      <p>Target: {targetPercent}%</p>

      <div className="bar-container">
        <div className="bar">
          <div
            ref={barRef}
            className="line"
            style={{ left: `${position}%` }}
          ></div>
          {cutPercent !== null && (
            <div
              className="cut-line"
              style={{ left: `${cutPercent}%` }}
            ></div>
          )}
          <div
            className="target-line"
            style={{ left: `${targetPercent}%` }}
          ></div>
        </div>
      </div>

      {result !== null && (
        <div className="alert alert-info mt-3">
          You were {Math.abs(targetPercent - cutPercent).toFixed(1)}% off<br />
          Accuracy: <strong>{result.toFixed(1)}%</strong>
          <div>
            <button className="btn btn-primary mt-3" onClick={restart}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrecisionCut;
