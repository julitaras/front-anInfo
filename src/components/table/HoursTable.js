import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "reactstrap";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import DatePicker from "sassy-datepicker";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import HourService from "../../service/HourService";
import HourForm from "../form/HourForm";

function useShowModal(defaultValue = false) {
  const [show, setShow] = useState(defaultValue);
  return [show, () => setShow(true), () => setShow(false)];
}

function HoursTable({ hours, setDate, date, updateHours }) {
  const [visible, setVisible] = useState(false);
  const [hour, setHour] = useState({});
  const [isDeleteModalVisible, openDeleteModal, closeDeleteModal] =
    useShowModal();
  const [isCreateModalVisible, openCreateModal, closeCreateModal] =
    useShowModal();
  const [isEditModalVisible, openEditModal, closeEditModal] = useShowModal();

  const deleteButtonHandler = ({ target: { name } }) => {
    setHour(hours.find(({ id }) => name == id));
    openDeleteModal();
  };

  const editButtonHandler = ({ target: { name } }) => {
    setHour(hours.find(({ id }) => name == id));
    openEditModal();
  };

  const togglePicker = () => setVisible((v) => !v);
  const handleDateSelect = (newDate) => {
    setDate(newDate);
    setVisible(false);
  };

  const defaultHourValues = {
    legajo: 102090,
    fecha: date,
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
        <Button onClick={openCreateModal} style={{ marginLeft: 792 }}>
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
                  <Button
                    variant="secondary"
                    name={hour.id}
                    onClick={editButtonHandler}
                    style={{ margin: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    name={hour.id}
                    variant="secondary"
                    onClick={deleteButtonHandler}
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
      <DeleteModal
        show={isDeleteModalVisible}
        closeHandler={closeDeleteModal}
        {...{ hour, updateHours }}
      />
      {isCreateModalVisible && (
        <HourForm
          show={isCreateModalVisible}
          closeHandler={closeCreateModal}
          defaultValues={defaultHourValues}
          {...{ updateHours }}
        />
      )}
      {isEditModalVisible && (
        <HourForm
          show={isEditModalVisible}
          closeHandler={closeEditModal}
          defaultValues={hour}
          edit={true}
          {...{ updateHours }}
        />
      )}
    </div>
  );
}

export default HoursTable;

function DeleteModal({ show, closeHandler, hour, updateHours }) {
  const hourService = new HourService();
  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Desea eliminar esta hora cargada?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            closeHandler();
            hourService.deleteHour(hour.id).then(updateHours);
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
