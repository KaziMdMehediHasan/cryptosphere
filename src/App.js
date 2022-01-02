import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';
import {Navbar,Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News} from './components';

function App() {
  return (
    <div className="app">
       <div className="navbar">
         <Navbar/>
       </div>
       <div className="main">
          <Layout>
            <div className="routes">
               <Switch>
                 <Route exact="/">
                   <Homepage/>
                 </Route>
                 <Route exact="/exchanges">
                   <Exchanges/>
                 </Route>
                 <Route exact="/cryptocurrencies">
                   <Cryptocurrencies/>
                 </Route>
                 <Route exact="/crypto/:coinId">
                   <CryptoDetails/>
                 </Route>
                 <Route exact="/news">
                   <News/>
                 </Route>
               </Switch>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                Cryptosphere <br/>
                All rights reserved.
            </Typography.Title>
            <Space>
              <Link to="/home">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
       </div>
    </div>
  );
}

export default App;
