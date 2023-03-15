import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./views/Home/HomePage";
import ResultView from "./components/ResultView";
import LoginView from "./views/LoginView";
import RecipeView from "./components/RecipeView";

// test test

function App() {
  const [allRecipes, setAllRecipes] = useState([]); //I just changed to allRecipes to differenciate with "recipe" state
  const [recipe, setRecipe] = useState({});//the recipe you clicked on in the result page
  const navigate = useNavigate();//define it first then you can use it later

  const showRecipe = (id) => {
    let featuredRecipe = allRecipes.find((r) => r.id === id); //use the id to find the correspondent recipe
    setRecipe(featuredRecipe); //save the correspondent recipe to the state
    navigate(`/featured/${id}`);//navigate to the correspondent recipe page
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="*"
          element={<HomePage allRecipes={allRecipes} setAllRecipes={setAllRecipes} />}
        />
        <Route
          path="/resultview"
          element={<ResultView allRecipes={allRecipes} setAllRecipes={setAllRecipes} showRecipe={showRecipe} />}
        />
        <Route path="/Featured/:id" element={<RecipeView recipe={recipe}  />} />

        <Route path="/login" element={<LoginView />} />
      </Routes>
    </div>
  );
}

export default App;
