import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap"
import TicketService from "../../service/TicketService";
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import {Button, Container, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import moment from "moment";
import EditTicketForm from "../form/EditTicketForm";

class TicketTable extends Component {

    // PASAR URL DE CONSULTA VIA QUERY
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            editModalIsOpen: false,
            deleteModalIsOpen: false,
            ticketID: 0,
            actualTicket: {}
        }
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
    }

    openEditModal = (value) => {
        this.updateValues(value);
        this.setState({editModalIsOpen: true});
    }

    closeEditModal = () => {
        this.setState({editModalIsOpen: false});
    }

    openDeleteModal = (value) => {
        this.updateValues(value);
        this.setState({deleteModalIsOpen: true});
    }

    closeDeleteModal = () => {
        this.setState({deleteModalIsOpen: false});
    }

    deleteTicket() {
        
        const ticketService = new TicketService();
        console.log(this.state.data.ticketID);
        ticketService.deleteTicket(this.state.ticketID).then(response => {
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

    setActualTicket(ticketID) {
        console.log(ticketID);
        this.setState({actualTicket : this.state.tickets.find(ticket => {
            return ticket.ticketID === ticketID;
        })});
    }

    updateValues(value) {
        this.setState({ticketID: parseInt(value),
            actualTicket : this.state.tickets.find(ticket => {
                return ticket.ticketID === parseInt(value);
            })});
    }

    componentDidMount() {
        const ticketService = new TicketService();
        ticketService.getTickets(`/tickets${this.props.location.search}`).then(response => {
            this.setState(
                {
                    tickets: response.data
                })
        });
    }

    render() {
        //console.log(this.state);
        const table =
                <Container>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Asunto</th>
                        <th>Severidad</th>
                        <th>Empleado asignado</th>
                        <th>Días restantes para vencimiento</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tickets.map(ticket =>
                        <React.Fragment key={ticket.ticketID}>
                            <tr>
                                <td>{ticket.subject}</td>
                                <td>{ticket.severity}</td>
                                <td>{ticket.employeeID}</td>
                                    {
                                            (() => {
                                            let expectedDate = moment(ticket.expectedDate);
                                            let currentDate = moment();
                                            let diff = expectedDate.diff(currentDate, 'days');
                                            return (
                                                <td>
                                                    {diff >= 0 ? diff + 1 : 0}
                                                </td>
                                            );
                                        })()
                                    }
                                <td>
                                    <Container>
                                        <Button href={`/tickets/${this.props.params.name}/${this.props.params.version}/${ticket.ticketID}`} 
                                                value={"pruebaDetalle"}
                                                variant="outline-success" size="sm" >
                                            <FontAwesomeIcon icon={faPlusSquare}/> Ver detalle
                                        </Button>{'   '}
                                        <Button variant="outline-primary" size="sm"
                                            onClick={e => this.openEditModal(e.target.value)}
                                            value={ ticket.ticketID } >
                                            <FontAwesomeIcon icon={faList}/> Editar
                                        </Button>{'   '}
                                        <Button variant="outline-danger" size="sm"
                                            onClick={e => this.openDeleteModal(e.target.value)}
                                            value={ ticket.ticketID } >
                                            <FontAwesomeIcon icon={faTrash}/> Eliminar
                                        </Button>
                                    </Container>
                                </td>
                            </tr>
                        </React.Fragment>
                    )}
                    </tbody>
                </Table>
                </Container>
        return (
            <div>
                <Modal size="lg" show={this.state.editModalIsOpen} onHide={this.closeEditModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Editar ticket <small><small><small>
                                    {`(#${this.state.ticketID})`}
                                </small></small></small></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditTicketForm params={{ticketID: this.state.ticketID}} name={this.state.productName} version={this.state.productVersion} state={{ productID: this.state.productID, ticketID: this.state.ticketID }}/>
                        </Modal.Body>
                </Modal>
                <Modal size="lg" show={this.state.deleteModalIsOpen} onHide={this.closeDeleteModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Eliminar ticket <small><small><small>
                                    {`(#${this.state.ticketID})`}
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
                <Header Header={"hola"} {...this.props} />
                <Breadcrumbs {...this.props} />
                {table}
            </div>
        );
    }
}

export default compose(
    withParams,
    withLocation
)(TicketTable)
