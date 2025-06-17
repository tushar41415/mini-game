// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameList from "./pages/GameList";
import MathAdditionGame from "./pages/games/MathAdditionGame";
import ColorMatchGame from "./pages/games/ColorMatchGame";
import EmojiTapGame from "./pages/games/EmojiTapGame";
import GridGlowGame from "./pages/games/GridGlowGame";
import FlipTheCardGame from "./pages/games/FlipTheCardGame";
import FindTheDifferentEmoji from "./pages/games/FindTheDifferentEmoji";
import TypeDash from "./pages/games/TypeDash";
import PrecisionCut from "./pages/games/PrecisionCut";
import GridMathTrap from "./pages/games/GridMathTrap";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/math-addition" element={<MathAdditionGame />} />
        <Route path="/color-match" element={<ColorMatchGame />} />
        <Route path="/emoji-tap" element={<EmojiTapGame />} />
        <Route path="/grid-glow" element={<GridGlowGame />} />
        <Route path="/flip-card" element={<FlipTheCardGame />} />
        <Route path="/find-different-emoji" element={<FindTheDifferentEmoji />} />
        <Route path="/type-dash" element={<TypeDash />} />
        <Route path="/precision-cut" element={<PrecisionCut />} />
        <Route path="/grid-math-trap" element={<GridMathTrap />} />








      </Routes>
    </Router>
  );
}
