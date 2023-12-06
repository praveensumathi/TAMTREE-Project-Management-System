import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Projects from "./pages/projects/Projects";
import Board from "./pages/board/Board";

function App() {
  return (
    <>
      {/* <Board /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Projects />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Boards/:projectId" element={<Board />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
