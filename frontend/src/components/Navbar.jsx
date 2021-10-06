import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../actions/authActions";
import {Navbar,Container,Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const DummyView = ({onLogoutClick, _this}) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  useEffect(() => {
      _this.setState({
          reduxState : isAuthenticated
      })
  }, [])
  return (
    <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>

          {!isAuthenticated && (
            <Nav className="ml-auto">
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav>
          )}
          {isAuthenticated && (
            <Nav className="ml-auto">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </Nav>
          )}
        </Navbar.Collapse>
  )
}

class CustomNav extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  

  render() {
    const { user } = this.props.auth;
    
    return (
      <Navbar bg="dark" className="navbar-dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Donate</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <DummyView onLogoutClick={this.onLogoutClick} _this = {this} />
        </Container>
      </Navbar>
    );
  }
}
CustomNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(CustomNav);
