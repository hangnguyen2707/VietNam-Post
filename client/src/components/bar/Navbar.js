// src/components/Navbar.js

import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  let username = localStorage.getItem('username');
  return (
    <div className="navbar">
      <div className="brand">Vietnam Post</div>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button type="button">Search</button>
      </div>
      <div className="account">
        <div className="account-icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="account-dropdown">
          
          <span className="account-name">{username}</span>
              

          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/">Log Out</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
