// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/reproductions">Reproductions</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
