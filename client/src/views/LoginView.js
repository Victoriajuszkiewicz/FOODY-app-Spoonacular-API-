import { useState } from "react";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const INIT_LOGINFORM = {
  emailLogin: "",
  passwordLogin: "",
};

const LoginView = (props) => {
  const [loginInput, setLoginInput] = useState(INIT_LOGINFORM);
  const navigate = useNavigate();

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

  return (
    <div>
      <Button variant="secondary" onClick={(m) => navigate("/register")}>
        Register
      </Button>
      {/* this button takes us to register page */}

      <Form onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        {/* Label and placeholder can have the value of your choice */}
        <Container className="d-flex flex-column align-items-center">
          <Form.Control
            style={{ width: "18rem", textAlign: "center" }}
            id="email"
            type="text"
            placeholder="nugget@example.com"
            name="emailLogin"
            value={loginInput.emailLogin}
            label="Email"
            onChange={handleChange}
            required
          />
          <Form.Control
            style={{ width: "18rem", textAlign: "center" }}
            id="password"
            type="password"
            name="passwordLogin"
            value={loginInput.passwordLogin}
            label="Password"
            onChange={handleChange}
            required
          />
        </Container>
        <div>
          <Button variant="secondary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginView;
