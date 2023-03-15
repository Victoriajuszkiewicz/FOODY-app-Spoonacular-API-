import React from "react";
import SearchBar from "./SearchBar";

const HomePage = (props) => {
  const { setRecipes, recipes } = props;

  return (
    <div>
      <SearchBar setRecipes={setRecipes} recipes={recipes} />
    </div>
  );
};

export default HomePage;
