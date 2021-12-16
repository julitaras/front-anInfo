import React, {Component} from "react"
import withParams from "../../hocs/withParams";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class TicketPage extends Component {

    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            clientID: '',
            createdDate: '',
            description: '',
            employeeID: '',
            expectedDate: '',
            productID:'',
            productVersion:'',
            severity:'',
            state:'',
            subject:'',
            taskID:'',
            ticketID:'',
            type:''
        }
    }
      
    peticionGet=()=>{
        axios.get('http://soporte-fiuba.herokuapp.com/tickets').then(response=>{
        this.setState({data: response.data});
      }).catch(error=>{
        console.log(error.message);
      })
    }
      
    peticionPost=async()=>{
        delete this.state.form.id;
        await axios.post('http://soporte-fiuba.herokuapp.com/tickets',this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
    }
      
    peticionPut=()=>{
        axios.put('http://soporte-fiuba.herokuapp.com/tickets'+this.state.form.id, this.state.form).then(response=>{
        this.peticionGet();
        })
    }
      
    peticionDelete=()=>{
        axios.delete('http://soporte-fiuba.herokuapp.com/tickets'+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();
        })
    }
      
    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }
      
    seleccionarTicket=(ticket)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            clientID: ticket.clientID,
            createdDate: ticket.createdDate,
            description: ticket.description,
            employeeID: ticket.employeeID,
            expectedDate: ticket.expectedDate,
            productID:ticket.productID,
            productVersion:ticket.productVersion,
            severity:ticket.severity,
            state:ticket.state,
            subject:ticket.subject,
            taskID:ticket.taskID,
            ticketID:ticket.ticketID,
            type:ticket.type
          }
        })
    }
    handleChange=async e=>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        console.log(this.state.form);
    }
        
    componentDidMount() {
        this.peticionGet();
    }

    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.params.id);
    }

    render(){
        const {form}=this.state;
        return (
        <div className="Ticket">
        <br /><br /><br />
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Ticket</button>
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Asunto</th>
              <th>Tipo</th>
              <th>Cliente</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Fecha esperada</th>
              <th>Empleado asignado</th>
              <th>Severidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(ticket=>{
              return(
                <tr>
              <td>{ticket.subject}</td>
              <td>{ticket.type}</td>
              <td>{ticket.clientID}</td>
              <td>{ticket.description}</td>
              <td>{ticket.createdDate}</td>
              <td>{ticket.expectedDate}</td>
              <td>{ticket.employeeID}</td>
              <td>{ticket.severity}</td>
              <td>{ticket.state}</td>
              <td>
                    <button className="btn btn-primary" onClick={()=>{this.seleccionarTicket(ticket); this.modalInsertar()}}>Editar</button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarTicket(ticket); this.setState({modalEliminar: true})}}>Eliminar</button>
                    </td>
              </tr>
              )
            })}
          </tbody>
        </table>
    
    
    
        <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                    <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                        <label htmlFor="ticketID">ID</label>
                        <input className="form-control" type="text" name="ID" id="ticketID" readOnly onChange={this.handleChange} value={form?form.ticketID: this.state.data.length+1}/>
                        <label htmlFor="subject">Asunto</label>
                        <input className="form-control" type="text" name="Asunto" id="subject" onChange={this.handleChange} value={form?form.subject: ''}/>
                        <br />
                        <label htmlFor="type">Tipo</label>
                        <input className="form-control" type="text" name="Tipo" id="type" onChange={this.handleChange} value={form?form.type: ''}/>
                        <br />
                        <label htmlFor="type">Producto</label>
                        <input className="form-control" type="text" name="Producto" id="productID" onChange={this.handleChange} value={form?form.productID: ''}/>
                        <br />
                        <label htmlFor="type">Version</label>
                        <input className="form-control" type="text" name="Version" id="productVersion" onChange={this.handleChange} value={form?form.productVersion: ''}/>
                        <br />
                        <label htmlFor="clientID">Cliente</label>
                        <input className="form-control" type="text" name="Cliente" id="clientID" onChange={this.handleChange} value={form?form.clientID: ''}/>
                        <br />
                        <label htmlFor="description">Descripcion</label>
                        <input className="form-control" type="text" name="Descripcion" id="description" onChange={this.handleChange} value={form?form.description: ''}/>
                        <br />
                        <label htmlFor="expectedDate">Fecha esperada</label>
                        <input className="form-control" type="date" name="Fecha esperada" id="expectedDate" onChange={this.handleChange} value={form?form.expectedDate: ''}/>
                        <br />
                        <label htmlFor="employeeID">Empleado asignado</label>
                        <input className="form-control" type="text" name="Empleado asignado" id="employeeID" onChange={this.handleChange} value={form?form.employeeID: ''}/>
                        <br />
                        <label htmlFor="severity">Severidad</label>
                        <input className="form-control" type="text" name="Empleado asignado" id="severity" onChange={this.handleChange} value={form?form.severity: ''}/>
                        <br />
                        <label htmlFor="state">Estado</label>
                        <input className="form-control" type="text" name="Empleado asignado" id="state" onChange={this.handleChange} value={form?form.state: ''}/>
                        <br />
                        
                      </div>
                    </ModalBody>
    
                    <ModalFooter>
                      {this.state.tipoModal=='insertar'?
                        <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                        Insertar
                      </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                        Actualizar
                      </button>
      }
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
              </Modal>
    
    
              <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   Estás seguro que deseas eliminar el ticket? {form && form.nombre}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
              </Modal>
      </div>
      );
    }
}

export default withParams(TicketPage);
