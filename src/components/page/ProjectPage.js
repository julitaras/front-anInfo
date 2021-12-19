import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import { compose } from "redux";
import { Container, Accordion, Card, Button, Modal } from "react-bootstrap";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import ProjectService from "../../service/ProjectService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProjectForm from "../form/ProjectForm";
import { v4 as uuidv4 } from 'uuid';
import TaskCard from "../task/TaskCard.js";
import { useParams } from "react-router-dom";

// const TaskContainer = styled.div`
//   display: flex;
// `;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.h3`
    padding: 0 1rem;
    margin: 1rem 0;
    align-self: flex-start;
`;

const columnsFromBackend = {
    [uuidv4()]: {
      title: 'To-do',
      items: [],
    },
    [uuidv4()]: {
      title: 'In Progress',
      items: [],
    },
    [uuidv4()]: {
      title: 'Done',
      items: [],
    },
  };

const ProjectPage = (props) => {
  useLayoutEffect(() => {
    ProjectService.getProject(id)
      .then((res) => {
        setProject(res.data);
        setStatus(res.status);
      })
      .catch((err) => {
        console.error(err);
        setStatus(0);
      });
  }, []);

  useLayoutEffect(() => {
    ProjectService.getTasksByProjectId(id)
      .then((res) => {
        setTasks(res.data);
        setStatus(res.status);
        setColumns(createBoard(res.data));
      })
      .catch((err) => {
        console.error(err);
        setStatus(0);
      });
  }, []);

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [modalEditProjectIsOpen, setEditProjectModalIsOpen] = useState(false);

  const createBoard = (tasks) => {
    return {
        [uuidv4()]: {
          title: 'To-do',
          items: tasks.filter((task) => task.state.includes("TODO")),
        },
        [uuidv4()]: {
          title: 'In Progress',
          items: tasks.filter((task) => task.state.includes("IN_PROGRESS")),
        },
        [uuidv4()]: {
          title: 'Done',
          items: tasks.filter((task) => task.state.includes("DONE")),
        },
      }
  }

  const [columns, setColumns] = useState(columnsFromBackend);
const onDragEnd = (result, columns, setColumns) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
   
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const openEditProjectModalHandler = () => {
    setEditProjectModalIsOpen(true);
  };

  const closeEditProjectModalHandler = () => {
    setEditProjectModalIsOpen(false);
  };

  return (
    <Container>
      <Header {...props} />
      <Breadcrumbs {...props} />
      {status == 200 && (
        <>
          <Container>
            <Modal
              size="lg"
              show={modalEditProjectIsOpen}
              onHide={closeEditProjectModalHandler}
            >
              <Modal.Header closeButton>
                <Modal.Title>Editar Proyecto</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProjectForm
                  closeModalHandler={closeEditProjectModalHandler}
                  type="edit"
                  project={project}
                />
              </Modal.Body>
            </Modal>

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Información sobre {project?.name}
                </Accordion.Header>
                <Accordion.Body>
                  <div class="info-project">
                    <div class="info-layer">
                      <div>
                        <Card style={{ width: "25.5rem" }}>
                          <Card.Body>
                            <Card.Title>Nombre</Card.Title>
                            <Card.Text>{project.name}</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <div>
                        <Card style={{ width: "25.5rem" }}>
                          <Card.Body>
                            <Card.Title>Estado</Card.Title>
                            <Card.Text>
                              {project.state ? project.state : "Sin Estado"}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <div>
                        <Card style={{ width: "25.5rem" }}>
                          <Card.Body>
                            <Card.Title>Lider</Card.Title>
                            <Card.Text>
                              {project.leader ? project.leader : "Sin Lider"}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                    <div class="info-layer">
                      <div>
                        <Card style={{ width: "25.5rem" }}>
                          <Card.Body>
                            <Card.Title>Horas Trabajadas</Card.Title>
                            <Card.Text>{project.worked_hours}</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <div>
                        <Card style={{ width: "25.5rem" }}>
                          <Card.Body>
                            <Card.Title>Fecha de Inicio</Card.Title>
                            <Card.Text>
                              {new Date(
                                project.start_date
                              ).toLocaleDateString()}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <div>
                        <Card style={{ width: "25.5rem" }}>
                          <Card.Body>
                            <Card.Title>Fecha de Finalización</Card.Title>
                            <Card.Text>
                              {new Date(
                                project.finish_date
                              ).toLocaleDateString()}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                    <Card>
                      <Card.Body>
                        <Card.Title>Descripcion</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                      </Card.Body>
                    </Card>
                    <div>
                      <Card>
                        <Card.Body>
                          <Card.Title>Integrantes</Card.Title>
                          <Card.Text>
                            Aca irian los integrantes *si tan solo los tuviera
                            :( *
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                  <Button
                    onClick={openEditProjectModalHandler}
                    variant="primary"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Editar Proyecto
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br/>
            <h1>Tareas</h1>
          </Container>
          <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Title>{column.title}</Title>
                    {column.items.map((item, index) => (
                      <TaskCard key={item} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
        </>
      )}
      {status == 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1>Error 404</h1>
          <h3>No se encontro el proyecto.</h3>
        </div>
      )}
    </Container>
  );
};

export default compose(withParams, withLocation)(ProjectPage);
