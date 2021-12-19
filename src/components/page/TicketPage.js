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
import EditTicketForm from "../form/EditTicketForm";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            clientName: "",
            editModalIsOpen: false,
            deleteModalIsOpen: false
        };
        console.log(this.props);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
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

    openEditModal = (value) => {
        this.setState({editModalIsOpen: true});
    }

    closeEditModal = () => {
        this.setState({editModalIsOpen: false});
    }

    openDeleteModal = (value) => {
        this.setState({deleteModalIsOpen: true});
    }

    closeDeleteModal = () => {
        this.setState({deleteModalIsOpen: false});
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
                <Modal size="lg" show={this.state.deleteModalIsOpen} onHide={this.closeDeleteModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Eliminar ticket <small><small><small>
                                    {`(#${this.state.data.ticketID})`}
                                </small></small></small></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Está seguro/a de que desea eliminar el ticket?
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={this.closeDeleteModal} variant="secondary">Cancelar</Button>
                        <Button onClick={this.deleteTicket} variant="danger">Eliminar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal size="lg" show={this.state.editModalIsOpen} onHide={this.closeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar ticket <small><small><small>
                                        {`(#${this.state.data.ticketID})`}
                                    </small></small></small></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditTicketForm params={{ticketID: this.state.data.ticketID}} name={this.state.productName} version={this.state.productVersion} state={{ productID: this.state.productID, ticketID: this.state.data.ticketID }}/>
                    </Modal.Body>
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
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                            <Button variant="success">Crear tarea</Button> {'   '}
                            <Button onClick={this.openEditModal} variant="primary">Editar Ticket</Button> {'   '}
                            <Button onClick={this.openDeleteModal} variant="danger">Eliminar Ticket</Button>
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