
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import Loader from "./components/Loader";
import ReadAloud from "./components/readAloud.js";
import NavBar from "./components/navbar.jsx";

// Pages
import Login from "./pages/login.jsx";
import SignUp from "./pages/signUp.jsx";
import Explore from "./pages/explore.jsx";
import HomePage from "./pages/homepage.jsx";
import Teammates from "./pages/teammates.jsx";
import TechProfile from "./pages/techproflie.jsx";
import AboutUs from "./pages/aboutUs.jsx";
import ContactUs from "./pages/contactUs.jsx";
import MyCart from "./pages/mycart.jsx";
import Search from "./pages/search.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import SellingBook from "./pages/Sellingbook.jsx";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && authUser === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <ReadAloud />
      <Toaster />
      <MainContent authUser={authUser} />
    </Router>
  );
}

const MainContent = ({ authUser }) => {
  const location = useLocation();
  const hideNavBar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavBar && <NavBar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />

        {/* Protected Routes */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/homepage" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/categories" element={authUser ? <Explore /> : <Navigate to="/login" />} />
        <Route path="/teammates" element={authUser ? <Teammates /> : <Navigate to="/login" />} />
        <Route path="/sell" element={authUser ? <SellingBook /> : <Navigate to="/login" />} />
        <Route path="/techprofile" element={authUser ? <TechProfile /> : <Navigate to="/login" />} />
        <Route path="/search" element={authUser ? <Search /> : <Navigate to="/login" />} />
        <Route path="/book/:id" element={authUser ? <BookDetails /> : <Navigate to="/login" />} />
        <Route path="/about" element={authUser ? <AboutUs /> : <Navigate to="/login" />} />
        <Route path="/contact" element={authUser ? <ContactUs /> : <Navigate to="/login" />} />
        <Route path="/mycart" element={authUser ? <MyCart /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
