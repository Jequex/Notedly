// import logo from './logo.svg';
// import './App.css';
// import Layout from './components/Layout';
import React from 'react';
import Pages from './pages';
import GlobalStyle from './styled_components/GlobalStyle';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Pages />
    </React.Fragment>
  )
 };

export default App;
