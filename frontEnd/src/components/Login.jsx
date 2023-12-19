import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    // Simple email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid(values.email)) {
      // Show error if email is not valid
      console.log("Invalid email format");
      return;
    }

    axios
      .post("http://localhost:3001/login", values)  // Replace with your login API endpoint
      .then((res) => {
        console.log(res);
        // Check if password is incorrect based on response from the server
        if (res.data.passwordError) {
          setPasswordError("Incorrect password");
        } else {
          setPasswordError(null);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Login</h2>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>

          {passwordError && <p className="text-danger">{passwordError}</p>}

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
