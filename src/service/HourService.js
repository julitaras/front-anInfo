import axios from "axios";
const ENDPOINT = "https://squad1720212c.herokuapp.com/horastrabajadas";
const PROJECT_PATH = "https://squad14-2c-2021.herokuapp.com";

class HoursService {
  async getHours(legajo, fecha) {
    const { data } = await axios.get(
      `${ENDPOINT}?legajo=${legajo}&fecha=${fecha}`
    );
    const hours = Promise.all(data.map( async (hour) => {
		const { data: proyecto } = await axios.get(`${PROJECT_PATH}/projects/${hour.idProyecto}`);
		hour.nombreProyecto = proyecto.name;
		
		const { data: tarea } = await axios.get(`${PROJECT_PATH}/tasks/${hour.idTarea}`);
		hour.nombreTarea = tarea.name;
		
		return hour;
	}));
    return hours;
  }
  async postHour(hourObject) {
    const { data } = await axios.post(ENDPOINT, hourObject);
    return data;
  }
  async putHour(hourObject) {
    const { data } = await axios.put(
      `${ENDPOINT}/${hourObject.id}`,
      hourObject
    );
    return data;
  }
  async deleteHour(id) {
    const { data } = await axios.delete(`${ENDPOINT}/${id}`);
    return data;
  }
}

export default HoursService;
