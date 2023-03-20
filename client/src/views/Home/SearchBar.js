import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import ResultView from "../../components/ResultView";
import { Api } from "../../helpers/Api";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./SearchBar.css";
import Badge from "react-bootstrap/Badge";

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  //move next line to parent
  // let [ingredients, setIngredients] = useState([]);
  // let [recipes, setRecipes] = useState([]); //recipes fetched from api. I moved it to the parent
  const navigate = useNavigate();
  const { setAllRecipes, allRecipes, ingredients, setIngredients } = props;

  console.log(ingredients);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await Api.getRecipes(ingredients);
    setAllRecipes(result); //Using state setter to save recipes fetched from api
    //change the setIngredients by setInputValue
    setInputValue(""); //reset empty input field after clicked search button
    navigate("/resultview"); //after "search" go to the ResultView
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    // const value = event.target.value;
    // setIngredients(value); // use setter to update the state data
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
        <Form.Label>
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
          placeholder="Search by ingredients"
        />
        <div className="badge-container">
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <Badge pill bg="secondary" key={index} className="badge">
                {ingredient}
                <button onClick={() => handleDelete(index)}>x</button>
              </Badge>
            ))}
        </div>
        <Button variant="secondary" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default SearchBar;
