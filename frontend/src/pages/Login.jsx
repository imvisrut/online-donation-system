import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginData = (e) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };

    axios
      .post("http://localhost:5000/login", credentials)
      .then(() => console.log("Book Created"))
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <h1 className="mb-3">Login</h1>
      <Form onSubmit={sendLoginData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <div className="d-flex">
          <Button variant="primary" type="submit">
            Login
          </Button>

          <span className="d-flex mx-5">
            <span style={{ padding: "8px 0px" }}>have not an account?</span>
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Login;
