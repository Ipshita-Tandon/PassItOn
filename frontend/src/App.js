import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signUp.jsx";
import Explore from "./pages/explore.jsx";
import HomePage from "./pages/homepage.jsx";
import AboutUs from "./pages/aboutUs.jsx"
import ContactUs from "./pages/contactUs.jsx";
import Profile from "./pages/profile.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Explore />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
