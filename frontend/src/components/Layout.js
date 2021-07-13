import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

function Layout({children}) {
    return (
        <React.Fragment>
            <Header />
            <div className="wrapper">
                <Navigation />
                <main>{children}</main>
            </div>
        </React.Fragment>
    )
}

export default Layout;
