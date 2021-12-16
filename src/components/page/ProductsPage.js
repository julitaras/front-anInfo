import React, { Component } from "react";
import ProductsTable from "../table/ProductsTable"
import ProductService from "../../service/ProductService";
import Header from "../Header";
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"

class ProductsPage extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        const productService = new ProductService();
        productService.getProducts().then(response =>
            this.setState({
                products: response
            })
        );
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <ProductsTable products={this.state.products} />
            </div>);
    }
};

export default compose(withParams,
withLocation) (ProductsPage);
