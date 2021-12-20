import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import HourService from "../../service/HourService";

export default function HourForm({
  show,
  closeHandler,
  updateHours,
  defaultValues,
  edit = false,
}) {
  const [hour, setHour] = useState({...defaultValues, fecha:moment(defaultValues.fecha).format("YYYY-MM-DD")});

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);

  useEffect(() => {
    axios
      .get("https://squad14-2c-2021.herokuapp.com/projects")
      .then(({ data }) => setProjects(data));
    axios
      .get("https://squad14-2c-2021.herokuapp.com/tasks")
      .then(({ data }) => {
        setTasks(data);
        if (hour.idProyecto) {
          setAvailableTasks(
            data.filter(({ project_id }) => hour.idProyecto == project_id)
          );
        }
      });
  }, []);

  const defaultHandler = ({ target: { name, value } }) => {
    setHour({ ...hour, [name]: value });
  };

  const projectChangeHandler = ({ target: { value } }) => {
    setHour({ ...hour, idProyecto: value });
    setAvailableTasks(tasks.filter(({ project_id }) => value == project_id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hourService = new HourService();
    edit
      ? hourService.putHour(hour).then(updateHours)
      : hourService.postHour(hour).then(updateHours);
    closeHandler();
  };

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>
          {edit ? "Editar Reporte de Horas" : "Crear Reporte de Horas"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Legajo</Form.Label>
            <Form.Control
              disabled
              type="text"
              value={hour.legajo}
              name="legajo"
              onChange={defaultHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
                required={true}
              type="date"
              value={hour.fecha}
              name="fecha"
              onChange={defaultHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Projecto</Form.Label>

            <Form.Select
                required={true}
              value={hour.idProyecto || ""}
              onChange={projectChangeHandler}
            >
              <option disabled value={""}>Seleccione Projecto</option>
              {projects.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tarea</Form.Label>

            <Form.Select
                required={true}
              name="idTarea"
              value={hour.idTarea || ""}
              onChange={defaultHandler}
            >
              <option disabled value={""}>Seleccione Tarea</option>
              {availableTasks.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad de horas</Form.Label>
            <Form.Control
                required={true}
              name="cantidadDeHoras"
              value={hour.cantidadDeHoras || ""}
              onChange={defaultHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" name="">
            <Form.Label>Nota</Form.Label>
            <Form.Control
              name="nota"
              as="textarea"
              rows={3}
              value={hour.nota || ""}
              onChange={defaultHandler}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {edit ? "Guardar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
