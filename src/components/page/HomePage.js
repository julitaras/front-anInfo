import React, {Component} from "react"
import logo from '../../logo.svg';
import Nav from "react-bootstrap/Nav";

class HomePage extends Component {

    render() {
        return (<div className="App">
          <header className="App-header">
            <h1> PSA </h1>
              <img src={logo} className="App-logo" alt="logo" />
            <p>
              Bienvenido al sitio web de PSA.
            </p>
          </header>
            <Nav className="me-auto nav-fill ">
                <Nav.Link href="/products">Modulo Soporte</Nav.Link>
                <Nav.Link href="/projects">Modulo Proyectos</Nav.Link>
                <Nav.Link href="/hours">Modulo Recursos</Nav.Link>
            </Nav>
          </div>);
    }
}

export default HomePage;
