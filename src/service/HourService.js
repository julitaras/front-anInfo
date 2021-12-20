import axios from "axios";
const ENDPOINT = "https://squad1720212c.herokuapp.com/horastrabajadas";

class HoursService {
  async getHours(legajo, fecha) {
    const { data } = await axios.get(
      `${ENDPOINT}?legajo=${legajo}&fecha=${fecha}`
    );
    return data;
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
