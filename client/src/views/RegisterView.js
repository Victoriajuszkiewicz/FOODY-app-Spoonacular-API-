import { useState, state } from "react";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterView = () => {
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
      <button onClick={(e) => navigate("/login")}>Login</button>
      {show ? (
        <div>
          <ToastContainer />
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <h2>Welcome to FoodApp!</h2>
        <InputBox
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
        <InputBox
          id="email"
          type="text"
          placeholder="nugget@example.com"
          name="email"
          value={registerForm.email}
          label="Email"
          required
          onChange={handleChange}
        />
        <InputBox
          id="password"
          type="password"
          name="password"
          value={registerForm.password}
          label="Password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <div>
          <button>Create an account</button>
        </div>
      </form>
    </div>
  );
};
export default RegisterView;
