import React, { useLayoutEffect, useEffect, useState } from "react";
import Header from "../Header";
import { compose } from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import ProjectService from "../../service/ProjectService";

//STYLES
import "../../styles/projects.css";

//IMPORT COMPONENTS
import {
  faPlusSquare,
  faList,
  faTrash,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import Breadcrumbs from "../Breadcrumbs";
import ProjectForm from "../form/ProjectForm";

const path = "https://squad14-2c-2021.herokuapp.com";

const ProjectPage = (props) => {
  useLayoutEffect(() => {
    ProjectService.getProjects()
      .then((res) => setProjects({ active: res.data, all: res.data }))
      .catch((err) => console.error(err));
  }, []);

  const [projects, setProjects] = useState({
    active: [],
    all: [],
  });
  const [modalDeleteProject, setDeleteProjectModal] = useState({
    is_open: false,
    name: "",
    id: -1,
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
    setProjects({ ...projects, active: projectsFilter });
  };

  const openDeleteProjectModalHandler = (name, id) => {
    setDeleteProjectModal({
      is_open: true,
      name: name,
      id: id,
    });
  };

  const closeDeleteProjectModalHandler = () => {
    setDeleteProjectModal({
      is_open: false,
      name: "",
      id: -1,
    });
  };

  const deleteProject = (id) => {
    ProjectService.deleteProject(id)
      .then((res) => {
        ProjectService.getProjects()
          .then((res) => setProjects({ active: res.data, all: res.data }))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));

    closeDeleteProjectModalHandler();
  };

  return (
    <>
      <Header {...props} />
      <Breadcrumbs {...props} />

      <Container>
        <aside className="project-button-container">
          <div className="input-searchbar">
            <Label for="searchbar" className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </Label>
            <Input
              type="search"
              name="searchbar"
              placeholder="Buscar proyectos"
              onChange={searchHandler}
            />
          </div>
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
            <ProjectForm
              closeCreateProjectModalHandler={closeCreateProjectModalHandler}
              setProjects={setProjects}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={modalDeleteProject.is_open}
          onHide={closeDeleteProjectModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>{`Eliminar ${modalDeleteProject.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <span>{`Desea realmente eliminar el proyecto: ${modalDeleteProject.name}?`}</span>
            </p>
            <p>
              <span>{`Recuerde que esta accion es irreversible`}</span>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={closeDeleteProjectModalHandler}
              variant="secondary"
            >
              Close
            </Button>
            <Button
              onClick={() => deleteProject(modalDeleteProject.id)}
              variant="danger"
            >
              Eliminar
            </Button>
          </Modal.Footer>
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
                    <FontAwesomeIcon icon={faEye} /> Ver Proyecto
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      openDeleteProjectModalHandler(project.name, project.id)
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
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
