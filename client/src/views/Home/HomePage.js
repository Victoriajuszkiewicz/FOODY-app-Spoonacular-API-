import React from "react";
import SearchBar from "./SearchBar";
import aboutus from "../../img/about.jpg";
import "./HomePage.css";
import nuggetrecipe1 from "../../img/nuggetrecipe1.jpg";
import nuggetrecipe2 from "../../img/nuggetrecipe2.jpg";
import nuggetrecipe3 from "../../img/nuggetrecipe3.jpg";

const HomePage = (props) => {
  const { setAllRecipes, allRecipes, ingredients, setIngredients } = props;

  return (
    <div>
      <div className="searchdiv">
        <div></div>
        <div className="searchbar">
          <SearchBar
            setAllRecipes={setAllRecipes}
            allRecipes={allRecipes}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </div>
      </div>
      <div>
        <h2 className="text-center">Popular Recipes</h2>
        {/*  display-1 mb-5 */}

        <div className="container">
          <div className="row gy-3">
            <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow" id="card1">
                <img src={nuggetrecipe1} alt="" className="card-img-top" />
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>Chicken nuggets</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow" id="card1">
                <img src={nuggetrecipe2} alt="" className="card-img-top" />
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>Also chicken nuggets</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow" id="card1">
                <img src={nuggetrecipe3} alt="" className="card-img-top" />
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>Chicken nuggets again</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow" id="card1">
                <img src={nuggetrecipe2} alt="" className="card-img-top" />
                <div className="card-body">
                  <div className="card-title text-center">
                    <h4>Chicken nuggets</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2">
          <div className="col" id="textabout">
            <h3>About us</h3>
            <p>
              A food app that helps users search for recipes based on the
              ingredients they already have in their fridge is very practical
              and useful. It's a great way to avoid food waste and save time by
              making the most of what you have at home.
              <br /> This type of app is especially helpful for people who don't
              have a lot of experience in the kitchen or are not sure how to
              combine ingredients to make a meal. It can also be a great tool
              for those who want to try new recipes or experiment with different
              ingredients.
            </p>
          </div>

          <div className="col, parentAboutUsImage">
            <img
              src={aboutus}
              className="aboutusimage"
              alt="this is a picture of a fridge"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
