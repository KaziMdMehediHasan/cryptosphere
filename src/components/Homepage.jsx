import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
import UserAvatar from './UserAvatar';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  // custom styles
  const plateStyles = {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    textAlign: "center",
    borderRadius: "50px",
    color: "#001529",
    fontWeight: "bold",
  };

  // end of custom styles

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic 
          style={plateStyles}
          title="Total Cryptocurrencies" 
          value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic 
          style={plateStyles}
          title="Total Exchanges" 
          value={millify(globalStats.totalExchanges)} />
          </Col>
        <Col span={12}>
          <Statistic 
          style={plateStyles}
          title="Total Market Cap:" 
          value={`$${millify(globalStats.totalMarketCap)}`} />
          </Col>
        <Col span={12}>
          <Statistic 
          style={plateStyles}
          title="Total 24h Volume" 
          value={`$${millify(globalStats.total24hVolume)}`} />
          </Col>
        <Col span={12}>
          <Statistic 
          style={plateStyles}
          title="Total Cryptocurrencies" 
          value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic 
          style={plateStyles}
          title="Total Markets" 
          value={millify(globalStats.totalMarkets)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3}><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
      <UserAvatar/>
    </>
  );
};

export default Homepage;
