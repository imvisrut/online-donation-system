import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import CustomNav from "./components/Navbar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <CustomNav />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
