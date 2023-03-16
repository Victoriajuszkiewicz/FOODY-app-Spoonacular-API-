import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import "./App.css";
import Local from "./helpers/Local";
import { Api } from "./helpers/Api";

import NavBar from "./components/NavBar";
import HomePage from "./views/Home/HomePage";

import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import ResultView from "./components/ResultView";
import RecipeView from "./components/RecipeView";

import { getSteps } from "./helpers/Api";

function App() {
  const [allRecipes, setAllRecipes] = useState([]); //I just changed to allRecipes to differenciate with "recipe" state
  const [recipe, setRecipe] = useState({}); //the recipe you clicked on in the result page
  const navigate = useNavigate(); //define it first then you can use it later
  const [recipeInstructions, setRecipeInstructions] = useState();
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  //AUTHORISATION
  async function doLogin(loginObj) {
    const myresponse = await Api.loginUser(loginObj);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  // RECIPES
  const showRecipe = (id) => {
    let featuredRecipe = allRecipes.find((r) => r.id === id); //use the id to find the correspondent recipe
    setRecipe(featuredRecipe); //save the correspondent recipe to the state
    Local.saveFeaturedRecipe(featuredRecipe); //save to the localStorage!!!
    navigate(`/featured/${id}`); //navigate to the correspondent recipe page
  };

  useEffect(() => {
    async function fetchData() {
      const recipeInstructions = await getSteps(recipe.id);
      setRecipeInstructions(recipeInstructions);
    }
    if (recipe) {
      fetchData();
    }
  }, [recipe]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="*"
          element={
            <HomePage allRecipes={allRecipes} setAllRecipes={setAllRecipes} />
          }
        />
        <Route
          path="/resultview"
          element={
            <ResultView
              allRecipes={allRecipes}
              setAllRecipes={setAllRecipes}
              showRecipe={showRecipe}
            />
          }
        />
        <Route
          path="/Featured/:id"
          element={<RecipeView recipe={recipe} setRecipe={setRecipe} />}
        />

        <Route
          path="/login"
          element={
            <LoginView inputLoginCb={doLogin} loginError={loginErrorMsg} />
          }
        />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </div>
  );
}

export default App;
