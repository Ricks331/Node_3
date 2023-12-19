import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/read/" + id)
      .then((res) => {
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center  align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="p-2">
          <h2 className="text-center"> student Details</h2>
          {/* <h2>{student.id}</h2>
        <h2>{student.name}</h2>
        <h2>{student.email}</h2> */}

          <h2>Id</h2>
          <h2>Name</h2>
          <h2>Email</h2>
        </div>
        <Link to="/" className="btn btn-sm btn-success m-2">
          Back
        </Link>
        <Link to={`/edit/${student.id}`} className="btn btn-sm btn-primary m-2">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Read;
