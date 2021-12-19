import React, { Component } from "react";
import TicketService from "../../service/TicketService";
import Header from "../Header";
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import withNavigate from "../../hoc/withNavigate";
import {Container, Breadcrumb, Badge, Row, Col, ListGroup, Modal, Button} from "react-bootstrap";
import moment from "moment";
import ClientService from "../../service/ClientService";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            clientName: ""
        };
        console.log(this.props);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
    }

    componentDidMount() {
        const ticketService = new TicketService();
        ticketService.getTickets(`/tickets/${this.props.params.ticketID}`).then(response => {
            this.setState(
                {
                    data: response.data
                })
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

    openModal = (value) => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    deleteTicket() {
        
        const ticketService = new TicketService();
        console.log(this.state.data.ticketID);
        ticketService.deleteTicket(this.state.data.ticketID).then(response => {
            // Check if the response is success and redirect to home
            // if not, raise an alert
            console.log(response);
            
            if (response.status === 200) {
                console.log(this.props);
                this.props.history("/tickets");
            }
        }).catch(error => {
            console.log(error);
            alert("Error al eliminar ticket")
        });
    }

    render() {
        return (
            <Container>
                <Modal size="lg" show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Eliminar ticket <small><small><small>
                                    {`(#${this.state.data.ticketID})`}
                                </small></small></small></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Está seguro/a de que desea eliminar el ticket?
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.closeModal} variant="secondary">Cancelar</Button>
                        <Button onClick={this.deleteTicket} variant="danger">Eliminar</Button>
                    </Modal.Footer>
                </Modal>
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
                    <Row>
                        <Col>
                            <h2>
                                Ticket #{this.state.data.ticketID} <Badge bg="secondary">{this.state.data.state}</Badge>
                            </h2>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                            <Button onClick={this.openModal} variant="danger">Eliminar Ticket</Button>
                        </Col>
                    </Row>
                    
                    
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
withLocation, withNavigate) (TicketPage);