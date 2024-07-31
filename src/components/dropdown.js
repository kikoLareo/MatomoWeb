// src/components/Dropdown.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    navigate(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="/dashboard">Dashboard</option>
      <option value="/reproductions">Reproductions</option>
    </select>
  );
};

export default Dropdown;