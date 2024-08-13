import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const visitsOptions = [
    { value: '/summary', label: 'Resumen' },
    { value: '/visitFrequency', label: 'Frecuencia' },
    { value: '/duration', label: 'Duración' },
    { value: '/interest', label: 'Interes' },
];

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