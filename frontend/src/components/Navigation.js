import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <Router>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </Router>
    )
}

export default Navigation;
