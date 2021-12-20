import React, { useState, useLayoutEffect } from "react";
import { compose } from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Container, Modal, Button } from "react-bootstrap";
import ProjectService from "../../service/ProjectService";
import EmployeeService from "../../service/EmployeeService";

const TaskForm = (props) => {
  const { closeModalHandler, type, task, projectId, taskReload } = props;

  const initialValue = {
    name: "",
    description: "",
    assigned_to: "",
    state: "",
    start_date: "",
    creation_date: "",
    worked_hours: 0,
    project_id: projectId,
    estimated_hours: 0,
  };

  const [values, setValues] = useState(
    !task
      ? initialValue
      : {
          ...task,
          start_date: new Date(task.start_date).toLocaleDateString("fr-CA", {
            timeZone: "UTC",
          }),
        }
  );
  const setValuesHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [employees, setEmployees] = useState([]);

  useLayoutEffect(() => {
    EmployeeService.getEmployees()
      .then((res) => {
        console.log(res);
        setEmployees(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === "create") {
      ProjectService.createTask(values)
        .then((res) => taskReload())
        .catch((err) => console.error(err));
    } else {
      ProjectService.editTask(values)
        .then((res) => taskReload())
        .catch((err) => console.error(err));
      console.log(values);
    }

    closeModalHandler();
  };

  return (
    <Container>
      <div>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <Label for="name">
              Nombre<span className="form-required">*</span>
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre de ejemplo"
              value={values.name}
              onChange={setValuesHandler}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">
              Descripcion<span className="form-required">*</span>
            </Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Descripcion de ejemplo"
              value={values.description}
              onChange={setValuesHandler}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="assigned_to">Asignada a:</Label>
            <Input
              type="select"
              name="assigned_to"
              id="assignedTo"
              placeholder="Número de legajo de empleado a asignar tarea"
              value={values.assigned_to}
              onChange={setValuesHandler}
            >
              <option value="">Ingrese un legajo</option>
              {employees.map((employee) => (
                <option value={employee.legajo}>
                  {employee.legajo} {employee.Nombre}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="Estado">Estado</Label>
            <Input
              type="select"
              name="state"
              id="state"
              value={values.state}
              onChange={setValuesHandler}
            >
              <option value="">Ingrese un valor</option>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </Input>
          </FormGroup>

          {type == "edit" && (
            <FormGroup show={type == "edit"}>
              <Label for="workedHours">Horas trabajadas</Label>
              <Input
                type="number"
                name="worked_hours"
                id="workedHours"
                value={values.worked_hours}
                onChange={setValuesHandler}
              />
            </FormGroup>
          )}

          <FormGroup>
            <Label for="workedHours">Horas estimadas</Label>
            <Input
              type="number"
              name="estimated_hours"
              id="estimatedHours"
              value={values.estimated_hours}
              onChange={setValuesHandler}
            />
          </FormGroup>

          <FormGroup>
            <Label for="startDate">Fecha de inicio</Label>
            <Input
              type="date"
              name="start_date"
              id="startDate"
              value={values.start_date}
              onChange={setValuesHandler}
            />
          </FormGroup>
          <p>
            <span className="form-required">*</span>Campos obligatorios
          </p>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              {type == "crear" ? "Crear Tarea" : "Guardar Tarea"}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Container>
  );
};

export default compose(withParams, withLocation)(TaskForm);
