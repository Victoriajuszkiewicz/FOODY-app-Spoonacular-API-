import React from "react";
import SearchBar from "./SearchBar";

const HomePage = (props) => {
  const { setAllRecipes, allRecipes } = props;

  return (
    <div>
      <SearchBar setAllRecipes={setAllRecipes} allRecipes={allRecipes} />
    </div>
  );
};

export default HomePage;
