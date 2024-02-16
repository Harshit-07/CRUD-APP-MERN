import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ReadUser = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("http://localhost:5000");

    const result = await response.json();

    if (response.ok) {
      setData(result);
      setError("");
    } else {
      setError(result.error);
    }
  }

  const handleOnDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.ok) {
      setError("Deleted Successfully");
      setTimeout(() => {
        getData();
        setError("");
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  const handleOnEdit = () => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">All User Data</h2>
      <div className="row mt-5">
        {data?.map((items) => {
          return (
            <div className="col-3">
              <div
                className="card mb-3"
                key={items._id}
                style={{ height: "200px" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{items.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-primary">
                    {items.age}
                  </h6>
                  <p className="card-subtitle mb-2 text-body-secondary">
                    {items.email}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleOnDelete(items._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/${items._id}`} className="card-link">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadUser;
