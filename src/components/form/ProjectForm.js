import React, { useState, useEffect, useLayoutEffect } from "react";
import { compose } from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Breadcrumb, Container, Modal, Button } from "react-bootstrap";
import ProjectService from "../../service/ProjectService";
import Select from "react-select";
import EmployeeService from "../../service/EmployeeService";

const initialValue = {
  name: "",
  description: "",
  leader: "",
  members: [],
  state: "",
  start_date: "",
  finish_date: "",
  worked_hours: 0,
};

const ProjectForm = (props) => {
  const { closeModalHandler, setProjects, type, project, projectEmployees, projectLeader } =
    props;
  const [employees, setEmployees] = useState([]);
  const [employeesOptions, setEmployeesOptions] = useState([]);

  useLayoutEffect(() => {
    EmployeeService.getEmployees()
      .then((res) => {
        setEmployees(res.data);
        setEmployeesOptions(getEmployeesOptions(res.data));
      })
      .catch((err) => console.error(err));
  }, []);

  const [values, setValues] = useState(
    !project
      ? initialValue
      : {
          ...project,
          leader: projectLeader ? projectLeader : "",
          members: projectEmployees ? projectEmployees : [],
          start_date: new Date(project.start_date).toLocaleDateString("fr-CA"),
          finish_date: new Date(project.finish_date).toLocaleDateString(
            "fr-CA"
          ),
        }
  );

  const setValuesHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const setValuesMembersHandler = (e) => {
    setValues({ ...values, members: e });
  };

  const setValuesLeaderHandler = (e) => {
    setValues({ ...values, leader: e });
  };

  const submitHandler = (e) => {
    console.log(values.members);
    e.preventDefault();
    if (type === "create") {
      ProjectService.createProject(values)
        .then((res) =>
          ProjectService.getProjects()
            .then((res) => setProjects({ active: res.data, all: res.data }))
            .catch((err) => console.error(err))
        )
        .catch((err) => console.error(err));
    } else {
      ProjectService.editProject(values)
        .then((res) => window.location.reload())
        .catch((err) => console.error(err));
      console.log(values);
    }

    closeModalHandler();
  };

  const getEmployeesOptions = (employees) => {
    var options = [];
    employees.map((employee) =>
      options.push({ value: employee.legajo, label: employee.Nombre })
    );
    return options;
  };

  const noLeader = (
    { value: -1, label: "Sin Lider" }
  );

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
            <Label for="leader">Lider</Label>
            <Select
              options={employeesOptions}
              onChange={setValuesLeaderHandler}
              value={values.leader}
            />
          </FormGroup>

          <FormGroup>
            <Label for="members">Miembros</Label>
            {/* <Input
              type="select"
              name="members"
              id="members"
              placeholder="Miembro de ejemplo"
              value={values.members}
              onChange={setValuesHandler}
            > */}
            <Select
              options={employeesOptions}
              isMulti
              onChange={setValuesMembersHandler}
              value={values.members}
            />
            {/* </Input> */}
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
            <Label for="startDate">
              Fecha de inicio<span className="form-required">*</span>
            </Label>
            <Input
              type="date"
              name="start_date"
              id="startDate"
              value={values.start_date}
              onChange={setValuesHandler}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="finishDate">
              Fecha de finalización<span className="form-required">*</span>
            </Label>
            <Input
              type="date"
              name="finish_date"
              id="finishDate"
              value={values.finish_date}
              onChange={setValuesHandler}
              required
            />
          </FormGroup>
          <p>
            <span className="form-required">*</span>Campos obligatorios
          </p>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              {type == "crear" ? "Crear Proyecto" : "Guardar Proyecto"}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Container>
  );
};

export default compose(withParams, withLocation)(ProjectForm);
