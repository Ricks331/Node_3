import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:3001/")
  //       //   .then((res) => console.log(res))
  //       .then((res) => setData(res.data))
  //       .catch((err) => console.log(err));
  //   }, []);

  const data = [
    { id: 1, name: "John", email: "john@example.com", status: "0" },
    { id: 2, name: "Jane", email: "jane@example.com", status: "1" },
    { id: 3, name: "Doe", email: "doe@example.com", status: "0" },
  ];

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="container-fluid d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 w-md-75 w-lg-50 bg-white rounded p-3">
        <h2 className="text-center">Student list</h2>
        <div className="d-flex justify-content-end">
          <Link to="/add" className="btn btn-sm btn-success">
            Add +
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.status === "1" ? "active" : "blocked"}</td>
                  <td>
                    {student.status === "1" ? (
                      <button className="btn btn-sm btn-info">Block</button>
                    ) : (
                      <button className="btn btn-sm btn-success">
                        Unblock
                      </button>
                    )}
                    <Link
                      to={`/read/${student.id}`}
                      className="btn btn-sm btn-success m-2"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/edit/${student.id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-sm btn-danger m-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
