import axios from "axios";

class EmployeeService {

    async getEmployees() {
        const response = await axios.get("https://squad1720212c.herokuapp.com/empleados");
        return response;
    }
};

export default EmployeeService;