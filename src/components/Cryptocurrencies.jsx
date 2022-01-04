import { Card, Col, Input, Row } from "antd";
import axios from "axios";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

toast.configure();
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  //  sakawat starts
  const notify = () => {
    toast.info("Bookmark Added", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
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
            notify();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  // sakawat ends

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
              <Card
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
            <button
              style={{
                backgroundColor: "green",
                color: "#fff",
                padding: "0.4rem 1rem",
                margin: "1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => addToBookmarkHandler(currency)}
            >
              add to bookmark
            </button>
            {/* sakawat ends */}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
