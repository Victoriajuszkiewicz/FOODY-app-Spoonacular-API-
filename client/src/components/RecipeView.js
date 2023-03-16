import React, { useEffect } from "react";
import { Api } from "../helpers/Api";
import Local from "../helpers/Local";

export default function RecipeView(props) {
  const { recipe, setRecipe } = props;
  //  console.log(recipe)

  useEffect(() => {
    console.log("USING EFFECT!!!");
    /*we use Object.keys() checkes if an object is empty, 
    it returns an array of keys when is not empty else return an empty array, 
    then checks the array using .length if it's emty array. we should run the effect if is empty */
    if (Object.keys(recipe).length === 0) {
      setRecipe(Local.getFeaturedRecipe()); //set the state from the recipe we stored in the localStorage
    }
  }, [recipe]);
  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      {/* <h5>Ingredients</h5> */}
      {/* There's more then one property in the missedIngredients, 
      could we do the map instead hardcode way to render them? */}
      {/* <p>{recipe.missedIngredients[0].name}</p> */}
    </div>
  );
}
