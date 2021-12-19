import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap"
import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import {Link} from "react-router-dom"
import {faPlusSquare, faList} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Modal} from "react-bootstrap";
import TicketForm from "../form/TicketForm";
class ProductsTable extends Component {
    
    // USAR STATE EN EL LINK PUEDE SER CAUSA DE BUG SI SE ACTUALIZA LA URL
    // DE UTLIMA MODIFICAR PARA QUE SE PASE TODO POR PARAM Y YA
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            productID: 0,
            productName: "",
            productVersion: ""
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal = (value) => {
        console.log(value);
        this.setState({productID: parseInt(value.split(';')[2]), 
                        productName: value.split(';')[0], 
                        productVersion: value.split(';')[1]});
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    render() {
        const table =
            <div className="ProductsTable"
                style={{ display: 'block', padding: 30 }}>
                <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Versión</th>
                            <th>Acciones</th>
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
                                    <td>
                                        <Container>
                                            <Button value={product.name + ';' + product.versions[0] + ';' + product.id} 
                                                variant="outline-success" size="sm" onClick={e => this.openModal(e.target.value)} >
                                                        <FontAwesomeIcon icon={faPlusSquare}/> Agregar ticket
                                            </Button>
                                            <Link
                                                to={
                                                    {
                                                        pathname: `/tickets/${product.name}/${product.versions[0]}/query`,
                                                        search: `productID=${product.id}&productVersion=${product.versions[0]}`
                                                    }
                                                }
                                                state={{ productID: product.id }}>
                                                <Button variant="outline-primary" size="sm">
                                                    <FontAwesomeIcon icon={faList}/> Ver tickets
                                                </Button>
                                            </Link>
                                        </Container>
                                    </td>
                                </tr>

                                {product.versions.map((version, index) => {
                                    if (index > 0) {
                                        return (
                                            <tr key={index}>
                                                <td>{version}</td>
                                                <td>
                                                <Container>
                                                <Button value={product.name + ';' + version + ';' + product.id} 
                                                    variant="outline-success" size="sm" onClick={e => this.openModal(e.target.value)} >
                                                            <FontAwesomeIcon icon={faPlusSquare}/> Agregar ticket
                                                </Button>
                                                <Link
                                                    to={
                                                        {
                                                            pathname: `/tickets/${product.name}/${version}/query`,
                                                            search: `productID=${product.id}&productVersion=${version}`
                                                        }
                                                    }
                                                >
                                                    <Button variant="outline-primary" size="sm">
                                                        <FontAwesomeIcon icon={faList}/> Ver tickets
                                                    </Button>
                                                </Link>
                                                </Container>
                                                </td> 
                                            </tr>);
                                    }
                                    return "";
                                })}
                            </React.Fragment>
                        )}
                    </tbody>
                </Table>
                </Container>
            </div>

        return (
            <div>

      <Modal size="lg" show={this.state.modalIsOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear ticket <small><small><small>
                        {` (${this.state.productName} v${this.state.productVersion})`}
                    </small></small></small></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TicketForm params={{name: this.state.productName, version: this.state.productVersion, productID: this.state.productID, editionMode: false}} name={this.state.productName} version={this.state.productVersion} state={{ productID: this.state.productID }}/>
            </Modal.Body>
        </Modal>
            <div className="ProductList">
                {table}
            </div>
            </div>

        );
    }
}

export default ProductsTable;
