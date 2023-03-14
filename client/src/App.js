import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./views/Home/HomePage";
import ResultView from "./components/ResultView";

// test test

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="*"
          element={<HomePage recipes={recipes} setRecipes={setRecipes} />}
        />
        {/* <Route
          path="/resultview"
          element={<ResultView recipes={recipes} setRecipes={setRecipes} />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
