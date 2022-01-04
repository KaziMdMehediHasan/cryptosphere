import { Card, Col, Row } from "antd";
import axios from "axios";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const Bookmarks = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState("false");
  const [cryptos, setCryptos] = useState([]);
  // load cryptos
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/bookmarks/cryptos/${user?.email}`)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data.cryptos);
        setCryptos(res.data.cryptos);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ width: "80%", margin: "5vmax auto" }}>
          <h2 style={{ color: "gray", fontWeight: "bold" }}>
            Your crypto bookmarks
          </h2>
          {cryptos.length === 0 ? (
            <p>Current you don't have any bookmarks</p>
          ) : (
            cryptos && (
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
                        extra={
                          <img
                            className="crypto-image"
                            src={currency.iconUrl}
                          />
                        }
                        hoverable
                      >
                        <p>Price: {millify(currency.price)}</p>
                        <p>Market Cap: {millify(currency.marketCap)}</p>
                        <p>Daily Change: {currency.change}%</p>
                      </Card>
                    </Link>

                    {/* <button
              style={{
                backgroundColor: "green",
                color: "#fff",
                padding: "0.4rem 1rem",
                margin: "1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => removeFromBookmarkHandler(currency.uuid)}
            >
              add to bookmark
            </button> */}
                  </Col>
                ))}
              </Row>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Bookmarks;
