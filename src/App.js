// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Reproductions from './components/Reproductions';
import './css/App.css';
import './css/Sidebar.css';
import './css/Header.css';
import './css/graph.css';
import './css/dashboard.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          {/* <Sidebar /> */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reproductions" element={<Reproductions/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
