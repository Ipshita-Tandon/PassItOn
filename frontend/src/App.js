import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/explore.jsx";
import HomePage from "./pages/homepage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;
