import axios from "axios";

class ProductService {

    async getProducts() {
        const response = await axios.get("http://soporte-fiuba.herokuapp.com/products");
        return response.data;  
    }

    async getProduct(productID) {
        const response = await axios.get(`http://soporte-fiuba.herokuapp.com/products/${productID}`);
        return response.data;  
    }
};

export default ProductService;
