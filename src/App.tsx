import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Projects from "./pages/projects/Projects";
import Stories from "./pages/projects/Stories";




function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Projects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/stories" element={<Stories />} />
            
          </Route>
        </Routes>
        </Router>
      
    </>
  );
}

export default App;