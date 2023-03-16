import React from "react";

export default function RecipeView(props) {
  const { recipe, recipeInstructions, ingredientList } = props;
  console.log(recipeInstructions);

  // if (recipeInstructions) {
  //   const recipeExtractor = recipeInstructions[0];
  //   const { steps } = recipeExtractor;
  //   let instructions = {};
  //   for (let objects of steps) {
  //     instructions[objects.number] = objects.step;
  //   }
  //   console.log(instructions);
  // }

  const recipeSteps = [];

  for (const step of recipeInstructions[0].steps) {
    recipeSteps[step.number] = step.step;
  }

  console.log(recipeSteps);

  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />

      {/* There's more then one property in the missedIngredients, 
      could we do the map instead hardcode way to render them? */}
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
