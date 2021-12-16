import React, {Component} from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';

class TicketForm extends Component {

    constructor(props) {
        super(props);
        /* NOTA: 
         * OJO CON TRATAR DE USAR PROPS PASADOS
         * DE UN COMPONENTE PADRE EN EL CONSTRUCTOR
         * PUEDE DAR UN OBJETO INDEFINIDO
         * */
        // TENGO EN props.state EL ID DEL PRODUCTO UN CAMBIO DE PAGINA
        // PUEDE HACER QUE SE ROMPA SI NO SETEO props.state NUEVAMENTE
        this.postTicket = this.postTicket.bind(this);
    }

    postTicket(e) {
        e.preventDefault();
        console.log(this.props);
    }

    render() {

        return (
            <div className="TicketForm">
                <h2>Carga de Ticket
                    <small><small><small>
                        {` (${this.props.product.name} v${this.props.product.version})`}
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
                            <option>Juan Fiuba</option>
                            <option>Lucas Diaz</option>
                            <option>Ana Rodriguez</option>
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
                    {/*<Input type="reset"> </Input>*/}
                </Form>
            </div>
        );
    }
}

export default TicketForm;
