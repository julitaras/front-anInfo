import axios from "axios";

class ProductService {

    async postTicket(ticketObject) {
        // Make a post request with Axios to the server https://soporte-fiuba.herokuapp.com/tickets 
        // with the ticketObject as the body
        const response = await axios.post("https://soporte-fiuba.herokuapp.com/tickets", ticketObject);
        return response;  
    }

    async getTickets(query) {
        const response = await axios.get(`https://soporte-fiuba.herokuapp.com${query}`);
        return response;
    }

    async updateTicket(ticketID, ticketObject) {
        const response = await axios.put(`https://soporte-fiuba.herokuapp.com/tickets/${ticketID}`, ticketObject);
        console.log(response);
        return response; 
    }
};

export default ProductService;
