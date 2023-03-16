import React, { useEffect } from "react";
import { Local } from "../helpers/local";

export default function RecipeView(props) {
  const { recipe, setRecipe, recipeInstructions, ingredientList } = props;

  const recipeSteps = [];
  if (recipeInstructions) {
    for (let step of recipeInstructions[0].steps) {
      recipeSteps[step.number] = step.step;
    }
  }

  useEffect(() => {
    console.log("USING EFFECT!!!");
    /*we use Object.keys() checkes if an object is empty, 
    it returns an array of keys when is not empty else return an empty array, 
    then checks the array using .length if it's emty array. we should run the effect if is empty */
    if (Object.keys(recipe).length === 0) {
      setRecipe(Local.getFeaturedRecipe()); //set the state from the recipe we stored in the localStorage
    }
  }, [recipe, setRecipe]);
  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />

      <h3>Ingredient List</h3>
      {ingredientList &&
        ingredientList.map((ingredient, index) => {
          return (
            <div key={index}>
              <p>
                {ingredient.name} {ingredient.amount.metric.value}{" "}
                {ingredient.amount.metric.unit}{" "}
              </p>
            </div>
          );
        })}
      <h3>Step-by-step preparation</h3>
      {recipeInstructions &&
        recipeSteps.map((step, index) => {
          return (
            <div key={index}>
              <p>
                {index} {step}
              </p>
            </div>
          );
        })}
    </div>
  );
}
