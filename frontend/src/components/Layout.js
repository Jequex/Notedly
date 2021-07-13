import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    /* We can apply media query styles within the styled component */
    /* This will only apply the layout for screens above 700px wide */
    @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
    }
`;

const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding: 1em;
    overflow-y: scroll;
    /* Again apply media query styles to screens above 700px */
    @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
    }
`;

function Layout({children}) {
    return (
        <React.Fragment>
            <Header />
            <Wrapper>
                <Router>
                    <Navigation />
                    <Main>{children}</Main>
                </Router>
            </Wrapper>
        </React.Fragment>
    )
}

export default Layout;
