import axios from "axios";
const urlbase = "https://squad1720212c.herokuapp.com/horastrabajadas";

class HoursService {
  async getHours(legajo, fecha) {
    const url = `${urlbase}?legajo=${legajo}&fecha=${fecha}`;
    const response = await axios.get(url);
    return response.data;
  }
  async postHour(hourObject) {
    const { data } = await axios.post(urlbase, hourObject);
    return data;
  }
  async deleteHour(id) {
    const url = `${urlbase}/${id}`;
    const response = await axios.delete(url);
    return response.data;
  }
}
export default HoursService;
