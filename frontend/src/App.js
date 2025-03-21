import React from "react";
import Explore from "./pages/explore.jsx"
import HomePage from "./pages/homepage.jsx";
import Popular from "./pages/popular.jsx";

function App() {
  return (
    <div>
      <HomePage />
      <Explore />
      <Popular />
    </div>
  );
}

export default App;
