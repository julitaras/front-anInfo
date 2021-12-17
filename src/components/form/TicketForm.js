import React, {Component} from "react"
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import ClientService from "../../service/ClientService";

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
import Header from "../Header";

class TicketForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productID: " ",
            productName: " ",
            productVersion: " ",
            clients: []
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

    componentDidMount() {
        const productID = this.props.location.state.productID;
        const {name, version} = this.props.params;
        this.setState({
            productID: productID,
            productName: name,
            productVersion: version,
        });
        this._setClientsState();
    }

    postTicket(e) {
        e.preventDefault();
        console.log(this.props);
    }

    render() {
        console.log(this.state.clients);
        return (
            <div>
            <Header {...this.props} />
            <div className="TicketForm">
                <h2>Crear ticket
                    <small><small><small>
                        {` (${this.state.productName} v${this.state.productVersion})`}
                    </small></small></small>
                </h2>
                <Form className="form" onSubmit={(e) => this.postTicket(e)}>
                    <FormGroup>
                        <Label for="subject">Asunto</Label>
                        <Input
                            type="text"
                            name="text"
                            id="subject"
                            placeholder="Asunto de ejemplo"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Descripcion</Label>
                        <Input
                            type="textarea"
                            name="textarea"
                            id="description"
                            placeholder="Descripcion de ejemplo"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="client">Cliente</Label>
                        <Input type="select" name="select" id="client">
                            {
                                this.state.clients.map((client, index) => {
                                    return (
                                        <option key={index}>
                                            {client["razon social"]}
                                        </option>);
                                })
                            }
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="type">Tipo</Label>
                        <Input type="select" name="select" id="type">
                            <option>Consulta</option>
                            <option>Error</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="severity">Severidad</Label>
                        <Input type="select" name="select" id="severity">
                            <option>S1</option>
                            <option>S2</option>
                            <option>S3</option>
                            <option>S4</option>
                        </Input>
                    </FormGroup>

                    <Button>Crear Ticket</Button>
                </Form>
            </div>
            </div>
        );
    }
}

export default compose(
    withParams,
    withLocation
)(TicketForm)
