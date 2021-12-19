import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap"
import TicketService from "../../service/TicketService";
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import {Button, Container, Modal, Overlay, Popover, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import moment from "moment";
import EditTicketForm from "../form/EditTicketForm";
import ProductService from "../../service/ProductService";

class TicketTable extends Component {

    // PASAR URL DE CONSULTA VIA QUERY
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            editModalIsOpen: false,
            deleteModalIsOpen: false,
            ticketID: 0,
            actualTicket: {}, 
            showFilters: false,
            target: null,
            products: [],
            versions: [],
            actualProductID: undefined,
            onlyOutOfTime: false
        }
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.toggleShowFilters = this.toggleShowFilters.bind(this);
    }

    reloadVersions(productIDStr){
        const productService = new ProductService();
        productService.getProduct(parseInt(productIDStr)).then(response => {
            this.setState({
                versions: response.versions
            });
            console.log(this.state.versions);
        });
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
        console.log(this.props.location.search);
        ticketService.getTickets(`/tickets${this.props.location.search}`).then(response => {
            this.setState(
                {
                    tickets: response.data
                })
        });
        const productService = new ProductService();
        productService.getProducts().then(response =>
            this.setState({
                products: response
            })
        );

    }

    toggleShowFilters(e) {
        this.setState(
            {showFilters : !this.state.showFilters,
            target: e.target})
    }

    filterTickets(e) {
        const formData = new FormData(e.target);
        e.preventDefault();
        console.log(formData.entries());
        var ticket = {};
        for (let [key, value] of formData.entries()) {
            ticket[key] = value;
        }
        if (this.state.onlyOutOfTime)
            ticket['outOfTime'] = this.state.onlyOutOfTime;
        if (ticket.productID === '')
            delete ticket.productID
        else
            ticket['productID'] = parseInt(ticket['productID'])
        if (ticket.productVersion === '')
            delete ticket.productVersion
        if (ticket.type === '')
            delete ticket.type
        var str = [];
        for (var p in ticket)
            if (ticket.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(ticket[p]));
            }
        var query = str.join("&");

        const ticketService = new TicketService();
        ticketService.getTickets(`/tickets?${query}`).then(response => {
            this.setState(
                {
                    tickets: response.data
                })
        });

    }

    render() {
        //console.log(this.state);
        const overlayForm = 
            <Overlay
                show={this.state.showFilters}
                placement="bottom"
                target={this.state.target}

            >
                <Popover id="popover-contained">
                <Popover.Body>
                <Container>
                    <Form onSubmit={(e) => this.filterTickets(e)}>
                        <FormGroup>
                            <Label for="product">Producto</Label>
                            <Input value={this.state.actualProductID}
                            onChange={e =>{this.reloadVersions(e.target.value)}}
                            type="select" name="productID" id="product">
                                <option value=''>Todos</option>
                                {this.state.products.map((product) => {
                                    return (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="productVersion">Versión</Label>
                            <Input type="select" name="productVersion" id="productVersion">
                                <option value=''>Todas</option>
                                {this.state.versions.map((version, index) => {
                                    return (
                                        <option key={index} value={version}>{version}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="type">Tipo</Label>
                            <Input type="select" name="type" id="type">
                                <option value=''>Todos</option>
                                <option value="ERROR">Error</option>
                                <option value="QUERY">Consulta</option>
                            </Input>
                        </FormGroup>
                        <FormGroup check>
                            <Input type="checkbox" onChange={e =>{
                                this.setState({onlyOutOfTime: e.target.checked})
                            }}/>
                            {' '}
                            <Label check>Ver solo tickets vencidos</Label>
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Filtrar
                        </Button>
                    </Form>
                </Container>
                </Popover.Body>
                </Popover>
            </Overlay>
                
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
                <Container >
                    <Row>
                    <Col>{'  '}</Col>
                    <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                    <Button onClick={this.toggleShowFilters}>Filtros</Button>
                    </Col>
                    {overlayForm}
                    </Row>
                    <Row>
                        {'   '}
                    </Row>
                </Container>
                
                {table}
            </div>
        );
    }
}

export default compose(
    withParams,
    withLocation
)(TicketTable)
