import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap"
import {Link} from "react-router-dom"

class ProductsTable extends Component {
    
    // USAR STATE EN EL LINK PUEDE SER CAUSA DE BUG SI SE ACTUALIZA LA URL
    // DE UTLIMA MODIFICAR PARA QUE SE PASE TODO POR PARAM Y YA

    render() {
        const table =
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
                                    <td><Link
                                        to={`/ticket/${product.name}/${product.versions[0]}/create`}
                                        state={{ productID: product.id }}>Crear Ticket</Link>
                                    </td>
                                    <td><Link to={`/ticket/${product.name}/${product.versions[0]}/query`}
                                        state={{ productID: product.id }}>Ver tickets</Link></td>
                                </tr>

                                {product.versions.map((version, index) => {
                                    if (index > 0) {
                                        return (
                                            <tr key={index}>
                                                <td>{version}</td>
                                                <td><Link
                                                    to={`/ticket/${product.name}/${version}/create`}
                                                    state={{ productID: product.id }}>Crear Ticket</Link>
                                                </td>
                                                <td><Link to={`/ticket/${product.name}/${version}/query`}
                                                    state={{ productID: product.id }}>Ver tickets</Link></td>
                                            </tr>);
                                    }
                                    return "";
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
