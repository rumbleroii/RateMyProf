import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="navbar-title">
        RateMyProf
      </h1>
      <div className="navbar-links">
        <Link to="/homepage">Home</Link>
        <Link to="/profile">User Profile</Link>
      </div>
    </div>
  );
}

export default Navbar;
