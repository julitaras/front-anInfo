import React, {Component} from "react"
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import ClientService from "../../service/ClientService";
import EmployeeService from "../../service/EmployeeService";
import TicketService from "../../service/TicketService";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
import Header from "../Header";
import withNavigate from "../../hoc/withNavigate";
import { Breadcrumb, Container } from "react-bootstrap";

class TicketForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            employees: []
        };
        //this.postTicket = this.postTicket.bind(this);
    }

    _setClientsState() {
        const clientService = new ClientService();
        clientService.getClients().then(response => {
            this.setState( {
                clients: response
            })
        });
    }

    _setEmployeesState() {
        const employeeService = new EmployeeService();
        employeeService.getEmployees().then(response => {
            this.setState( {
                employees: response.data
            })
        });
    }

    componentDidMount() {
        //const productID = this.props.location.state.productID;
        //const {name, version} = this.props.params
        this._setEmployeesState();
        this._setClientsState();
    }

    postTicket(e) {
        
        const formData = new FormData(e.target);
        e.preventDefault();
        var ticket = {};
        for (let [key, value] of formData.entries()) {
            ticket[key] = value;
        }
        ticket["productID"] = this.props.state.productID;
        ticket["productVersion"] = this.props.version;
        ticket["employeeID"] = ticket["employeeID"] === "sin-responsable" ? null : ticket["employeeID"];
        console.log(ticket);
        const ticketService = new TicketService();
        
        ticketService.postTicket(ticket).then(response => {
            // Check if the response is success and redirect to home
            // if not, raise an alert
            console.log(response);
            
            if (response.status === 200) {
                console.log(this.props);
                this.props.history("/products");
            }
        }).catch(error => {
            console.log(error);
            alert("Error al crear ticket")
        });
    }

    render() {
        return (
            <Container>
            <div>
                <Form onSubmit={(e) => this.postTicket(e)}>
                    <FormGroup>
                        <Label for="subject">Asunto</Label>
                        <Input
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Asunto de ejemplo"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Descripcion</Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Descripcion de ejemplo"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="client">Cliente</Label>
                        <Input type="select" name="clientID" id="client">
                            {
                                this.state.clients.map((client, index) => {
                                    return (
                                        <option key={index} value={client['id']}>
                                            {client["razon social"]}
                                        </option>);
                                })
                            }
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="type">Tipo</Label>
                        <Input type="select" name="type" id="type">
                            <option value="QUERY">Consulta</option>
                            <option value="ERROR">Error</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="severity">Severidad</Label>
                        <Input type="select" name="severity" id="severity">
                            <option>S1</option>
                            <option>S2</option>
                            <option>S3</option>
                            <option>S4</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="employeeID">Responsable</Label>
                        <Input type="select" name="employeeID" id="employeeID">
                            <option value="sin-responsable" >Sin responsable</option>
                            {
                                this.state.employees.map((employee, index) => {
                                    return (
                                        <option key={index} value={employee['legajo']}>
                                            {employee["Nombre"] + ' ' + employee["Apellido"]}
                                        </option>);
                                })
                            }
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="state">Estado</Label>
                        <Input type="select" name="state" id="state">
                            <option value="OPEN">Abierto</option>
                            <option value="IN_PROGRESS">En progreso</option>
                            <option value="WAITING_CLIENT">Esperando cliente</option>
                            <option value="WAITING_DEVELOPMENT">Esperando desarrollo</option>
                            <option value="CLOSED">Cerrado</option>
                        </Input>
                    </FormGroup>

                    <Button>Crear Ticket</Button>
                </Form>
            </div>
            </Container>
        );
    }
}

export default compose(
    withParams,
    withLocation,
    withNavigate
)(TicketForm)
