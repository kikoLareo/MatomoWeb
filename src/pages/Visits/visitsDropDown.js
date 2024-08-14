import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pagesConfig } from './visitPages/visitPagesConfig';

const visitsOptions = pagesConfig.map(page => ({
  value: page.path,
  label: page.title.split(' - ')[1],
}));

const VisitDropDown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionClick = (value) => {
    navigate(value);
    setDropdownVisible(false);
  };

  return (
    <div className="menu-item" onClick={handleMenuClick}>
      Visits
      {dropdownVisible && (
        <div className="dropdown-menu">
          {visitsOptions.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitDropDown;