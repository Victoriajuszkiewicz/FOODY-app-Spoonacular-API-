import React, { useState } from "react";
import Api from "../../helpers/Api";

const HomePage = (props) => {
    let [input, setInput] = useState("")
    let [ingredients, setIngredients] = useState([""]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIngredients(Api.getRecipes(input));//fetch api data
        setInput("");
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setInput(value)

    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>What do you see in the fridge?</label>
        <input type="text" value={input} onChange={handleChange} placeholder="Search by ingredients"></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default HomePage;
