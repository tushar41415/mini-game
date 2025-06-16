// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <button
        onClick={() => navigate("/games")}
        className="btn btn-warning btn-lg fw-bold shadow-lg"
        style={{ animation: "bounce 1s infinite" }}
      >
        ▶ Play Game
      </button>
    </div>
  );
};

export default Home;
