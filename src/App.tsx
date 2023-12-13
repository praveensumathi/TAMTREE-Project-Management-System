import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Projects from "./pages/projects/Projects";
import Board from "./pages/board/Board";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Employees from "./pages/employee/Employees";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Projects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/board/:projectId" element={<Board />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Routes>
      </Router>

      <ReactQueryDevtools initialIsOpen buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
