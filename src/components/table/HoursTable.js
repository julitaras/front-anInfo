import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "reactstrap";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import DatePicker from "sassy-datepicker";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import HoursService from "../../service/HoursService";
//import Hour from "../model/Hour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

function useShowModal(defaultValue = false) {
  const [show, setShow] = useState(defaultValue);
  return [show, () => setShow(true), () => setShow(false)];
}

function HoursTable({ hours, setDate, date, updateHours }) {
  const [visible, setVisible] = useState(false);
  const [hourId, setHourId] = useState(0);
  const [showDelete, handleOpenDelete, handleCloseDelete] = useShowModal();
  const [showCreate, handleOpenCreate, handleCloseCreate] = useShowModal();

  const togglePicker = () => setVisible((v) => !v);
  const handleDateSelect = (newDate) => {
    setDate(newDate);
    setVisible(false);
  };
  const table = (
    <div className="HoursTable" style={{ display: "block", padding: 30 }}>
      <div className="container">
        <div className="relative mt-2">
          <button
            className="px-2 py-1 bg-indigo-400 text-sm rounded-lg border-none text-white mr-2 outline-none focus:ring ring-indigo-100"
            onClick={togglePicker}
            type="button"
          >
            Choose Date
          </button>
          {visible ? (
            <DatePicker
              selected={new Date()}
              onChange={handleDateSelect}
              className="absolute mt-2"
            />
          ) : null}
        </div>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            onClick={() => setDate(moment(date).clone().subtract(1, "d"))}
          >
            Left
          </Button>
          <Button variant="secondary" disabled>
            {moment(date).format("YYYY-MM-DD")}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setDate(moment(date).clone().add(1, "d"))}
          >
            Right
          </Button>
        </ButtonGroup>
        <Button onClick={handleOpenCreate} style={{ marginLeft: 792 }}>
          <FontAwesomeIcon icon={faPlusSquare} />
          Cargar hora
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Cantidad de Horas</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <React.Fragment key={hour.id}>
              <tr>
                <td>Proyecto</td>
                <td>Tarea</td>
                <td align={"center"} valign={"middle"}>
                  {hour.cantidadDeHoras}
                </td>
                <td align={"center"} valign={"middle"}>
                  {hour.nota}
                </td>
                <td>
                  <Button variant="secondary" style={{ margin: 1 }}>
                    Editar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleOpenDelete();
                      setHourId(hour.id);
                    }}
                    style={{ margin: 1 }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
  return (
    <div className="HoursList">
      {table}
      <Deletemodal
        show={showDelete}
        handleClose={handleCloseDelete}
        {...{ hourId, updateHours }}
      />
      <CreateHourModal
        show={showCreate}
        handleClose={handleCloseCreate}
        {...{ date, updateHours }}
      />
    </div>
  );
}

export default HoursTable;

function Deletemodal({ show, handleClose, hourId, updateHours }) {
  const hoursservice = new HoursService();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Desea eliminar esta hora cargada?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleClose();
            hoursservice.deleteHour(hourId).then(updateHours);
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function CreateHourModal({ show, handleClose, date, updateHours }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const hourObject = Object.fromEntries(new FormData(e.target));
    hourObject.legajo = 102090;
    new HoursService().postHour(hourObject).then(updateHours);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              defaultValue={moment(date).format("YYYY-MM-DD")}
              name="fecha"
            />
            <Form.Group className="mb-3">
              <Form.Label>Cantidad de horas</Form.Label>
              <Form.Control name="cantidadDeHoras" />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" name="">
            <Form.Label>Nota</Form.Label>
            <Form.Control name="nota" as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Crear
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
