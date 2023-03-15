export class Api {
  static getRecipes = async (ingredients) => {
    const apiKey = `&apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`;
    const baseUrl = "https://api.spoonacular.com/recipes/";
    const requestParams =
      "findByIngredients?number=10&limitLicense=true&ranking=1&ignorePantry=false";
    const ingredientsParams = `&ingredients=${[ingredients]}`;
    const urlToFetch = `${baseUrl}${requestParams}${ingredientsParams}${apiKey}`;

    try {
      const response = await fetch(urlToFetch);

      if (response.ok) {
        const recipes = await response.json();
        return recipes;
      } else {
        console.log("Error: " + response);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };
}

//GET STEPS FOR RECIPE
export async function getSteps(recipeId) {
  const apiKey = `?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`;
  const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions${apiKey}`;

  try {
    let response = await fetch(url);
    if (response.ok) {
      let recipeInstructions = await response.json();
      return recipeInstructions;
    } else {
      console.log("Server error: ", response);
    }
  } catch (err) {
    console.log(`Network error: ${err.message}`);
  }
}
