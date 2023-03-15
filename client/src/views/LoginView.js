import { useState } from "react";
import InputBox from "../components/InputBox";

const LoginView = () => {
  //in my useState, I could have just pass the object that would have created before this function
  //but since my object is small i pass it straight to the useState
  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div>
      <form>
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
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
