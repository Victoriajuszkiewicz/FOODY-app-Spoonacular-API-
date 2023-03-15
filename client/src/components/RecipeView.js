import React from "react";

export default function RecipeView(props) {
  const { recipe } = props;
//  console.log(recipe)
  return (
  <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} />
      <h5>Ingredients</h5>
      {/* There's more then one property in the missedIngredients, 
      could we do the map instead hardcode way to render them? */}
      <p>{recipe.missedIngredients[0].name}</p> 

  </div>
  );
}
