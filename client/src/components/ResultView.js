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
import { TbArrowsLeftRight } from "react-icons/tb";
import { GiNoodles, GiChickenLeg } from "react-icons/gi";
import { AiFillLike } from "react-icons/ai";

export default function ResultView(props) {
  const {
    allRecipes,
    setAllRecipes,
    showRecipe,
    ingredients,
    setIngredients,
    allfav,
    AddOrDelete,
    // recipe,
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

      const winningMessage = (winner, loser) =>
        `🌶 ${winner.title} has a better health score than ${loser.title}! (${winner.healthScore} VS ${loser.healthScore}) 🌶`;

      if (recipeToCompare.recipeA.healthScore > recipeB.healthScore) {
        showNutriAlert(winningMessage(recipeToCompare.recipeA, recipeB));
      } else if (recipeToCompare.recipeA.healthScore < recipeB.healthScore) {
        showNutriAlert(winningMessage(recipeB, recipeToCompare.recipeA));
      } else {
        showNutriAlert(
          `🌶 ${recipeToCompare.recipeA.title} and ${recipeB.title} has same health score: ${recipeB.healthScore}! 🌶`
        );
      }
      //get the info from both

      setRecipeCompare({}); //reset state
    }
  };

  const showNutriAlert = (message) => {
    setShow(true);
    toast(message, {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
                onClick={(event) => {
                  if (
                    event.target.localName !== "svg" &&
                    event.target.localName !== "path"
                  ) {
                    showRecipe(recipe.id);
                  }
                }}
              >
                <div className="container">
                  <Card.Img variant="top" src={recipe.image} />
                  {recipe &&
                    (allfav.some((e) => recipe.id === e.recipe_id) ? (
                      <div>
                        <button
                          id="buttononrecipe"
                          type="button"
                          onClick={(event) => {
                            //tried: event.preventDefault(); &event.stopPropagation();
                            // event.preventDefault();
                            // event.stopPropagation();
                            AddOrDelete(recipe, event);
                          }}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-heart-fill"> </i>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          id="buttononrecipe"
                          type="button"
                          onClick={(event) => {
                            // event.preventDefault();
                            // event.stopPropagation();
                            AddOrDelete(recipe, event);
                          }}
                          className="btn btn-secondary"
                        >
                          <i className="bi bi-heart"></i>
                        </button>
                      </div>
                    ))}
                </div>

                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Subtitle style={{ color: "orange" }}>
                    <AiFillLike size="1.8rem" />
                    {recipe.likes}
                  </Card.Subtitle>
                  {/*(? means if recipeA is not undefined get the title, else return undefined)*/}
                  {recipeToCompare.recipeA?.title !== recipe.title && (
                    <button
                      style={{
                        color: "orange",
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }}
                      type="button"
                      title="Compare health score!"
                      onClick={(event) => {
                        getRecipeInfoToCompare(recipe.id);
                      }}
                    >
                      <GiNoodles size="1.5rem" />
                      <TbArrowsLeftRight size="1.1rem" />
                      <GiChickenLeg size="1.5rem" />
                    </button>
                  )}
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
