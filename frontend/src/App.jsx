import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CustomNav from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  return (
    <div className="App">
      <Router>
        <CustomNav
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setJwtToken={setJwtToken}
        />
        <Route exact path="/" component={Home} />
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/register">
          <Register isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} setJwtToken={setJwtToken} />
        </Route>
      </Router>
    </div>
  );
};

export default App;
