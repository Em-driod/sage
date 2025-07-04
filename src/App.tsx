import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar"; // Path might differ depending on your folder structure
import MainComponent from "./component/MainComponent";
import LandingPage from "./Pages/LandingPage";

const App: React.FC = () => {
  return (
    <div className="">
      {/* Navbar stays on top */}
      <Navbar />

      {/* Main content grows and routes switch here */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainComponent />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </div>
  );
};

export default App;

