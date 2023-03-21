import React from "react";

const FavoritesView = (props) => {
  const { getFav } = props;

  //get all from fav by user id and display it
  return (
    <div>
      <h1 style={{ padding: 20, "text-align": "center" }}>My boards</h1>
    </div>
    //show all boards from DB
  );
};

export default FavoritesView;
