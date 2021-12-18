import React, { useLayoutEffect, useState } from "react";
import Header from "../Header";
import { compose } from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import Breadcrumbs from "../Breadcrumbs";
import axios from "axios";
import ProjectForm from "../form/ProjectForm";

import { faPlusSquare, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Container,
  Row,
  Alert,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

const path = "https://squad14-2c-2021.herokuapp.com";

const ProjectPage = (props) => {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = () => {
    setModalIsOpen(true);
    console.log("OPEN MODAL");
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  useLayoutEffect(() => {
    axios
      .get(`${path}/projects`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Header {...props} />
      <Breadcrumbs {...props} />

      <Container>
        <Button onClick={openModalHandler} variant="primary" size="lg">
          <FontAwesomeIcon icon={faPlusSquare} /> Crear proyecto
        </Button>

        <Modal size="lg" show={modalIsOpen} onHide={closeModalHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Proyecto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProjectForm />
          </Modal.Body>
        </Modal>
      </Container>

      <Container>
        {projects.map((project) => (
          <Card key={project.id}>
            <Card.Header>{project.name}</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>{project.description}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default compose(withParams, withLocation)(ProjectPage);
