import React from 'react';
import { Outlet } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import DonatePage from './pages/DonatePage';
// import Locations from './components/Locations'; 
import './styles/App.css'; 

const App = () => {
    return (
        <div>
            <main>
                <Outlet /> {/* Nested routes will render here */}
                
            </main>
        </div>
        
    );
};

export default App;
