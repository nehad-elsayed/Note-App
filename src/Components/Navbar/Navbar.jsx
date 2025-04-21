// import { Button } from "bootstrap";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { authContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function NavbarComp() {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <Navbar expand="lg" className="nav p-3">
        <Container>
          <Navbar.Brand href="/" className="text-white navbrand">
            <i className="fa-solid fa-note-sticky text-white"></i> Sticky Note
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <button className="logout-btn " onClick={logout}>
                  LogOut
                </button>
              ) : (
                <>
                  <Nav.Link className="navLink" href="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="navLink" href="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
