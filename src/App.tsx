import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "./layout/Layout";
import Projects from "./pages/projects/Projects";
import Board from "./pages/board/Board";
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Projects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/boards/:projectId" element={<Board />} />
          </Route>
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
