import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptoQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptoQuery(10);
  const globalStatus = data?.data?.status;

  console.log(data);
  if (isFetching) return "Loading...";

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStatus.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={globalStatus.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={globalStatus.totalMarketCap}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={globalStatus.total24Volume}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={globalStatus.totalMarkets} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export default Homepage;
