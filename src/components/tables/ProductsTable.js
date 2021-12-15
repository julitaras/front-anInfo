import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap"
import {Link} from "react-router-dom"

class ProductsTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let table =
            <div className="ProductsTable"
                style={{ display: 'block', padding: 30 }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Versión</th>
                            <th colSpan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product =>
                            <React.Fragment key={product.id}>
                                <tr>
                                    <td rowSpan={product.versions.length}>
                                        {product.name}
                                    </td>
                                    <td>{product.versions[0]}</td>
                                    <td><Link to="/ticket">Crear Ticket</Link></td>
                                    <td><Link to={`/ticket/${product.id}`}>Ver tickets</Link></td>
                                </tr>

                                {product.versions.map((version, index) => {
                                    if (index > 0) {
                                        return (
                                            <tr key={index}>
                                                <td>{version}</td>
                                                <td><Link to="/ticket">Crear Ticket</Link></td>
                                                <td><Link to={`/ticket/${product.id}`}>Ver tickets</Link></td>
                                            </tr>);
                                    }
                                })}
                            </React.Fragment>
                        )}
                    </tbody>
                </Table>
            </div>
        return (
            <div className="ProductList">
                {table}
            </div>
        );
    }
}

export default ProductsTable;
