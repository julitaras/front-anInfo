import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import dataset from "../../dataset/dataset.js";
import Column from "../column/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import { compose } from "redux";
import { Container, Accordion } from "react-bootstrap";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import ProjectService from "../../service/ProjectService.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

const TaskContainer = styled.div`
  display: flex;
`;

const ProjectPage = (props) => {
  useLayoutEffect(() => {
    ProjectService.getProject(id)
      .then((res) => {
        setProject(res.data);
        setStatus(res.status);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const [status, setStatus] = useState(0);
  const { id } = useParams();
  const [project, setProject] = useState({});

  const [data, setData] = useState(dataset);
  console.log(status);
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    //If there is no destination
    if (!destination) {
      return;
    }

    //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //If you're dragging columns
    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    //Anything below this happens if you're dragging tasks
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    //If dropped inside the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    //If dropped in a different column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  return (
    <Container>
      <Header {...props} />
      <Breadcrumbs {...props} />
      {status == 200 && (
        <>
          <Container>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Información sobre el proyecto
                </Accordion.Header>
                <Accordion.Body>{project?.description}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <TaskContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.columnOrder.map((id, index) => {
                    const column = data.columns[id];
                    const tasks = column.taskIds.map(
                      (taskId) => data.tasks[taskId]
                    );

                    return (
                      <Column
                        key={column.id}
                        column={column}
                        tasks={tasks}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </TaskContainer>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
      {status != 200 && (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1>Error 404</h1>
          <h3>No se encontro el proyecto.</h3>
        </div>
      )}
    </Container>
  );
};

export default compose(withParams, withLocation)(ProjectPage);
