import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SearchBar from "../views/Home/SearchBar";

export default function ResultView(props) {
  const { allRecipes, setAllRecipes, showRecipe } = props;

  return (
    <div>
      <div>
        <SearchBar setAllRecipes={setAllRecipes} />
      </div>

      <Container
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <Row xs={1} md={2} className="g-4">
          <Col>
            {allRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="card-recipe"
                style={{ width: "18rem" }}
                onClick={(event) => showRecipe(recipe.id)}
              >
                <Card.Img variant="top" src={recipe.image} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Subtitle className="bi bi-hand-thumbs-up-fill">{recipe.likes}</Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
        {/* we need to add the onClick to do another call and get more recipes */}
        <Button variant="secondary" style={{ marginTop: "10px" }}>
          See more recipes
        </Button>
      </Container>
    </div>
  );
}
