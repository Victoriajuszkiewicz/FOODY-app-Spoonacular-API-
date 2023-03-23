import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import "./Favorites.css";
import Local from "../helpers/Local";

const FavoritesView = (props) => {
  const { allFav } = props;

  //get all from fav by user id and display it
  return (
    <div>
      <h1 style={{ padding: 20, "text-align": "center" }}>My boards</h1>
      <Container
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <Row xs={1} md={2} className="g-4">
          <Col>
            {allFav.map((favorite) => (
              <Card
                key={favorite.user_id}
                className="card-recipe"
                style={{ width: "18rem" }}
                // onClick={(event) => {
                //   if (event.target.localName !== "button") {
                //     showRecipe(favorite.id);
                //   }
                // }}
              >
                <div className="container">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="buttononrecipe"
                  >
                    <i id="heartbutton" className="bi bi-heart"></i>
                  </button>
                  <Card.Img variant="top" src={favorite.recipe_image_url} />
                </div>

                <Card.Body>
                  <Card.Title>{favorite.recipe_title}</Card.Title>
                  <Card.Subtitle className="bi bi-hand-thumbs-up-fill">
                    {/* {favorite.likes} */}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
    //show all boards from DB
  );
};

export default FavoritesView;
