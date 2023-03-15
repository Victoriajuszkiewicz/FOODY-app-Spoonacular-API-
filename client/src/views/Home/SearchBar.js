import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultView from "../../components/ResultView";
import Api from "../../helpers/Api";

const SearchBar = (props) => {
  let [ingredients, setIngredients] = useState(""); //ingredients we typed in the input field
  // let [recipes, setRecipes] = useState([]); //recipes fetched from api. I moved it to the parent
  const navigate = useNavigate(); 
  const { setAllRecipes, allRecipes } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await Api.getRecipes(ingredients);
    setAllRecipes(result); //Using state setter to save recipes fetched from api
    setIngredients(""); //reset empty input field after clicked search button
    navigate("/resultview"); //after "search" go to the ResultView
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setIngredients(value); // use setter to update the state data
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>What do you have in the fridge?</label>
        <input
          type="text"
          value={ingredients}
          onChange={handleChange}
          placeholder="Search by ingredients"
        ></input>
        <button type="submit">Search</button>
      </form>
      {/* {recipes && <ResultView recipes={recipes} />} 
      => SearchBar component is a reusable component, 
      so we try keep here clean. We could use whole component from somewhere else!*/}
    </div>
  );
};

export default SearchBar;
