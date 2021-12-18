import React, { useState } from "react";
import { compose } from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Breadcrumb, Container, Modal, Button } from "react-bootstrap";

import axios from "axios";

const path = "https://squad14-2c-2021.herokuapp.com";
const initialValue = {
  name: "",
  description: "",
  leader: "",
  state: "",
  start_date: "",
  finish_date: "",
  worked_hours: 0,
};

const ProjectForm = (props) => {
  const [values, setValues] = useState(initialValue);

  const setValuesHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(values);

    axios
      .post(`${path}/projects`, {
        name: values.name,
        description: values.description,
        leader: values.leader,
        state: values.state,
        start_date: new Date(values.start_date),
        finish_date: new Date(values.finish_date),
        worked_hours: 0,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
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
            <Label for="leader">Lider</Label>
            <Input
              type="text"
              name="leader"
              id="leader"
              placeholder="Lider de ejemplo"
              value={values.leader}
              onChange={setValuesHandler}
            />
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
              <option value="IN PROGRES">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="startDate">
              Fecha de Inicio<span className="form-required">*</span>
            </Label>
            <Input
              type="date"
              name="start_date"
              id="startDate"
              value={values.startDate}
              onChange={setValuesHandler}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="finishDate">
              Fecha de Finalización<span className="form-required">*</span>
            </Label>
            <Input
              type="date"
              name="finish_date"
              id="finishDate"
              value={values.finishDate}
              onChange={setValuesHandler}
              required
            />
          </FormGroup>
          <p>
            <span className="form-required">*</span>Campos obligatorios
          </p>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Crear Proyecto
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Container>
  );
};

export default compose(withParams, withLocation)(ProjectForm);
