import { Card, Col, Row } from "antd";
import axios from "axios";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const Bookmarks = () => {
  const { user, notify } = useAuth();
  const [isLoading, setIsLoading] = useState("false");
  const [cryptos, setCryptos] = useState([]);
  const [deleting, setIsDeleting] = useState(false);
  // load cryptos
  useEffect(() => {
    setIsDeleting(false);
    setIsLoading(true);
    axios
      .get(
        `https://shielded-headland-90751.herokuapp.com/bookmarks/cryptos/${user?.email}`
      )
      .then((res) => {
        setIsLoading(false);
        setCryptos(res.data.cryptos);
      })
      .catch((err) => console.log(err));
  }, [deleting]);
  //

  // remove from bookmark
  const removeFromBookmarkHandler = (id) => {
    const result = window.confirm("Are You sure to delete this?");
    if (result) {
      setIsDeleting(true);
      axios
        .delete(
          `https://shielded-headland-90751.herokuapp.com/bookmarks/cryptos/${id}`
        )
        .then((res) => {
          if (res.data.deletedCount) {
            notify("info", "Delete Successfull");
          }
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ width: "80%", margin: "5vmax auto" }}>
          {cryptos.length === 0 ? (
            <p>Current you don't have any bookmarks</p>
          ) : (
            cryptos && (
              <>
                <h2 style={{ color: "gray", fontWeight: "bold" }}>
                  Your crypto bookmarks
                </h2>
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

                      <div style={{ textAlign: "center" }}>
                        <button
                          style={{
                            backgroundColor: "rgba(180,30,30,0.7)",
                            color: "#fff",
                            padding: "0.4rem 1rem",
                            margin: "1rem",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            removeFromBookmarkHandler(currency._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Bookmarks;
