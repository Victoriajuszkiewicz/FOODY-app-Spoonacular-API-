import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./views/Home/HomePage";

// test test

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
