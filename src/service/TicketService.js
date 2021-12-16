import axios from "axios";

class TicketService {

    async getTickets() {
        const response = await axios.get("http://soporte-fiuba.herokuapp.com/products");
        return response.data;  
    }
};

export default TicketService;