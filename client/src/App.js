import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./views/Home/HomePage";

// test test

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
