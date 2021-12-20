import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ProjectService from "../../service/ProjectService";
import TaskForm from "../form/TaskForm";
import EmployeeService from "../../service/EmployeeService";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

const TaskCard = ({ item, index, taskReload }) => {
  const [modalDeleteTask, setDeleteTaskModal] = useState({
    is_open: false,
    name: "",
    id: -1,
  });

  const [modalEditTaskIsOpen, setEditTaskModalIsOpen] = useState(false);
  const [employee, setEmployee] = useState({});

  const openEditTaskModalHandler = () => {
    setEditTaskModalIsOpen(true);
  };

  const closeEditTaskModalHandler = () => {
    setEditTaskModalIsOpen(false);
  };

  const openDeleteTaskModalHandler = (name, id) => {
    setDeleteTaskModal({
      is_open: true,
      name: name,
      id: id,
    });
  };

  const closeDeleteTaskModalHandler = () => {
    setDeleteTaskModal({
      is_open: false,
      name: "",
      id: -1,
    });
  };

  const deleteTask = (id) => {
    ProjectService.deleteTask(id)
      .then((res) => {
        ProjectService.getTasks()
          .then((res) => taskReload({ active: res.data, all: res.data }))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));

    closeDeleteTaskModalHandler();
  };

  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation className="sombrita">
            <div onClick={openEditTaskModalHandler}>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
            <div className="secondary-details">
              <p>
                <span>
                  {new Date(item.start_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </span>
              </p>
              <p>
                <span>Legajo asignado: {item.assigned_to ? item.assigned_to : "Sin asignado"}</span>
              </p>
              <div class="task-buttons">
                <div>
                  <Button
                    variant="danger"
                    onClick={() =>
                      openDeleteTaskModalHandler(item.name, item.id)
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </div>
          </TaskInformation>

          <Modal
            show={modalDeleteTask.is_open}
            onHide={closeDeleteTaskModalHandler}
          >
            <Modal.Header closeButton>
              <Modal.Title>{`Eliminar ${modalDeleteTask.name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <span>{`Desea realmente eliminar la tarea: ${modalDeleteTask.name}?`}</span>
              </p>
              <p>
                <span>{`Recuerde que esta acción es irreversible`}</span>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={closeDeleteTaskModalHandler} variant="secondary" className="sombrita">
                Close
              </Button>
              <Button
                onClick={() => deleteTask(modalDeleteTask.id)}
                variant="danger"
                className="sombrita"
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            size="lg"
            show={modalEditTaskIsOpen}
            onHide={closeEditTaskModalHandler}
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TaskForm
                task={item}
                closeModalHandler={closeEditTaskModalHandler}
                type="edit"
                projectId={item.project_id}
                taskReload={taskReload}
              />
            </Modal.Body>
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
