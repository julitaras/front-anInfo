import React, {Component} from "react"
import {compose} from "redux";
import TicketForm from "../form/TicketForm";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import Product from "../model/Product";

class TicketPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            product: new Product()
        };
    }

    componentDidMount() {
        console.log(this.props);
        const productID = this.props.location.state.productID;
        const {name, version} = this.props.params;
        this.setState({
            product: Product.createProduct(productID, name, version)
        });
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
                <TicketForm product={this.state.product}/>
            </div>
        );
    }
}

export default compose(
    withParams,
    withLocation
)(TicketPage)
