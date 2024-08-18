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
        <nav className='navHeader'>
          <ul>
            <li className="menu-item" ><Link to="/">Portada</Link></li>
            <li className="menu-item" ><Link to="/reproductions">Reproducciones</Link></li> 
            <li className="menu-item" ><Link to="/devices">Dispositivos</Link></li>
            <li className="menu-item" ><Link to="/videos">Videos</Link></li>
            <li className="menu-item" ><VisitDropDown/></li>
            <li className="menu-item" ><Link to="/comparator">Comparador</Link></li>
          </ul>
        </nav>
        <div className="pageTitle"></div>
        <Filters />
      </div>
    </header>
  );
};

export default Header;