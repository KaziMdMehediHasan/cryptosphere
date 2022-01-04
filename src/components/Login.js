import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { signInUsingGoogle } = useAuth();
  const location = useLocation();
  const history = useHistory();
  // console.log('came-from',location.state?.from.pathname)
  const redirect_uri = location.state?.from || "/";

  const handleGoogleLogin = () => {
    signInUsingGoogle().then((result) => {
      history.push(redirect_uri);
    });
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Please login</h1>

        <button
          style={{
            padding: "0.9rem 1.7rem",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "darkblue",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={handleGoogleLogin}
        >
          login with google
        </button>
      </div>
    </div>
  );
};

export default Login;