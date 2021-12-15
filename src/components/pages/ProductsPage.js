import React, { Component } from "react";
import ProductsTable from "../tables/ProductsTable"
import ProductService from "../../services/ProductService";

class ProductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        const productService = new ProductService();
        productService.getProducts().then(response =>
            this.setState({
                products: response
            }));
    }

    render() {
        return (<div> <ProductsTable products={this.state.products} /> </div>);
    }
};

export default ProductsPage;
