
class Product {

    constructor() { 
        this.productID = { };
        this.name = { };
        this.version = { };
    }

    static createProduct(productID, name, version) {
        let product = new Product();
        product.productID = productID;
        product.name = name;
        product.version = version;
        return product;
    }
};

export default Product;
