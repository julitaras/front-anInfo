import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table ,Row, Col} from "reactstrap";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import DatePicker from "sassy-datepicker";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="HoursTable">
      <Row>
        <Col xs="auto">
          <ButtonGroup>
            <button
                variant="secondary"
                onClick={togglePicker}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              Elegir Fecha
            </button>
            {visible ? (
                <DatePicker
                    selected={new Date()}
                    onChange={handleDateSelect}
                    className="absolute mt-2"
                />
            ) : null}
          <Button
              variant="secondary"
              onClick={() => setDate(moment(date).clone().subtract(1, "d"))}
          >
            IZQ
          </Button>
          <Button variant="secondary" disabled>
            {moment(date).format("YYYY-MM-DD")}
          </Button>
          <Button
              variant="secondary"
              onClick={() => setDate(moment(date).clone().add(1, "d"))}
          >
            DER
          </Button>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant= "success"onClick={openCreateModal}>
                <FontAwesomeIcon icon={faPlusSquare} />
                Cargar hora
              </Button>
            </div>
        </ButtonGroup>
        </Col>
        <Col>
      </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
		    <th style={{width: "5%"}}>Legajo</th>
            <th style={{width: "10%"}}>Proyecto</th>
            <th style={{width: "10%"}}>Tarea</th>
            <th style={{width: "10%"}}>Cantidad de Horas</th>
            <th style={{width: "50%"}}>Nota</th>
            <th style={{width: "10%"}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <React.Fragment key={hour.id}>
              <tr>
                <td align={"center"} valign={"middle"}>
                  {hour.legajo}
                </td>
                <td align={"center"} valign={"middle"}>
                  {hour.nombreProyecto}
                </td>
                <td align={"center"} valign={"middle"}>
                  {hour.nombreTarea}
                </td>
                <td align={"center"} valign={"middle"}>
                  {hour.cantidadDeHoras}
                </td>
                <td align={"center"} valign={"middle"}>
                  {hour.nota}
                </td>
                <td>
                  <ButtonGroup>
                  <Button
                    variant="primary"
                    name={hour.id}
                    onClick={editButtonHandler}
                    style={{ margin: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    name={hour.id}
                    variant="danger"
                    onClick={deleteButtonHandler}
                    style={{ margin: 1 }}
                  >
                    Eliminar
                  </Button>
                    </ButtonGroup>
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
