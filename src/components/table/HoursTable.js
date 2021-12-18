import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap"
import {Button, ButtonGroup} from "react-bootstrap";
import DatePicker from 'sassy-datepicker';
import moment from "moment";
import Modal from 'react-bootstrap/Modal'
import HoursService from "../../service/HoursService";
//import Hour from "../model/Hour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons"

function HoursTable({hours, setDate, date, sethours}) {
        const [visible, setVisible] = React.useState(false);
        const [hourid, setid]= React.useState(0)
        const [show, setShow] = React.useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    // USAR STATE EN EL LINK PUEDE SER CAUSA DE BUG SI SE ACTUALIZA LA URL
    // DE UTLIMA MODIFICAR PARA QUE SE PASE TODO POR PARAM Y YA
        const togglePicker = () => setVisible((v) => !v);
        const handleDateSelect = (newDate) => {
        setDate(newDate);
        setVisible(false);
    };
        const table =
            <div className="HoursTable"
                style={{ display: 'block', padding: 30 }}>
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
                                minDate={new Date(2021, 10, 16)}
                                className="absolute mt-2"
                            />
                        ) : null}
                    </div>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary"  onClick={() => setDate(moment(date).clone().subtract(1, "d"))}>Left</Button>
                        <Button variant="secondary" disabled>{moment(date).format("YYYY-MM-DD")}</Button>
                        <Button variant="secondary"onClick={() => setDate(moment(date).clone().add(1, "d"))}>Right</Button>
                    </ButtonGroup>
                    <FontAwesomeIcon icon={faPlusSquare} style={{marginLeft:792}}/>Cargar hora {/* Futuro on click cargar hora*/}
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
                    {hours.map(hour =>
                        <React.Fragment key={hour.id}>
                            <tr>
                                <td>Proyecto</td>
                                <td>Tarea</td>
                                <td align={"center"} valign={"middle"}>{hour.cantidadDeHoras}</td>
                                <td align={"center"} valign={"middle"}>{hour.nota}</td>
                                <td ><Button variant="secondary"  style={{margin: 1}} >Editar</Button>
                                    <Button variant="secondary" onClick={() => {handleShow(); setid(hour.id)}} style={{margin: 1}} >Eliminar</Button></td>

                            </tr>
                        </React.Fragment>
                    )}
                    </tbody>
                </Table>
            </div>
        return (
            <div className="HoursList">
                {table}
                <Deletemodal show={show} handleClose={handleClose} hourid={hourid} date={date} sethours={sethours}/>
                {/*<Crearmodal show={show} handleClose={handleClose} date={date} sethours={sethours}/>*/}
            </div>

        );
}

export default HoursTable;

function Deletemodal({show, handleClose, hourid, date, sethours}){
    const hoursservice = new HoursService()
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
            <Button variant="primary" onClick={()=> {
                handleClose();
                hoursservice.deleteHour(hourid).then(()=>hoursservice.getHours(102090, moment(date).format("YYYY-MM-DD")).then(response =>
                    sethours(response)))
            }}>
                Eliminar
            </Button>

        </Modal.Footer>
    </Modal>)
}

/* function Crearmodal({show, handleClose, date, sethours}){
    const hoursservice = new HoursService()
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
                <Button variant="primary" onClick={()=> {
                    handleClose();
                    hour = new Hour()
                    hoursservice.postHour(hour).then(()=>hoursservice.getHours(102090, moment(date).format("YYYY-MM-DD")).then(response =>
                        sethours(response)))
                }}>
                    Eliminar
                </Button>

            </Modal.Footer>
        </Modal>)
}

 */












