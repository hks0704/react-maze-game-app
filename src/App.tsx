import MazeBoard from "./components/MazeBoard";
import "./index.css"

function App() {
  return (
    <div className="app text-center">
      <h1>🧩 Maze Game</h1>
      <MazeBoard size={15}></MazeBoard>
    </div>
  );
}

export default App
