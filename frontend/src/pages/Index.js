import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './Home';

const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
            </Layout>
        </Router>
    )
}

export default Pages;
