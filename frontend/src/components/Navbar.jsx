import { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const CustomNav = ({ isLoggedIn, setIsLoggedIn, setJwtToken }) => {
  const history = useHistory();

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setJwtToken("");
    localStorage.removeItem("jwtToken");
    history.push("/login");
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken != null) {
      setIsLoggedIn(true);
      setJwtToken(jwtToken);
    }
  }, [isLoggedIn]);

  return (
    <Navbar bg="dark" className="navbar-dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" style={{ fontSize: "1.3rem" }} to="/">
            <img
              src="/favicon.ico"
              alt="donation image"
              style={{ width: "1.5rem" }}
            />
            DonateX
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          {!isLoggedIn && (
            <Nav className="ml-auto">
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav>
          )}

          {isLoggedIn && (
            <Nav className="ml-auto">
              <Link className="nav-link" to="/add-balance">
                Add Balance
              </Link>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <a role="button" className="nav-link" onClick={logoutHandler}>
                Logout
              </a>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNav;
