import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import "./User.css";

const SignUp = (props) => {
  const { setUser } = props;
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    valid: true,
    email: "",
  });

  const { username, password, passwordConfirm, email } = formData;

  const updateMessage = (message) => {
    setMessage(message);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    let passwordError = "";
    if (password.length < minLength) {
      passwordError += "Password must be at least 8 characters long.\n";
      return "Needs more characters (8 total).";
    }
    if (!hasUppercase) {
      passwordError += "Password must contain at least one uppercase letter.\n";
      return "Must contain uppercase letter.";
    }
    if (!hasLowercase) {
      passwordError += "Password must contain at least one lowercase letter.\n";
      return "Must contain lowercase letter.";
    }
    if (!hasNumber) {
      passwordError += "Password must contain at least one number.\n";
      return "Must contain number.";
    }
    if (!hasSpecialChar) {
      passwordError +=
        "Password must contain at least one special character.\n";
      return "Must contain special character.";
    } else {
      return;
    }
  };

  useEffect(() => {
    const passwordMatch = formData.password === formData.passwordConfirm;
    setFormData({ ...formData, valid: passwordMatch });
  }, [formData.password, formData.passwordConfirm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.valid) {
      setMessage("Please fix password errors before submitting.");
      return;
    }
    try {
      if (event.target.name === "password") {
        validatePassword(event.target.value);
      }
      let isValid = true;
      if (formData.password !== formData.passwordConfirm) {
        isValid = false;
        setMessage("Passwords must match.");
      }
      setFormData({ ...formData, valid: isValid });
      const newUserResponse = await userService.signup(formData);
      setUser(newUserResponse.user);
      navigate("/");
      navigate(0);
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: "",
      password: "",
      passwordConfirm: "",
      valid: "",
      email: "",
    });
    setMessage("");
  };

  return (
    <div className="backgroundCard">
      <h2>Create An Account</h2>
      <p>{message}</p>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password Criteria</label>
          <ul>
            <li>
              <small>Needs 8 or more characters.</small>
            </li>

            <li>
              <small>Must contain uppercase letter.</small>
            </li>
            <li>
              <small>Must contain lowercase letter.</small>
            </li>
            <li>
              <small>Must contain number.</small>
            </li>
            <li>
              <small>Must contain special character.</small>
            </li>
          </ul>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            placeholder="Confirm password"
            onChange={handleChange}
          />
        </div>
        {validatePassword(password)}

        {!formData.valid && (
          <p
            className="invalid"
            style={{ color: "darkred" }}
          >
            Passwords must match.
          </p>
        )}
        {formData.valid && (
          <p
            className="valid"
            style={{ color: "darkgreen" }}
          >
            Passwords match!
          </p>
        )}

        {formData.valid && (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        )}
        <Link to="/">
          <button
            className="btn btn-primary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
