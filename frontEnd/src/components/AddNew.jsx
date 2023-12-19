import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventdefault();
    axios
      .post("http://localhost:3001/student", values)
      .then((res) => {
        console.log(res);
        navigate('/')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Add Student</h2>

          <div className="mb-2">
            <label htmlfor="">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlfor="">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <button className="btn btn-success">submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
