import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RecipeView from "./RecipeView";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate } from "react-router-dom";
import SearchBar from "../views/Home/SearchBar";

export default function ResultView(props) {
  const { allRecipes, setAllRecipes } = props;
  const navigate = useNavigate();

  return (
    <div>
      {/*Resing the SearchBar component: it is displaying in result page */}
      <div>
        <SearchBar setAllRecipes={setAllRecipes} />
      </div>

      <Container>
        <Row xs={1} md={2} className="g-4">
          {/*{ length: 1 } => it's duplicating colunme*/}
          {Array.from({ length: 1 }).map((_, idx) => (
            <Col key={idx}>
              {" "}
              {/*list needs a unic key*/},{/* xs={12} md={8} */},
              {allRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="card-recipe"
                  style={{ width: "18rem" }}
                  onClick={(event) => props.showRecipe(recipe.id)}
                >
                  <Card.Img variant="top" src={recipe.image} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          ))}
        </Row>
        {/* we need to add the onClick={() => navigate("/")} to do another call and get more recipes */}
        <Button variant="primary">See more recipes</Button>
        {/* <RecipeView /> */}
      </Container>
    </div>
  );
}
