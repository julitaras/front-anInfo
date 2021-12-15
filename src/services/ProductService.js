import axios from "axios";

class ProductService {

    constructor() { }

    async getProducts() {
        const response = await axios.get("http://soporte-fiuba.herokuapp.com/products");
        return response.data;  
    }
};

export default ProductService;
