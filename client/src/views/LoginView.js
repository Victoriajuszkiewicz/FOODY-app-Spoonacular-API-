import { useState } from "react";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Nav,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import "./LoginView.css";

const INIT_LOGINFORM = {
  emailLogin: "",
  passwordLogin: "",
};

const LoginView = (props) => {
  const [loginInput, setLoginInput] = useState(INIT_LOGINFORM);
  const navigate = useNavigate();
  //TOGGLE BUTTON
  // const [active, isActive] = useState(false);
  // const [buttonValue, setButtonValue] = useState("1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.inputLoginCb(loginInput);
    setLoginInput(INIT_LOGINFORM);
    console.log("someone want to log in... oh lala");
  };

  //TOGGLE BUTTON
  const buttons = [
    { name: "Register", value: "1" },
    { name: "Login", value: "2" },
  ];

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="form-container">
        {/* <ButtonGroup className="button-group">
          {buttons.map((button, index) => (
            <ToggleButton
              className="toggle-button"
              key={index}
              id={`radio-${index}`}
              type="radio"
              variant="secondary"
              name="radio"
              value={button.value}
              checked={buttonValue === button.value}
              onChange={(e) => setButtonValue(e.currentTarget.value)}
            >
              {button.name}
            </ToggleButton>
          ))}
        </ButtonGroup> */}
        <h2>Welcome back</h2>
        {/* Label and placeholder can have the value of your choice */}
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label style={{ marginBottom: "0.2rem" }}>
            Email Address
          </Form.Label>
          <Form.Control
            style={{ width: "18rem" }}
            id="email"
            type="text"
            placeholder="nugget@example.com"
            name="emailLogin"
            value={loginInput.emailLogin}
            label="Email"
            onChange={handleChange}
            required
          />
          <Form.Label style={{ marginBottom: "0.2rem" }}>Password</Form.Label>
          <Form.Control
            style={{ width: "18rem" }}
            id="password"
            type="password"
            name="passwordLogin"
            placeholder="your password..."
            value={loginInput.passwordLogin}
            label="Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div>
          <Button
            style={{ marginTop: "15px" }}
            variant="secondary"
            type="submit"
          >
            Log in
          </Button>

          <div>
            <p className="register-btn-container">
              If you don't have an account, click{" "}
              <button
                className="button-here"
                onClick={(m) => navigate("/register")}
              >
                here
              </button>
            </p>
          </div>

          {/* this button takes us to register page */}
        </div>
      </Form>
    </Container>
  );
};

export default LoginView;
