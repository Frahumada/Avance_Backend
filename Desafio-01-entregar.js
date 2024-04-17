class ProductManager {
    constructor () {
        this.products = [];
    }

    addProduct (title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code: this.#validateCode(code),
            stock,            
        };
        this.products.push(product);

    }

    getProducts () {
        return this.products
    }

    getPrductById (productId) {
        if (this.products.find((product) => product.id === productId)) {
            return this.products.find((product) => product.id === productId)
        } else {
            console.log("Error! product not found")
        }
    }

    #getMaxId () {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });
        return maxId;
    }

    #validateCode (codeProduct) {
        if (!this.products.find((product) => product.code === codeProduct)) {
            return codeProduct;
        }
        else {console.log("Invalid code")};
    }
}


const productManager = new ProductManager();

productManager.addProduct ("Tablet", "Articulo de tecnologia", 150000, "htttp://www.google.com", 123, 10)
productManager.addProduct ("Celular", "Articulo de tecnologia", 100000, "htttp://www.google.com", 124, 10)
productManager.addProduct ("SmartWatch", "Articulo de tecnologia", 88000, "htttp://www.google.com", 125, 10)
productManager.addProduct ("Cartucho", "Articulo de impresion", 12000, "htttp://www.google.com", 126, 10)

console.log (productManager.getProducts);




productManager.addProduct ("Cartucho", "Articulo de impresion", 12000, "htttp://www.google.com", 126, 10)






