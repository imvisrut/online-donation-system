import CustomNav from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="App">
      <Router>
        <CustomNav />
        <Switch>
          <div className="container">
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/"></Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
