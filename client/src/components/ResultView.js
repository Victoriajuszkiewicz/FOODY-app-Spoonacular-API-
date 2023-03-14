import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ResultView() {
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
      </Container>
    </div>
  );
}
