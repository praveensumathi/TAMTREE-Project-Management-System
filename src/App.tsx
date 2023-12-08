import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Projects from "./pages/projects/Projects";
import Board from "./pages/board/Board";
import "./style.css";
import Employee from "./pages/employee/Employees";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
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
