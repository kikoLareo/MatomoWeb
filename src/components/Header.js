// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import Filters from './Filters';
import VisitDropDown from '../pages/Visits/visitsDropDown';
// import Dropdown from './dropdown';


const Header = () => {
  return (
    <header className="header">
      <div className="headerMenu">
        <nav>
          <ul>
            <li className="menu-item" ><Link to="/">Home</Link></li>
            <li className="menu-item" ><Link to="/reproductions">Reproductions</Link></li> 
            <li className="menu-item" ><Link to="/devices">Devices</Link></li>
            <li className="menu-item" ><VisitDropDown/></li>
            {/* <Dropdown /> */}
          </ul>
        
        </nav>
        <Filters />
      </div>
    </header>
  );
};

export default Header;