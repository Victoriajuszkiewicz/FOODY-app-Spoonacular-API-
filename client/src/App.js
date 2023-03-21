import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import "./App.css";
import { Local } from "./helpers/Local";
import { Api } from "./helpers/Api";
import NavBar from "./components/NavBar";
import HomePage from "./views/Home/HomePage";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import ResultView from "./components/ResultView";
import RecipeView from "./components/RecipeView";
import { getIngredientList, getSteps } from "./helpers/Api";

function App() {
  const [allRecipes, setAllRecipes] = useState([]); //I just changed to allRecipes to differenciate with "recipe" state
  const navigate = useNavigate(); //define it first then you can use it later
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  let [allRegistered, setAllRegistered] = useState([]);
  let [ingredients, setIngredients] = useState([]);

  const [recipe, setRecipe] = useState(""); //the recipe you clicked on in the result page
  const [recipeInstructions, setRecipeInstructions] = useState();
  const [ingredientList, setIngredientList] = useState();

  //BACKEND ROUTES

  //GETs all registered users/works yay!
  useEffect(() => {
    fetch("http://localhost:5000/api/register")
      .then((res) => res.json())
      .then((json) => {
        setAllRegistered(json);
      })
      .catch((error) => {
        console.log(`Server error: ${error.message}`);
      });
  }, []);

  // POST (add new user to DB)- not tested
  async function addNew(registerForm) {
    let options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(registerForm),
    };
    // console.log(registerForm);
    // console.log("passed to DB");

    try {
      let response = await fetch("http://localhost:5000/api/register", options);
      if (response.ok) {
        let data = await response.json();
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  // END OF DB ROUTES

  //AUTHORISATION
  // login
  async function doLogin(loginObj) {
    const myresponse = await Api.loginUser(loginObj);
    console.log("passed to DB");
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      console.log("you are logged in");
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      //after clicking on login, if the action succeed then the user is redirected to the homepage
      navigate("*");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  // logout
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
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
      const { ingredients } = await getIngredientList(recipe.id);
      setIngredientList(ingredients);
    }
    if (recipe) {
      fetchData();
    }
  }, [recipe]);

  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} setIngredients={setIngredients} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              allRecipes={allRecipes}
              setAllRecipes={setAllRecipes}
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          }
        />
        <Route
          path="/resultview"
          element={
            <ResultView
              allRecipes={allRecipes}
              setAllRecipes={setAllRecipes}
              showRecipe={showRecipe}
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          }
        />
        <Route
          path="/Featured/:id"
          element={
            <RecipeView
              recipe={recipe}
              recipeInstructions={recipeInstructions}
              ingredientList={ingredientList}
              setRecipe={setRecipe}
            />
          }
        />

        <Route
          path="/login"
          element={
            <LoginView inputLoginCb={doLogin} loginError={loginErrorMsg} />
          }
        />
        <Route path="/register" element={<RegisterView addNewCb={addNew} />} />
      </Routes>
    </div>
  );
}

export default App;
