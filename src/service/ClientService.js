import axios from "axios";

class ClientService {

    async getClients() {
        const response = await axios.get("http://soporte-fiuba.herokuapp.com/clients");
        return response.data;  
    }

    async getClient(clientID) {
        const response = await axios.get(`http://soporte-fiuba.herokuapp.com/clients/${clientID}`);
        return response.data;  
    }
};

export default ClientService;
