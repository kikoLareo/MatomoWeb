// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Analytics Web</h1>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}

export default Home;
