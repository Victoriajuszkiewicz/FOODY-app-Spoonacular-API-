import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SearchBar from "../views/Home/SearchBar";
import "./ResultView.css";
import { Api } from "../helpers/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResultView(props) {
  const {
    allRecipes,
    setAllRecipes,
    showRecipe,
    ingredients,
    setIngredients,
    allfav,
    AddOrDelete,
  } = props;
  const [recipeToCompare, setRecipeCompare] = useState({});
  const [show, setShow] = useState(false);

  //ALERT function: we need recipe name, healthScore to show on the alert
  const getRecipeInfoToCompare = async (id) => {
    const recipeInfo = await Api.getRecipeInfo(id);
    // first time when user clicks on the button, checks if it's empty.
    if (recipeToCompare.recipeA === undefined) {
      //save in object format
      setRecipeCompare({
        recipeA: {
          title: recipeInfo.title,
          healthScore: recipeInfo.healthScore,
        },
      });
    } else {
      //we get the second click, get the value straight from the object
      const recipeB = {
        title: recipeInfo.title,
        healthScore: recipeInfo.healthScore,
      };
      //get the info from both
      showNutriAlert(recipeToCompare.recipeA, recipeB);
      setRecipeCompare({}); //reset state
    }
  };

  const showNutriAlert = (recipeA, recipeB) => {
    setShow(true);
    toast(
      `💡 ${recipeA.title}'s health score is ${recipeA.healthScore}, ${recipeB.title}'s health score ${recipeB.healthScore}`,
      {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  {
    /* (line 90)Recipe onClick card and (line 114)compare button onClick will both be clicked on, 
  so we need to give a if statement by checking the unic perperty from event.target to find which one we clicked on, 
  then we disable onClick to render the recipe page  */
  }
  return (
    <div>
      <div>
        {show ? (
          <div>
            <ToastContainer />
          </div>
        ) : null}
        <SearchBar
          setAllRecipes={setAllRecipes}
          setIngredients={setIngredients}
          ingredients={ingredients}
        />
      </div>

      <Container
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <Row xs={1} md={2} className="g-4">
          <Col>
            {allRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="card-recipe"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  onClick={(event) => {
                    if (event.target.localName !== "button") {
                      showRecipe(recipe.id);
                    }
                  }}
                />

                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <div className="container">
                    {allfav.some((e) => recipe.id === e.recipe_id) ? (
                      <button
                        type="button"
                        onClick={() => AddOrDelete(recipe.id)}
                        className="btn btn-danger"
                        id="buttononrecipe"
                      >
                        <i id="heartbutton" className="bi bi-heart-fill"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => AddOrDelete(recipe.id)}
                        className="btn btn-secondary"
                        id="buttononrecipe"
                      >
                        <i id="heartbutton" className="bi bi-heart"></i>
                      </button>
                    )}
                  </div>
                  <Card.Subtitle className="bi bi-hand-thumbs-up-fill">
                    {recipe.likes}
                  </Card.Subtitle>
                  <button
                    type="button"
                    title="Compare health score!"
                    onClick={(event) => getRecipeInfoToCompare(recipe.id)}
                    className="btn btn-outline-info bi bi-heart-pulse-fill"
                  ></button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
        {/* we need to add the onClick to do another call and get more recipes */}
        <Button variant="secondary" style={{ marginTop: "10px" }}>
          See more recipes
        </Button>
      </Container>
    </div>
  );
}
