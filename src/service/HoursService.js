import axios from "axios";
const urlbase = "https://squad1720212c.herokuapp.com/horastrabajadas"

class HoursService {
    async getHours(legajo, fecha) {
        var url = urlbase+"?legajo="+legajo+"&fecha="+fecha
        console.log(url)
        const response = await axios.get(url);
        return response.data;
    }
    async postHour(hourObject) {
        // Make a post request with Axios to the server https://soporte-fiuba.herokuapp.com/tickets
        // with the ticketObject as the body
        var url = urlbase
        console.log(url)
        const response = await axios.post(url, hourObject);
        return response;
    }
    async deleteHour(id) {
        var url = urlbase+"/"+id
        console.log(url)
        const response = await axios.delete(url);
        return response.data;
    }
};
export default HoursService;
