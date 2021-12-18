import React, { Component } from "react";
import TicketService from "../../service/TicketService";
import Header from "../Header";
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import Breadcrumbs from "../Breadcrumbs";
import {Container, Breadcrumb, Badge, Row, Col, ListGroup} from "react-bootstrap";
import moment from "moment";
import ClientService from "../../service/ClientService";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            clientName: ""
        };
    }

    componentDidMount() {
        const ticketService = new TicketService();
        ticketService.getTickets(`/tickets/${this.props.params.ticketID}`).then(response => {
            this.setState(
                {
                    data: response.data
                })
            console.log(this.state.data);
            console.log(moment(this.state.data.createdDate));
            this.getClientName(this.state.data.clientID);
        });
        
    }

    getClientName() {
        const clientService = new ClientService();
        clientService.getClient(this.state.data.clientID).then(response => {
            this.setState(
                {
                    clientName: response["razon social"]
                })
        });
    }

    render() {
        return (
            <Container>
                <Header {...this.props} />
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="/products">Productos</Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.props.params.name}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.props.params.version}</Breadcrumb.Item>
                        <Breadcrumb.Item active>Detalle ticket #{this.props.params.ticketID}</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
                <Container>
                    <h2>
                        Ticket #{this.state.data.ticketID} <Badge bg="secondary">{this.state.data.state}</Badge>
                    </h2>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <h4><strong>Asunto:  </strong>{this.state.data.subject}</h4>
                        </Col>
                        <Col>
                            <strong>Tipo:  </strong>{this.state.data.type}
                        </Col>
                        <Col>
                            <strong>Cliente:  </strong>{this.state.clientName}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5><p><strong>Descripción:  </strong></p></h5>{this.state.data.description}
                        </Col>
                        <Col>
                        <strong>Tareas:  </strong>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Tarea 1</ListGroup.Item>
                            <ListGroup.Item>Tarea 2</ListGroup.Item>
                            <ListGroup.Item>Tarea 3</ListGroup.Item>
                            <ListGroup.Item>Tarea 4</ListGroup.Item>
                        </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <strong>Fecha de creación:  </strong>{this.state.data.createdDate}
                        </Col>
                        <Col>
                            <strong>Responsable:  </strong>{this.state.data.employeeID}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <strong>Severidad:  </strong>{this.state.data.severity}
                        </Col>
                        <Col>
                            <strong>Días restantes para el vencimiento:  </strong>
                            {moment(this.state.data.expectedDate).diff(moment(this.state.data.createdDate), 'days')}
                        </Col>
                    </Row>
                </Container>
            </Container>);
    }
};

export default compose(withParams,
withLocation) (TicketPage);