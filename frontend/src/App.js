import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/explore.jsx";
import HomePage from "./pages/homepage.jsx";
import TechProfile from "./pages/techproflie.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Explore />} />
        <Route path="/techprofile" element={<TechProfile/>} />
        
        
      </Routes>
    </Router>

  );
}

export default App;
