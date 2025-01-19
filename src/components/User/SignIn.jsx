import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as userService from "../../services/userService";

const SignIn = (props) => {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.signIn(formData);
      setUser(user);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        If you do not have an account, then please{" "}
        <Link to="/signup">Sign Up here</Link>
      </p>
    </div>
  );
};
export default SignIn;
