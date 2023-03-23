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
import FavoritesView from "./views/FavoritesView";
import PrivateRoute from "./components/PrivateRoute";

import { getIngredientList, getSteps } from "./helpers/Api";

function App() {
  const [allRecipes, setAllRecipes] = useState([]); //I just changed to allRecipes to differenciate with "recipe" state
  const navigate = useNavigate(); //define it first then you can use it later
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  let [allRegistered, setAllRegistered] = useState([]);
  let [ingredients, setIngredients] = useState([]);

  // nutrition must also be set at the start, we add it later
  const [recipe, setRecipe] = useState(null); //the recipe you clicked on in the result page
  const [recipeInstructions, setRecipeInstructions] = useState();
  const [ingredientList, setIngredientList] = useState();
  const [allfav, setAllFav] = useState([]);

  console.log(allfav);
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
  const showRecipe = async (id) => {
    let featuredRecipe = allRecipes.find((r) => r.id === id); //use the id to find the correspondent recipe
    let recipeInfo = await Api.getRecipeInfo(id); //contains recipe preparation time
    let recipeNutrition = await Api.getRecipeNutrition(id);
    featuredRecipe.preparationTime = recipeInfo.readyInMinutes; //create a new property to store the preparation time
    featuredRecipe.nutrition = recipeNutrition;
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

  //FAVOURITES routes

  const handleClick = () => {
    console.log("fav button was pressed and passed to APP.js");
  };

  // GET always first!
  //! THE URL ALWAYS have to start from /api/ this is how back end is created

  useEffect(() => {
    //we need to pass id, current id is the one store in the local! Id of logged in user
    getFav(Local.getUserId());
    //we need to pass id, current id is the one store in the local! Id of logged in user
    getFav(Local.getUserId());
  }, []);

  //GET ALL FAV of logged in user
  const getFav = async (id) => {
    let Uresponse = await Api.getFav(id);
    if (Uresponse.ok) {
      setAllFav(Uresponse.data);
    } else {
      console.log(Uresponse.error);
    }
  };

  //make one route for add/delete
  const AddOrDelete = async (recipe, event) => {
    if (event) {
      event.stopPropagation();
    }

    if (recipe) {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Local.getToken(),
        },
        body: JSON.stringify({
          recipe_id: recipe.id,
          recipe_title: recipe.title,
          recipe_image_url: recipe.image,
          //user_id was undefined so we have to pass Local.getUserId!!!!
          user_id: Local.getUserId(),
        }),
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: "Bearer " + Local.getToken(),
        // },
        // body: JSON.stringify({
        //   recipe_id: recipe.id,
        //   recipe_title: recipe.title,
        //   recipe_image_url: recipe.image,
        //   //user_id was undefined so we have to pass Local.getUserId!!!!
        //   user_id: Local.getUserId(),
        // }),
      };
      // console.log("this is from POST btw", id);

      try {
        // console.log("hello from try", id, recipe.title);
        let response = await fetch(`/api/favorites`, options);

        if (response.ok) {
          // console.log("hello from response ok", response);
          let data = await response.json();
          setAllFav(data);
        } else {
          console.log(
            `Server Error: ${response.status} ${response.statusText}`
          );
        }
      } catch (err) {
        console.log(`Network Error: ${err.message} `);
      }
    }
  };

  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} setIngredients={setIngredients} />
      <Routes>
        <Route
          path="/*"
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
              allfav={allfav}
              AddOrDelete={AddOrDelete}
              // recipe={recipe}
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
              AddOrDelete={AddOrDelete}
              allfav={allfav}
              allRecipes={allRecipes}
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
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesView allfav={allfav} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
