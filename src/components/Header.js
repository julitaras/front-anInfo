import React, { Component } from "react";
import logo from "../static/logo.png";
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Navbar, Container, Breadcrumb } from "react-bootstrap";
import {BreadcrumbItem} from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from "../routes";

class Header extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        const crumbs = routes
                // Get all routes that contain the current one.
                .filter(({ path }) => props.location.pathname.includes(path))
                // Swap out any dynamic routes with their param values.
                // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                .map(({ path, ...rest }) => ({
                  path: Object.keys(props.params).length
                    ? Object.keys(props.params).reduce(
                        (path, param) =>
                          path.replace(`:${param}`, props.params[param]),
                        path
                      )
                    : path,
                  ...rest
                }));
        console.log('Generated crumbs for ${props.match.path}');
        crumbs.map(({ name, path }) => console.log({ name, path }));
        // Given an array of objects which contain a `name` and `path` property,
        // generate a `BreadcrumbItem` component for each.
        this.crumbs_items = crumbs.map(({ name, path }, index) => (
            path === props.location.pathname ?
            <BreadcrumbItem key={index} active>{name}</BreadcrumbItem> :
            <BreadcrumbItem key={index}>
                <Link to={path}>{name}</Link>
            </BreadcrumbItem>
        ));

        
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
                    {this.crumbs_items}
            </Breadcrumb>
          </Container>
          );
    }
};
export default Header;
