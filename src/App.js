// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Reproductions from './pages/Reproductions';
import './css/App.css';
import './css/Sidebar.css';
import './css/Header.css';
import './css/graph.css';
import './css/dashboard.css';
import Filters from './components/Filters';
import { IdSiteProvider } from './contexts/idSiteContext';
function App() {
  return (
    <IdSiteProvider>
      <Router>
        <div className="app">
          <Header />
          <Filters />
          <div className="main-content">
            {/* <Sidebar /> */}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reproductions" element={<Reproductions/>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      </IdSiteProvider>
  );
}

export default App;
