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

const dummyValue = [
  {
    id: 100,
    name: "NOMBRE DE LA TAREA",
    description: "PRUEBA DE UNA TAREA",
    start_date: "2021-12-14T00:00:00Z",
    finish_date: "2021-12-14T00:00:00Z",
    worked_hours: 0,
    leader: "ES UN LIDER",
    state: "TODO",
  },
  {
    id: 12,
    name: "NOMBRE DE LA TAREA",
    description: "PRUEBA DE UNA TAREA",
    start_date: "2021-12-14T00:00:00Z",
    finish_date: "2021-12-14T00:00:00Z",
    worked_hours: 0,
    leader: "ES UN LIDER",
    state: "TODO",
  },
  {
    id: 11,
    name: "Proyecto editado",
    description: "Descripcion editada",
    start_date: "2021-12-05T00:00:00Z",
    finish_date: "2021-12-07T00:00:00Z",
    worked_hours: 15,
    leader: "Joaco",
    state: "IN_PROGRESS",
  },
  {
    id: 10,
    name: "Proyecto aninfo2",
    description: "Descripcion del proyecto",
    start_date: "2021-12-05T00:00:00Z",
    finish_date: "2021-12-07T00:00:00Z",
    worked_hours: 0,
    leader: "Juancarlo2",
    state: "",
  },
  {
    id: 9,
    name: "Proyecto aninfo2",
    description: "Descripcion del proyecto",
    start_date: "2021-12-05T00:00:00Z",
    finish_date: "2021-12-07T00:00:00Z",
    worked_hours: 0,
    leader: "Juancarlo2",
    state: "IN_PROGRESS",
  },
  {
    id: 8,
    name: "Proyecto aninfo2",
    description: "Descripcion del proyecto",
    start_date: "2021-12-05T00:00:00Z",
    finish_date: "2021-12-07T00:00:00Z",
    worked_hours: 0,
    leader: "Juancarlo2",
    state: "TODO",
  },
  {
    id: 7,
    name: "Proyecto aninfo2",
    description: "Descripcion del proyecto",
    start_date: "2021-12-05T00:00:00Z",
    finish_date: "2021-12-07T00:00:00Z",
    worked_hours: 0,
    leader: "Juancarlo2",
    state: "",
  },
  {
    id: 6,
    name: "Proyecto aninfo",
    description: "Descripcion del proyecto",
    start_date: "2021-12-02T00:00:00Z",
    finish_date: "2021-12-03T00:00:00Z",
    worked_hours: 0,
    leader: "Juancarlo",
    state: "",
  },
  {
    id: 5,
    name: "Proyecto aninfo",
    description: "Descripcion del proyecto",
    start_date: "2021-12-02T00:00:00Z",
    finish_date: "2021-12-03T00:00:00Z",
    worked_hours: 0,
    leader: "Juancarlo",
    state: "STARTED",
  },
  {
    id: 4,
    name: "Proyecto aninfo",
    description: "Descripcion del proyecto",
    start_date: "2021-12-02T00:00:00Z",
    finish_date: "2021-12-03T00:00:00Z",
    worked_hours: 0,
    leader: "Juancarlo",
    state: "STARTED",
  },
  {
    id: 3,
    name: "Proyecto",
    description: "Esto es la descripccion de un proyecto",
    start_date: "2021-12-03T00:00:00Z",
    finish_date: "2022-03-12T00:00:00Z",
    worked_hours: 12,
    leader: "mario bros",
    state: "STARTED",
  },
  {
    id: 2,
    name: "Proyect_3",
    description: "Soy proyecto 3",
    start_date: "2011-01-13T00:00:00Z",
    finish_date: "2312-03-13T00:00:00Z",
    worked_hours: 3000,
    leader: "Jorge3",
    state: "FINISHED3",
  },
];

const path = "https://squad14-2c-2021.herokuapp.com";

const ProjectPage = (props) => {
  const [projects, setProjects] = useState({
    active: dummyValue,
    all: dummyValue,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = () => {
    setModalIsOpen(true);
    console.log("OPEN MODAL");
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
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
      .then((res) => console.log(res.data))
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
          <Button onClick={openModalHandler} variant="primary">
            <FontAwesomeIcon icon={faPlusSquare} /> Crear proyecto
          </Button>
        </aside>

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
                      <p>Horas estimadas: {project.worked_hours}</p>
                    </div>
                  </div>
                </Card.Text>
                <div className="project-card-buttons">
                  <Button href={`/projects/${project.id}`} variant="primary">
                    Ver Proyecto
                  </Button>
                  <Button variant="danger">
                    Eliminar Proyecto
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </>
  );
};

export default compose(withParams, withLocation)(ProjectPage);
