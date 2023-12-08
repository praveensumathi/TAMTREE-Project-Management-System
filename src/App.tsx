import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Projects from "./pages/projects/Projects";
import Board from "./pages/board/Board";
import DragAndDrop from "./DragAndDrop";
import "./style.css";
import Employee from "./pages/employee/Employee";
// import { useParams } from "react-router-dom";

function App() {
  // const { projectId } = useParams();

  return (
    <>
      {/* <DragAndDrop /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Projects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/board/:projectId" element={<Board />} />
            <Route path="/employees" element={<Employee />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
