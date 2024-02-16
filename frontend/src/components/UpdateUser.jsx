import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      setName("");
      setEmail("");
      setAge("");
      setError("");
      navigate("/all");
    } else {
      setError(result.error);
      console.log(result.error);
    }
  };

  const getUserDetailsById = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();
    if (response.ok) {
      setName(result?.name);
      setEmail(result?.email);
      setAge(result?.age);
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    getUserDetailsById();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputName" className="form-label">
            Enter name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputAge" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputAge"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
