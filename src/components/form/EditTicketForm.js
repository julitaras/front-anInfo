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
import withNavigate from "../../hoc/withNavigate";
import { Container } from "react-bootstrap";

const severities = [
    "S1", "S2", "S3", "S4"
]

const states = [
    {name: "Abierto", value: "OPEN"},
    {name: "En progreso", value: "IN_PROGRESS"},
    {name: "Esperando Cliente", value: "WAITING_CLIENT"},
    {name: "Esperando Desarrollo", value: "WAITING_DEVELOPMENT"},
    {name: "Cerrado", value: "CLOSED"}
]

class EditTicketForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            employees: [],
            ticket: {},
            clientName: "",
            employeeName: "",
            result: true,
            subject: "",
            description: "",
            ticketStateValue: "",
            ticketStateName: ""
        };
        //this.postTicket = this.postTicket.bind(this);
    }

    _setClientsState() {
        const clientService = new ClientService();
        clientService.getClients().then(response => {
            this.setState( {
                clients: response
            })
        }).catch(e => {
            console.log(e);
            this.setState({result: false});
        });/*
        return Promise((resolve, reject) => {
            if (this.state.result)
                resolve();
            else
                reject();
        })
        */

    }

    _setEmployeesState() {
        const employeeService = new EmployeeService();
        employeeService.getEmployees().then(response => {
            this.setState( {
                employees: response.data
            })
        }).catch(e => {
            console.log(e);
            this.setState({result: false});
        });/*
        return Promise((resolve, reject) => {
            if (this.state.result)
                resolve();
            else
                reject();
        })**/
    }

    _setTicketState() {
        const ticketService = new TicketService();
        ticketService.getTickets(`/tickets/${this.props.state.ticketID}`).then(response => {
            this.setState(
                {
                    ticket: response.data,
                    subject: response.data.subject,
                    description: response.data.description,
                    ticketStateValue : response.data.state
                })
            this.setState({
                ticketStateName : states.filter((state) => {return state.value === this.state.ticketStateValue})[0].name
            })
            this.getClientName(this.state.ticket.clientID);
            this.getEmployeeName(this.state.ticket.employeeID);
        }).catch(e => {
            console.log(e);
            this.setState({result: false});
        });
        /*
        return Promise((resolve, reject) => {
            if (this.state.result)
                resolve();
            else
                reject();
        });*/
    }

    getClientName() {
        const clientService = new ClientService();
        clientService.getClient(this.state.ticket.clientID).then(response => {
            this.setState(
                {
                    clientName: response["razon social"]
                })
        });
    }

    getEmployeeName() {
        const emloyeeService = new EmployeeService();
        emloyeeService.getEmployee(this.state.ticket.employeeID).then(response => {
            this.setState(
                {
                    employeeName: response.data.Nombre + ' ' + response.data.Apellido
                })
        });

    }

    async checkMounted() {

    }

    componentDidMount() {
        //const productID = this.props.location.state.productID;
        //const {name, version} = this.props.params
        this._setEmployeesState();
        this._setClientsState();
        this._setTicketState();
    }

    updateTicket(e) {
        
        const formData = new FormData(e.target);
        e.preventDefault();
        var ticket = {};
        for (let [key, value] of formData.entries()) {
            ticket[key] = value;
        }
        ticket["productID"] = this.state.ticket.productID;
        ticket["productVersion"] = this.state.ticket.productVersion;
        ticket["employeeID"] = ticket["employeeID"] === "sin-responsable" ? null : parseInt(ticket["employeeID"]);
        ticket["taskIDs"] = this.state.ticket.taskIDs
        
        const ticketService = new TicketService();
        console.log(ticket);
        console.log(this.state.ticket.ticketID);
        ticketService.updateTicket(this.state.ticket.ticketID, ticket).then(response => {
            // Check if the response is success and redirect to home
            // if not, raise an alert
            console.log(response);
            
            
        }).catch(error => {
            console.log(error);
            alert("Error al crear ticket")
        });
    }

    render() {
        return (
            <Container>
            <div className={EditTicketForm}>
                <Form onSubmit={(e) => this.updateTicket(e)}>
                    <FormGroup>
                        <Label for="subject">Asunto</Label>
                        <Input
                            value={this.state.subject}
                            type="text"
                            name="subject"
                            id="subject"
                            onChange={e =>{
                                console.log(this.state)
                                this.setState({subject: e.target.value})
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Descripcion</Label>
                        <Input
                            value={this.state.description}
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder={"Descripcion de ejemplo"}
                            onChange={e =>{
                                console.log(this.state)
                                this.setState({subject: e.target.value})
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="client">Cliente</Label>
                        <Input type="select" name="clientID" id="client">
                            {<option key={this.state.ticket.clientID} value={this.state.ticket.clientID}>
                                            {this.state.clientName}
                                        </option>}
                            {
                                this.state.clients.filter((client, index) =>{
                                    return client.id !== this.state.ticket.clientID;
                                }).map((client, index) => {
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
                            {this.state.ticket.type === "QUERY" ? <option value="QUERY">Consulta</option>: <option value="ERROR">Error</option>}
                            {this.state.ticket.type === "QUERY" ? <option value="ERROR">Error</option>: <option value="QUERY">Consulta</option>}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="severity">Severidad</Label>
                        <Input type="select" name="severity" id="severity">
                            {<option>{this.state.ticket.severity}</option>}
                            {severities.filter((severity) => {
                                return severity !== this.state.ticket.severity;
                            }).map((severity) => {
                                return (<option>{severity}</option>)
                            })}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="employeeID">Responsable</Label>
                        <Input type="select" name="employeeID" id="employeeID">
                            <option value={this.state.ticket.employeeID} >{this.state.employeeName}</option>
                            <option value="sin-responsable" >Sin responsable</option>
                            {this.state.employees.filter((employee) => {
                                return parseInt(employee.legajo) !== this.state.ticket.employeeID
                            }).map((employee) => {
                                return (<option value={employee['legajo']}>
                                                {employee["Nombre"] + ' ' + employee["Apellido"]}
                                            </option>);
                            })}
                            
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="state">Estado {this.state.ticket.state}</Label>
                        <Input type="select" name="state" id="state">
                            {<option value={this.state.ticketStateValue}>
                                            {this.state.ticketStateName}
                                        </option>}
                            {states.filter((state) => {
                                return state.value !== this.state.ticket.state
                            }).map((state) => {
                                return (<option value={state.value}>
                                                {state.name}
                                            </option>)
                            })}
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
)(EditTicketForm)