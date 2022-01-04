import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import './App.css';
import AuthProvider from './AuthProvider/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

const App = () => (
  <AuthProvider>
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges />
            </Route>
            <PrivateRoute exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </PrivateRoute>
            <PrivateRoute exact path="/crypto/:coinId">
              <CryptoDetails />
            </PrivateRoute>
            <PrivateRoute exact path="/news">
              <News />
            </PrivateRoute>
          </Switch>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'black', textAlign: 'center' }}>Copyright © 2022 
          <Link style={{color: 'white'}} to="/">
            <span> Cryptosphere Inc.</span>
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link style={{ color: 'white'}} to="/">Home</Link>
          <Link style={{ color: 'white'}}to="/exchanges">Exchanges</Link>
          <Link style={{ color: 'white'}}to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
  </AuthProvider>
);

export default App;
