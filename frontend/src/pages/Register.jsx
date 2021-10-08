import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      about: about,
      password: password,
      password2: password2,
    };

    try {
      await axios.post("/api/users/register", newUser);
    } catch (err) {
      setErrors(err.response.data);
    }
    // history.push("/login");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">
                {errors.name}
                {errors.emailnotfound}
              </span>
            </div>
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
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                id="about"
                type="text"
              />
              <label htmlFor="email">About</label>
              <span className="red-text">{errors.about}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{errors.password2}</span>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
