import React, {Component} from "react"
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import Product from "../model/Product";

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
import Header from "../Header";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        /* NOTA: 
         * OJO CON TRATAR DE USAR PROPS PASADOS
         * DE UN COMPONENTE PADRE EN EL CONSTRUCTOR
         * PUEDE DAR UN OBJETO INDEFINIDO
         * */
        // TENGO EN props.state EL ID DEL PRODUCTO UN CAMBIO DE PAGINA
        // PUEDE HACER QUE SE ROMPA SI NO SETEO props.state NUEVAMENTE
        this.state = { 
            product: new Product()
        };
        this.postTicket = this.postTicket.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        const productID = this.props.location.state.productID;
        const {name, version} = this.props.params;
        this.setState({
            product: Product.createProduct(productID, name, version)
        });
    }

    postTicket(e) {
        e.preventDefault();
        console.log(this.props);
    }

    render() {
        /* NOTA: 
         * PRIMERO SE RENDERIZA EL FORMULARIO LUEGO SE EJECUTA 
         * COMPONENT_DID_MOUNT Y POR ULTIMO SE VUELVE A RENDERIZAR
         * POR ESO SE GENERAN 6 LLAMADOS AL LOG CON 3 INDEFINIDOS Y 
         * 3 DEFINIDIOS ... 
         * */
        //console.log(this.state.product.getProductID());
        //console.log(this.state.product.getName());
        //console.log(this.state.product.getVersion());

        return (
            <div>
            <Header {...this.props} />
            <div className="TicketForm">
                <h2>Crear ticket
                    <small><small><small>
                        {` (${this.state.product.name} v${this.state.product.version})`}
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
            </div>
        );
    }
}

export default compose(
    withParams,
    withLocation
)(TicketPage)
