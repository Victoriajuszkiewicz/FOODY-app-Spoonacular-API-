import { useState, state } from "react";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "./RegisterView.css";

const RegisterView = (props) => {
  const INIT_REGISTRATION = {
    name: "",
    password: "",
    email: "",
  };

  const [registerForm, setRegisterForm] = useState(INIT_REGISTRATION);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleChange = (i) => {
    const { name, value } = i.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.addNewCb(registerForm);
    console.log("create an account submited", registerForm);
    //handleSubmit saves all info in register form
    setRegisterForm(INIT_REGISTRATION);
    //first show success alert (NOT DONE YET)
    // showAlert();
    navigate("/login");
    // ; (WORKS FINE its commented out for testing purposes for now)
  }
  function showAlert() {
    setShow(true);
    toast.success("Success!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  //Info from form is saved  in state but never reaches DB
  return (
    <Container className="register-container">
      {show ? (
        <div>
          <ToastContainer />
        </div>
      ) : null}

      <Form onSubmit={handleSubmit}>
        <h2>Welcome to FOODY!</h2>
        <Form.Group className="register-form-group">
          <Form.Label style={{ marginBottom: "0.2rem" }}>Name</Form.Label>
          <Form.Control
            style={{ width: "18rem" }}
            id="name"
            type="text"
            placeholder="Type your name"
            name="name"
            value={registerForm.name}
            label="Name"
            labels="Name"
            required
            onChange={handleChange}
          />
          <Form.Label style={{ marginBottom: "0.2rem" }}>Email</Form.Label>
          <Form.Control
            style={{ width: "18rem" }}
            id="email"
            type="text"
            placeholder="nugget@example.com"
            name="email"
            value={registerForm.email}
            label="Email"
            required
            onChange={handleChange}
          />
          <Form.Label style={{ marginBottom: "0.2rem", alignContent: "left" }}>
            Password
          </Form.Label>
          <Form.Control
            style={{ width: "18rem" }}
            id="password"
            type="password"
            name="password"
            value={registerForm.password}
            label="Password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <div>
          <Button
            type="submit"
            variant="secondary"
            style={{ marginTop: "10px" }}
          >
            Create an account
          </Button>
        </div>
        <div>
          <p className="register-btn-container">
            Do you have an account? Click{" "}
            <button className="button-here" onClick={(m) => navigate("/login")}>
              here
            </button>
          </p>
        </div>
      </Form>
    </Container>
  );
};
export default RegisterView;
