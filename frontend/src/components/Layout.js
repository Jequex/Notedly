import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { BrowserRouter as Router } from 'react-router-dom';

function Layout({children}) {
    return (
        <React.Fragment>
            <Header />
            <div className="wrapper">
                <Router>
                    <Navigation />
                    <main>{children}</main>
                </Router>
            </div>
        </React.Fragment>
    )
}

export default Layout;
