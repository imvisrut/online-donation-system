import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const Login = ({ setIsLoggedIn, setJwtToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    try {
      const res = await axios.post("/api/users/login", userData);
      if (res.status === 200) {
        setIsLoggedIn(true);
        setJwtToken(res.data.token);
        localStorage.setItem("jwtToken", res.data.token);
      }
      history.push("/profile");
    } catch (err) {
      console.log(err.response);
      setErrors(err.response.data);
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>{`${process.env.REACT_APP_SITE_TITLE} - Login`}</title>
      </Helmet>
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
