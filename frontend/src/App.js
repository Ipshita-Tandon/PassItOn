import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/explore.jsx";
import HomePage from "./pages/homepage.jsx";
import Popular from "./pages/popular.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </Router>
  );
}

export default App;
