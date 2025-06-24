import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export function NavBar({ user, onSearch }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate("/index");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      onSearch("");
    }
  };

  return (
    <nav className="navbar navbar-light navbar-expand-md navbar-back">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="../img/icon.png" alt="Logo" width="40" height="40" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/index">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sellerFrontend">Sell an Item!</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>

            {user ? (
              <li className="nav-item">
                <button className="btn btn-danger nav-link" onClick={handleLogout}>
                  Logout ({user.email})
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>

        <form className="d-flex justify-content-left" role="search" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            name="search"
            aria-label="Search"
            placeholder="Search cookware..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
