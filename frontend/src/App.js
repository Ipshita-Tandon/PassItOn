import React from "react";
import HomePage from "./pages/homepage.jsx";
import Popular from "./pages/popular.jsx";
import Footer from "./components/footer.jsx"

 // Import HomePage component
// import Teammates from "./pages/teammates.jsx";

function App() {
  return (
    <div>
      <HomePage />
      <Popular />
      {/* <Teammates/> */}
      <Footer/>
    </div>
  );
}

export default App;
