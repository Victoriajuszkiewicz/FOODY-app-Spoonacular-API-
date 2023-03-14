import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RecipeView from "./RecipeView";
import { Button } from "bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

export default function ResultView(props) {
  const { recipes, setRecipes } = props;
  const navigate = useNavigate();

  return (
    <div>
      <h2>ResultView</h2>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <Card className="card-recipe" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://spoonacular.com/recipeImages/642582-312x231.jpg"
              />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* we need to add the onClick={() => navigate("/")} to do another call and get more recipes */}
        <Button variant="primary">See more recipes</Button>
        <RecipeView />
      </Container>
    </div>
  );
}
