import React from "react";
import Header from "../Header";
import { compose } from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import Breadcrumbs from "../Breadcrumbs";

const ProjectPage = (props) => {
    return (
        <>
            <Header {...props} />
            <Breadcrumbs {...props} />
        </>
        

    )
}

export default compose(withParams, withLocation)(ProjectPage);