import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import REACT_APP_API_URL from "../config";
const Navbar = () => {
 
  let history = useHistory();
  const [islogedIn, setislogedIn] = useState(false);
  const [logedUser, setlogedUser] = useState("");
  const token = localStorage.getItem("token");

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

      setlogedUser(json?.name);
    } catch (error) {
      console("error");
    }
  };

  useEffect(() => {
    if (token) {
      getLogedUser();
      setislogedIn(true);
    } else {
      setislogedIn(false);
    }
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    setislogedIn(false);
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NewsBlog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li> */}
            {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li> */}
          </ul>
          <form className="d-flex">
            {islogedIn ? (
              <>
                <Link
                  className="btn btn-primary mx-1"
                  to="/setting"
                  role="button"
                >
                  Settings
                </Link>
                <button
                  className="btn btn-primary mx-1"
                  role="button"
                  onClick={logOut}
                >
                  Logout
                </button>
                <a class="nav-link text-white" href="#">
                  <i class="fas fa-user mx-1"></i> {logedUser}
                </a>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
