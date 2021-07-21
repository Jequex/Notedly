import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './Home';
import About from './About';
import Mynotes from './Mynotes';
import Favorites from './Favorites';

const Pages = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/"> <Home /> </Route>
                <Route path="/about"> <About /> </Route>
                <Route path="/mynotes"><Mynotes /></Route>
                <Route path="/favorites"><Favorites /></Route>
            </Switch>
        </Layout>
    )
}

export default Pages;
