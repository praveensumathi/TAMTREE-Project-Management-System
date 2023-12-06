import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Projects from "./pages/projects/Projects";
import Board from "./pages/board/Board";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Projects />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
