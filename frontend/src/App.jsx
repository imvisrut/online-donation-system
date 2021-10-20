import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import CustomNav from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddBalance from "./pages/AddBalance";
import axios from "axios";

// style
import "./style/App.scss";

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

axios.defaults.withCredentials = true;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Router>
          <Helmet>
            <title>{`${process.env.REACT_APP_SITE_TITLE}`}</title>
          </Helmet>
          <CustomNav
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setJwtToken={setJwtToken}
          />
          <Route exact path="/">
            <Home isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/register">
            <Register isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} setJwtToken={setJwtToken} />
          </Route>
          <Route exact path="/add-balance">
            <AddBalance />
          </Route>
        </Router>
      </div>
    </Elements>
  );
};

export default App;
