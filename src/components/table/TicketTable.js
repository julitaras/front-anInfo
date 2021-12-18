import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap"
import TicketService from "../../service/TicketService";
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import {Button, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import moment from "moment";

class TicketTable extends Component {

    // PASAR URL DE CONSULTA VIA QUERY
    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        }
        console.log(this.props);
    }

    componentDidMount() {
        const ticketService = new TicketService();
        ticketService.getTickets(`/tickets${this.props.location.search}`).then(response => {
            this.setState(
                {
                    tickets: response.data
                })
            console.log(this.state.tickets)
        });
    }

    render() {
        //console.log(this.state);
        const table =
            <div className="TicketsTable"
                 style={{ display: 'block', padding: 30 }}>
                <Header Header={"hola"} {...this.props} />
                <Breadcrumbs {...this.props} />
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Asunto</th>
                        <th>Severidad</th>
                        <th>Empleado asignado</th>
                        <th>Días restantes para vencimiento</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tickets.map(ticket =>
                        <React.Fragment key={ticket.id}>
                            <tr>
                                <td>{ticket.subject}</td>
                                <td>{ticket.severity}</td>
                                <td>{ticket.employeeID}</td>
                                    {
                                            (() => {
                                            let expectedDate = moment(ticket.expectedDate);
                                            let createDate = moment(ticket.createdDate);
                                            let diff = expectedDate.diff(createDate, 'days');
                                            return (
                                                <td>
                                                    {diff > 0 ? diff : 0}
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
                                        </Button>
                                            <Button variant="outline-primary" size="sm">
                                                <FontAwesomeIcon icon={faList}/> Editar
                                            </Button>
                                    </Container>
                                </td>
                            </tr>
                        </React.Fragment>
                    )}
                    </tbody>
                </Table>
            </div>

        return (
            <div className="TicketList">
                {table}
            </div>
        );
    }
}

export default compose(
    withParams,
    withLocation
)(TicketTable)
