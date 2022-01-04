import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const {user, logOut} = useAuth();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo"><Link to="/">Cryptosphere</Link></Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
      <Menu className="custom-menu-theme" theme="dark">
        <Menu.Item className="custom-menu-item" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item className="custom-menu-item" icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item className="custom-menu-item" icon={<MoneyCollectOutlined />}>
          <Link to="/bookmarks">Bookmarks</Link>
        </Menu.Item>
        <Menu.Item className="custom-menu-item" icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        {user.email ? (
              <button className="logout_btn" onClick={logOut}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="login_btn">Login</button>
              </Link>
            )}
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
