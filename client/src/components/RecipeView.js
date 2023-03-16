import React from "react";

export default function RecipeView(props) {
  const { recipe, recipeInstructions, ingredientList } = props;

  const recipeSteps = [];
  if (recipeInstructions) {
    for (let step of recipeInstructions[0].steps) {
      recipeSteps[step.number] = step.step;
    }
  }

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
