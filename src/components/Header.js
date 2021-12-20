import React, { Component } from "react";
import logo from "../static/logo.png";
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Navbar, Container, NavDropdown } from "react-bootstrap";

class Header extends Component {
    render() {
        return (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/"><Image src={logo} rounded /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Soporte" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/tickets">Tickets</NavDropdown.Item>
                                <NavDropdown.Item href="/products">Productos</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/products">Soporte</Nav.Link>
                            <Nav.Link href="/projects">Proyectos</Nav.Link>
                            <Nav.Link href="/hours">Recursos</Nav.Link>
                            
                        </Nav>
                        </Navbar.Collapse>
                        
                    </Container>
                </Navbar>
            </Container>
          );
    }
};
export default Header;
