import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultView from "../../components/ResultView";
import Api from "../../helpers/Api";

const SearchBar = (props) => {
  let [ingredients, setIngredients] = useState(""); //ingredients we typed in the input field
  // let [recipes, setRecipes] = useState([]); //recipes fetched from api. I moved it to the parent
  const { setRecipes, recipes } = props;
  console.log(recipes);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await Api.getRecipes(ingredients);
    setRecipes(result); //Using state setter to save recipes fetched from api
    setIngredients(""); //reset empty input field after clicked search button
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setIngredients(value); // use setter to update the state data
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>What do you see in the fridge?</label>
        <input
          type="text"
          value={ingredients}
          onChange={handleChange}
          placeholder="Search by ingredients"
        ></input>
        <button type="submit">Search</button>
      </form>
      {recipes && <ResultView recipes={recipes} />}
    </div>
  );
};

export default SearchBar;
