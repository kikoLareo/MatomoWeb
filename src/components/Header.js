// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import Dropdown from './dropdown';


const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reproductions">Reproductions</Link></li> 
          {/* <Dropdown /> */}
        </ul>
       
      </nav>
    </header>
  );
};

export default Header;