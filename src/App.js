import { Layout, Space, Typography } from "antd";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider/AuthProvider";
import {
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  Homepage,
  Navbar,
  News,
} from "./components";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
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
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>
                <Route exact path="/cryptocurrencies">
                  <Cryptocurrencies />
                </Route>
                <PrivateRoute path="/crypto/:coinId">
                  <CryptoDetails />
                </PrivateRoute>
                <Route exact path="/news">
                  <News />
                </Route>
              </Switch>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Copyright © 2021
              <Link to="/">Cryptosphere Inc.</Link> <br />
              All Rights Reserved.
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
