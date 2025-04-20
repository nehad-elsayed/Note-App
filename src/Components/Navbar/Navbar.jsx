// import { Button } from "bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarComp() {
  return (
    <>
      <Navbar expand="lg" className="nav p-3" >
        <Container>
          <Navbar.Brand href="/" className="text-white navbrand">
            <i className="fa-solid fa-note-sticky text-white"></i> Sticky Note
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="navLink" href="/login">Login</Nav.Link>
              <Nav.Link className="navLink" href="/register">Register</Nav.Link>
             
             <button className="logout-btn ">LogOut</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
