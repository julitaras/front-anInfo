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
import {Form, FormGroup, Input, Label} from "reactstrap";
import ProjectService from "../../service/ProjectService";
import EmployeeService from "../../service/EmployeeService";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            clientName: "",
            editModalIsOpen: false,
            deleteModalIsOpen: false,
            taskModalIsOpen: false,
            projects: [],
            taskID: undefined,
            tasks: [],
            employees: []
        };
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeTaskModal = this.closeTaskModal.bind(this);
        this.openTaskModal = this.openTaskModal.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
    }

    loadTicketsAndTasks() {
        const ticketService = new TicketService();
        const projectService = new ProjectService();
        ticketService.getTickets(`/tickets/${this.props.params.ticketID}`).then(response => {
            this.setState(
                {
                    data: response.data
                })
            this.getClientName(this.state.data.clientID);
            projectService.getTasks().then(responseTasks => {
                this.setState(
                    {
                        tasks: responseTasks.data.filter((task) =>{
                            return response.data.taskIDs.includes(task.id);
                        })
                    })
                console.log(this.state.tasks);
            });
        });
        
        
    }

    componentDidMount() {
        this.loadTicketsAndTasks();
        const projectService = new ProjectService();
        projectService.getProjects().then(response => {
            this.setState(
                {
                    projects: response.data
                })
        })
        const employeeService = new EmployeeService();
        employeeService.getEmployees().then(response => {
            this.setState(
                {
                    employees: response.data
                })
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

    openTaskModal = (value) => {
        this.setState({taskModalIsOpen: true});
    }

    closeTaskModal = () => {
        this.setState({taskModalIsOpen: false});
    }

    createTask(e) {
        const formData = new FormData(e.target);
        e.preventDefault();
        var task = {};
        for (let [key, value] of formData.entries()) {
            task[key] = value;
        }
        task.project_id = parseInt(task.project_id);
        task['state'] = "TODO";
        task['worked_hours'] = '0';
        task['asigned_to'] = this.state.data.employeeID;
        task['start_date'] = moment();
        var ticket = JSON.parse(JSON.stringify(this.state.data));
        delete ticket.ticketID;
        delete ticket.expectedDate;
        delete ticket.createdDate;
        const projectService = new ProjectService();
        const ticketService = new TicketService();
        projectService.createTask(task).then(response => {
            console.log(response);
            this.setState({taskID: response.data.id});
            ticket.taskIDs.push(this.state.taskID);
            ticketService.updateTicket(this.state.data.ticketID, ticket).then(response => {
                // Check if the response is success and redirect to home
                // if not, raise an alert
                console.log(response);
                this.loadTicketsAndTasks();
                this.closeTaskModal();
                
            }).catch(error => {
                console.log(error);
                alert("Error al crear ticket")
            });
        });
    }

    employeeFullName(employeeID) {
        let employee = this.state.employees.filter((employee) => {
             return employee.legajo === employeeID;
         })[0];
         return (employee === undefined ? undefined : `${employee.Nombre} ${employee.Apellido} `);
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
                <Modal size="lg" show={this.state.taskModalIsOpen} onHide={this.closeTaskModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Crear tarea <small><small><small>
                                    {`(Ticket #${this.state.data.ticketID})`}
                                </small></small></small></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => this.createTask(e)}>
                                <FormGroup>
                                    <Label for="proyect">Proyecto</Label>
                                    <Input type="select" name="project_id" id="proyect">
                                        {
                                            this.state.projects.map((project, index) => {
                                                return (
                                                    <option key={index} value={project['id']}>
                                                        {project["name"]}
                                                    </option>);
                                            })
                                        }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Nombre</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nombre de la tarea"
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
                                    <Label for="estimated_hours">Cantidad estimada de horas</Label>
                                    <Input
                                        type="number"
                                        name="estimated_hours"
                                        id="estimated_hours"
                                        placeholder="10"
                                    />
                                </FormGroup>
                                <Button onClick={this.closeTaskModal} variant="secondary">Cancelar</Button>{'  '}
                                <Button variant="success" type="submit">Crear tarea</Button>    
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        
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
                            <Button onClick={this.openTaskModal} variant="success">Crear tarea</Button> {'   '}
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
                            {this.state.tasks?.map((task) => {
                                return (
                                    <ListGroup.Item action key={task.id} href={`/projects/${task.project_id}`}>{task.name}</ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <strong>Fecha de creación:  </strong>{this.state.data.createdDate}
                        </Col>
                        <Col>
                            <strong>Responsable:  </strong>{this.employeeFullName(this.state.data.employeeID)}
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