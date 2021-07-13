import React from 'react';
import {  Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <React.Fragment>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </React.Fragment>
    )
}

export default Navigation;
