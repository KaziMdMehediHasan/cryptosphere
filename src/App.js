import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';
import {Navbar} from './components';

function App() {
  return (
    <div className="App">
       <div className="navbar">
         <Navbar/>
       </div>
       <div className="main">
          
       </div>
       <div className="footer">

       </div>
    </div>
  );
}

export default App;
