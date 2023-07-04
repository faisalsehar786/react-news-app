import React, { useState, useEffect } from "react";
import REACT_APP_API_URL from "../config";
const Setting = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const getLogedUser = async () => {
    // API Call
    try {
      const response = await fetch(`${REACT_APP_API_URL}/author/detail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      setname(json?.name);
    } catch (error) {
      alert("error");
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    getLogedUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${REACT_APP_API_URL}/author/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name, password: password }),
    });
    const json = await response.json();

    if (json.success) {
      alert("Settings Saved Successfully");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
            id="name"
            name="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            name="password"
            id="password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Image
          </label>
          <input type="file" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default Setting;
