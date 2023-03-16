import React from "react";
import SearchBar from "./SearchBar";

const HomePage = (props) => {
  const { setAllRecipes, allRecipes } = props;

  return <SearchBar setAllRecipes={setAllRecipes} allRecipes={allRecipes} />;
};

export default HomePage;
