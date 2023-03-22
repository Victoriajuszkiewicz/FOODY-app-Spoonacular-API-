import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../helpers/Api";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./SearchBar.css";
import Badge from "react-bootstrap/Badge";
import XIcon from "../../components/XIcon";

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { setAllRecipes, allRecipes, ingredients, setIngredients } = props;

  // console.log(ingredients);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //changed ingredients to input value on line 19 to fix the bug!
    const result = await Api.getRecipes(inputValue);
    setAllRecipes(result); //Using state setter to save recipes fetched from api
    setInputValue(""); //reset empty input field after clicked search button
    navigate("/resultview"); //after "search" go to the ResultView
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        setIngredients([...ingredients, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDelete = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="d-flex flex-column align-items-center"
      id="container"
    >
      <Form onSubmit={handleSubmit}>
        <Form.Label className="home-title">
          <h4 style={{ width: "25rem" }}> What do you have in the fridge?</h4>
        </Form.Label>
        <Form.Control
          style={{
            width: "18rem",
            marginLeft: "55px",
            marginBottom: "10px",
            textAlign: "center",
          }}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="try tomato, eggs, cheese..."
        />
        <div className="badge-container">
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <Badge
                pill
                bg="#ffb441"
                style={{ backgroundColor: "#ffb441" }}
                key={index}
                className="badge"
              >
                {ingredient}
                <button
                  className="ingredient-x"
                  onClick={() => handleDelete(index)}
                >
                  <XIcon />
                </button>
              </Badge>
            ))}
        </div>
        <Button
          className="submit-button"
          style={{ backgroundColor: "#358484", borderBlockColor: "#358484" }}
          variant="secondary"
          type="submit"
        >
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default SearchBar;
