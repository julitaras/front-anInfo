import axios from "axios";

class ClientService {

    async getClients() {
        const response = await axios.get("http://soporte-fiuba.herokuapp.com/products");
        return response.data;  
    }
};

export default ClientService;