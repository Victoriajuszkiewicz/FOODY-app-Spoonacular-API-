import React, { useEffect } from "react";
import { Local } from "../helpers/Local";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { FcClock } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";

export default function RecipeView(props) {
  const {
    recipe,
    setRecipe,
    recipeInstructions,
    ingredientList,
    AddOrDelete,
    allfav,
    allRecipes,
  } = props;
  //Empty array is truthy

  // console.log(allfav);
  // console.log(recipe.id);
  // console.log(recipe);

  const recipeSteps = [];
  //recipeInstructions is an array, we need to check both if is not empty and lentgh more than 0
  if (recipeInstructions && recipeInstructions.length > 0) {
    for (let step of recipeInstructions[0].steps) {
      recipeSteps[step.number] = step.step;
    }
  }

  useEffect(() => {
    /*
    We check if the recipe.id is empty to know if the recipe is already in the state or not.
    If it is not we get it from the local storage and set the state.
    This prevents us from getting an infinite loop: https://react.dev/reference/react/useEffect#my-effect-keeps-re-running-in-an-infinite-cycle
    */
    if (recipe?.id === undefined) {
      setRecipe(Local.getFeaturedRecipe()); //set the state from the recipe we stored in the localStorage
    }
  }, [recipe]);
  // line36: recipe && (...) Only render the recipe page when the recipe state has value
  return (
    recipe && (
      <Container
        className="container"
        style={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <div className="ingredient-container">
          <h3 style={{ width: "18rem" }}>{recipe.title}</h3>
          <Card className="mb-3" style={{ width: "18rem" }}>
            <Card.Img
              style={{ width: "18rem" }}
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            />
          </Card>

          <div>
            {/* if added to fav heart isn't filled once clicked it calls addFav fn from App.js clicked again it calls deleteFav */}

            <div key={recipe.id}>
              {allfav.some((e) => recipe.id === e.recipe_id) ? (
                <div>
                  <button
                    type="button"
                    onClick={() => AddOrDelete(recipe)}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-heart-fill"> Saved</i>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => AddOrDelete(recipe)}
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-heart"> Save</i>
                  </button>
                </div>
              )}
            </div>

            <h5 style={{ color: "orange", marginTop: "1rem" }}>
              <AiFillLike size="1.8rem" />
              {recipe.likes}
            </h5>

            <h5>
              <FcClock size="2rem" />
              Ready in {recipe.preparationTime} mins
            </h5>
          </div>

          <Card style={{ width: "18rem" }}>
            <Card.Header>
              <strong>Ingredient List</strong>
            </Card.Header>
          </Card>
          {ingredientList &&
            ingredientList.map((ingredient, index) => {
              return (
                <Card style={{ width: "18rem" }} key={index}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {ingredient.name} {ingredient.amount.metric.value}{" "}
                      {ingredient.amount.metric.unit}{" "}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              );
            })}
        </div>
        <div className="steps-container">
          <Card style={{ width: "18rem" }} className="mt-3">
            <Card.Header>
              <strong> Step-by-step preparation</strong>
            </Card.Header>
          </Card>
          {recipeSteps.length > 0 ? (
            recipeSteps.map((step, index) => {
              return (
                <Card style={{ width: "18rem" }} key={index}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong> {index}.</strong> {step}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              );
            })
          ) : (
            <Card>
              <p>The recipe instruction is not available...</p>
            </Card>
          )}

          <Card style={{ width: "18rem" }}>
            <Card.Header>
              <strong>Nutrition</strong>
            </Card.Header>
          </Card>

          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                calories: {recipe.nutrition.calories}
              </ListGroup.Item>
              <ListGroup.Item>carbs: {recipe.nutrition.carbs}</ListGroup.Item>
              <ListGroup.Item>fat: {recipe.nutrition.fat}</ListGroup.Item>
              <ListGroup.Item>
                protein: {recipe.nutrition.protein}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </Container>
    )
  );
}
