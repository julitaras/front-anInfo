import React, {Component} from "react"
import logo from '../../logo.svg';
import Nav from "react-bootstrap/Nav";
import {Container} from "react-bootstrap";

class HomePage extends Component {

    render() {
        return (<div className="App">

          <header className="App-header">
              <Container>
                  <Nav className="me-xxl-auto nav-fill">
                      <Nav.Link href="/products" >Modulo Soporte</Nav.Link>
                      <Nav.Link href="/projects">Modulo Proyectos</Nav.Link>
                      <Nav.Link href="/hours">Modulo Recursos</Nav.Link>
                  </Nav>
              </Container>
            <h1> Sistema de gestión PSA </h1>
              <img src={logo} className="App-logo" alt="logo" />
            <p>
              Bienvenido al sitio web de PSA.
            </p>
          </header>
            <Container>

            </Container>
          </div>


            );
    }
}

export default HomePage;
