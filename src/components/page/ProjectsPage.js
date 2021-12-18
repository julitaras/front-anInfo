import React, { useLayoutEffect, useEffect, useState } from "react";
import Header from "../Header";
import { compose } from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import Breadcrumbs from "../Breadcrumbs";
import axios from "axios";
import ProjectForm from "../form/ProjectForm";
import "../../styles/projects.css";

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
import { Input, Label } from "reactstrap";

const path = "https://squad14-2c-2021.herokuapp.com";

const ProjectPage = (props) => {
  const [projects, setProjects] = useState({
    active: [],
    all: [],
  });
  const [modalCreateProjectIsOpen, setCreateProjectModalIsOpen] =
    useState(false);

  const openCreateProjectModalHandler = () => {
    setCreateProjectModalIsOpen(true);
  };

  const closeCreateProjectModalHandler = () => {
    setCreateProjectModalIsOpen(false);
  };

  const searchHandler = (e) => {
    const projectsFilter = projects?.all?.filter((project) =>
      project.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(projectsFilter);
    setProjects({ ...projects, active: projectsFilter });
  };

  useLayoutEffect(() => {
    axios
      .get(`${path}/projects`)
      .then((res) => setProjects({ active: res.data, all: res.data }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header {...props} />
      <Breadcrumbs {...props} />

      <Container>
        <aside className="project-button-container">
          <Input
            style={{ width: "80%" }}
            type="search"
            placeholder="Buscar proyectos"
            onChange={searchHandler}
          />
          <Button onClick={openCreateProjectModalHandler} variant="primary">
            <FontAwesomeIcon icon={faPlusSquare} /> Crear proyecto
          </Button>
        </aside>

        <Modal
          size="lg"
          show={modalCreateProjectIsOpen}
          onHide={closeCreateProjectModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>Crear Proyecto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProjectForm />
          </Modal.Body>
        </Modal>
      </Container>

      <Container>
        {projects?.active?.length < 1 && <p>No hay proyectos aun...</p>}
        {projects?.active?.length > 0 &&
          projects?.active?.map((project) => (
            <Card className="project-card" key={project.id}>
              <Card.Header>{project.name}</Card.Header>
              <Card.Body>
                {/* <Card.Title></Card.Title> */}
                <Card.Text>
                  <div className="project-card-content">
                    <div className="project-card-state">
                      <p>Estado: {project.state}</p>
                    </div>
                    <div className="project-card-dates">
                      <p>
                        Comienzo:{" "}
                        {new Date(project.start_date).toLocaleDateString()}
                      </p>
                      <p>
                        Fin:{" "}
                        {new Date(project.finish_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="project-card-hours">
                      <p>Horas trabajadas: {project.worked_hours}</p>
                    </div>
                  </div>
                </Card.Text>
                <div className="project-card-buttons">
                  <Button href={`/projects/${project.id}`} variant="primary">
                    Ver Proyecto
                  </Button>
                  <Button variant="danger">Eliminar Proyecto</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </>
  );
};

export default compose(withParams, withLocation)(ProjectPage);
