import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () =>
  <nav id="navbar">
    <a href="#">Home</a>

    <div>
      <ul>
        <li>
          <Link to="/account/login">Login</Link>
        </li>
        <li>
          <Link to="/account/register">Register</Link>
        </li>
      </ul>
    </div>
  </nav>
