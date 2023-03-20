import React, { useEffect } from "react";
import { Local } from "../helpers/Local";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

export default function RecipeView(props) {
  const { recipe, setRecipe, recipeInstructions, ingredientList, handleClick } =
    props;

  const recipeSteps = [];
  if (recipeInstructions) {
    for (let step of recipeInstructions[0].steps) {
      recipeSteps[step.number] = step.step;
    }
  }

  useEffect(() => {
    /*we use Object.keys() checkes if an object is empty, 
    it returns an array of keys when is not empty else return an empty array, 
    then checks the array using .length if it's emty array. we should run the effect if is empty */
    if (Object.keys(recipe).length === 0) {
      setRecipe(Local.getFeaturedRecipe()); //set the state from the recipe we stored in the localStorage
    }
  }, [recipe, setRecipe]);
  return (
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
          <button
            type="button"
            onClick={() => handleClick()}
            className="btn btn-secondary"
          >
            <i className="bi bi-heart"> Save</i>
          </button>
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
        {/* <h3>Step-by-step preparation</h3> */}
        {recipeInstructions &&
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
          })}
      </div>
    </Container>
  );
}
