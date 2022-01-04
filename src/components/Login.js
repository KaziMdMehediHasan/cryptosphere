import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loginImage from '../images/login.png';

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
      className="login-container"
    >
    {/* image div */}
    <div>
        <img src={loginImage} alt=""/>
    </div>
    {/* end of image div */}
      <div>
        <h1 style={{fontSize:"30px",textAlign: "center"}}>You need to login before accessing further information</h1>
        <h1 style={{textAlign: "center",}}>Please login</h1>
        <div style={{textAlign: "center"}}>
            <button
            style={{
                padding: "0.9rem 1.7rem",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#EA4335",
                color: "#fff",
                cursor: "pointer"
            }}
            onClick={handleGoogleLogin}
            >
            <span><i class="fab fa-google"></i> </span>Login with Google
            </button>
        </div>

      </div>
    </div>
  );
};

export default Login;