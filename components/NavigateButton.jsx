import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton = ({ to, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button onClick={handleClick} style={{ padding: '10px 20px', margin: '10px' }}>
            {children}
        </button>
    );
};

export default NavigateButton;
