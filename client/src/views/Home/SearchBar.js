import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultView from "../../components/ResultView";
import { Api } from "../../helpers/Api";
import { getSteps } from "../../helpers/Api";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const SearchBar = (props) => {
  let [ingredients, setIngredients] = useState(""); //ingredients we typed in the input field
  // let [recipes, setRecipes] = useState([]); //recipes fetched from api. I moved it to the parent
  const navigate = useNavigate();
  const { setAllRecipes, allRecipes } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await Api.getRecipes(ingredients);
    setAllRecipes(result); //Using state setter to save recipes fetched from api
    setIngredients(""); //reset empty input field after clicked search button
    navigate("/resultview"); //after "search" go to the ResultView
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setIngredients(value); // use setter to update the state data
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="d-flex flex-column align-items-center"
    >
      <Form onSubmit={handleSubmit}>
        <Form.Label>
          <h4 style={{ width: "25rem" }}> What do you have in the fridge?</h4>
        </Form.Label>
        <Form.Control
          style={{
            width: "18rem",
            marginLeft: "55px",
            marginBottom: "5px",
            textAlign: "center",
          }}
          type="text"
          value={ingredients}
          onChange={handleChange}
          placeholder="Search by ingredients"
        />
        <Button variant="secondary" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default SearchBar;
