import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";
import Modules from "./components/Modules";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
      </Routes>
    </Router>
  );
}

export default App;
