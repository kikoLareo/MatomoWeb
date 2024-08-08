// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Devices from './pages/Devices';
import Reproductions from './pages/Reproductions';
import './css/App.css';
import './css/Sidebar.css';
import './css/Header.css';
import './css/graph.css';
import './css/dashboard.css';
import './css/Home.css';
import { IdSiteProvider } from './contexts/idSiteContext';
function App() {
  return (
    <IdSiteProvider>
      <Router>
        <div className="app">
          <Header />
         
          <div className="main-content">
            {/* <Sidebar /> */}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reproductions" element={<Reproductions/>} />
                <Route path="/devices" element={<Devices />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      </IdSiteProvider>
  );
}

export default App;
