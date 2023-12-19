import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    // Email validation
    if (
      !values.email ||
      !values.email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
    ) {
      errors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!values.name || values.name.length < 4) {
      errors.name = "Name must be at least 4 characters";
    }

    // Password validation
    if (!values.password) {
      errors.password = "Password is required";
    }

    if (values.password !== values.confirmPassword) {
      // Add password match validation
      errors.password = "Password do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (values.password !== values.confirmPassword) {
        console.log("Passwords do not match");
        return;
      }

      axios
        .post("http://localhost:3001/register", values)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Register</h2>

          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="form-control"
              onChange={(e) => setValues({ ...values, dob: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
