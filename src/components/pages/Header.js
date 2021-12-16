import React, { Component } from "react";
import logo from "../../static/logo.png";
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Navbar, Container, NavDropdown, Breadcrumb } from "react-bootstrap";

class Header extends Component {

    constructor(props) {
        super(props);
    }

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
                    <Nav.Link href="/">Soporte</Nav.Link>
                    <Nav.Link href="/">Proyectos</Nav.Link>
                    <Nav.Link href="/">Recursos</Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
                
            </Container>
            </Navbar>
            <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
          </Container>
          );
    }
};
export default Header;