import React, { useState } from "react";
import Api from "../../helpers/Api";

const SearchBar = (props) => {
  let [input, setInput] = useState("");
  let [ingredients, setIngredients] = useState([""]);
  const { recipes, setRecipes } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIngredients(Api.getRecipes(input)); //fetch api data
    console.log("ingredients: ", ingredients);
    setRecipes(ingredients);
    setInput("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>What do you see in the fridge?</label>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search by ingredients"
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
