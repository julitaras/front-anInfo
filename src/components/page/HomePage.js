import React, {Component} from "react"
import { Col, Container, Row} from "react-bootstrap";
import Header from "../Header";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import { compose } from "redux";
import {Alert, Card, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faTasks, faUsers } from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from "../Breadcrumbs";
class HomePage extends Component {

    render() {
        return (<div className="App">
          <Container>
              <Header {...this.props} />
              <Breadcrumbs {...this.props} />
              <Alert variant="primary">
                Bienvenido al sitio web del sistema de gestión de PSA.
              </Alert>
            
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title><FontAwesomeIcon icon={faCogs} size="9x" /></Card.Title>
                      <Card.Title>Soporte</Card.Title>
                      <Button href="/products" variant="primary">Ir a Soporte</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title><FontAwesomeIcon icon={faTasks} size="9x" /></Card.Title>
                      <Card.Title>Proyectos</Card.Title>
                      <Button href="/" variant="primary">Ir a Proyectos</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title><FontAwesomeIcon icon={faUsers} size="9x" /></Card.Title>
                      <Card.Title>Recursos</Card.Title>
                      <Button href="/" variant="primary">Ir a Recursos</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Container>
          </div>


            );
    }
}

export default compose(withParams, withLocation) (HomePage);
