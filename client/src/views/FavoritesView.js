import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import "./Favorites.css";
import noFavNugget from "../img/noFavNugget.gif";
import "react-toastify/dist/ReactToastify.css";
import { AiFillLike } from "react-icons/ai";

const FavoritesView = (props) => {
  const { allFav, showRecipeFavCb } = props;

  const handleClick = (recipe_id) => {
    showRecipeFavCb(recipe_id); //time, nutrition
  };
  //get all from fav by user id and display it
  return (
    <div>
      <h1 style={{ padding: 20, textAlign: "center" }}>My favorite recipes</h1>

      <Container
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        {allFav.length !== 0 ? (
          <Row xs={1} md={2} className="g-4">
            <Col>
              {allFav.map((recipe) => (
                <Card
                  key={recipe.user_id}
                  className="card-recipe"
                  style={{ width: "18rem" }}
                  onClick={(e) => handleClick(recipe.recipe_id)}
                >
                  <div className="container">
                    <button
                      type="button"
                      className="btn btn-danger"
                      id="buttononrecipe"
                    >
                      <i id="heartbutton" className="bi bi-heart-fill"></i>
                    </button>
                    <Card.Img variant="top" src={recipe.recipe_image_url} />
                  </div>

                  <Card.Body>
                    <Card.Title>{recipe.recipe_title}</Card.Title>
                    <Card.Subtitle style={{ color: "orange" }}>
                      <h5>
                        <AiFillLike size="1.8rem" />
                        {recipe.likes}
                      </h5>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        ) : (
          <div>
            <p>
              Your list is empty. Time to add favorites for some happy cooking.
            </p>
            <img
              src={noFavNugget}
              alt="nofavnugget"
              width="200"
              height="200"
            ></img>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FavoritesView;
