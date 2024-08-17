// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import Filters from './Filters';
import VisitDropDown from '../pages/Visits/visitsDropDown';

export function setTitle(title) {
  const titleDiv = document.querySelector('.pageTitle');
  titleDiv.innerHTML = title;
}

const Header = () => {
  return (
    <header className="header">
      <div className="headerMenu">
        <nav>
          <ul>
            <li className="menu-item" ><Link to="/">Home</Link></li>
            <li className="menu-item" ><Link to="/reproductions">Reproductions</Link></li> 
            <li className="menu-item" ><Link to="/devices">Devices</Link></li>
            <li className="menu-item" ><Link to="/videos">Videos</Link></li>
            <li className="menu-item" ><VisitDropDown/></li>
          </ul>
        </nav>
        <div className="pageTitle"></div>
        <Filters />
      </div>
    </header>
  );
};

export default Header;