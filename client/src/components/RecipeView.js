import React from "react";

export default function RecipeView(props) {
  const { recipe, recipeInstructions } = props;
  if (recipeInstructions) {
    const extractSteps = recipeInstructions[0];
    const { steps } = extractSteps;
    let instructions = {};
    let ingredients = {};
    for (let objects of steps) {
      console.log("objects", objects);
      instructions[objects.number] = objects.step;
    }
    console.log(instructions);
  }

  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      {/* <p>{recipeInstructions}</p> */}
      {/* {recipeInstructions.map((step) => (
        <p>{step}</p>
      ))} */}

      {/* There's more then one property in the missedIngredients, 
      could we do the map instead hardcode way to render them? */}
    </div>
  );
}
