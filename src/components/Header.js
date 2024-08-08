// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import Filters from './Filters';
// import Dropdown from './dropdown';


const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reproductions">Reproductions</Link></li> 
          <li><Link to="/devices">Devices</Link></li>
          {/* <Dropdown /> */}
        </ul>
       
      </nav>
      <Filters />
    </header>
  );
};

export default Header;