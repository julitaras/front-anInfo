import React, { Component } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import {BreadcrumbItem} from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from "../routes";

class Breadcrumbs extends Component {

    constructor(props) {
        super(props);
        const crumbs = routes
                // Get all routes that contain the current one.
                .filter(({ path }) => props.location.pathname.includes(path))
                // Swap out any dynamic routes with their param values.
                // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                .map(({ path, ...rest }) => ({
                  path: Object.keys(props.params).length
                    ? Object.keys(props.params).reduce(
                        (path, param) =>
                          path.replace(`:${param}`, props.params[param]),
                        path
                      )
                    : path,
                  ...rest
                }));
        // Given an array of objects which contain a `name` and `path` property,
        // generate a `BreadcrumbItem` component for each.
        this.crumbs_items = crumbs.map(({ name, path }, index) => (
            path === props.location.pathname ?
            <BreadcrumbItem key={index} active>{name}</BreadcrumbItem> :
            <BreadcrumbItem key={index}>
                <Link to={path}>{name}</Link>
            </BreadcrumbItem>
        ));

        
    }

    render() {
        return (
            <Container>
                <Breadcrumb>
                    {this.crumbs_items}
            </Breadcrumb>
          </Container>
          );
    }
};
export default Breadcrumbs;
