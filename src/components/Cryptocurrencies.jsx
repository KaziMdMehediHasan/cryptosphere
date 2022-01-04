import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
import useAuth from '../hooks/useAuth';
import axios from 'axios';


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const { user, notify } = useAuth();

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

    // custom api request
    const addToBookmarkHandler = (currency) => {
      const newCrypto = { ...currency };
      newCrypto.email = user?.email;
      console.log(newCrypto);
      axios
        .post(
          "https://shielded-headland-90751.herokuapp.com/bookmarks/addCrypto",
          newCrypto
        )
        .then(
          (res) => {
            if (res.data.insertedId) {
              notify("info", "Added to bookmarks");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
    // custom api request end

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      {/* crypto currency card */}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              {/* single card */}
              <Card
                style={{borderRadius: '15px'}}
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
            {/* sakawat starts */}
            <div
              style={{
                textAlign: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "green",
                  color: "#fff",
                  padding: "0.4rem 0.7rem",
                  margin: "1rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => addToBookmarkHandler(currency)}
              >
                Add to bookmark
              </button>
            </div>
            {/* sakawat ends */}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
