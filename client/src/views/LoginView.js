import { useState } from "react";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  //in my useState, I could have just pass the object that would have created before this function
  //but since my object is small i pass it straight to the useState
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div>
      <button onClick={(m) => navigate("/register")}>Register</button>
      {/* this button takes us to register page */}

      <form>
        <h2>Welcome back</h2>
        {/* Label and placeholder can have the value of your choice */}
        <InputBox
          id="email"
          type="text"
          placeholder="nugget@example.com"
          name="email"
          value={input.email}
          label="Email"
          onChange={handleChange}
        />
        <InputBox
          id="password"
          type="password"
          name="password"
          value={input.password}
          label="Password"
          onChange={handleChange}
        />

        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
