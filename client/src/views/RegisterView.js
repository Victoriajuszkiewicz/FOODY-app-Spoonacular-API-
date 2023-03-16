import { useState, state } from "react";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

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
    showAlert();

    // navigate("/login"); (WORKS FINE its commented out for testing purposes for now)
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

  // NO ROUTS FOR DB yet!!!
  //Info from form is saved  in state but never reaches DB
  return (
    <div>
      <Button variant="secondary" onClick={(e) => navigate("/login")}>
        Login
      </Button>
      {show ? (
        <div>
          <ToastContainer />
        </div>
      ) : null}

      <Form onSubmit={handleSubmit} style={{ border: "1px solid red" }}>
        <h2>Welcome to FoodApp!</h2>
        <Container className="d-flex flex-column align-items-center">
          <Form.Control
            style={{ width: "18rem", textAlign: "center" }}
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
          <Form.Control
            style={{ width: "18rem", textAlign: "center" }}
            id="email"
            type="text"
            placeholder="nugget@example.com"
            name="email"
            value={registerForm.email}
            label="Email"
            required
            onChange={handleChange}
          />
          <Form.Control
            style={{ width: "18rem", textAlign: "center" }}
            id="password"
            type="password"
            name="password"
            value={registerForm.password}
            label="Password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </Container>
        <div>
          <Button variant="secondary">Create an account</Button>
        </div>
      </Form>
    </div>
  );
};
export default RegisterView;
